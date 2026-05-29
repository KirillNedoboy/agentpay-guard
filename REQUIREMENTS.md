# REQUIREMENTS.md — AgentPay Guard MVP

## 1. Product

**Name:** AgentPay Guard

**One-liner:** Preflight policy and audit layer for AI-agent payments on Arc / Circle Gateway / x402.

**Core promise:** Before an autonomous agent or machine client spends USDC, AgentPay Guard evaluates the intent, amount, recipient, scenario, limits and risk, then returns `ALLOW`, `REVIEW`, or `BLOCK`.

## 2. MVP objective

Build a compact builder proof / grant proof that shows:

1. AI-agent payment intent enters the Guard.
2. Guard validates the request.
3. Guard applies deterministic policy rules.
4. Guard returns `ALLOW`, `REVIEW`, or `BLOCK`.
5. Guard writes a JSON audit record.
6. Demo UI shows the result and recent audit log.
7. README explains Arc/Circle relevance.

## 3. Non-goals

Do not build:

- real payment execution;
- real wallet signing;
- custody;
- AML/KYC system;
- compliance product;
- fraud guarantee;
- smart contracts;
- complex database;
- multi-user auth;
- production admin dashboard;
- AI-based opaque scoring.

## 4. Target users

### AI Agent / Machine Client

A software agent that wants to pay for an API, data, compute, telemetry, or service.

### Builder / Developer

A developer integrating a policy check before an autonomous payment flow.

### Grant / Ecosystem Reviewer

A reviewer who needs to see product clarity, demo, code, audit log and ecosystem alignment.

## 5. Main flow

```txt
Payment intent
  → request validation
  → policy evaluation
  → risk score
  → decision
  → audit log append
  → demo UI result
```

If the decision is `ALLOW`, the UI may show: "Would proceed to x402 / Circle Gateway / Arc payment flow."

The MVP must not execute real payments.

## 6. API requirements

### Endpoint

```http
POST /api/payment-intents/evaluate
```

### Request

```json
{
  "agentId": "agent_market_data_001",
  "intent": "Pay $0.005 USDC for market data API access",
  "amount": "0.005",
  "currency": "USDC",
  "recipient": "market-data-api.demo",
  "scenario": "api_access",
  "paymentRail": "x402_gateway_nanopayment",
  "idempotencyKey": "demo-allow-api-001"
}
```

### Response

```json
{
  "decision": "ALLOW",
  "riskScore": 12,
  "reason": "Recipient is allowlisted, amount is below limits, scenario is allowed.",
  "matchedRules": [
    "recipient_allowlisted",
    "amount_below_per_payment_limit",
    "scenario_allowed"
  ],
  "policyId": "default-agentpay-policy-v1",
  "auditId": "audit_20260527_000001",
  "createdAt": "2026-05-27T12:00:00.000Z"
}
```

## 7. Supported decisions

| Decision | Meaning |
|---|---|
| `ALLOW` | Payment can proceed to payment rail. |
| `REVIEW` | Payment must wait for operator/manual review. |
| `BLOCK` | Payment must not execute. |

## 8. Policy rules

MVP policy engine must support:

| Rule | Expected behavior |
|---|---|
| Unsupported currency | `BLOCK` |
| Invalid amount | `BLOCK` |
| Zero or negative amount | `BLOCK` |
| Amount above hard max per payment | `BLOCK` |
| Agent above daily limit | `BLOCK` |
| Recipient in denylist | `BLOCK` |
| Unknown recipient | `REVIEW` |
| Unknown scenario | `REVIEW` |
| Suspicious keywords in intent | risk increase; `REVIEW` or `BLOCK` depending severity |
| Too many attempts in velocity window | `REVIEW` |
| Known recipient + allowed scenario + amount below limits | `ALLOW` |

## 9. Risk score

Risk score range: `0..100`.

Suggested buckets:

| Score | Meaning |
|---:|---|
| 0–29 | Low |
| 30–69 | Medium |
| 70–100 | High |

Decision precedence:

1. Any hard block rule → `BLOCK`.
2. Any review rule with no hard block → `REVIEW`.
3. Clean low-risk request → `ALLOW`.

Never return `ALLOW` after internal evaluation failure.

## 10. Policy config

Use file-based config for MVP:

```txt
data/policies.default.json
```

No DB is required for MVP.

## 11. Audit log

Every evaluation must append one immutable JSONL line:

```txt
data/audit-log.jsonl
```

Required audit fields:

- `auditId`
- `timestamp`
- `idempotencyKey`
- `agentId`
- `intent`
- `amount`
- `currency`
- `recipient`
- `scenario`
- `paymentRail`
- `decision`
- `riskScore`
- `policyId`
- `matchedRules`
- `reason`

Idempotency requirement:

- same `idempotencyKey` must not create duplicate audit records;
- returning the previous decision is acceptable.

## 12. Demo UI requirements

Single page UI.

Required blocks:

1. title and subtitle;
2. scenario selector;
3. editable payment intent form;
4. evaluate button;
5. decision card;
6. matched rules;
7. audit id;
8. audit log table;
9. architecture strip: `AI Agent → Guard → x402/Gateway/Arc`.

No auth.

## 13. Demo scenarios

### A. ALLOW

Use `examples/scenario-allow-api.json`.

Expected decision: `ALLOW`.

### B. REVIEW

Use `examples/scenario-review-machine.json`.

Expected decision: `REVIEW`.

### C. BLOCK

Use `examples/scenario-block-risky.json`.

Expected decision: `BLOCK`.

## 14. Acceptance criteria

MVP is done only when:

- local demo runs;
- all 3 scenarios work from UI;
- all 3 scenarios create valid JSONL audit records;
- audit log visible in UI;
- README explains Arc/Circle relevance;
- `docs/grant-draft.md` is complete;
- 2–3 screenshots are captured;
- no real funds are moved;
- no secrets are committed;
- no fake claims are made.

## 15. Final product boundary

AgentPay Guard is the decision layer before the payment rail.

It should not pretend to be the payment rail.
