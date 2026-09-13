# Vendors and platforms

Synthesised from the [source report](source-report.md). The report assessed options; it did not run a procurement.

## Options assessed

| Option | Evidence and fit | Principal concern |
| --- | --- | --- |
| **Accredible** | OB3 and W3C VC export/ingestion, wallet, preserved signatures, white-label experience; **Oxford uses it** for a professional-learning pilot `accredible.com` `ox.ac.uk` | Confirm issuer-key control, EU/Swiss hosting and full export **contractually** |
| **Credly / Pearson** | Strong professional network, OB2/OB3 ingestion, workforce API; used by AWS, Microsoft, Deloitte, PwC `learn.credly.com` | Network-centric model may create dependence |
| **Open Badge Factory / Passport** | **OB3 in production since Sept 2025** and 1EdTech-certified; European wallet ecosystem `openbadgefactory.com` | The provider itself acknowledges unresolved wallet/policy questions |
| **Canvas Credentials / Badgr** | LMS-integrated badging and OB3 direction | Verify the actual certified profile/version during procurement |
| **Digitary / Parchment** | Strong academic-document exchange heritage | Public evidence reviewed was insufficient for exact OB3/EDC classification |
| **Sertifier / Certopus / Certifier** | Accessible certificate/badge SaaS | Treat "Open Badges support" as **unverified** until version, export and conformance are demonstrated |
| **Europass / EDC tooling** | Free hosted and open-source issuer, viewer and wallet stack `europass.europa.eu` | Electronic-seal, ELM modelling and Swiss participation complexity |
| **DCC stack** | Open-source issuing dashboard, Learner Credential Wallet and VerifierPlus; active repositories `github.com` | Reference components require integration, operations and **support ownership** |
| **Certo** | AGPL-3.0 self-hosted OB3 platform with issuance, sharing and revocation. Its own documentation identifies missing proof-suite breadth, external status-list resolution, SSO and multi-tenancy `github.com` | Suitable for lab work, **not yet Basel production infrastructure** |
| **CredTrail** | Emerging open-source OB3 platform | Very new; institutional operating evidence remains weak |

## How to read this list

Three groups:

1. **Commercially viable for a pilot now** — Accredible, Credly/Pearson, Open Badge Factory. All have OB3 in some production form. The risk with all three is contractual, not technical: key control, hosting jurisdiction and export fidelity.
2. **Institutional / European route** — Europass/EDC tooling. Free and open, but carries seal and ELM complexity and unresolved Swiss participation questions.
3. **Reference and lab components** — DCC stack, Certo, CredTrail. Valuable for testing and for understanding the standard. Not production infrastructure for a university without someone owning operations.

The report's strategic-options table places the self-hosted route at **medium–high** effort with **maximum control and learning**, and recommends using a prototype/reference stack **for testing, not first production**.

## The recurring contractual question

Across the commercial options, the same four things must be nailed down in writing rather than assumed:

- **Issuer-key control** — does the institution control the signing identity, or does the vendor?
- **Hosting jurisdiction** — where do participant data, analytics and public pages live?
- **Export fidelity** — can credentials be exported **with original signatures** after contract termination?
- **Conformance** — which certified profile and version, verified rather than claimed?

The report explicitly lists "can credentials be exported with original signatures after contract termination?" as an unresolved question, and flags export fidelity as the principal weakness of proprietary platforms.

## How this project's prototype was assessed

The report assessed the architecture described to it — OB3, W3C VC, issuer identity, cryptographic proof and DCC/MIT tooling — as **directionally aligned with the current standards stack**.

Its judgement on what actually matters next:

> The most important production gaps to test are **not badge rendering** but **key custody, issuer trust, status, durable hosting, subject identity, standards conformance and wallet export**.

**Important limitation, stated by the report itself:** the author could not retrieve the public repository contents through the available GitHub retrieval path, and therefore **deliberately did not assert implementation details beyond the description provided**. The assessment is of the described architecture, not of an inspected codebase.

That limitation is why this repository's own honesty about what is real and what is simulated matters — see [`../pilot/technical-architecture.md`](../pilot/technical-architecture.md).

## Related

- [`adoption-barriers.md`](adoption-barriers.md) — why vendor choice is not the hard part
- [`../pilot/technical-architecture.md`](../pilot/technical-architecture.md) — prototype today vs real pilot needs
