# Europe landscape

Synthesised from the [source report](source-report.md).

## Headline

Europe has a real, funded credential infrastructure in **European Digital Credentials for Learning (EDC)** and **Europass**. It is *not* the same thing as Open Badges 3.0, and the two are **not automatically interoperable**.

This is the finding most likely to be stated wrongly in a pitch. Open Badges 3.0 should **not** be presented as "the European standard".

## European Digital Credentials for Learning (EDC)

**Evidence:**

- The Commission offers **free services** plus **open-source issuer, viewer and wallet components** `europass.europa.eu`.
- Credentials can cover formal education, training, volunteering and non-formal learning.
- The **electronic seal is mandatory**, and the Europass viewer checks authenticity and integrity.
- **EDC 3.0 went live in December 2025**, adding privacy terms, accessibility improvements and updated APIs; its open-source release was scheduled for 2026 `futurium.ec.europa.eu`.

**Europass** is the EU user-facing portfolio, wallet and sharing environment — it stores EDCs and supports wallet deposit, share links and PDF export. It is **not itself the credential data standard**.

**ELM** (European Learning Model) is the vocabulary; EDC is an ELM application profile.

## The interoperability caveat

**Evidence:** current Europass developer documentation still describes EDC as aligned to **W3C VC 1.1**, while newer ELM material describes a move toward **VC 2.0** `europass.europa.eu`.

Therefore: *"both are Verifiable Credentials"* does **not** mean an OB3 wallet will automatically ingest an EDC, or vice versa. ELM and OB3 use different application profiles, vocabularies, validation rules and trust mechanisms.

Practical consequence for this project: choosing OB3 is choosing a lane. It is a defensible lane — lightweight, achievement-centric, and aligned with the broader VC direction — but a future EDC representation is a **migration**, not a re-render. That migration path must be designed for, not assumed.

## OB3 vs EDC vs proprietary

| Dimension | Open Badges 3.0 | EDC / Europass | Proprietary platform credential |
| --- | --- | --- | --- |
| **Core purpose** | One learning achievement | European learning qualification / credential | Vendor-defined |
| **Data model** | OB3 + W3C VC 2.0 | ELM EDC profile; documentation spans the VC 1.1/2.0 transition | Varies |
| **Trust anchor** | Issuer identifier, key and verifier policy | Electronic seal and European trust framework | Vendor / issuer account |
| **Status** | Optional VC status mechanism | EDC viewer / infrastructure checks | Vendor-specific |
| **Learner storage** | Any compatible wallet or file | Europass wallet or compatible implementation | Vendor profile / wallet |
| **Social sharing** | Usually via rendered URL | Share links / PDF export | Usually polished |
| **Strength** | Open, achievement-centric, supplier-neutral | Rich European semantics and institutional trust | Fastest UX and administration |
| **Weakness** | Fragmented wallets and trust registries | Institution-heavy; seal and ELM complexity | Lock-in and uncertain export fidelity |

## Blockchain

**Evidence:** blockchain is **optional infrastructure, not required** by OB3 or W3C VC. The W3C model permits web, database, DID and ledger registries.

EBSI remains relevant as European trust/infrastructure experimentation, but **EDC, ELM, eIDAS seals and the forthcoming EUDI-wallet ecosystem — not blockchain — are the more decision-relevant alignment points** for Basel.

## What this means for the pilot

**Recommendation from the report:** full EDC/European alignment is **high effort** and **premature as the sole pilot route**. Monitor and test it separately.

**Recommendation:** pick OB3 for the pilot because it is lightweight enough for professional learning yet compatible with the broader VC direction — and **preserve an eventual EDC / Swiss-wallet migration path** rather than claiming one already exists.

## Related

- [`switzerland-landscape.md`](switzerland-landscape.md) — the Swiss e-ID / Swiyu trajectory and its relation to European compatibility
- [`../pilot/technical-architecture.md`](../pilot/technical-architecture.md) — where the migration hooks belong
