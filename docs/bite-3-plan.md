# Bite 3 — signed demo issuer

## Goal

Turn the Bite 2 standards mapping into a **cryptographically signed demo credential** without pretending that Implement Learning Institute or the University of Basel has issued it.

## Approach

For the first end-to-end proof we use the Open Badges 3.0 **JWT / RS256** route documented by 1EdTech. It is deliberately simpler to implement and inspect than a JSON-LD Data Integrity proof while still exercising the trust boundary that matters:

1. an issuer-controlled private key signs the credential;
2. only the public key is published;
3. a verifier can detect any change to the signed credential;
4. issuer identity is explicit and separate from the source certificate issuer;
5. the private key is never committed to the repository.

## Demo trust model

The **demo credential issuer** is this prototype project, not Implement and not University of Basel.

The achievement may still describe the source certificate from Implement, but the signed statement must clearly say that it is a demo digital representation created for interoperability testing.

## Deliverables

- `issuer.json` — public demo issuer profile + public JWK
- `obv3/credential-jwt.txt` — signed sample credential as compact JWT
- `obv3/credential-jwt-payload.json` — decoded payload for inspection
- `verify.html` — browser verification surface
- `verify.js` — Web Crypto RS256 verification; no server required
- `tools/issue-demo.py` — reproducible issuer script that requires a local private key
- `tools/README.md` — key generation and issuance instructions

## Acceptance criteria

- verification succeeds with the committed public key;
- changing any signed byte makes verification fail;
- no private key or secret is committed;
- the UI distinguishes **signature valid** from **institution/identity trusted**;
- no UI says that Implement or University of Basel cryptographically issued this credential.

## What remains after Bite 3

A real institutional pilot would replace the demo issuer with an issuer-controlled domain/key publication process, add credential status/revocation, and test against external Open Badges verifier tooling.
