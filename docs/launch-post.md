# AgentPay Guard: Preflight Policy for AI-Agent Payments

AgentPay Guard is a preflight policy and audit layer for AI-agent payment intents before x402 / Circle Gateway / Arc payment flows. It validates a payment intent, applies deterministic policy rules, returns `ALLOW`, `REVIEW`, or `BLOCK`, and writes a JSONL audit record so builders can inspect what happened before any payment rail is reached.

- Demo UI runs three scenarios: API nanopayment (`ALLOW`), machine-to-machine payment (`REVIEW`), and risky autonomous spend (`BLOCK`).
- Policy engine checks amount, currency, recipient, scenario, limits, velocity, and suspicious intent keywords.
- Audit log records every successful evaluation and reuses existing records by `idempotencyKey`.

Arc, Circle Gateway, USDC, and x402-style paid APIs make autonomous payments more useful for builders. AgentPay Guard is the control layer before those rails: it adds deterministic policy and auditability before an agent proceeds.

MVP limitation: this proof does not move funds, sign transactions, provide AML/KYC compliance, guarantee fraud prevention, or claim official Arc/Circle integration.

Suggested tags: `#AgentPay`, `#USDC`, `#x402`, `#Circle`, `#Arc`
