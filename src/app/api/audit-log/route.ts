import { getRecentAuditRecords } from "@/domain/payment-intent/evaluate";

export async function GET(): Promise<Response> {
  return Response.json({ records: getRecentAuditRecords(25) });
}
