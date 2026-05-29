import { safeEvaluatePaymentIntent } from "@/domain/payment-intent/evaluate";

export async function POST(request: Request): Promise<Response> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        decision: "BLOCK",
        riskScore: 100,
        reason: "Request body must be valid JSON.",
        matchedRules: ["request_json_invalid"],
        policyId: "unloaded",
        auditId: null,
        createdAt: new Date().toISOString()
      },
      { status: 400 }
    );
  }

  return safeEvaluatePaymentIntent(body);
}
