export type Decision = "ALLOW" | "REVIEW" | "BLOCK";

export type PaymentIntent = {
  agentId: string;
  intent: string;
  amount: string;
  currency: string;
  recipient: string;
  scenario: string;
  paymentRail: string;
  idempotencyKey: string;
};

export type PolicyDecision = {
  decision: Decision;
  riskScore: number;
  reason: string;
  matchedRules: string[];
  policyId: string;
};
