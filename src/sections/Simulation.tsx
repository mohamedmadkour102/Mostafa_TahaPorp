import { SimulationLab } from "../charts/SimulationLab";
import { SceneShell } from "../components/SceneShell";

export function SimulationScene() {
  return (
    <SceneShell
      sectionId="simulation"
      eyebrow="10 · Simulation lab"
      title="See the dual-model comparison move"
      lede="Illustrative sandbox for H1/H3/H5. Full text explains the linked methodology caveats."
    >
      <SimulationLab />
    </SceneShell>
  );
}
