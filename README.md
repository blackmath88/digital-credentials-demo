# Digital Credentials Demo

A small, standards-oriented prototype for turning a training certificate into a durable digital credential that people can understand, keep, share and verify.

The first fixture is a digital representation of an existing **Change Management Training** certificate from Implement Learning Institute (26 August 2025). It is intentionally presented as a **demo representation**. The signed demo credentials are issued only by prototype demo issuers — not by Implement Learning Institute or University of Basel.

## Pitch page

Open `pitch.html` for the product story: what the product is, why Open Badges 3.0 matters beyond a nice HTML certificate, participant and organiser UX, higher-education reference cases, and the proposed path for improving our certificates.

The pitch uses reference cases from MIT / the Digital Credentials Consortium, ETH Zürich, Oxford, SUNY, Deakin University and the European Commission / Europass.

## Current build

### Bite 1 — participant artefact

Premium public credential page, responsive/mobile treatment, A4 print/PDF mode, QR/share actions, LinkedIn handoff, CV HTML embed, structured credential record and social metadata.

### Bite 2 — Open Badges 3.0 mapping

The product record is mapped to an `OpenBadgeCredential` and shown in `standards-lab.html` using MIT/DCC course-certificate examples as the reference pattern.

### Bite 3 — cryptographic proof

The repo contains a genuinely signed demo credential using the Open Badges 3.0 RS256 VC-JWT route, a public demo issuer key, a reproducible issuer tool and a browser verifier built on Web Crypto. `verify.html` includes a tamper test that demonstrates that changing signed data breaks verification.

### Bite 3.1 — DCC-compatible trust shape

A second issuance path now mirrors current MIT/Digital Credentials Consortium examples:

- Ed25519 `Multikey`
- `did:key` issuer identity
- `DataIntegrityProof`
- `eddsa-rdfc-2022`
- Open Badges 3.0 / W3C VC 2.0 credential shape
- local issue → verify roundtrip
- GitHub Actions interoperability check
- manual handoff to VerifierPlus

Run:

```bash
npm install
npm run dcc:roundtrip
```

This generates the public `issuer-did.json` and `obv3/dcc-signed-credential.json`; private key material remains under ignored `.keys/`.

This proves a DCC-compatible technical trust path, but **not institutional authority**. A real pilot still needs an institution-controlled identity, key custody, issuance governance and status/revocation.

### Bite 4 — organiser issuance workflow

`issuer.html` is the organiser side of the product: a five-step workflow that makes issuing a batch feel smaller than producing a batch of PDFs.

```text
Training → Credential content → Participants → Preview → Issue
```

- pre-filled with the Change Management Training fixture
- paste a `name,email` list (or drop in `demo-participants.csv`); parsing and validation happen in the browser
- preview one participant's credential page, its public fields and its Open Badges 3.0 record
- issue the batch locally and see a status table of recipients, credential ids and delivery state
- export any record as a DCC signing input for the Bite 3.1 `did:key` / `eddsa-rdfc-2022` path

Nothing is uploaded, stored or sent. Records are **demo issuances** from a **prototype issuer** and are **not institutionally signed** — every record carries `institutionallySigned: false`.

See `docs/bite-4.md`.

### Run the visual demo

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000` — participant credential demo
- `http://localhost:8000/pitch.html` — product pitch
- `http://localhost:8000/standards-lab.html` — Open Badges mapping
- `http://localhost:8000/verify.html` — Bite 3 cryptographic verification + tamper test
- `http://localhost:8000/dcc-lab.html` — Bite 3.1 DCC compatibility / external-verifier handoff
- `http://localhost:8000/issuer.html` — Bite 4 organiser issuance workflow

## Project map

- `index.html` — public credential experience
- `pitch.html` — visual product pitch
- `standards-lab.html` — Bite 2 standards mapping
- `verify.html` / `verify.js` — Bite 3 cryptographic verification surface
- `dcc-lab.html` — Bite 3.1 DCC compatibility surface
- `issuer.html` / `issuer.css` / `issuer.js` — Bite 4 organiser workspace
- `issuance.js` — Bite 4 issuance model: fixtures, CSV parsing, OB 3.0 mapping, deterministic issuance
- `demo-participants.csv` — five demo participants for the organiser workflow
- `credential.json` — product-domain source record
- `obv3/credential-draft.json` — unsigned Open Badges 3.0 mapping
- `obv3/credential-jwt-payload.json` / `credential-jwt.txt` — Bite 3 signed VC-JWT artefacts
- `obv3/dcc-credential-template.json` — Bite 3.1 DCC-style credential input
- `issuer.json` — Bite 3 public RSA demo issuer key/profile
- `tools/issue-demo.py` — Bite 3 RS256 issuer tool
- `tools/dcc-lib.mjs` — DID / JSON-LD helpers
- `tools/issue-dcc.mjs` — Ed25519 + Data Integrity issuer
- `tools/verify-dcc.mjs` — independent Data Integrity roundtrip check
- `.github/workflows/dcc-compat.yml` — CI issue → verify interoperability check
- `docs/bite-3-1.md` — DCC compatibility and trust-boundary notes
- `docs/bite-4.md` — organiser workflow, data model and what is simulated
- `docs/concept.md` — product thesis and scope
- `docs/standards.md` — Open Badges 3.0 + MIT/DCC path
- `docs/pitch-unibas.md` — University of Basel conversation brief
- `docs/pitch-implement.md` — Implement conversation brief
- `docs/architecture.md` — technical shape and trust boundary
- `docs/roadmap.md` — current build plan

## V0 succeeds if

1. Someone seeing the credential immediately understands what was achieved.
2. The digital credential feels more useful than the original PDF alone.
3. A recipient can use it on LinkedIn, a CV, or a personal website.
4. Its underlying representation maps cleanly to Open Badges 3.0.
5. Credential integrity can be checked without trusting the display page.
6. A second verifier can understand the credential proof shape.
7. Issuing 20 credentials looks easier than manually producing 20 PDFs.
8. The demo is credible enough to start a conversation with University of Basel L&D and Implement Consulting Group.

## Standards direction

The implementation targets **1EdTech Open Badges 3.0** and uses MIT Digital Credentials Consortium examples as practical interoperability fixtures.

- 1EdTech Open Badges: https://www.1edtech.org/standards/open-badges
- MIT/DCC OBv3 examples: https://github.com/digitalcredentials/mit-learn-obv3-template
- DCC VerifierPlus: https://verifierplus.org/
- EdDSA RDFC 2022 cryptosuite: https://github.com/digitalbazaar/eddsa-rdfc-2022-cryptosuite

The organiser workflow now exists as a local demo. The next step is production trust and delivery: an institution-controlled issuer identity, key custody, credential status/revocation, real per-participant credential URLs and an actual delivery channel. See `docs/bite-4.md` for the full list.
