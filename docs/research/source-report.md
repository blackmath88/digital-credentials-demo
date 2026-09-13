# Source report

## The document

| | |
| --- | --- |
| **Title** | Standards-Based Digital Learning Credentials: Strategic Report for University of Basel |
| **Commissioned for** | This project, as research input for the pilot decision |
| **Length** | 13 sections / 13 pages |
| **Archived in repo** | [`source/digital-credentials-switzerland-europe-2026.pdf`](source/digital-credentials-switzerland-europe-2026.pdf) |
| **Status in this project** | The authoritative research input. Documentation in this folder does not add findings beyond it. |

## Scope

The report covers:

1. Executive summary and one-page recommendation
2. Standards and terminology — PDF, URL/QR, proprietary badge, OB2, OB3, W3C VC 2.0, microcredential, EDC/EDCI, Europass, wallet, blockchain
3. Switzerland landscape
4. Europe / EU landscape
5. European higher-education examples
6. Professional training and consulting
7. Vendor and open-source landscape
8. Adoption barriers
9. University of Basel strategic options
10. Basel + Implement pilot recommendation
11. Business case with evidence-strength grading
12. Risks and unresolved questions
13. Recommended next 90 days

## Method and stated limitations

The report is explicit about the strength of its own evidence, and that discipline should be preserved downstream:

- It distinguishes **verified state** from **assessment** throughout, and marks entries **"unverified"** where public evidence was insufficient.
- It grades business-case benefits as **evidenced / plausible / secondary / weak-speculative** rather than asserting them uniformly.
- It marks the swissuniversities microcredential position as **explicitly non-final**.
- It notes that ZHAW's Open Badge **version is not stated publicly**, and that UZH's is **not evidenced**.
- It marks the **20–40 learner** cohort size as a *directional recommendation, not an evidence-derived threshold*.
- **It could not retrieve this repository's contents** through the available GitHub retrieval path, and therefore deliberately did not assert implementation details beyond the description it was given. Its prototype assessment is of a *described* architecture.

Where the report says "no public evidence was found", that is a statement about the search, not proof of absence. The report says this explicitly about Implement Consulting Group.

## Traceability: from research to project decisions

Each research conclusion that became a project decision, and where it now lives.

| Research conclusion | Project decision | Where |
| --- | --- | --- |
| Pilot now, bounded — infrastructure and learner-experience pilot, not institution-wide transformation | Scope the pilot to one cohort, one achievement | [`../pilot/pilot-charter.md`](../pilot/pilot-charter.md) |
| OB3 does not provide an arbitrary array of co-issuers; both W3C VC and OB3 model a **single formal issuer** | No dual issuance is modelled anywhere in this project | [`../pilot/governance-model.md`](../pilot/governance-model.md) |
| Standards-native collaboration = one formal issuer + partner in achievement metadata + separately signed `EndorsementCredential` | Model C recommended; Implement endorsement optional and separate | [`../pilot/governance-model.md`](../pilot/governance-model.md) |
| Model C (Basel issuer, jointly defined achievement, Implement endorsement) is recommended over A and B | Adopted as the recommended operating model | [`../pilot/governance-model.md`](../pilot/governance-model.md) |
| Verification establishes authorship, integrity, conformance and status — **not** whether the claim is true | "Verified is not recognised" stated on every public surface | [`../pilot/decision-brief.md`](../pilot/decision-brief.md), `pilot.html` |
| Minimum credible architecture: Basel-controlled `did:web`/HTTPS identifier, KMS/HSM key, OB3/VC2 credential, status list, claim link, verification page, downloadable credential, PDF, LinkedIn, two independent export targets | Adopted as the target architecture; prototype gaps named against it | [`../pilot/technical-architecture.md`](../pilot/technical-architecture.md) |
| `credentialStatus` optional; W3C supports revocation and suspension; Bitstring Status List as example; avoid per-person "phone-home" designs | Status list is a named pilot requirement with a privacy constraint | [`../pilot/technical-architecture.md`](../pilot/technical-architecture.md) |
| 100% of credentials must pass an independent OB3 verifier | The one numeric target adopted | [`../pilot/success-metrics.md`](../pilot/success-metrics.md) |
| 20–40 learners, directional not evidence-derived | Cohort size stated **with** that caveat | [`../pilot/pilot-charter.md`](../pilot/pilot-charter.md) |
| Business-case benefits graded by evidence strength | Benefit table reproduces the grading; speculative benefits not sold as outcomes | [`../pilot/decision-brief.md`](../pilot/decision-brief.md) |
| Employer hiring automation and formal academic recognition are weak/speculative | Explicitly listed as out of scope and not claimed | [`../pilot/pilot-charter.md`](../pilot/pilot-charter.md) |
| EDC and OB3 are **not** automatically interoperable | OB3 chosen as a lane; EDC treated as a migration path, not a free extra | [`europe-landscape.md`](europe-landscape.md), [`../pilot/technical-architecture.md`](../pilot/technical-architecture.md) |
| Do not wait for Swiss national infrastructure; design migration hooks | Pilot proceeds; Swiyu/EDC listed as post-pilot migration | [`../pilot/90-day-plan.md`](../pilot/90-day-plan.md) |
| Swiss FADP assessment, data minimisation, separate public page from downloadable credential, retention rules, no public birth dates | Listed as institutional-review decisions, not engineering tasks | [`../pilot/risks-and-open-questions.md`](../pilot/risks-and-open-questions.md) |
| Learners understand LinkedIn and PDFs; wallets and JSON remain unfamiliar | Human-readable page and PDF retained as first-class, not legacy | [`../pilot/technical-architecture.md`](../pilot/technical-architecture.md) |
| Retain PDF + `verify.unibas.ch` as baseline/control | Current state kept as the comparison arm of the pilot | [`../pilot/pilot-charter.md`](../pilot/pilot-charter.md) |
| The most important gaps are key custody, issuer trust, status, durable hosting, subject identity, conformance, wallet export — not rendering | These are the named production gaps; no further prototype features added | [`../pilot/technical-architecture.md`](../pilot/technical-architecture.md) |
| Nine unresolved questions | Carried verbatim in substance as open questions | [`../pilot/risks-and-open-questions.md`](../pilot/risks-and-open-questions.md) |
| 90-day plan in three 30-day phases | Adopted as the plan structure | [`../pilot/90-day-plan.md`](../pilot/90-day-plan.md) |

## Citation practice in this folder

The source report cites its evidence with shortened domain labels (for example `unibas.ch`, `blog.zhaw.ch`, `europass.europa.eu`) rather than full URLs. This documentation reproduces those domain labels as given and **does not reconstruct full URLs**, because guessing a deep link would break traceability rather than improve it.

Full source links are in the archived PDF. Where this repository already documented a source independently — for example in `pitch.html` and `docs/product-case.md` — that existing link is used.

## If the PDF is removed

If repository policy later requires removing the archived PDF, keep this file. It records the title, scope, method, limitations and the full traceability table, so that every project decision can still be traced to the research conclusion that produced it, with the report held outside the repository.
