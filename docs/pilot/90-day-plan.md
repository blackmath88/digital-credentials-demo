# 90-day plan

Three 30-day phases, from the research's recommended next 90 days.

The plan assumes the pilot has been approved in principle. Day 1 is the day an academic owner is nominated, not the day a decision is requested.

## Days 1–30 — governance and test definition

No code. This phase exists because the research's own conclusion is that the binding constraints are organisational.

**Nominate**

- Academic owner
- Credential registrar
- Privacy / security owner
- Implement counterpart

**Approve the achievement**

- Title, learning outcomes, assessment, workload, evidence policy
- **Explicit non-credit status** — this is question 7 from [`risks-and-open-questions.md`](risks-and-open-questions.md), and it gates everything learner-facing

**Decide the operating model**

- Choose **Model C** — Basel as single issuer, jointly defined and co-branded achievement, Implement as delivery partner with optional endorsement
- Draft the issuer and endorser wording that will appear in the credential and on the page

**Define the procurement test**

A vendor cannot be shortlisted without demonstrating:

- OB3 export
- Independent verification
- Status / revocation
- Key-control documentation
- GDPR / FADP terms
- **Exit portability** — export with original signatures after termination

**Exit criterion:** roles named, achievement approved with non-credit status, Model C wording drafted, procurement test written.

## Days 31–60 — interoperability build

This is where the existing prototype earns its keep — as a **test harness**, not as production infrastructure.

**Compare routes**

- Accredible
- Open Badge Factory
- One lightweight / open-source route

**Generate and validate**

- Generate test credentials **from the prototype** in this repository
- Validate against the **1EdTech verifier**, **VerifierPlus**, and **two wallet / export pathways**

**Test the failure cases** — the tests that matter more than the happy path:

| Test | Expected |
| --- | --- |
| Key rotation | Previously issued credentials still verify |
| Revoked credential | Status reflects revocation |
| Altered credential | Verification fails |
| Expired credential | Behaves as specified |
| Participant-name correction | Completes without breaking verification |

**Exit criterion:** one route selected with evidence; all five failure cases pass; question 2 answered.

## Days 61–90 — live cohort preparation

**Enrol** one Change Management cohort (20–40 learners — directional, not an evidence-derived threshold).

**Issue both** Basel's current-style certificate **and** the OB3 credential, so the comparison is real rather than asserted.

**Instrument** claim, sharing, export, verification and support metrics — see [`success-metrics.md`](success-metrics.md).

**Interview** learners and employers for comprehension, specifically on **verified vs recognised**.

**Produce the go/no-go dossier** covering:

- Interoperability
- Governance
- Privacy
- Administration
- Learner value
- Migration path to Swiss / European infrastructure

**Exit criterion:** dossier delivered, go/no-go decision taken against the five criteria in [`success-metrics.md`](success-metrics.md#go--no-go).

## What is not in the 90 days

- KMS/HSM build — a procurement and IT decision, not a sprint
- Institution-wide rollout
- EDC or Swiyu integration — migration hooks only
- Any further prototype feature work in this repository

## Dependencies and honest risks to the schedule

| Dependency | Risk |
| --- | --- |
| Legal / FADP review | Can exceed 30 days on its own; start in week 1 |
| Procurement | Institutional procurement cycles routinely exceed 30 days |
| Implement's endorsement decision | If Implement cannot operate a signing identity, fall back to governed co-branding — do not let this block the pilot |
| Cohort timing | The plan is gated by when a Change Management cohort actually runs |

The 90 days are a sequence, not a promise about the calendar. The realistic read: days 1–30 and 31–60 can overlap; days 61–90 cannot start until a cohort exists.

## Related

- [`pilot-charter.md`](pilot-charter.md) — what is being piloted
- [`decision-brief.md`](decision-brief.md) — the decision that precedes day 1
