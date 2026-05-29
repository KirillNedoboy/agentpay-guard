# Demo Script - AgentPay Guard

## Goal

Run a two-minute demo showing that AgentPay Guard evaluates payment intents before an AI agent proceeds to x402 / Circle Gateway / Arc payment flow.

## Setup

```bash
pnpm dev
```

Open:

```txt
http://localhost:3000
```

## 2-Minute Flow

### 0:00-0:20 - Opening

Show the page title, scenario selector, form, decision card, and architecture strip.

Say:

> AgentPay Guard is a preflight policy and audit layer for AI-agent payment intents. It does not move funds. It evaluates whether an agent payment should be allowed, reviewed, or blocked before the agent proceeds to x402, Circle Gateway, or Arc payment flow.

Point to the architecture strip:

```txt
AI Agent -> AgentPay Guard -> x402 / Circle Gateway -> Paid API / Service
```

### 0:20-0:45 - ALLOW: API Nanopayment

Select:

```txt
API nanopayment
```

Click `Evaluate payment intent`.

Expected:

- decision: `ALLOW`;
- low risk score;
- matched rules include allowlisted recipient and amount below limit;
- audit id is visible.

Say:

> This is a tiny USDC API payment to a known recipient in an allowed scenario. Guard returns ALLOW and records the decision in the audit log.

Scenario file:

```txt
examples/scenario-allow-api.json
```

### 0:45-1:10 - REVIEW: Machine-to-Machine Payment

Select:

```txt
Machine-to-machine payment
```

Click `Evaluate payment intent`.

Expected:

- decision: `REVIEW`;
- medium risk score;
- matched rules include recipient requires review;
- audit id is visible.

Say:

> This payment is small, but the recipient requires operator review. Guard does not block it outright, but it prevents fully autonomous execution.

Scenario file:

```txt
examples/scenario-review-machine.json
```

### 1:10-1:35 - BLOCK: Risky Autonomous Spend

Select:

```txt
Risky autonomous spend
```

Click `Evaluate payment intent`.

Expected:

- decision: `BLOCK`;
- high risk score;
- matched rules include amount above hard max, unknown scenario, and suspicious keywords;
- audit id is visible.

Say:

> This intent is high value, unknown, and risky. Guard blocks it before any payment rail is reached. No funds move.

Scenario file:

```txt
examples/scenario-block-risky.json
```

### 1:35-1:50 - Show Audit Log

Scroll to or point at `Recent audit log`.

Say:

> Each successful evaluation writes or reuses a JSONL audit record. Reusing the same idempotency key returns the same audit record instead of duplicating the log.

Mention the file:

```txt
data/audit-log.jsonl
```

### 1:50-2:00 - Closing

Say:

> AgentPay Guard complements Arc, Circle Gateway, and x402-style payment flows by adding deterministic policy and auditability before payment execution. It is not a wallet or payment rail; it is the guard layer before the rail.
