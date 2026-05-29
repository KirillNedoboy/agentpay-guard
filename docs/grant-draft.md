# Grant Draft - AgentPay Guard

## One-Liner

AgentPay Guard is a preflight policy and audit layer for AI-agent payment intents before x402 / Circle Gateway / Arc payment flows.

## Problem

AI agents and machine clients can pay for APIs, data, compute, telemetry, and services using stablecoin payment rails.

Before an autonomous payment executes, builders need a deterministic answer to basic control questions:

- Is this agent allowed to pay?
- Is the recipient trusted?
- Is the amount within policy limits?
- Is the scenario allowed?
- Does the payment require review or block?
- Is there an audit record for the decision?

Without a preflight layer, autonomous payments are difficult to explain, review, and operate safely.

## Solution

AgentPay Guard evaluates a payment intent before payment execution.

It validates required fields, applies deterministic policy rules, computes a risk score, returns `ALLOW`, `REVIEW`, or `BLOCK`, and writes a JSONL audit record.

The MVP includes a local web demo with three scenarios and a recent audit log view.

## Why Arc / Circle

Arc, Circle Gateway, USDC, and x402-style paid APIs are relevant because they enable agentic and machine-to-machine payment flows.

AgentPay Guard does not compete with those rails and does not execute payments. It sits before them as a developer policy and audit layer.

## What Is Already Built

- Next.js / TypeScript local app.
- `POST /api/payment-intents/evaluate`.
- `GET /api/audit-log`.
- Deterministic policy engine.
- Decimal-string money handling.
- JSONL audit log at `data/audit-log.jsonl`.
- Idempotency by `idempotencyKey`.
- Demo UI with `ALLOW`, `REVIEW`, and `BLOCK` scenarios.
- Test suite covering policy rules, money edge cases, idempotency, JSONL validity, and invalid input safe failure.

Verified scenarios:

| Scenario | File | Expected |
|---|---|---|
| API nanopayment | `examples/scenario-allow-api.json` | `ALLOW` |
| Machine-to-machine payment | `examples/scenario-review-machine.json` | `REVIEW` |
| Risky autonomous spend | `examples/scenario-block-risky.json` | `BLOCK` |

## What Grant Support Would Enable

1. Real x402 / Circle Gateway buyer-side adapter.
2. Policy dashboard for agent spending controls.
3. Review queue for `REVIEW` decisions.
4. Webhook examples for agent frameworks.
5. Exportable audit reports.
6. Optional audit hash anchoring.
7. Additional examples for agentic commerce and machine-to-machine nanopayments.

## Milestones

### Milestone 1 - Local Proof

- Deterministic payment-intent evaluation.
- JSONL audit trail.
- Demo UI with three scenarios.
- Test, lint, typecheck, and build verification.

Status: complete.

### Milestone 2 - Proof Pack

- Reviewer-ready README.
- Grant draft.
- Two-minute demo script.
- Screenshot checklist and captured screenshots.
- GitHub repository publication.

Status: complete. Repository is public, screenshots are captured, and submission copy is prepared in `docs/submission-pack.md`.

### Milestone 3 - Rail Adapter Prototype

- Add a non-custodial adapter that calls a real payment flow only after `ALLOW`.
- Keep signing and private-key handling outside AgentPay Guard unless explicitly scoped later.
- Verify against official Arc / Circle / x402 sources before implementation.

Status: future work.

## Explicit Limitations

This MVP is not:

- a payment rail;
- a wallet;
- a custody product;
- AML/KYC software;
- a fraud prevention guarantee;
- an official Arc/Circle module;
- a real-money payment executor.

It does not include live Circle API calls, wallet signing, private keys, auth, database, smart contracts, or external services.

AgentPay Guard is a builder proof for the policy and audit layer before autonomous payment execution.
