# Bite 4 — organiser issuance workflow

## Product goal

Bites 1–3.1 answered *what a participant receives* and *how a credential can be trusted*. Bite 4 answers the question a training organiser actually asks first:

> How much work is this for me?

The goal is that the answer is visibly small. A training organiser should be able to look at `issuer.html` for thirty seconds and conclude:

> Issuing twenty credentials is: create the training → paste the participants → look at one → issue.

This is deliberately not a dashboard, an admin console or a learning platform. It is the smallest workflow that makes the product feel real on the organiser side, while the participant surface stays the premium, ceremonial one.

## Organiser journey

```text
Step 1  Training            title, issuer, date, duration, location, description
Step 2  Credential content  competencies, criteria, signatories, branding
Step 3  Participants        paste name,email — parsed and validated in the browser
Step 4  Preview             one participant: page view + public fields + OB 3.0 record
Step 5  Issue               "Issue N credentials" → deterministic records + status table
```

Steps 1 and 2 are written once per training. Step 3 is a paste. Steps 4 and 5 are a look and a click. Everything defaults to the Change Management Training fixture used throughout the demo, so the workflow can be demonstrated without typing anything.

## Architecture

```text
issuer.html          the five-step organiser surface (markup only)
   ├── issuer.css    Swiss-editorial, document-like styling
   ├── issuer.js     step state, form binding, rendering — no domain logic
   └── issuance.js   the model: fixtures, CSV parsing, OB 3.0 mapping, issuance
                        │
                        └── asDccTemplate() → obv3/dcc-credential-template.json
                                                 → npm run dcc:roundtrip (Bite 3.1)
```

`issuance.js` is a pure ES module with no dependencies, no network calls and no storage. Everything the organiser types stays in the browser tab for the lifetime of the page.

## The issuance data model

Each issued credential is one record:

| Field | Meaning |
| --- | --- |
| `localCredentialId` | Human-readable local reference, e.g. `DEMO-CMT-2025-001` |
| `credentialUuid` | Deterministic UUID derived from training + participant email |
| `batchId` | Deterministic short id for the batch |
| `recipient` | Name and email as parsed |
| `achievement` | Name, description, criteria, competencies |
| `issuer` | Demo issuer, plus the name printed on the certificate and `institutionallySigned: false` |
| `issuedAt` | Derived from the training date, so batches are reproducible |
| `status` | `demo-issued` |
| `proofStatus` | `unsigned — no institutional signature` |
| `delivery` | `link ready` / manual handoff — no message is sent |
| `credentialUrl` | Placeholder under `credentials.example.invalid` |
| `machineReadableRecord` | The Open Badges 3.0 `OpenBadgeCredential` |

Identifiers are derived by hashing (`SHA-256` via Web Crypto, with a non-cryptographic fallback when Web Crypto is unavailable) and formatted as RFC 9562 version 8 UUIDs. Issuing the same list twice yields byte-identical records — useful for demos, and a reminder that nothing here depends on a server allocating ids.

## What is real

- The workflow itself, and the claim that it is short.
- CSV parsing: quoted fields, comma/semicolon/tab delimiters, optional header row, and per-row validation for missing names, unparseable emails and duplicates.
- The Open Badges 3.0 mapping. Each record is a well-formed `OpenBadgeCredential` in the same shape as `obv3/dcc-credential-template.json`.
- The handoff to Bite 3.1. “Copy as DCC signing input” produces a document that `tools/issue-dcc.mjs` signs unchanged; the resulting credential passes `tools/verify-dcc.mjs` with `verified: true` and a `did:key` / `eddsa-rdfc-2022` `DataIntegrityProof`. This was checked during implementation.
- Determinism of the generated ids and records.

## What is simulated

- **Issuance authority.** No institution has authorised anything. The records name a prototype demo issuer.
- **Signing.** Records produced in the browser carry no `proof`. Signing happens only if you take a record to the Bite 3.1 CLI path — and even then it is a demo key.
- **Delivery.** Delivery status is a label. No email, no notification, no queue.
- **Hosting.** `credentialUrl` points at `credentials.example.invalid`. No credential page is published per participant.
- **Persistence.** Nothing is stored. Reloading the page resets the workspace to the demo fixture.
- **Status and revocation.** There is no status list and no way to revoke.

## Trust boundary

The organiser surface must never imply institutional authority, so the wording is fixed across the UI:

- **Demo issuance** — the batch is a local demonstration.
- **Prototype issuer** — the record names `Digital Credentials Demo Issuer`, never Implement Learning Institute or University of Basel as the signer.
- **Not institutionally signed** — stated on the trust strip, in the issuance side panel, in every record (`institutionallySigned: false`) and in the status table.

The “Issuer named on the certificate” field exists because participants need to see who ran the training. It is display data. It does not, and must not, migrate into the `issuer` field of the signed credential.

## What Bite 5 would need for production

1. **Institution-controlled issuer identity** — `did:web` or an institution-managed equivalent, with a published DID document, and a decision about who at the institution owns it.
2. **Key custody** — an HSM or managed KMS, key rotation, and an answer to “who can issue in the institution's name”.
3. **Issuance governance** — who approves a batch, what is recorded, and what an audit trail looks like.
4. **Credential status** — a status list for revocation and suspension, and a policy for when each is used.
5. **Real delivery** — a per-participant credential URL, an email or wallet handoff, and a record of what was delivered and when.
6. **Persistence** — a store for trainings, achievements, participants and issued credentials. This is where the prototype stops being static-first.
7. **Identity of the recipient** — currently a name and an email string. Production needs a decision on recipient identifiers, hashing and privacy (GDPR: emails in a shareable credential are personal data).
8. **Scale check** — 5 participants prove the shape; 500 need batching, progress and error recovery.

Points 1–4 are organisational rather than technical, which is the same conclusion Bite 3.1 reached. Bite 4 does not move that boundary; it makes the surface around it usable.
