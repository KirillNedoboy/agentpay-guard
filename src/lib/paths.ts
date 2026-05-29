import { join } from "node:path";

export function policyPath(): string {
  return join(process.cwd(), "data", "policies.default.json");
}

export function auditLogPath(): string {
  return join(process.cwd(), "data", "audit-log.jsonl");
}
