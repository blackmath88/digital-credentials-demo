# Architecture

## Bite 1

The prototype is intentionally static and dependency-light:

```text
index.html
   ├── styles.css
   ├── app.js
   └── credential.json
```

The browser renders the human-readable credential from the same structured source used by the details and embed experience. A CDN-loaded QR helper is the only runtime third-party dependency; if it fails, the credential page still works.

This can be served from any static host. No database, account system or signing service is required for Bite 1.

## Bite 4 — organiser surface

```text
issuer.html
   ├── issuer.css
   ├── issuer.js      step state + rendering
   └── issuance.js    fixtures, CSV parsing, Open Badges 3.0 mapping, issuance
                         │
                         └── asDccTemplate() → tools/issue-dcc.mjs (Bite 3.1 signing)
```

The organiser workflow keeps the same static-first shape: one pure domain module, one UI module, no storage and no server. `issuance.js` is the only place that knows what a credential record is.

## Later shape

```text
Issuer UI
   ↓
Credential domain model
   ↓
Open Badges 3.0 mapping
   ↓
Issuer-controlled signing + status
   ↓
Immutable credential artefact
   ├── public page
   ├── JSON-LD credential
   ├── printable PDF
   ├── QR/share
   └── verifier/wallet interoperability
```

## Principle

Do not let the public page become the authority. Verification must ultimately derive from issuer identity, cryptographic proof and credential status, not from the fact that our website displays a green mark.
