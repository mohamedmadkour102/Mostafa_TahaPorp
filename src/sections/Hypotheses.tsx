import { SceneShell } from "../components/SceneShell";
import { HypothesesFlowDiagram } from "../diagram/HypothesesFlowDiagram";

export function HypothesesScene() {
  return (
    <SceneShell
      sectionId="hypotheses"
      eyebrow="08 · Problem · Hypotheses · Objectives"
      title="From gap to testable claims"
      lede="Interactive path — click Problem → Hypotheses → Objectives. Full text restores complete wording from the proposal."
    >
      <HypothesesFlowDiagram />
    </SceneShell>
  );
}
