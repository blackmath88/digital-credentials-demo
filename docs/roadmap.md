# Roadmap

## Bite 1 — desirable artefact

Status: complete

Build one excellent public credential and the materials needed to discuss the concept with University of Basel L&D and Implement.

## Bite 2 — standards mapping

Status: complete

Map the domain record to Open Badges 3.0; use MIT/DCC course-certificate examples as fixtures; make the mapping visible in a standards lab; document gaps and required trust fields.

## Bite 3 — cryptographic proof

Status: complete

The demo contains a real signed credential sample using the Open Badges 3.0 RS256 VC-JWT path, a public demo issuer key, a reproducible local issuer script, and an in-browser Web Crypto verifier with a tamper test.

The trust boundary remains explicit: **signature valid** means the demo key signed the exact credential bytes. It does not mean Implement Learning Institute or University of Basel issued or endorsed the credential.

## Bite 3.1 — DCC-compatible trust shape

Status: implemented on `feat/bite-3-1-dcc-verification`

Add a second signing path that mirrors current MIT/Digital Credentials Consortium examples: Ed25519 `Multikey`, `did:key`, `DataIntegrityProof`, and the `eddsa-rdfc-2022` cryptosuite. Run a local issue → verify roundtrip in CI, keep private signing material out of Git, and make the generated credential easy to hand to VerifierPlus for an independent interoperability check.

Remaining production trust work is organisational: move the demo issuer to an institution-controlled identity (likely `did:web` or an institution-managed equivalent), decide key custody and issuer authority, and add status/revocation.

## Bite 4 — tiny issuer workflow

Status: implemented on `feat/bite-4-organiser-issuance`

`issuer.html` is a five-step organiser surface: define the training, define the credential content, paste a `name,email` participant list, preview one participant's credential, issue the batch. Parsing, mapping and issuance run locally in `issuance.js`; issued records are deterministic and can be handed to the Bite 3.1 signing path unchanged.

The point of the bite is the felt effort: create training → paste participants → preview → issue. The organiser surface stays calm and operational so the participant surface remains the premium one.

Simulated, and deliberately so: issuance authority, signing, delivery, hosting, persistence and credential status. Every record carries `institutionallySigned: false`.

See `docs/bite-4.md`.

## Product story integration

Status: implemented on `feat/product-story-integration`

The technical bites proved the machinery but left an obvious question open: *isn't this just a nice HTML certificate generator?* This slice answers it inside the product rather than in a separate deck.

`index.html` now carries the short version of the case — credential → what it actually is → why it matters to participants, organisers and institutions → the standard underneath → the three levels from better certificates to a credential ecosystem → a proposed University of Basel + Implement pilot → higher-ed reference points → an explicit trust boundary. Each claim in the "more than a certificate page" chain links to the surface in this repo that demonstrates it.

`pitch.html` stays the long-form story and now points at the short version; `docs/product-case.md` is the written layer.

Trust boundary is restated rather than relaxed: pilot models are proposals, reference cases are citations not endorsements, and every signed credential here is signed by a prototype demo issuer.

## Bite 5 — pilot package

Status: implemented on `feat/bite-5-pilot-package`

The repository stops being a prototype looking for a use and becomes a decision dossier. `pilot.html` is the discussion surface; `docs/pilot/` holds the charter, governance model, technical architecture, success metrics, risks, 90-day plan and a four-minute decision brief; `docs/research/` synthesises the commissioned Swiss and European landscape report, which is archived alongside it.

Core decisions carried from the research: University of Basel as **single formal issuer**, Implement Consulting Group as delivery and co-design partner with an **optional separate endorsement** — no dual cryptographic issuance, because Open Badges 3.0 does not model it. One non-credit cohort. The existing PDF retained as the control arm.

No product infrastructure was added. The remaining gaps — issuer authority, key custody, status/revocation, hosting, identity governance, delivery — are institutional decisions, which is the argument for this being a stopping point.

`docs/public-extraction-plan.md` records the follow-up: splitting a clean, generic public reference implementation out of this pilot lineage.

## This repository's stopping point

The build is complete. The next step is an organisational decision on a bounded live pilot, not more prototype code. See `docs/pilot/decision-brief.md`.

## Explicit non-goals for now

No LMS. No badge marketplace. No blockchain. No learner social network. No sprawling admin SaaS.
