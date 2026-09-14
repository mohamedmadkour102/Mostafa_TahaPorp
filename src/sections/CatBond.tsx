import { CatBondDiagram } from "../diagram/CatBondDiagram";
import { SceneShell } from "../components/SceneShell";

export function CatBondScene() {
  return (
    <SceneShell
      sectionId="catbond"
      eyebrow="05 · Instrument"
      title="CAT bonds move catastrophe risk from insurers to capital markets"
      lede="Interactive structure plus full §2.2 definitions, valuation challenges, and actuarial approaches."
    >
      <CatBondDiagram />
    </SceneShell>
  );
}
