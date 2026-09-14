import { EgyptExposureCharts } from "../charts/EgyptExposureCharts";
import { SceneShell } from "../components/SceneShell";

export function EgyptScene() {
  return (
    <SceneShell
      sectionId="egypt"
      eyebrow="03 · Egypt under pressure"
      title="Concentrated geography, mapped hazards, constrained insurance depth"
      lede="Interactive GFDRR Figure 4 hazard maps (river vs coastal) with hotspots from the proposal — plus CRED mix and climate indices."
    >
      <EgyptExposureCharts />
    </SceneShell>
  );
}

