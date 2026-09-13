# Bite 2 — Open Badges 3.0 mapping

Bite 2 moves the demo from a nice certificate page toward a standards-based credential architecture without inventing trust that does not yet exist.

## What was added

- `obv3/credential-draft.json` — an unsigned Open Badges 3.0-shaped mapping of the existing Change Management Training record.
- `standards-lab.html` — a visual explanation of how the product record maps into an `OpenBadgeCredential` and where the trust boundary sits.

## Mapping target

The implementation follows the field patterns published in the MIT / Digital Credentials Consortium `mit-learn-obv3-template` repository and the 1EdTech Open Badges 3.0 context.

The draft currently includes:

- W3C Verifiable Credentials v2 context
- Open Badges 3.0 context
- `VerifiableCredential` + `OpenBadgeCredential` types
- issuer profile
- validity date
- achievement subject
- achievement name, description, criteria and tags

## Deliberate non-claims

The draft is **not** presented as a real signed credential from Implement Learning Institute.

The issuer identifier is intentionally an `example.invalid` placeholder. There is no proof block, no issuer-controlled DID, no status list and no revocation mechanism. Those belong to Bite 3 and require actual issuer authority.

This is important because structural conformance and cryptographic verification are different things. Bite 2 proves the data model and interoperability direction; Bite 3 introduces trust.

## Acceptance status

- [x] map the local product-domain record into an Open Badges 3.0-shaped credential
- [x] align the major fields with MIT/DCC course-certificate examples
- [x] expose the mapping visually for non-technical stakeholders
- [x] document missing trust/issuer fields rather than fabricating them
- [ ] validate a signed credential in an independent verifier — blocked until Bite 3 supplies a legitimate issuer identity and proof

## References

- https://www.1edtech.org/standards/open-badges
- https://github.com/digitalcredentials/mit-learn-obv3-template
- https://dcconsortium.org/
