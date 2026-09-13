# Research

Synthesis of the strategic research commissioned for this project.

**Source:** *Standards-Based Digital Learning Credentials: Strategic Report for University of Basel*, archived at [`source/digital-credentials-switzerland-europe-2026.pdf`](source/digital-credentials-switzerland-europe-2026.pdf). See [`source-report.md`](source-report.md) for scope, method and limitations.

Everything in this folder is a synthesis of that report. Where a claim is the report's *evidence*, it is marked as such. Where it is the report's *recommendation*, it is marked as a recommendation. Nothing here adds findings beyond the source.

## The three-part conclusion

The report's most important framing, and the one this project should not lose. Digital credentials are currently three things at once:

| | Status |
| --- | --- |
| **Operationally** | A better, verifiable and more shareable certificate channel. |
| **Emergently** | A machine-readable exchange layer between learning providers, learners, wallets and verifiers. |
| **Not yet** | A broadly trusted, routinely consumed European employment and higher-education infrastructure. |

The strategic consequence: **pilot the infrastructure while making no inflated recognition claims.**

## Verified is not recognised

This distinction runs through the whole report and is the single thing most likely to be misunderstood by a non-technical audience.

Verification of an Open Badges 3.0 credential establishes **authorship, integrity, conformance and current status**. It does *not* establish whether the educational claim is substantively true. A verifier must still decide whether it trusts that issuer for that achievement.

Cryptographic validity proves issuer authorship. It does not produce employer acceptance. Trust remains a policy and reputation decision.

## What the report concluded

**Recommendation.** University of Basel should run a bounded pilot now — a controlled infrastructure and learner-experience pilot, not an institution-wide credential transformation. One professional-learning cohort. Implement Consulting Group as delivery and endorsement partner. **University of Basel as the single formal issuer.** Open Badges 3.0 over W3C Verifiable Credentials 2.0, alongside a human-readable certificate.

**Why now (evidence).** W3C Verifiable Credentials 2.0 became a W3C Recommendation in May 2025, and OB3 now defines signed learning credentials using that model. Operational implementations exist: Open Badge Factory's OB3 production service, Credly ingestion of OB2/OB3, Accredible OB3/VC export and ingestion, and DCC reference wallets and verifiers.

**Why bounded (evidence).** Switzerland is moving, but unevenly, and has emerging principles rather than one binding national credential architecture. Europe has EDC/Europass, but EDC and Open Badges are *not* automatically interoperable.

## Contents

| File | Covers |
| --- | --- |
| [`switzerland-landscape.md`](switzerland-landscape.md) | ETH, ZHAW, BFH, UZH, Basel, HSLU, SWITCH/Educa, swissuniversities, Swiss e-ID |
| [`europe-landscape.md`](europe-landscape.md) | EDC/Europass, ELM, electronic seals, the OB3↔EDC interoperability caveat |
| [`higher-ed-cases.md`](higher-ed-cases.md) | Oxford, ECIU/Twente, SURF edubadges, Imperial, MIT/DCC |
| [`vendors-and-platforms.md`](vendors-and-platforms.md) | Accredible, Credly, Open Badge Factory, Canvas, EDC tooling, DCC stack, Certo, CredTrail |
| [`adoption-barriers.md`](adoption-barriers.md) | Technical, organisational, legal/policy, UX and market-recognition barriers |
| [`source-report.md`](source-report.md) | The source report: scope, method, limitations, traceability |

## How this feeds the pilot

Research conclusions become project decisions in [`../pilot/`](../pilot/). The traceability table in [`source-report.md`](source-report.md#from-research-to-project-decisions) maps each finding to the decision it drives.
