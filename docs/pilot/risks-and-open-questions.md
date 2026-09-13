# Risks and open questions

## The nine unresolved questions

From the research, in substance as listed. None of these has an engineering answer; all are decisions or investigations.

| # | Question | Owner |
| --- | --- | --- |
| 1 | Can Basel **legally and operationally control the signing identity and keys**? | Legal + IT/identity |
| 2 | Which **proof / status combination** passes the 1EdTech verifier, DCC tooling and the selected vendor's verifier? | Technical — testable in days 31–60 |
| 3 | Will Implement **operate an endorsement identity**, or only provide co-branding? | Implement |
| 4 | Can credentials be **exported with original signatures after contract termination**? | Procurement — contractual |
| 5 | Where are **participant data, analytics and public pages hosted**? | Legal + IT |
| 6 | Who may **revoke or correct** a credential, and what appeal process applies? | Credential registrar + academic owner |
| 7 | Will Basel describe the achievement as **non-credit professional learning** or as a **formal microcredential**? | Academic owner |
| 8 | Can a future **Swiss wallet or EDC representation** be generated **without re-enrolling learners**? | Technical + architecture |
| 9 | How will **accessibility, multilingual content and name changes** be handled? | Academic owner + operations |

Question 2 is the only one the pilot itself resolves. The other eight must be answered before or alongside it.

## Risks

### Overclaiming recognition

**The highest-consequence risk.** Describing a non-credit professional-learning credential in language that implies academic credit is the most likely way this pilot causes real harm — to learners who act on it and to the institution's credibility.

*Mitigation:* explicit non-credit status in the achievement definition; "verified is not recognised" stated on every learner-facing surface; question 7 answered before issuance.

### Vendor lock-in through export fidelity

A credential that cannot leave the platform with its original signature is not portable, whatever the marketing says.

*Mitigation:* question 4 answered contractually before selection, not after.

### Key custody as an afterthought

If the signing key is effectively controlled by a vendor, the credential is issued by the vendor in Basel's name.

*Mitigation:* question 1 answered first; named key owner, rotation and incident procedure in place before the first live issuance.

### Privacy through over-disclosure

Credentials carrying more personal data than necessary, published on a permanently public page.

*Mitigation:* Swiss FADP assessment; data minimisation; **separate the public share page from the downloadable credential**; defined retention and deletion; no public birth dates. W3C additionally warns about correlatable subject identifiers, PII in credentials, wallet data mining, and status designs that expose holder verification activity.

### Wallet and standards fragmentation

Wallet support is genuinely fragmented, and the ecosystem is mid-transition between W3C VC 1.1 and 2.0.

*Mitigation:* test against **two** independent tools rather than one; treat a single wallet's failure as information about that wallet, not about the pilot.

### The credential nobody reads

Technically perfect, socially inert. Employers may simply not look.

*Mitigation:* measure comprehension rather than assume acceptance; keep the human-readable page and PDF as first-class; treat this as a finding rather than a failure.

### Waiting-for-infrastructure paralysis

Deferring until Swiss national infrastructure settles has low apparent cost and high opportunity cost.

*Mitigation:* the research's own recommendation — **do not wait; design migration hooks.**

## Risks this project has already retired

Worth stating, because it narrows what the pilot has to prove:

- **Can we produce a standards-conformant OB3 credential?** Demonstrated.
- **Can a signature detect tampering?** Demonstrated, with a tamper test.
- **Can an independent implementation read our credential?** Demonstrated via the DCC-compatible path and VerifierPlus handoff.
- **Is batch issuance manageable?** Demonstrated in the organiser workflow.

What remains is custody, status, hosting, identity, delivery and governance — which is why the next step is a decision rather than more code.

## Related

- [`governance-model.md`](governance-model.md) — decisions requiring institutional review
- [`../research/adoption-barriers.md`](../research/adoption-barriers.md) — the barrier categories these sit in
