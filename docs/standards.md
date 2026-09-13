# Standards path

## Target: Open Badges 3.0

1EdTech Open Badges 3.0 is the target credential format for the implementation. Open Badges packages an achievement with metadata about the earner, issuer and criteria/evidence, and version 3.0 aligns with the W3C Verifiable Credentials model.

Primary references:

- https://www.1edtech.org/standards/open-badges
- https://standards.1edtech.org/open-badges/guides/standards/v3p0/impl

## MIT / Digital Credentials Consortium

The Digital Credentials Consortium publishes Open Badges 3.0 samples and recommendations for MIT Learn course certificates. Those examples are valuable as compatibility fixtures because they show the properties DCC's wallet and Verifier Plus expect to display.

Reference:

- https://github.com/digitalcredentials/mit-learn-obv3-template

## Bite 2 implementation

`credential.json` remains the small product-domain record used by the public participant experience.

`obv3/credential-draft.json` is the first standards mapping. It expresses the same achievement as a W3C Verifiable Credential / OpenBadgeCredential and includes the Open Badges 3.0 context, issuer profile, validity date, AchievementSubject, Achievement, criteria and tags.

`standards-lab.html` makes this mapping visible for non-technical stakeholders.

## Trust boundary

The Bite 2 JSON is deliberately **unsigned** and is not presented as a real credential newly issued by Implement Learning Institute.

The issuer identifier uses an `example.invalid` placeholder. We do not create a fake DID, proof block, signing key, status list or revocation mechanism just to make the demo look complete.

This distinction is central:

- a structurally mapped credential proves the data model and interoperability direction;
- a signed credential proves issuer authority and integrity.

Bite 3 will add the second part only when there is a legitimate issuer identity and issuer-controlled key material.

## Bite 2 acceptance status

- domain record mapped to an Open Badges 3.0-shaped credential: complete
- aligned against the MIT/DCC course-certificate field pattern: complete
- mapping and trust boundary documented visually: complete
- independent cryptographic verification: deferred to Bite 3 because a legitimate issuer proof does not yet exist

Do not invent a proprietary signing format.
