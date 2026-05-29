# Reviewer One-Pager

## What is AgentPay Guard?

A preflight policy and audit layer for AI-agent payments.

## What does it do?

It receives a payment intent and returns:

- `ALLOW`;
- `REVIEW`;
- `BLOCK`.

It records every decision in an audit log.

## Why does it matter?

Autonomous agents can pay for APIs, compute, data and services. Before they spend stablecoins, builders need explainable controls.

## Why Arc/Circle?

The product is built around the idea of USDC-based agentic payments, x402-style paid APIs, Circle Gateway/Nanopayments and Arc ecosystem machine-to-machine settlement.

## What is built in the MVP?

- deterministic policy engine;
- local API;
- demo UI;
- 3 scenarios;
- audit log;
- grant/post documentation.

## What is not built?

- real payment execution;
- custody;
- signing;
- AML/KYC;
- fraud guarantee;
- production admin system.

## What comes next?

- x402/Gateway adapter;
- policy management UI;
- review queue;
- webhook integrations;
- audit export/attestation.
