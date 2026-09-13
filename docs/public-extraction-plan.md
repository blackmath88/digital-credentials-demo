# Public extraction plan

The next move **after** the pilot package — documented here, deliberately not executed in this bite.

## Why split the repository

This repository has become two things with different audiences and different risk profiles:

1. **A reusable reference implementation** — participant renderer, Open Badges 3.0 mapping, proof and verifier demos, organiser flow, design system. Useful to anyone working on learning credentials.
2. **A specific pilot dossier** — University of Basel case material, Implement partnership modelling, governance options, commissioned research, and eventually real participant data.

Keeping these in one public repository has two problems. The reference implementation is harder to reuse when wrapped in one institution's pilot; and the pilot material accumulates things that should not be public — real participant records, hosting and deployment notes, institutional decisions in progress.

## The two repositories

| | This repository | New public repository |
| --- | --- | --- |
| **Name** | `blackmath88/digital-credentials-demo` | `blackmath88/digital-credentials` |
| **Role** | Concrete pilot / reference lineage | Generic, reusable reference implementation |
| **Institutions** | University of Basel, Implement Consulting Group | Fictional throughout |
| **Learner** | Real pilot participants (eventually) | Fictional |
| **Achievement** | Change Management Practitioner | Generic |
| **Hosting** | As the pilot requires | GitHub Pages |

## What moves to the public repository

Technical and product substance, with all institutional specifics replaced:

- **Participant renderer** — `index.html`, `app.js`, `styles.css`
- **Organiser flow** — `issuer.html`, `issuer.js`, `issuer.css`, `issuance.js`
- **Open Badges 3.0 mapping** — `standards-lab.html`, `obv3/` templates
- **Proof and verifier demos** — `verify.html`, `verify.js`, `dcc-lab.html`, `tools/`
- **Design system** — the Swiss-editorial visual language and its CSS
- **Generic product story** — the "more than a certificate page" argument, the standards explanation, the three levels, without the Basel framing
- **Generic documentation** — `docs/architecture.md`, `docs/standards.md`, the bite write-ups, and a generic version of `docs/product-case.md`

### Substitutions required before publishing

| Replace | With |
| --- | --- |
| University of Basel | A fictional institution |
| Implement Learning Institute / Implement Consulting Group | A fictional training provider |
| Achim Imboden and any real participant names | A fictional learner |
| Change Management Training / Practitioner | A generic achievement |
| `achim@example.org` and the demo participant list | Fictional names on `example.org` |
| `DC-2025-001` and real-looking identifiers | Generic identifiers |

The existing demo data already uses `example.org` and `example.invalid`, which is a good starting point — but the **names and the institutions are real** and must be replaced.

## What stays in this repository

- The **University of Basel** case — strategic options, opportunity framing, `docs/pitch-unibas.md`
- The **Implement** case — partnership modelling, `docs/pitch-implement.md`
- The whole of **`docs/pilot/`** — charter, governance options, decision brief, 90-day plan
- The whole of **`docs/research/`** — including the commissioned report
- **Governance decisions** as they are made
- **Real participant data** — none exists yet, and none should ever reach the public repository
- **Institutional hosting and deployment notes**
- **Private credentials, keys and secrets** — already gitignored under `.keys/`; this constraint must survive the split

## Order of operations

1. Finish the pilot decision. Do not split a repository that may still change shape.
2. Create `blackmath88/digital-credentials` empty and public.
3. Copy the technical surfaces, applying every substitution in the table above.
4. **Audit before the first push** — grep the new repository for `Basel`, `Unibas`, `Implement`, `Imboden`, and every real participant name. Check `git log` and file history too: a substitution that only fixes the working tree still leaks through history if files were copied with their history.
5. Rewrite the README for a generic audience: what this is, how to run it, what it demonstrates, what it deliberately does not do.
6. Enable GitHub Pages.
7. Link the two repositories in one direction only — the public one need not know the pilot exists.

## Rules for the public repository

- **No personal data**, including in demo fixtures, commit messages or issue history.
- **No real institution names**, including in screenshots and social-preview images.
- **No private keys**, and no signing material beyond throwaway demo keys generated at run time.
- **No pilot notes** — governance, procurement, or institutional decision material.
- The **trust boundary language stays**. A generic reference implementation still needs to say that its demo issuer is not an institution, and that verified is not recognised.

## What this is not

This plan does not create the public repository, copy any files, or publish anything. It records the intended move so that the decision — and the substitution and audit steps that make it safe — are not reconstructed from memory later.
