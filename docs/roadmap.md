# Roadmap

## Bite 1 — desirable artefact

Status: complete

Build one excellent public credential and the materials needed to discuss the concept with University of Basel L&D and Implement.

## Bite 2 — standards mapping

Status: implemented on `feat/bite-2-open-badges`

Map the domain record to Open Badges 3.0 JSON-LD; use MIT/DCC course-certificate examples as fixtures; make the mapping visible in a standards lab; document gaps and required trust fields; keep issuer/signing claims disabled until real authority exists.

Current boundary: the demo now has an unsigned Open Badges 3.0-shaped credential, but independent verifier proof is intentionally deferred until Bite 3 because no legitimate issuer-controlled identifier or signing key exists yet.

## Bite 3 — real issuance

Add issuer identity, standards-compatible identifier, issuer-controlled key management, signed credential generation, credential status/revocation, and a public verification view based on proof + status. Validate the resulting credential with independent compatible verifier tooling.

## Bite 4 — tiny issuer workflow

Create/select achievement → CSV participant import → preview and approval → batch issuance → delivery links / email handoff.

## Explicit non-goals for now

No LMS. No badge marketplace. No blockchain. No learner social network. No sprawling admin SaaS.
