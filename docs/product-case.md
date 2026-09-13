# Product case

The written layer behind `index.html` (the short version) and `pitch.html` (the long-form story).

## Product thesis

> The website makes the certificate desirable.
> Open Badges makes it portable, verifiable and interoperable.

And the distinction that the whole project rests on:

> The certificate page is one view of the credential.
> It is not the credential itself.

A visitor who sees only a beautiful certificate page can reasonably ask whether this is just an HTML certificate generator. It is not, and the difference is structural:

| Layer | What it is | What it gives you |
| --- | --- | --- |
| Human-readable page | Presentation | Something a person wants to keep and share |
| `OpenBadgeCredential` | Open Badges 3.0 data | Achievement, criteria, competencies, issuer, recipient as structured data |
| Cryptographic proof | W3C Verifiable Credentials | Integrity — change one signed field and verification fails |
| Portable learning record | The combination | The participant keeps it; other systems can read and check it |

HTML decides how the achievement looks. It does not decide what it means or whether it is true.

## Participant value

- Keep proof of learning independently of any inbox, portal or vendor.
- Use it where work is visible: LinkedIn, a CV, a personal website.
- Portable beyond the issuer's own website.
- Independently verifiable by an employer, a school or a funder.
- Potentially stackable into a longer learning pathway.

The participant never has to understand JSON-LD, DIDs, cryptosuites or wallets. They see one page, one credential, and useful actions.

## Organiser value

- Define the achievement once; issue it to a whole cohort.
- Standardised metadata instead of free-text certificates that differ per cohort.
- Far less manual PDF work.
- A consistent record of what was issued, to whom and when.
- The participant experience improves without extra effort per participant.

The organiser workflow in this repo (`issuer.html`) is deliberately five steps: training → credential content → participants → preview → issue.

## Institutional value

- Reusable learning infrastructure rather than one more certificate tool.
- Internal and external learning described with one model.
- Interoperability instead of vendor lock-in.
- A path towards LMS, HR and learner-record integration.
- A way to recognise learning delivered by partners.

### Three levels

**Level 1 — better certificates.** A PDF becomes a premium digital credential. *Demonstrated in this prototype.*

**Level 2 — standards-based issuance.** The institution issues Open Badges 3.0 credentials, signed under its own identity, that anyone can verify. *Technically demonstrated; institutional identity and governance still open.*

**Level 3 — credential ecosystem.** The institution can issue, recognise and combine credentials from internal and external providers. *Proposed direction.*

## University of Basel opportunity

The opportunity is not "University of Basel gets a nicer certificate website". It is:

> University of Basel can issue, recognise and combine portable digital learning credentials using an open standard.

A credential ecosystem at that level would support:

1. credentials issued by University of Basel;
2. credentials issued by external learning partners;
3. partner-delivered learning recognised by University of Basel;
4. jointly designed or endorsed achievements;
5. over time, a learner capability record spanning several providers.

Candidate internal areas already visible in the pitch: Leadership & Development, AI capability programmes, M365 and digital-skills learning, internal academies, professional development, and future microcredentials.

These are possible operating models. University of Basel has not adopted Open Badges, and nothing in this repository should be read as saying otherwise.

## Implement pilot case

A pilot is more useful than a strategy paper, because it forces the issuer question to be answered concretely.

**Example achievement:** *Change Management Practitioner* — co-designed and delivered in partnership, issued as Open Badges 3.0, scoped to one cohort and one achievement definition.

**The participant receives:** a public credential page, an `OpenBadgeCredential`, a cryptographic proof, share / CV / QR actions, and a record they keep outside either organisation's platform.

This is an illustrative scenario. Neither organisation has agreed to it.

## Issuer, partner and endorsement models

"Shared" does not have to mean two cryptographic issuers. Two issuers signing the same achievement creates governance and revocation problems without adding much trust. The clean model is normally **one formal issuer of record plus partner, endorsement or recognition metadata** inside the credential.

| Model | Issuer of record | The other party |
| --- | --- | --- |
| A | University of Basel | Implement named as delivery partner in the credential |
| B | Implement | University of Basel recognises or endorses the achievement |
| C | Jointly defined achievement | One formal issuer; the joint design recorded in the achievement definition |

Choosing between A, B and C is an institutional question — who stands behind the claim — rather than a technical one. The technical layer supports all three.

## Why Open Badges 3.0

- It is an **open standard** from 1EdTech, not a vendor format.
- It is **education-specific**: achievement, criteria, competencies, evidence and recipient are first-class, unlike a generic document format.
- It sits on **W3C Verifiable Credentials**, so proof, issuer identity and validity are handled by a widely implemented specification rather than something invented here.
- It is what higher education is actually converging on, which matters more than any individual feature.

The alternative — a proprietary credential format, or a PDF with a QR code pointing back at our own website — makes our site the source of truth. That is precisely the thing a credential should not depend on.

## Why MIT / DCC matters

The Digital Credentials Consortium is a university-led group building open-source issuing, wallet and verification tooling for this standard, and MIT Learn is a working deployment.

To be precise about the relationship:

- **Open Badges 3.0 is the open standard.** It belongs to 1EdTech.
- **MIT does not own a separate credential standard.**
- MIT and the DCC are **reference implementations and ecosystem leaders**.

That is exactly why their examples are useful: testing our credentials against an independent implementation is a far better interoperability check than our own verifier agreeing with our own issuer. This repo uses the MIT/DCC OBv3 templates as fixtures and hands generated credentials to VerifierPlus for an external check.

## What is NOT being claimed

- **Not claimed:** that University of Basel has adopted Open Badges, or made any decision about digital credentials.
- **Not claimed:** that Implement Consulting Group or Implement Learning Institute supports, endorses or has agreed to this pilot.
- **Not claimed:** that MIT or the Digital Credentials Consortium endorse this project. Their work is cited as public reference material.
- **Not claimed:** that any credential in this repository is institutionally issued or signed. Everything signed here is signed by a prototype demo issuer.
- **Not claimed:** that the pilot models above are anything more than proposals.
- **Not claimed:** that the higher-education reference cases are endorsements. They are public, documented programmes cited as evidence that the direction is established.

The technical trust boundary is unchanged from Bite 3.1: a valid signature proves that the demo key signed those exact bytes. Institutional trust is a separate layer, and acquiring it is an organisational decision — issuer identity, key custody, issuance governance and revocation — not a remaining coding task.

## Where this is visible in the repo

| Claim | Where you can check it |
| --- | --- |
| Desirable participant artefact | `index.html` |
| Structured Open Badges 3.0 record | `standards-lab.html`, `obv3/` |
| Integrity can be checked independently | `verify.html` (includes a tamper test) |
| Another verifier can read it | `dcc-lab.html`, `npm run dcc:roundtrip`, VerifierPlus |
| Issuing a cohort is small work | `issuer.html` |
| The full story | `pitch.html` |
