import type { Decision } from "@/domain/payment-intent/types";

export type AuditRecord = {
  auditId: string;
  timestamp: string;
  idempotencyKey: string;
  agentId: string;
  intent: string;
  amount: string;
  currency: string;
  recipient: string;
  scenario: string;
  paymentRail: string;
  decision: Decision;
  riskScore: number;
  policyId: string;
  matchedRules: string[];
  reason: string;
};
