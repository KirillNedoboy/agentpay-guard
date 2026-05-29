# Screenshot Capture Instructions

Do not add placeholder or fake screenshots. Save actual captured PNG files in this directory.

## Required Screenshots

- `screenshots/01-allow-decision.png`
- `screenshots/02-review-decision.png`
- `screenshots/03-block-decision.png`
- `screenshots/04-audit-log.png`

## Manual Capture Steps

1. Run:

```bash
pnpm dev
```

2. Open:

```txt
http://localhost:3000
```

3. Select `API nanopayment`.
4. Click `Evaluate payment intent`.
5. Capture the decision card and save it as:

```txt
screenshots/01-allow-decision.png
```

6. Select `Machine-to-machine payment`.
7. Click `Evaluate payment intent`.
8. Capture the decision card and save it as:

```txt
screenshots/02-review-decision.png
```

9. Select `Risky autonomous spend`.
10. Click `Evaluate payment intent`.
11. Capture the decision card and save it as:

```txt
screenshots/03-block-decision.png
```

12. Scroll to `Recent audit log`.
13. Capture the audit table and save it as:

```txt
screenshots/04-audit-log.png
```

Keep screenshots current with the UI before publishing the proof pack.
