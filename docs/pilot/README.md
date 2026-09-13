# Pilot package

A decision-ready proposal for a bounded University of Basel + Implement Consulting Group credential pilot.

> **Status: proposal.** Neither University of Basel nor Implement Consulting Group has agreed to, endorsed or adopted anything described here. All governance, privacy and contractual points are marked as decisions requiring institutional review.

## Read in this order

| | Document | Time |
| --- | --- | --- |
| 1 | [`decision-brief.md`](decision-brief.md) — **start here.** The recommendation, the evidence, what must be decided | 4 min |
| 2 | [`pilot-charter.md`](pilot-charter.md) — what exactly is being piloted, and what is out of scope | 5 min |
| 3 | [`governance-model.md`](governance-model.md) — options A/B/C, why C, and why "shared" ≠ two issuers | 5 min |
| 4 | [`technical-architecture.md`](technical-architecture.md) — target architecture, and prototype-today vs pilot-needs | 5 min |
| 5 | [`success-metrics.md`](success-metrics.md) — what is measured, and the go/no-go | 4 min |
| 6 | [`risks-and-open-questions.md`](risks-and-open-questions.md) — the nine unresolved questions | 4 min |
| 7 | [`90-day-plan.md`](90-day-plan.md) — governance → interoperability → cohort | 4 min |

For a visual walkthrough to use in a conversation: [`pilot.html`](../../pilot.html).

## The proposal in one block

```
Achievement     Change Management Practitioner  ·  non-credit professional learning
Cohort          one cohort, 20–40 learners  (directional, not an evidence-derived threshold)
Formal issuer   University of Basel                — holds the signing key
Partner         Implement Consulting Group         — delivery, co-design, optional endorsement
Standard        Open Badges 3.0 over W3C VC 2.0    — alongside the existing PDF, not instead of it
Baseline        PDF + verify.unibas.ch retained as the control arm
```

## The three things this pilot must not confuse

**1. Verified is not recognised.** Verification proves authorship, integrity, conformance and current status. It does not prove the educational claim is true, and it does not create employer acceptance.

**2. "Shared" is not co-issuance.** Open Badges 3.0 models one formal issuer. Partnership is expressed through achievement metadata and a separate endorsement — not a second signature on the same credential.

**3. A pilot is not a programme.** Four of the eight benefits in the business case are plausible or speculative rather than evidenced. The pilot exists to move them, not to assume them.

## Where the evidence comes from

Every claim traces to the research in [`../research/`](../research/), which synthesises the commissioned report *Standards-Based Digital Learning Credentials: Strategic Report for University of Basel* — archived at [`../research/source/digital-credentials-switzerland-europe-2026.pdf`](../research/source/digital-credentials-switzerland-europe-2026.pdf).

The mapping from each research conclusion to each project decision is in [`../research/source-report.md`](../research/source-report.md#from-research-to-project-decisions).

## What happens after this

The repository reaches a deliberate stopping point here. The remaining blockers are institutional, not technical — see [`../research/adoption-barriers.md`](../research/adoption-barriers.md).

The separate follow-up, documented but not executed: extracting a clean, generic public reference implementation with no Basel or Implement case material. See [`../public-extraction-plan.md`](../public-extraction-plan.md).
