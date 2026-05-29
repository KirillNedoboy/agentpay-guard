# TASKS.md — Build Plan

## Phase 0 — Starter pack

- [x] Define product.
- [x] Write requirements.
- [x] Add Codex instructions.
- [x] Add demo scenarios.
- [x] Add default policy config.
- [x] Add grant/demo docs.

## Phase 1 — Core backend

- [x] Create TypeScript app scaffold.
- [x] Add request validation.
- [x] Add decimal-safe amount parsing/comparison.
- [x] Load `data/policies.default.json`.
- [x] Implement policy engine.
- [x] Implement risk scoring.
- [x] Implement idempotency.
- [x] Append JSONL audit log.
- [x] Read recent audit log entries.
- [x] Add tests for all demo scenarios.

## Phase 2 — Demo UI

- [x] Add single page demo.
- [x] Add scenario selector.
- [x] Add editable form.
- [x] Add decision card.
- [x] Add matched rules list.
- [x] Add audit log table.
- [x] Add architecture strip.

## Phase 3 — Proof pack

- [x] Finalize README.
- [x] Finalize `docs/grant-draft.md`.
- [x] Finalize `docs/demo-script.md`.
- [x] Add `docs/proof-pack-checklist.md`.
- [x] Add `screenshots/README.md`.
- [x] Capture screenshots:
  - [x] `screenshots/01-allow-decision.png`
  - [x] `screenshots/02-review-decision.png`
  - [x] `screenshots/03-block-decision.png`
  - [x] `screenshots/04-audit-log.png`
- [x] Confirm `data/audit-log.jsonl` has valid demo records.
- [x] Prepare short post text.
- [x] Verify repo hygiene for publication.
- [ ] Prepare GitHub repo.

## Do not start without explicit request

- [ ] Live Circle Gateway integration.
- [ ] Real x402 seller/buyer payment.
- [ ] Wallet signing.
- [ ] Smart contracts.
- [ ] Database.
- [ ] Auth.
