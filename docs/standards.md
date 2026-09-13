# Standards path

## Target: Open Badges 3.0

1EdTech Open Badges 3.0 is the target credential format for the next implementation bite. Open Badges packages an achievement with metadata about the earner, issuer and criteria/evidence, and the 3.0 specification aligns with the W3C Verifiable Credentials model.

Primary references:

- https://www.1edtech.org/standards/open-badges
- https://standards.1edtech.org/open-badges/guides/standards/v3p0/impl

## MIT / Digital Credentials Consortium

The Digital Credentials Consortium publishes Open Badges 3.0 samples and recommendations for MIT Learn course certificates. Those examples are valuable as compatibility fixtures because they show the properties DCC's wallet and Verifier Plus expect to display.

Reference:

- https://github.com/digitalcredentials/mit-learn-obv3-template

## Deliberate boundary in Bite 1

`credential.json` is **not** claimed to be a conformant Open Badge. It is a small product-domain model that preserves the facts we will need to map into an Open Badge credential in Bite 2.

This boundary matters: a nice public page does not make a credential cryptographically verifiable. Signing, issuer identity, status/revocation and independent verification remain future work.

## Bite 2 acceptance test

Map the domain record to an `OpenBadgeCredential` and test the result against the DCC/MIT examples and a compatible verifier. Do not invent a proprietary signing format.
