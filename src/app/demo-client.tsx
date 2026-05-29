"use client";

import { useEffect, useMemo, useState } from "react";
import type { AuditRecord } from "@/domain/audit/types";
import type { PaymentIntent } from "@/domain/payment-intent/types";

export type Scenario = {
  label: string;
  fileName: string;
  expectedDecision: string;
  intent: PaymentIntent;
};

type EvaluationResult = {
  decision: "ALLOW" | "REVIEW" | "BLOCK";
  riskScore: number;
  reason: string;
  matchedRules: string[];
  policyId: string;
  auditId: string | null;
  createdAt: string;
};

type FieldName = keyof PaymentIntent;

const fieldLabels: Array<[FieldName, string]> = [
  ["agentId", "Agent ID"],
  ["intent", "Intent"],
  ["amount", "Amount"],
  ["currency", "Currency"],
  ["recipient", "Recipient"],
  ["scenario", "Scenario"],
  ["paymentRail", "Payment rail"],
  ["idempotencyKey", "Idempotency key"]
];

export default function DemoClient({ scenarios }: { scenarios: Scenario[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedScenario = scenarios[selectedIndex] ?? scenarios[0];
  const [form, setForm] = useState<PaymentIntent>(selectedScenario.intent);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [records, setRecords] = useState<AuditRecord[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm(selectedScenario.intent);
    setResult(null);
    setError(null);
  }, [selectedScenario]);

  async function refreshAuditLog() {
    const response = await fetch("/api/audit-log", { cache: "no-store" });
    const data = (await response.json()) as { records: AuditRecord[] };
    setRecords(data.records);
  }

  useEffect(() => {
    void refreshAuditLog();
  }, []);

  async function evaluate() {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/payment-intents/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = (await response.json()) as EvaluationResult;
      setResult(data);
      if (!response.ok) {
        setError(data.reason);
      }
      await refreshAuditLog();
    } catch {
      setError("Evaluation request failed locally.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const decisionClass = useMemo(() => result?.decision.toLowerCase() ?? "empty", [result]);

  return (
    <main className="shell">
      <section className="intro">
        <div>
          <p className="eyebrow">Local MVP proof</p>
          <h1>AgentPay Guard</h1>
          <p className="subtitle">Preflight policy and audit layer before AI-agent payments proceed to x402 / Circle Gateway / Arc flows.</p>
        </div>
        <div className="boundary">No payment execution. No wallet signing. No private keys.</div>
      </section>

      <section className="architecture" aria-label="Architecture">
        <span>AI Agent</span>
        <span>AgentPay Guard</span>
        <span>x402 / Circle Gateway</span>
        <span>Paid API / Service</span>
      </section>

      <section className="workspace">
        <div className="panel">
          <h2>Scenario</h2>
          <div className="scenario-grid">
            {scenarios.map((scenario, index) => (
              <button
                className={index === selectedIndex ? "scenario active" : "scenario"}
                key={scenario.fileName}
                onClick={() => setSelectedIndex(index)}
                type="button"
              >
                <strong>{scenario.label}</strong>
                <span>{scenario.expectedDecision}</span>
              </button>
            ))}
          </div>

          <div className="form-grid">
            {fieldLabels.map(([field, label]) => (
              <label className={field === "intent" ? "wide" : ""} key={field}>
                <span>{label}</span>
                <input value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} />
              </label>
            ))}
          </div>

          <button className="evaluate" disabled={isSubmitting} onClick={evaluate} type="button">
            {isSubmitting ? "Evaluating..." : "Evaluate payment intent"}
          </button>
          {error ? <p className="error">{error}</p> : null}
        </div>

        <div className={`decision ${decisionClass}`}>
          <h2>Decision</h2>
          {result ? (
            <>
              <div className="decision-line">
                <strong>{result.decision}</strong>
                <span>Risk {result.riskScore}/100</span>
              </div>
              <p>{result.reason}</p>
              <dl>
                <div>
                  <dt>Audit ID</dt>
                  <dd>{result.auditId ?? "not written"}</dd>
                </div>
                <div>
                  <dt>Policy</dt>
                  <dd>{result.policyId}</dd>
                </div>
              </dl>
              <h3>Matched rules</h3>
              <ul>
                {result.matchedRules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>Select a scenario and evaluate it to see the guard decision.</p>
          )}
        </div>
      </section>

      <section className="audit">
        <div className="section-heading">
          <h2>Recent audit log</h2>
          <button onClick={refreshAuditLog} type="button">
            Refresh
          </button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Decision</th>
                <th>Agent</th>
                <th>Amount</th>
                <th>Recipient</th>
                <th>Audit ID</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.auditId}>
                  <td>{new Date(record.timestamp).toLocaleString()}</td>
                  <td>{record.decision}</td>
                  <td>{record.agentId}</td>
                  <td>
                    {record.amount} {record.currency}
                  </td>
                  <td>{record.recipient}</td>
                  <td>{record.auditId}</td>
                </tr>
              ))}
              {records.length === 0 ? (
                <tr>
                  <td colSpan={6}>No audit records yet.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
