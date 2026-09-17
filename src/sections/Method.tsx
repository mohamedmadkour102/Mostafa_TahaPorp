import { PricingPipeline } from "../diagram/PricingPipeline";
import { SceneShell } from "../components/SceneShell";

export function MethodScene() {
  return (
    <SceneShell
      sectionId="method"
      eyebrow="09 · Pricing engine"
      title="Distortion pricing + Monte Carlo — not regression"
      lede="Built-in interactive Figure 5 pipeline — click each stage, then Table 6 model selection criteria."
    >
      <PricingPipeline />
    </SceneShell>
  );
}
