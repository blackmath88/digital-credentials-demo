# ADR 0001 — Build the public artefact before the issuer platform

**Status:** accepted

## Decision

Bite 1 optimises for a participant-facing credential artefact rather than an issuer dashboard, authentication system or credential-signing backend.

## Why

The first uncertainty is desirability: is this meaningfully better than a PDF for participants and compelling enough to start a conversation with L&D and Implement?

Building infrastructure first would hide that question under platform work.

## Consequence

The first credential is labelled explicitly as a demo representation. It must not visually or textually imply cryptographic verification by the named issuer.
