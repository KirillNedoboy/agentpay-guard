import { readFileSync } from "node:fs";
import { join } from "node:path";
import DemoClient, { type Scenario } from "./demo-client";

const scenarioFiles = [
  ["API nanopayment", "scenario-allow-api.json"],
  ["Machine-to-machine payment", "scenario-review-machine.json"],
  ["Risky autonomous spend", "scenario-block-risky.json"]
] as const;

function loadScenarios(): Scenario[] {
  return scenarioFiles.map(([label, fileName]) => {
    const raw = readFileSync(join(process.cwd(), "examples", fileName), "utf8");
    const parsed = JSON.parse(raw) as Scenario["intent"] & { expectedDecision: string };
    const { expectedDecision, ...intent } = parsed;
    return {
      label,
      fileName,
      expectedDecision,
      intent
    };
  });
}

export default function Page() {
  return <DemoClient scenarios={loadScenarios()} />;
}
