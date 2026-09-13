# Roadmap

## Bite 1 — desirable artefact

Status: complete

Build one excellent public credential and the materials needed to discuss the concept with University of Basel L&D and Implement.

## Bite 2 — standards mapping

Status: complete

Map the domain record to Open Badges 3.0; use MIT/DCC course-certificate examples as fixtures; make the mapping visible in a standards lab; document gaps and required trust fields.

## Bite 3 — cryptographic proof

Status: implemented on `feat/bite-3-signing`

The demo now contains a real signed credential sample using the Open Badges 3.0 RS256 VC-JWT path, a public demo issuer key, a reproducible local issuer script, and an in-browser Web Crypto verifier with a tamper test.

The trust boundary remains explicit: **signature valid** means the demo key signed the exact credential bytes. It does not mean Implement Learning Institute or University of Basel issued or endorsed the credential.

### Bite 3.1 — external verifier / institutional identity

Before an institutional pilot, move from the prototype issuer to an issuer-controlled `did:key` or `did:web` setup and a DCC-compatible Data Integrity proof, then test the result in an independent verifier such as VerifierPlus. Add credential status/revocation once the issuer lifecycle is real.

## Bite 4 — tiny issuer workflow

Create/select achievement → CSV participant import → preview and approval → batch issuance → delivery links / email handoff.

## Explicit non-goals for now

No LMS. No badge marketplace. No blockchain. No learner social network. No sprawling admin SaaS.
