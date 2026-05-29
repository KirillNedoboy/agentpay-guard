# Submission Pack - AgentPay Guard

## 1. Arc Builder Post

### Short version

I built **AgentPay Guard** — a preflight policy and audit layer for AI-agent payment intents before x402 / Circle Gateway / Arc-style payment flows.

The MVP does not move funds. It evaluates an agent's payment intent first, returns `ALLOW`, `REVIEW`, or `BLOCK`, and writes a JSONL audit record.

Why this matters for Arc builders: as USDC-native, x402, and machine-to-machine payments become easier, agents need a simple control layer before they spend.

Built proof:
- demo UI with 3 scenarios;
- `POST /api/payment-intents/evaluate`;
- `GET /api/audit-log`;
- deterministic policy engine;
- JSONL audit trail;
- tests for policy, idempotency, money edge cases, and safe failure.

Scenarios:
1. API nanopayment -> `ALLOW`
2. machine-to-machine telemetry payment -> `REVIEW`
3. risky autonomous spend -> `BLOCK`

Repo: https://github.com/KirillNedoboy/agentpay-guard

### Longer Arc House / builder-log version

I shipped a small builder proof called **AgentPay Guard**.

The idea is simple: before an AI agent or machine client pays for an API, data feed, compute job, telemetry service, or other x402-style paid resource, the payment intent should pass through a deterministic guard layer.

AgentPay Guard accepts a payment intent and checks:
- agent id;
- amount and currency;
- recipient;
- scenario;
- payment rail;
- policy limits;
- suspicious intent text;
- idempotency key.

It then returns:
- `ALLOW` — proceed;
- `REVIEW` — operator should check;
- `BLOCK` — do not proceed.

Every successful evaluation writes or reuses an audit record, so the builder can inspect what happened before any payment rail is reached.

This is not a wallet, custody system, compliance claim, or real-money payment executor. It is the policy/audit layer before payment execution.

Why I think this fits Arc / Circle:
- Arc and Circle are pushing toward USDC-native, programmable, agentic payment flows.
- x402 / Gateway-style payments make it easier for agents and machines to pay for services.
- The missing developer primitive is not only payment execution, but preflight control: should this agent be allowed to spend right now?

The MVP is intentionally narrow:
- Next.js / TypeScript app;
- deterministic policy engine;
- decimal-string money handling;
- local JSONL audit log;
- no private keys;
- no wallet signing;
- no live payment execution.

Repo: https://github.com/KirillNedoboy/agentpay-guard

## 2. Circle Grants Draft

### Project name

AgentPay Guard

### One-liner

AgentPay Guard is a preflight policy and audit layer for AI-agent payment intents before x402 / Circle Gateway / Arc payment flows.

### Problem

AI agents and machine clients can initiate stablecoin payments for APIs, data, compute, telemetry, and services faster than a human can review each spend.

Before an autonomous payment executes, builders need deterministic answers:
- Is this agent allowed to pay?
- Is the recipient trusted?
- Is the amount within limits?
- Is the scenario allowed?
- Should this be allowed, reviewed, or blocked?
- Is there an audit trail for the decision?

Without this layer, autonomous payments are harder to explain, test, and operate.

### Solution

AgentPay Guard evaluates a payment intent before payment execution.

It validates required fields, applies deterministic policy rules, computes a risk score, returns `ALLOW`, `REVIEW`, or `BLOCK`, and writes a JSONL audit record.

The MVP includes:
- local demo UI;
- `POST /api/payment-intents/evaluate`;
- `GET /api/audit-log`;
- three verified scenarios;
- deterministic policy engine;
- audit log and idempotency support;
- tests, lint, typecheck, and production build verification.

### Why Circle / Arc

Circle Gateway, USDC, x402-style paid APIs, and Arc-style agentic commerce flows make autonomous and machine-to-machine payments more practical.

AgentPay Guard complements those rails. It does not execute payments; it sits immediately before payment execution as a developer policy and audit layer.

### Current proof

Repository:
https://github.com/KirillNedoboy/agentpay-guard

Built and verified:
- `ALLOW` scenario: API nanopayment;
- `REVIEW` scenario: machine-to-machine telemetry payment;
- `BLOCK` scenario: risky autonomous spend;
- JSONL audit trail;
- idempotency by `idempotencyKey`;
- tests for policy rules, money edge cases, audit validity, and invalid API input safe failure.

Verification commands run successfully:

```bash
pnpm test
pnpm lint
pnpm typecheck
pnpm build
```

### What grant support would enable

1. Real x402 / Circle Gateway buyer-side adapter.
2. Policy dashboard for agent spending controls.
3. Operator review queue for `REVIEW` decisions.
4. Webhook examples for agent frameworks.
5. Exportable audit reports.
6. Optional audit hash anchoring.
7. More examples for agentic commerce and machine-to-machine nanopayments.

### Milestones

#### Milestone 1 — Local proof

Status: complete.

Deliverables:
- deterministic payment-intent evaluation;
- JSONL audit trail;
- demo UI with three scenarios;
- tests/lint/typecheck/build verification.

#### Milestone 2 — Payment rail adapter prototype

Deliverables:
- non-custodial buyer-side adapter that calls a payment flow only after `ALLOW`;
- no private-key custody inside AgentPay Guard;
- clear fail-closed behavior.

#### Milestone 3 — Operator controls

Deliverables:
- policy editing UI;
- review queue for `REVIEW` decisions;
- exportable audit reports;
- webhook examples.

### Explicit limitations

The MVP is not:
- a payment rail;
- a wallet;
- a custody product;
- AML/KYC software;
- a fraud prevention guarantee;
- an official Arc/Circle module;
- a real-money payment executor.

It does not include private keys, wallet signing, auth, database, smart contracts, or live real-money execution in the current proof.

## 3. Stablecoins / Programmable Money Submission Angle

### Title

AgentPay Guard — policy preflight for programmable agent payments

### Positioning

Programmable money needs programmable controls.

As stablecoin payments become easier for agents and machines, the core developer question shifts from “can this agent pay?” to “should this agent pay right now, under this policy, to this recipient, for this scenario?”

AgentPay Guard is a lightweight policy preflight and audit layer for that moment.

### Why it fits stablecoins / programmable money

Stablecoin payment rails make API payments, machine-to-machine services, telemetry, compute, data feeds, and agentic commerce possible at small sizes and high frequency.

But high-frequency autonomous payments create operational questions:
- spending caps;
- recipient allowlists;
- unknown service review;
- risky intent detection;
- auditability;
- idempotency;
- fail-closed behavior.

AgentPay Guard demonstrates this missing control primitive.

### Demo narrative

1. An agent wants to pay a small amount of USDC for market data API access.
   - Guard returns `ALLOW`.

2. A device wants to make a machine-to-machine telemetry payment.
   - Guard returns `REVIEW` because the recipient requires operator review.

3. An unknown agent wants to pay a large amount to an unknown private service.
   - Guard returns `BLOCK` and records the reason.

### Submission claim

This is not a payment executor. It is the preflight layer that makes programmable payments more explainable and operable for builders.

### Best submission category language

Use one of these depending on the form:
- Agentic payments infrastructure
- Programmable money controls
- Stablecoin developer tooling
- x402 / paid API infrastructure
- Machine-to-machine commerce
- Payment policy and audit tooling

### Short pitch

AgentPay Guard gives builders a deterministic `ALLOW` / `REVIEW` / `BLOCK` decision before an AI agent or machine client proceeds to a stablecoin payment. It adds policy checks, risk scoring, idempotency, and JSONL audit logs before x402 / Circle Gateway / Arc-style flows.
