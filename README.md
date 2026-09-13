# Digital Credentials Demo

A small, standards-oriented prototype for turning a training certificate into a durable digital credential that people can understand, keep, share and verify.

The first fixture is a digital representation of an existing **Change Management Training** certificate from Implement Learning Institute (26 August 2025). It is intentionally presented as a **demo representation**. The signed Bite 3 credential is issued only by the prototype demo issuer — not by Implement Learning Institute or University of Basel.

## Pitch page

Open `pitch.html` for the product story: what the product is, why Open Badges 3.0 matters beyond a nice HTML certificate, participant and organiser UX, higher-education reference cases, and the proposed path for improving our certificates.

The pitch uses reference cases from MIT / the Digital Credentials Consortium, ETH Zürich, Oxford, SUNY, Deakin University and the European Commission / Europass.

## Current build

### Bite 1 — participant artefact

Premium public credential page, responsive/mobile treatment, A4 print/PDF mode, QR/share actions, LinkedIn handoff, CV HTML embed, structured credential record and social metadata.

### Bite 2 — Open Badges 3.0 mapping

The product record is mapped to an `OpenBadgeCredential` and shown in `standards-lab.html` using MIT/DCC course-certificate examples as the reference pattern.

### Bite 3 — cryptographic proof

The repo now contains a genuinely signed demo credential using the Open Badges 3.0 RS256 VC-JWT route, a public demo issuer key, a reproducible issuer tool and a browser verifier built on Web Crypto.

`verify.html` performs three distinct checks:

1. **signature integrity** — the exact JWT bytes verify with the public key;
2. **credential structure** — issuer, IDs, subject, type and time claims are internally consistent;
3. **demo issuer key match** — the credential key matches `issuer.json`.

The tamper test modifies one signed field in memory and demonstrates that signature verification fails immediately.

This is real cryptographic verification, but **not yet institutional trust**. A production pilot still needs an institution-controlled issuer identity / key lifecycle and external verifier interoperability.

### Run locally

No frontend build step is required.

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000` — participant credential demo
- `http://localhost:8000/pitch.html` — product pitch
- `http://localhost:8000/standards-lab.html` — Open Badges mapping
- `http://localhost:8000/verify.html` — cryptographic verification + tamper test

## Project map

- `index.html` — public credential experience
- `pitch.html` — visual product pitch
- `standards-lab.html` — Bite 2 standards mapping
- `verify.html` / `verify.js` — Bite 3 cryptographic verification surface
- `credential.json` — product-domain source record
- `obv3/credential-draft.json` — unsigned Open Badges 3.0 mapping
- `obv3/credential-jwt-payload.json` — signed credential payload
- `obv3/credential-jwt.txt` — compact signed demo credential
- `issuer.json` — public demo issuer key/profile
- `tools/issue-demo.py` — reproducible local RS256 issuer tool
- `tools/README.md` — local key generation / issuance instructions
- `docs/concept.md` — product thesis and scope
- `docs/standards.md` — Open Badges 3.0 + MIT/DCC path
- `docs/bite-2.md` / `docs/bite-3-plan.md` — implementation notes
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
6. Issuing 20 credentials looks easier than manually producing 20 PDFs.
7. The demo is credible enough to start a conversation with University of Basel L&D and Implement Consulting Group.

## Standards direction

The implementation path targets **1EdTech Open Badges 3.0**, using the MIT Digital Credentials Consortium's published OBv3 course-certificate examples as practical interoperability fixtures.

- 1EdTech Open Badges: https://www.1edtech.org/standards/open-badges
- MIT/DCC OBv3 examples: https://github.com/digitalcredentials/mit-learn-obv3-template
- DCC VerifierPlus: https://verifierplus.org/

The current signed sample deliberately uses a prototype issuer. For a real pilot, the next trust step is an institution-controlled `did:key` or `did:web` identity with a DCC-compatible Data Integrity proof and external verification.
