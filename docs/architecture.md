# Architecture

## MVP architecture

```txt
Browser demo UI
  ↓
POST /api/payment-intents/evaluate
  ↓
Request validation
  ↓
Policy config loader
  ↓
Policy engine
  ↓
Risk score + decision
  ↓
Audit JSONL append
  ↓
Decision response
```

## Payment rail integration boundary

```txt
AI Agent / Machine Client
  ↓
AgentPay Guard
  ↓ if ALLOW
x402 / Circle Gateway / Arc payment flow
```

The MVP stops at the decision layer.

## Suggested modules

```txt
src/domain/payment-intent
  types
  validation

src/domain/policy
  policy-config
  rules
  engine
  risk-score

src/domain/audit
  audit-record
  audit-log

src/lib
  decimal
  ids
  time
  file-store
```

## Persistence

MVP uses files:

- `data/policies.default.json`
- `data/audit-log.jsonl`

No DB in MVP.

## Failure posture

Internal error must not result in `ALLOW`.

Preferred behavior:

- validation error → structured 400;
- policy/audit internal error → `REVIEW` or 500 depending implementation;
- never silently allow.
