import { GapMatrix } from "../charts/GapMatrix";
import { SceneShell } from "../components/SceneShell";

export function GapScene() {
  return (
    <SceneShell
      sectionId="gap"
      eyebrow="06 · Research gap"
      title="Physical science exists. Macro losses exist. Egypt pricing does not."
      lede="Interactive Table 5 with converge animation — Full text includes the complete gap matrix narrative and problem statement."
    >
      <GapMatrix />
    </SceneShell>
  );
}
