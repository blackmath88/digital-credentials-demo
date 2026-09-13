# Technical architecture

What a real pilot needs, and exactly where this prototype stops.

## Minimum credible architecture

The target chain, from the research's minimum credible architecture:

```
University of Basel — institutional issuer authority
            ↓
did:web or HTTPS issuer identifier on a university domain
            ↓
signing key in managed KMS / HSM
    named key owner · rotation · incident procedure
            ↓
OpenBadgeCredential
    achievement · criteria · learning outcomes · assessment
    workload · evidence policy · issue date · participant name
            ↓
W3C Verifiable Credentials 2.0 proof
            ↓
status / revocation
    privacy-preserving status list
            ↓
human-readable credential page  ·  downloadable signed credential  ·  PDF rendering
            ↓
LinkedIn  ·  wallet  ·  independent verifier
```

Plus, from the same list:

- **Email claim link** as the delivery mechanism.
- **Tested export to at least two independent tools** — for example VerifierPlus and Learner Credential Wallet / Open Badge Passport.

## Prototype today vs real pilot needs

| | Prototype today | Real pilot needs |
| --- | --- | --- |
| **Issuer identity** | Demo issuer; `did:key` generated locally | Basel-controlled `did:web` or HTTPS identifier on a university domain |
| **Key custody** | Ephemeral demo key in a gitignored local directory | Managed KMS/HSM, named key owner, rotation and incident procedure |
| **Issuance authority** | Anyone who runs the script | Defined issuer authority and an approval step |
| **Proof** | Genuinely demonstrated — RS256 VC-JWT and `eddsa-rdfc-2022` Data Integrity | Same mechanism, institution-controlled key |
| **Interoperability** | DCC-compatible path demonstrated; external handoff to VerifierPlus | Conformance tested against 1EdTech verifier, VerifierPlus and two wallet/export pathways |
| **Status / revocation** | None | Privacy-preserving status list for revocation and correction |
| **Hosting** | Local/static; `credentialUrl` is a placeholder | Durable hosting with a defined retention policy and a jurisdiction decision |
| **Subject identity** | A name and an email string | Identity matching policy, minimised personal data, no public birth dates |
| **Delivery** | None — the organiser flow produces records, sends nothing | Email claim link, support route, correction workflow |
| **Privacy** | No personal data beyond demo fixtures | Swiss FADP assessment, processor agreement, retention and deletion rules |
| **Operations** | A repository | Named operational owner for issuance, support and incidents |

The honest summary: **the prototype has demonstrated the proof mechanism and the interoperability shape. It has demonstrated none of the custody, status, hosting, identity or delivery layers** — and those are the ones a live pilot depends on.

## What the research says the gaps actually are

> The most important production gaps to test are **not badge rendering** but key custody, issuer trust, status, durable hosting, subject identity, standards conformance and wallet export.

This is why Bite 5 adds no product infrastructure. Every remaining gap is either an institutional decision or a procurement/integration task that cannot be usefully faked locally. **No KMS/HSM integration is built in this bite, deliberately.**

## Status and revocation

`credentialStatus` is **optional** in the W3C model, which supports both revocation and suspension and gives **Bitstring Status List** as an example.

One design constraint carries a privacy warning: W3C warns against per-person **"phone-home" status designs that reveal verification activity** — a status endpoint queried per credential lets the issuer observe who is checking whose credential and when. A status list that is fetched as a whole avoids this.

For the pilot, status must support at minimum: **revocation**, **suspension** and **correction** (reissue after a participant-name change).

## Human-readable is not optional

Learners understand LinkedIn links and PDFs. **Wallets and raw JSON remain unfamiliar** — VerifierPlus itself explains why human-readable public pages remain necessary even when the credential is independently portable.

So the premium page and the PDF are first-class pilot deliverables, not legacy artefacts kept for comfort. The architecture above renders all three from one record, which is exactly what this repository already demonstrates.

One design requirement from the Swiss privacy guidance interacts here: **separate the public share page from the downloadable credential**, so that what is publicly visible and what is machine-readable can carry different amounts of personal data.

## Migration hooks

The pilot should not wait for Swiss national infrastructure, but should not foreclose it either:

- **Swiyu / Swiss e-ID** — SWITCH plans to connect the government e-ID with SWITCH edu-ID and support educational records in Swiyu. Keep the achievement definition and participant records in a form that could be re-issued into that path.
- **EDC / Europass** — **not** automatically interoperable with OB3. A future EDC representation is a migration, not a re-render. The open question to keep answerable: *can an EDC representation be generated without re-enrolling learners?*

## What this repository already contributes

| Pilot requirement | Demonstrated here |
| --- | --- |
| OB3 mapping of a real training record | `standards-lab.html`, `obv3/` |
| Cryptographic proof and tamper detection | `verify.html` |
| DCC-compatible `did:key` + `DataIntegrityProof` | `dcc-lab.html`, `npm run dcc:roundtrip` |
| External-verifier handoff | VerifierPlus handoff documented in `docs/bite-3-1.md` |
| Organiser issuance workflow | `issuer.html` |
| Premium participant experience and PDF rendering | `index.html` |
| Partnership and product framing | `pilot.html`, `docs/product-case.md` |

These are reusable as the **test harness** for the 31–60 day interoperability phase in [`90-day-plan.md`](90-day-plan.md) — generate test credentials from the prototype, then validate them against independent verifiers. The research recommends using a prototype/reference stack **for testing, not first production**.

## Related

- [`governance-model.md`](governance-model.md) — the identity and key decisions upstream of this
- [`../research/vendors-and-platforms.md`](../research/vendors-and-platforms.md) — build vs buy
- [`../architecture.md`](../architecture.md) — the prototype's own technical shape
