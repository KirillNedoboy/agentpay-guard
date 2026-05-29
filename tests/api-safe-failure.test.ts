import { describe, expect, test } from "vitest";
import { safeEvaluatePaymentIntent } from "@/domain/payment-intent/evaluate";

describe("safe payment intent evaluation", () => {
  test("invalid request fields never return ALLOW", async () => {
    const response = await safeEvaluatePaymentIntent({
      intent: "Pay $1 USDC",
      amount: "1",
      currency: "USDC"
    });
    const body = (await response.json()) as { decision: string; matchedRules: string[]; auditId: string | null };

    expect(response.status).toBe(400);
    expect(body.decision).toBe("BLOCK");
    expect(body.matchedRules).toContain("request_validation_failed");
    expect(body.auditId).toBeNull();
  });
});
