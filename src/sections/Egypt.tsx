import { EgyptExposureCharts } from "../charts/EgyptExposureCharts";
import { SceneShell } from "../components/SceneShell";

export function EgyptScene() {
  return (
    <SceneShell
      sectionId="egypt"
      eyebrow="03 · Egypt under pressure"
      title="Concentrated geography, mapped hazards, constrained insurance depth"
      lede="Default view: interactive GFDRR Figure 4 hazard maps (river vs coastal) with proposal hotspots — plus an optional geographic explorer, CRED mix, and climate indices."
    >
      <EgyptExposureCharts />
    </SceneShell>
  );
}

