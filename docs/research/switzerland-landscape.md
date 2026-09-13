# Switzerland landscape

Synthesised from the [source report](source-report.md). Status as verified by the report; sources shown as the domains it cites.

## Headline

Switzerland is moving, but unevenly. There is enough activity to justify **learning by doing**, and not enough to claim a **mature national portable-learning-record network**.

There is no single binding national credential architecture and no ecosystem owner. swissuniversities has published a common microcredential understanding, but the paper explicitly states that its position is **not final**. Switzerland therefore has emerging principles, not a settled architecture.

## Institutions

| Institution | Verified state | Standard / technology | Assessment |
| --- | --- | --- | --- |
| **ETH Zürich** | Badges for completed short continuing-education courses and microcredentials; LinkedIn sharing, unique verification URL, wallet storage | **Open Badges 2.0**, ETH-hosted; Open Badge Passport mentioned | Operational, but on the legacy standard |
| **ZHAW** | Institutionalised Sept 2025; intended coverage of individually taken 1–9 ECTS continuing-education courses by Sept 2026. Automated PDF **plus** badge, ZHAW-hosted persistent link, LinkedIn workflow `blog.zhaw.ch` | Open Badge version **not stated publicly** | Strongest Swiss institutionalisation evidence — but exact technical conformance is unclear |
| **BFH** | 2025 proof of concept: a continuing-education certificate ("Data Management & Open Government Data") in the Swiyu wallet `bfh.ch` | Verifiable Credential on Swiss trust infrastructure | Technically relevant; a pilot, not an institutional rollout |
| **University of Zurich** | OpenOlat supports course, component and global Open Badges; manual/automatic awarding, export/import, LinkedIn display `docs.olat.uzh.ch` | Open Badges; version not evidenced | Platform capability ≠ institution-wide programme |
| **University of Basel** | Academic records downloadable and authenticated through `verify.unibas.ch`. Public evidence reviewed showed **no OB3/EDC issuance** `unibas.ch` | PDF plus verification service | A strong baseline for comparison — but not portable VC infrastructure |
| **HSLU** | Deep-tech microcredentials are a pilot, non-credit, with completion certificates after assessment `hslu.ch` | No public standard evidenced | "Microcredential" naming should not be mistaken for OB3/VC |
| **EPFL / SWITCH / Educa** | Digital maturity-certificate work and Swiss wallet/identity integration described publicly as proof-of-concept infrastructure `switch.ch` | Swiss e-ID / Swiyu trajectory | Nationally important; not evidence of institutional OB3 operation |
| **Bern, St. Gallen, FHNW, SUPSI, other UAS** | Programmes, certificates and microcredential discussion found, but no evidence specific enough to classify an institutional OB3/EDC implementation | Unverified | Do not treat "digital certificate" as standards evidence |

### Reading this table honestly

Three different things appear in it and should not be conflated:

1. **Operational programmes on a standard** — ETH (OB2), ZHAW (version unstated).
2. **Proofs of concept** — BFH, EPFL/SWITCH/Educa.
3. **Platform capability or naming** — UZH's OpenOlat support, HSLU's "microcredential" label.

Only the first category is evidence that a Swiss institution runs standards-based credential issuance in production. Even there, ETH is on the **previous** version of the standard and ZHAW's version is not public.

## What this means for University of Basel

**Evidence:** Basel's current position is a PDF plus an online verification service at `verify.unibas.ch`. That is a credible, familiar baseline — it is not machine-portable, and the report found no public evidence of OB3 or EDC issuance at Basel.

**Recommendation:** Basel is not behind a Swiss field that has already standardised, because no such field exists yet. It is choosing whether to learn early. Piloting OB3 would put Basel ahead of ETH's standard version, and comparable to ZHAW in institutional intent.

**Recommendation:** retain PDF + `verify.unibas.ch` as the baseline and control during any pilot. Do not replace it.

## Swiss e-ID and the wallet trajectory

**Evidence:** The Swiss e-ID vote of 28 September 2025 created a stronger foundation for digital identity. SWITCH stated it plans to connect the government e-ID with the lifelong SWITCH edu-ID and, with Educa, support educational records in Swiyu while pursuing European compatibility `switch.ch`.

**Recommendation:** this is an important future integration path, but **a Basel pilot need not wait for it**. Do not wait for national infrastructure; design migration hooks instead. The opportunity cost of waiting is high while the cost of waiting looks low.

## Legal and privacy design requirements

The report lists these as design requirements for a Swiss pilot. They are **decisions requiring institutional review**, not conclusions this project can reach:

- Perform a Swiss **FADP / privacy assessment**.
- **Minimise embedded personal data** in the credential.
- **Separate the public share page from the downloadable credential.**
- Define **retention and deletion** rules.
- **Avoid public birth dates.**

W3C specifically warns about correlatable subject identifiers, PII in credentials, wallet data mining, and verification mechanisms that expose holder activity — including per-person "phone-home" status designs that reveal verification activity.

## Related

- [`europe-landscape.md`](europe-landscape.md) — why Swiss and EU paths are related but not interchangeable
- [`../pilot/risks-and-open-questions.md`](../pilot/risks-and-open-questions.md) — the privacy and governance questions this raises
