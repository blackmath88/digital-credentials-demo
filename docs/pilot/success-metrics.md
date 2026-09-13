# Success metrics

Measures for the pilot, from the research's success-measure list.

> **On targets.** Only one numeric target appears below — 100% independent verifier success — because that is the only one the research states. Every other measure is instrumented and **compared against the PDF baseline**, not scored against an invented threshold. Setting target percentages before the first cohort would be fabrication.

## Technical

| Measure | How it is tested | Target |
| --- | --- | --- |
| Independent verifiability | Every issued credential through an independent OB3 verifier | **100% pass** |
| Tamper detection | Alter a signed field; verification must fail | Must fail, every time |
| Portability outside the issuer page | Credential verifies when the issuing platform's page is not involved | Must succeed |
| External verifier / wallet export | Tested against **at least two independent tools** — e.g. VerifierPlus and LCW / Open Badge Passport | Both succeed |
| Revocation | Revoke a credential; status reflects it | Must reflect |
| Correction | Participant-name correction and reissue | Must complete without breaking verification |
| Key rotation | Rotate the signing key; previously issued credentials still verify | Must verify |
| Expiry | Expired credential behaves as specified | Must behave as specified |

The research's test list for days 31–60 is exactly this: **key rotation, revoked credential, altered credential, expired credential, participant-name correction.**

## Learner

| Measure | Why it matters |
| --- | --- |
| **Claim rate** | Did learners act on the email claim link at all? |
| **Download rate** | Did they take the portable file, or only the page? |
| **LinkedIn-sharing rate** | The most evidenced benefit — compare against PDF-only behaviour |
| **Wallet / export rate** | The least familiar action; low numbers here are information, not failure |
| **Understanding of "verified" vs "recognised"** | Asked directly. If learners think this is a qualification, the pilot has a communication defect regardless of its technical results. |

The comparison that matters: **does sharing exceed PDF-only behaviour?** The cohort receives both, which makes this measurable rather than assumed.

## Operational

| Measure | Why it matters |
| --- | --- |
| Issuance time per cohort | Against the current PDF process |
| Correction time per case | The manual cost nobody budgets for |
| Support requests | Volume and type — what confused people |
| Admin effort vs the PDF process | The "reduced administration" benefit is graded **plausible**, not evidenced. This is where it gets tested. |
| Identity mismatches | Target: **zero unresolved** |
| Key / status incidents | Target: **zero unresolved** |

## Strategic

| Measure | How |
| --- | --- |
| Participant-perceived value | Learner interviews |
| Employer / recruiter comprehension | Interviews — do they understand what they are looking at, and does it change anything for them? |
| Basel and Implement stakeholder acceptance | Is the governance model acceptable to the people who must own it? |
| Evidence for or against scale-up | The dossier that feeds the go/no-go |

Employer comprehension is deliberately measured as *comprehension*, not *acceptance*. The research is clear that cryptographic validity proves issuer authorship, not employer acceptance, and that trust remains a policy and reputation decision.

## Go / no-go

Continue past the pilot only if **all five** hold:

1. **Technical interoperability works** — credentials pass independent verification, including outside the issuing platform.
2. **Learners understand the credential** — in particular, the difference between verified and recognised.
3. **Participant value is visible** — sharing and retention exceed PDF-only behaviour.
4. **Operational effort is reasonable** — issuance and correction are manageable at cohort scale.
5. **Governance is accepted** — issuer authority, key custody, privacy and revocation ownership are settled and agreed.

Failing any one of these is a legitimate reason to stop. A pilot that produces a clear "not yet, and here is precisely why" is a successful pilot.

## What is deliberately not measured

- **Employer hiring automation.** No evidence that Swiss employers routinely ingest OB3/EDC into HR systems; measuring it would produce a null result that says nothing about this pilot.
- **Formal academic recognition.** Out of scope by design — a digital format does not create credit, admissions or qualification status.
- **Cross-institution recognition.** No Swiss framework exists against which to measure it.

## Related

- [`90-day-plan.md`](90-day-plan.md) — when each of these is instrumented
- [`decision-brief.md`](decision-brief.md) — the benefit table these metrics test
