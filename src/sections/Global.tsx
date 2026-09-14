import { GlobalLossCharts } from "../charts/GlobalLossCharts";
import { SceneShell } from "../components/SceneShell";

export function GlobalScene() {
  return (
    <SceneShell
      sectionId="global"
      eyebrow="02 · Global climate losses"
      title="The protection gap is shrinking in percentage — not in dollars"
      lede="Munich Re Figures 1 & 2 from the PDF beside interactive reconstructions — plus Table 1 decade gap."
    >
      <GlobalLossCharts />
    </SceneShell>
  );
}
