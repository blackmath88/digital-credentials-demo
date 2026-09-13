# Should University of Basel pilot digital learning credentials?

*A 4-minute read. Proposal only — no organisation named here has agreed to anything.*

## Recommendation

**Yes — a bounded pilot now.**

One professional-learning cohort. University of Basel as the single formal issuer. Implement Consulting Group as delivery and co-design partner. Open Badges 3.0 over W3C Verifiable Credentials 2.0, alongside the human-readable certificate Basel already issues.

This is a controlled infrastructure and learner-experience pilot — **not** an institution-wide credential transformation.

## Why now

- **The standard is mature enough to test.** W3C Verifiable Credentials 2.0 became a W3C Recommendation in May 2025, and Open Badges 3.0 defines signed learning credentials on that model. Production implementations exist — Open Badge Factory has run OB3 in production since September 2025; Credly and Accredible support OB3 ingestion and export.
- **Swiss activity is real but fragmented.** ETH Zürich runs Open Badges — on the *previous* version. ZHAW institutionalised a PDF-plus-badge model in September 2025, though its badge version is not public. BFH demonstrated a continuing-education credential in the Swiyu wallet. swissuniversities has a common position that is **explicitly not final**. There is no mature national portable-learning-record network to join, and no settled architecture to be late for.
- **Basel has a strong baseline to pilot against.** Academic records are downloadable and authenticated via `verify.unibas.ch`. That is credible and familiar — it is simply not machine-portable. It also makes a clean control arm.
- **A pilot creates learning without committing to architecture.** The decisions this forces — issuer identity, key custody, revocation, privacy — have to be made eventually. Making them once, for 30 learners, is cheaper than making them for the institution.

## Why this use case

Professional learning is **lower-risk than degrees or formal academic credit**. A non-credit continuing-education credential can be piloted, measured and withdrawn without touching academic regulation, admissions or qualification frameworks.

Oxford's closest public analogue is exactly this: an Accredible pilot for **internal professional learning**, assessed by the research as highly comparable to what is proposed here.

## Why Implement

Because it tests the question Basel actually needs answered: **university–external-provider credential governance.**

An internal-only pilot would prove the plumbing and dodge the interesting part. With an external partner, the pilot must answer who defines the achievement, who signs it, whose name appears where, and what an endorsement means — which is precisely the capability a credential ecosystem would depend on.

## Recommended operating model

```
University of Basel   =  single formal issuer  (holds the signing key)
Implement             =  delivery partner + co-designer, named in the credential
                         + optional, separately signed endorsement
```

**"Shared" does not mean two cryptographic issuers.** Open Badges 3.0 models one formal issuer; multiple proofs do not create multiple issuing authorities. The standards-native pattern is one issuer, the partner named in achievement metadata, and — if the partner operates its own signing identity — a separate `EndorsementCredential`.

If Implement cannot operate a signing identity yet, start with signed Basel issuance plus clearly governed co-branding. That is a legitimate starting point, not a compromise.

## What learners get

- A premium public credential page
- A certificate / accessible PDF — retained, not replaced
- A downloadable, signed credential file
- Independent verification, without trusting Basel's website
- One-click LinkedIn addition
- Wallet export

## What we are not claiming

- ECTS, degree credit or formal qualification status
- Broad employer recognition
- Universal interoperability — Open Badges 3.0 and European Digital Credentials are **not** automatically interoperable
- Adoption of national infrastructure that does not yet exist
- That Basel, Implement, MIT or the Digital Credentials Consortium have agreed to or endorsed anything

**Verified is not recognised.** Verification proves authorship, integrity, conformance and current status. It does not prove the educational claim is substantively true, and it does not produce employer acceptance — that stays a policy and reputation decision. Every learner-facing surface must say this.

## What the evidence actually supports

| Benefit | Evidence strength |
| --- | --- |
| Easier LinkedIn / CV visibility | **Evidenced** — ETH, ZHAW, Oxford and AWS all support it |
| Faster authenticity checks | **Evidenced** — signatures and public verification are operational |
| Richer structured evidence of learning | **Evidenced technically** — OB3 carries criteria, evidence, alignments, skills |
| Reduced certificate administration | **Plausible — must be measured.** Automation exists; Basel-specific savings do not yet |
| Portable lifelong record | **Plausible / emerging** — wallets exist, cross-ecosystem consumption is fragmented |
| Basel / Implement brand exposure | **Evidenced but secondary** |
| Employer hiring automation | **Weak / speculative** — no evidence Swiss employers ingest OB3 into HR systems |
| Formal academic recognition | **Weak unless governed separately** — a file format does not create credit |

The bottom four rows are the reason this is a pilot and not a programme.

## What must be decided

Before any live issuance — none of these is an engineering task:

1. **Issuer authority** — who may issue in the university's name?
2. **Key ownership** — can Basel legally and operationally control the signing identity and keys?
3. **Participant data** — controller/processor roles, FADP assessment, retention, hosting jurisdiction
4. **Revocation and correction** — who may act, and what appeal process applies?
5. **Hosting** — where do credentials, public pages and analytics live, durably?
6. **Support ownership** — who answers a learner whose name is wrong?
7. **Academic framing** — non-credit professional learning, or formal microcredential? This changes everything downstream.

## Go / no-go after the pilot

Continue only if **all five** hold:

1. Technical interoperability works — including outside our own platform
2. Learners understand the credential, especially verified vs recognised
3. Participant value is visible — sharing exceeds PDF-only behaviour
4. Operational effort is reasonable
5. Governance is accepted by the people who must own it

A clear "not yet, and here is exactly why" is a successful pilot outcome.

## What exists already

This repository is a working reference implementation: participant experience, Open Badges 3.0 mapping, real cryptographic proof with a tamper test, a DCC-compatible `did:key` path handed to an independent verifier, and a five-step organiser issuance workflow.

What it does **not** have is institutional issuer authority, key custody, status/revocation, durable hosting, identity governance or live delivery — which is the honest reason the next step is a decision rather than more code.

**Start here:** [`pilot.html`](../../pilot.html) · full charter in [`pilot-charter.md`](pilot-charter.md) · 90 days in [`90-day-plan.md`](90-day-plan.md)
