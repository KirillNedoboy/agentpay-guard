# Decision Rules

## Decision precedence

1. Hard block rules.
2. Review rules.
3. Allow if clean.

## Hard block rules

Return `BLOCK` if:

- currency is unsupported;
- amount is invalid;
- amount is zero or negative;
- amount exceeds `maxAmountPerPayment`;
- daily agent limit is exceeded;
- recipient is denylisted;
- risk score reaches block threshold.

## Review rules

Return `REVIEW` if:

- recipient is unknown;
- recipient is in review list;
- scenario is unknown;
- velocity limit is exceeded;
- suspicious keyword is detected but no hard block threshold is reached;
- risk score reaches review threshold.

## Allow rules

Return `ALLOW` only if:

- currency is supported;
- amount is valid and within limits;
- recipient is allowlisted;
- scenario is allowed;
- velocity is acceptable;
- no suspicious keyword creates review/block state.

## Risk score guidance

Base score: `10`.

Add configured weights for matched review/risk rules.

Clamp final score to `0..100`.

Hard block rules may force `BLOCK` regardless of score.
