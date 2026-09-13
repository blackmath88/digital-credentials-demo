# Bite 3.1 — DCC-compatible verification path

## Goal

Move from a credential that our own demo can sign and verify to a credential that follows the trust shape used by the MIT / Digital Credentials Consortium examples and can be handed to an independent verifier.

## What changed

Bite 3 used an RS256 VC-JWT demo proof to establish the basic cryptographic point: signed bytes can be independently checked and tampering breaks the signature.

Bite 3.1 adds a second, standards-focused issuance path:

- issuer identifier: `did:key`
- public key representation: Ed25519 `Multikey`
- proof: `DataIntegrityProof`
- cryptosuite: `eddsa-rdfc-2022`
- proof purpose: `assertionMethod`
- credential model: Open Badges 3.0 / W3C Verifiable Credentials 2.0

This mirrors the proof shape used in the current MIT Learn Open Badges examples published by the Digital Credentials Consortium.

## Run it

```bash
npm install
npm run dcc:roundtrip
```

The command:

1. generates an Ed25519 keypair;
2. derives a `did:key` issuer from the public Multikey fingerprint;
3. stores the private key only in `.keys/` (gitignored);
4. writes the public DID document to `issuer-did.json`;
5. maps the demo credential template to the generated issuer;
6. signs the credential with `eddsa-rdfc-2022`;
7. writes `obv3/dcc-signed-credential.json`;
8. verifies the proof again using only the public key material and the credential.

Then run a static server and open the visual compatibility lab:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/dcc-lab.html`.

## Independent verifier handoff

The generated credential is deliberately a standalone JSON artefact. The manual compatibility step is to copy/import `obv3/dcc-signed-credential.json` into VerifierPlus:

- https://verifierplus.org/

This matters because a successful check in our own code only proves that our issuer and verifier agree. A second implementation is the more meaningful interoperability test.

## Trust boundary

A valid `did:key` + EdDSA proof proves that the holder of the corresponding demo private key signed the credential and that the signed data has not been changed.

It does **not** prove that Implement Learning Institute or University of Basel controls that key. The demo issuer is explicitly named `Digital Credentials Demo Issuer`.

For a real institutional pilot, the next trust decision is organisational rather than cryptographic: who owns the issuer identity, where keys live, who may issue, how revocation works, and how an institution-controlled identifier such as `did:web` is governed.

## CI

`.github/workflows/dcc-compat.yml` runs the full issue → verify roundtrip on GitHub Actions and uploads only the generated public credential and DID document as workflow artefacts. Private signing material is not uploaded.

## Reference fixtures

- MIT Learn Open Badges 3.0 templates: https://github.com/digitalcredentials/mit-learn-obv3-template
- DCC VerifierPlus: https://verifierplus.org/
- 1EdTech Open Badges 3.0: https://www.1edtech.org/standards/open-badges
- `eddsa-rdfc-2022` cryptosuite implementation: https://github.com/digitalbazaar/eddsa-rdfc-2022-cryptosuite
