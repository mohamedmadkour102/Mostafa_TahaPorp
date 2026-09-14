import { PricingPipeline } from "../diagram/PricingPipeline";
import { SceneShell } from "../components/SceneShell";

export function MethodScene() {
  return (
    <SceneShell
      sectionId="method"
      eyebrow="08 · Pricing engine"
      title="Distortion pricing + Monte Carlo — not regression"
      lede="Live Figure 5 from the PDF beside the step pipeline — plus Table 6 model selection criteria."
    >
      <PricingPipeline />
    </SceneShell>
  );
}
