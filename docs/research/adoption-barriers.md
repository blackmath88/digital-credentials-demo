# Adoption barriers

Synthesised from the [source report](source-report.md).

The report groups the barriers into five categories. The pattern worth noticing: **only the first is a coding problem.**

## Technical

- Incompatible proof suites
- The W3C VC **1.1 / 2.0 transition**
- Wallet fragmentation
- Key rotation
- Status availability
- Durable JSON-LD contexts
- Identity binding

These are solvable, and this repository has already touched several of them (proof suites, DCC-compatible `did:key`, an independent verifier). Status availability and durable contexts are not yet addressed here.

## Organisational

Who may:

- define an achievement
- approve issuance
- operate keys
- correct errors
- revoke credentials

None of these have technical answers. They are institutional role assignments, and the pilot cannot start without them. See [`../pilot/governance-model.md`](../pilot/governance-model.md).

## Legal and policy

- Lawful participant-data processing
- Processor agreements
- Public disclosure
- Retention
- Accessibility
- **Misleading recognition / credit claims**

The last one is a project-design risk as much as a legal one: describing a non-credit professional-learning credential in language that implies academic credit is the most likely way this pilot could cause harm.

## User experience

**Evidence:** learners understand LinkedIn links and PDFs. **Wallets and raw JSON remain unfamiliar.**

The report notes that VerifierPlus itself explains why human-readable public pages remain necessary even when the credential is independently portable.

Direct consequence for this project: the premium participant page and the PDF are not decoration around the "real" credential. They are the part learners actually use. Keep both.

## Market recognition

**Evidence:** cryptographic validity proves **issuer authorship**, not **employer acceptance**. Trust remains a policy and reputation decision.

This is the ceiling on what any pilot can prove. A technically perfect credential that no employer reads is still technically perfect — and the pilot should measure comprehension rather than assume it. See [`../pilot/success-metrics.md`](../pilot/success-metrics.md).

## The shape of the problem

| Barrier | Can this project fix it? |
| --- | --- |
| Technical | Partly — and partly already demonstrated |
| Organisational | No — institutional decision |
| Legal / policy | No — institutional review required |
| UX | Yes — and largely already addressed |
| Market recognition | No — measurable, not controllable |

Three of the five are outside engineering. That is the argument for this repository having a **stopping point**: further prototype work does not move the barriers that actually gate a live pilot.

## Related

- [`../pilot/risks-and-open-questions.md`](../pilot/risks-and-open-questions.md) — the nine unresolved questions the report lists
- [`../pilot/decision-brief.md`](../pilot/decision-brief.md) — what must be decided before issuance
