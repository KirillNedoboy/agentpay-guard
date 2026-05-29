# Audit Log Schema

Audit log file:

```txt
data/audit-log.jsonl
```

Each line must be a complete JSON object.

## Fields

```json
{
  "auditId": "audit_20260527_000001",
  "timestamp": "2026-05-27T12:00:00.000Z",
  "idempotencyKey": "demo-allow-api-001",
  "agentId": "agent_market_data_001",
  "intent": "Pay $0.005 USDC for market data API access",
  "amount": "0.005",
  "currency": "USDC",
  "recipient": "market-data-api.demo",
  "scenario": "api_access",
  "paymentRail": "x402_gateway_nanopayment",
  "decision": "ALLOW",
  "riskScore": 12,
  "policyId": "default-agentpay-policy-v1",
  "matchedRules": [
    "recipient_allowlisted",
    "amount_below_per_payment_limit",
    "scenario_allowed"
  ],
  "reason": "Recipient is allowlisted, amount is below limits, scenario is allowed."
}
```

## Rules

- Append-only.
- JSONL, not a JSON array.
- One line per decision.
- No secrets.
- No private keys.
- No auth tokens.
- Same `idempotencyKey` must not create duplicate records.
