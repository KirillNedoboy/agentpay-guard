# ROADMAP.md

## MVP

- Deterministic policy engine.
- `ALLOW / REVIEW / BLOCK`.
- JSONL audit log.
- Demo UI.
- 3 demo scenarios.
- README + grant draft.

## After MVP

### Milestone 1 — x402/Gateway adapter

Add an adapter that runs Guard before a mock or real x402 buyer flow.

No real funds without explicit operator setup.

### Milestone 2 — Policy management

Add UI/API for editing:

- per-agent limits;
- recipient allowlist;
- scenario allowlist;
- denylist;
- velocity rules.

### Milestone 3 — Webhook/audit export

Add:

- webhook on decision;
- CSV/JSON export;
- audit hash chain or Merkle-style digest.

### Milestone 4 — Team/operator flow

Add:

- review queue;
- manual approval/deny;
- reviewer notes;
- decision history.

### Milestone 5 — Production hardening

Add:

- DB-backed audit log;
- auth;
- rate limiting;
- observability;
- proper deployment config;
- integration tests.

## Not on MVP roadmap

- AML/KYC provider features;
- custody;
- wallet private-key handling;
- autonomous real-money execution by default;
- smart contracts unless a specific audit anchoring requirement appears.
