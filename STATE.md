# STATE.md — Project State

## Product

AgentPay Guard — preflight policy and audit layer for AI-agent payments.

## Current phase

`FINAL_PACKAGE_READY_GITHUB_PENDING`

## Done

- Product definition selected.
- MVP requirements drafted.
- Codex instructions prepared.
- Demo scenarios defined.
- Default policy config drafted.
- Audit log schema defined.
- Grant/post draft skeleton prepared.
- TypeScript / Next.js local app scaffold added.
- Deterministic policy engine implemented.
- JSONL audit log append/read with idempotency implemented.
- API routes implemented.
- Single-page demo UI implemented.
- Tests added for policy decisions, invalid amount, unsupported currency, idempotency, and JSONL validity.
- MVP vertical slice independently verified.
- Proof-pack README prepared.
- Grant draft prepared.
- Two-minute demo script prepared.
- Proof-pack checklist added.
- Screenshot capture instructions added.
- Launch post prepared.
- Repository hygiene verified.
- Required screenshots captured.

## Not done

- GitHub repo publication.

## Current product boundary

The MVP evaluates payment intent before payment execution.

It must not move real funds.

## Target demo

A local web demo where the user can run:

1. API nanopayment → `ALLOW`.
2. Machine-to-machine telemetry payment → `REVIEW`.
3. Risky autonomous payment → `BLOCK`.

Each result must create an audit log record.

## Deadline target

Builder proof should be ready by 2026-05-31.

## Risks

| Risk | Mitigation |
|---|---|
| Scope creep into live payments | Keep live Circle/x402 integration as roadmap unless explicitly requested. |
| Fake compliance claims | Use "policy/audit layer", not AML/KYC/fraud guarantee. |
| Weak demo | Ensure 3 scenarios are visible and audit log is generated. |
| Missing visual proof | Capture actual screenshots before publishing; do not use placeholders. |
| Codex context drift | Keep `AGENTS.md`, `STATE.md`, `SESSION_NOTES.md` updated. |
