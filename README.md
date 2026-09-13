# Digital Credentials Demo

A small, standards-oriented prototype for turning a training certificate into a durable digital credential that people can understand, keep, share and — in later bites — verify independently.

The first fixture is a digital representation of an existing **Change Management Training** certificate from Implement Learning Institute (26 August 2025). It is intentionally presented as a **demo representation**, not as a newly issued or cryptographically signed credential from Implement.

## Bite 1

Bite 1 proves the participant experience before we add credential signing, issuer accounts or batch issuance. It includes a premium public credential page, responsive/mobile treatment, A4 print/PDF mode, QR/share actions, LinkedIn handoff, CV HTML embed, structured credential record, social metadata, and short conversation briefs for University of Basel and Implement.

### Run locally

No build step or package install is required.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Project map

- `index.html` — public credential experience
- `styles.css` — editorial/institutional visual system + print treatment
- `app.js` — render/share/embed/QR interactions
- `credential.json` — Bite 1 domain record (not yet an Open Badge)
- `og-card.svg` — share-card artwork
- `docs/concept.md` — product thesis and scope
- `docs/standards.md` — Open Badges 3.0 + MIT/DCC path
- `docs/pitch-unibas.md` — University of Basel conversation brief
- `docs/pitch-implement.md` — Implement conversation brief
- `docs/architecture.md` — technical shape and trust boundary
- `docs/roadmap.md` — Bite 2–4 plan

## V0 succeeds if

1. Someone seeing the credential immediately understands what was achieved.
2. The digital credential feels more useful than the original PDF alone.
3. A recipient can use it on LinkedIn, a CV, or a personal website.
4. Its underlying representation can map cleanly to Open Badges 3.0.
5. Issuing 20 credentials looks easier than manually producing 20 PDFs.
6. The demo is credible enough to start a conversation with University of Basel L&D and Implement Consulting Group.

## Standards direction

The implementation path targets **1EdTech Open Badges 3.0**, using the MIT Digital Credentials Consortium's published OBv3 course-certificate examples as practical interoperability fixtures.

- 1EdTech Open Badges: https://www.1edtech.org/standards/open-badges
- MIT/DCC OBv3 examples: https://github.com/digitalcredentials/mit-learn-obv3-template

`credential.json` is deliberately **not** labelled as a conformant or signed Open Badge in Bite 1. Standards mapping and verifier testing belong to Bite 2; issuer identity and signing belong to Bite 3.
