# Governance model

Who issues, who signs, who is named, and what that means.

> **Legal note.** Nothing in this file is a legal conclusion. Every controller/processor, contractual and liability question below is marked as a **decision requiring institutional review** by University of Basel and Implement Consulting Group.

## The constraint that decides the shape

An Open Badges 3.0 credential contains **one** issuer value and is signed using a verification method controlled by that issuer.

**OB3 does not provide an arbitrary array of co-issuers.** Both W3C VC and OB3 model a single formal issuer, and multiple proofs do not automatically create multiple issuing authorities.

So "shared credential" cannot mean "two cryptographic issuers". The standards-native collaboration pattern is:

1. **one formal issuer**;
2. **partner named** in achievement metadata and branding; and
3. a **separately signed `EndorsementCredential`**.

1EdTech explicitly supports third-party endorsements of an issuer, an achievement programme, or an individual credential.

```
        University of Basel                     Implement Consulting Group
        single formal issuer                    delivery / co-design partner
                 │                                          │
                 │ signs the OpenBadgeCredential            │ named in achievement
                 │ with a Basel-controlled key              │ metadata and branding
                 ▼                                          │
        ┌─────────────────────┐                             │ optional, if Implement
        │ OpenBadgeCredential │◄────────────────────────────┘ operates its own
        └─────────────────────┘   separately signed            signing identity
                                  EndorsementCredential
```

## The three options

### Option A — Basel issues, Implement delivers

| | |
| --- | --- |
| **Signing key owner** | University of Basel |
| **Achievement owner** | University of Basel |
| **Participant data** | Basel as controller assumption; Implement's role depends on who enrols and assesses — **requires institutional review** |
| **Revocation / correction** | Basel |
| **Branding** | Basel primary; Implement named as delivery partner |
| **Trust meaning** | "Basel asserts this achievement." Implement's involvement is descriptive. |
| **Complexity** | Low. Clean. |

Assessed by the research as **clean and low complexity**.

### Option B — Implement issues, Basel recognises

| | |
| --- | --- |
| **Signing key owner** | Implement Consulting Group |
| **Achievement owner** | Implement |
| **Participant data** | Implement as controller assumption — **requires institutional review** |
| **Revocation / correction** | Implement |
| **Branding** | Implement primary; Basel as recogniser |
| **Trust meaning** | "Implement asserts this; Basel recognises it." Recognition is weaker and harder to express. |
| **Complexity** | Medium — and it moves control outside the university. |

Assessed by the research as **weakening Basel's control** and potentially implying **less formal university responsibility**. Not recommended.

### Option C — Basel issues, achievement jointly defined, Implement endorses ✅

| | |
| --- | --- |
| **Signing key owner** | University of Basel |
| **Achievement owner** | Jointly defined and co-branded; Basel holds the definition of record |
| **Participant data** | Basel as controller assumption, Implement likely processor for delivery — **requires institutional review and a processor agreement** |
| **Revocation / correction** | Basel, with a defined route for Implement to raise a correction |
| **Branding** | Co-branded achievement; Basel is the cryptographic issuer |
| **Trust meaning** | "Basel asserts this achievement, which was designed and delivered with Implement, and which Implement independently endorses." |
| **Complexity** | Low-to-medium. Higher than A only if Implement operates its own signing identity. |

**Recommended.** This is the research's recommendation and this project's adopted model.

## What the credential should say

> The programme was **delivered with Implement Consulting Group**, while the **cryptographic issuer is University of Basel**.

Two paths for Implement, depending on capability:

- **If Implement can operate its own organisational signing identity:** it issues a separate `EndorsementCredential`. This is the standards-native way to express a second organisation's backing, and it is independently verifiable.
- **If not:** begin with signed Basel issuance plus **clearly governed co-branding**. This is a perfectly legitimate starting point and does not weaken the credential.

Either way, Implement is **not** a co-issuer, and this project models no arbitrary dual issuance.

## Roles to nominate before issuance

| Role | Responsibility |
| --- | --- |
| **Academic owner** | Owns the achievement definition, outcomes, assessment and non-credit status |
| **Credential registrar** | Approves issuance, handles corrections and revocations |
| **Privacy / security owner** | Owns the FADP assessment, data minimisation and key custody policy |
| **Named key owner** | Named individual accountable for the signing key, rotation and incident response |
| **Implement counterpart** | Co-design, delivery, and the endorsement decision |

## Decisions requiring institutional review

These are flagged, not answered:

1. Who at Basel holds **issuer authority** — the right to issue in the university's name?
2. Who is the **data controller** for participant data, and what processor agreement covers Implement's delivery role?
3. What is the **appeal process** when a credential is disputed, corrected or revoked?
4. Does Basel describe the achievement as **non-credit professional learning** or as a formal microcredential? The research lists this as an open question, and the answer changes the governance required.
5. Will Implement operate an **endorsement identity**, or only provide co-branding?

## Related

- [`technical-architecture.md`](technical-architecture.md) — how the key and identity decisions become infrastructure
- [`risks-and-open-questions.md`](risks-and-open-questions.md) — the full list of unresolved questions
- [`../research/higher-ed-cases.md`](../research/higher-ed-cases.md) — what the research found about Implement
