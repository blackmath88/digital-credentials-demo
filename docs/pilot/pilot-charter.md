# Pilot charter

A proposed pilot. Neither University of Basel nor Implement Consulting Group has agreed to it.

## Purpose

Prove **portable verification and governance** for one professional-learning credential — not announce a credential ecosystem.

The pilot exists to answer questions that cannot be answered by more prototyping: can the institution control an issuer identity and keys, does a credential survive outside our own platform, do learners understand what they have been given, and is the administrative effort reasonable?

## The achievement

| | |
| --- | --- |
| **Name** | Change Management Practitioner |
| **Context** | Professional learning / continuing education |
| **Academic status** | **Non-credit.** Not ECTS, not degree credit, not a formal qualification. |
| **Delivery** | Co-designed and delivered in partnership |
| **Formal issuer** | University of Basel |
| **Partner** | Implement Consulting Group — delivery partner, co-designer, visibly named |
| **Standard** | Open Badges 3.0 over W3C Verifiable Credentials 2.0 |

The achievement definition must specify: title, learning outcomes, assessment, workload, evidence policy, issue date, and **explicit non-credit status**.

## Cohort

**One cohort of 20–40 learners.**

The 20–40 range is a **directional pilot recommendation from the research, not an evidence-derived threshold.** It is large enough to produce meaningful claim- and sharing-rate signal and small enough that manual correction of an individual record remains feasible.

## Why this use case

Professional learning is **lower-risk than degrees or formal academic credit**. A non-credit continuing-education credential can be piloted, measured and — if necessary — withdrawn without touching academic regulation, admissions or qualification frameworks.

The closest public analogue is Oxford's Accredible pilot for internal professional learning (*Confident Manager*, *Project Management Essentials*), which the research assessed as **highly comparable to this proposed use case**. See [`../research/higher-ed-cases.md`](../research/higher-ed-cases.md).

## Why Implement

The pilot is more useful *with* an external partner than without one, because it tests the thing Basel would actually need to know: **university–external-provider credential governance**.

Issuing an internal-only credential would prove the plumbing but avoid the interesting question. With Implement, the pilot has to answer who defines the achievement, who signs it, whose name appears where, and what an endorsement means.

The research found **no public standards-level badge or VC programme for Implement** — while noting that absence of evidence is not proof that no internal capability exists. That makes this a clean starting point rather than a migration.

## What learners receive

- A premium public credential page
- A human-readable certificate / accessible PDF rendering
- A downloadable, signed `OpenBadgeCredential`
- Independent verification — checkable without trusting Basel's website
- One-click LinkedIn addition
- Wallet export, tested against at least two independent tools

## What runs alongside it

**The current Basel model is retained as the baseline and control.** PDF plus `verify.unibas.ch` is not replaced during the pilot; the cohort receives both, so the two can be compared on learner behaviour and administrative effort rather than on assertion.

## Explicitly out of scope

The research lists these as first-pilot exclusions. They are excluded here:

| Excluded | Why |
| --- | --- |
| **ECTS / degree credit / qualification status** | A digital format does not create academic credit. Governed separately, if ever. |
| **Automatic HR decisions** | No evidence that Swiss employers routinely ingest OB3/EDC into HR systems. |
| **Blockchain** | Optional infrastructure, not required by OB3 or W3C VC. Not decision-relevant here. |
| **Selective disclosure** | Adds cryptographic and UX complexity the first pilot cannot absorb. |
| **Swiss e-ID dependency** | The Swiyu trajectory matters, but the pilot must not block on it. |
| **Multi-university recognition claims** | No Swiss framework exists to make such a claim true. |
| **Institution-wide rollout** | This is a bounded pilot. Scale-up is a separate decision. |
| **Dual cryptographic issuance** | Not supported by the standard, and not needed. See [`governance-model.md`](governance-model.md). |

## What is not claimed

- That the credential carries academic credit or qualification status.
- That employers will recognise it. **Verified is not recognised** — see [`decision-brief.md`](decision-brief.md).
- That it is interoperable with EDC/Europass. It is not automatically so.
- That Switzerland has a portable-learning-record ecosystem to plug into. It does not yet.
- That University of Basel, Implement, MIT or the DCC have agreed to, endorsed or adopted anything here.

## Preconditions

The pilot cannot start until the decisions in [`decision-brief.md`](decision-brief.md#what-must-be-decided) are made — issuer authority, key ownership, participant-data governance, revocation responsibility, hosting and support ownership. These are institutional decisions, not engineering tasks.

## Go / no-go

Continue past the pilot only if the criteria in [`success-metrics.md`](success-metrics.md#go--no-go) are met: credentials pass independent verification, learners understand them, sharing exceeds PDF-only behaviour, administration is manageable, and governance is accepted.
