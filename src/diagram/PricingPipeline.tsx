import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ModelCriteriaTable } from "../charts/ModelCriteriaTable";
import { useSyncedCaption } from "../components/SceneShell";
import { ChartDualView } from "../components/ChartDualView";
import { pdfFigures } from "../data/pdfFigures";

const steps = [
  {
    title: "EM-DAT sample",
    body: "18 hydrometeorological events in Egypt (1987–2025) from the international disaster database.",
    caption: "Step 1 — Start from EM-DAT Egyptian hydro events (n = 18, 1987–2025).",
    figRegion: "Data",
  },
  {
    title: "Frequency & severity fitting",
    body: "Frequency via Poisson process; severity via best-fitting heavy-tailed distribution (Lognormal vs Gamma).",
    caption: "Step 2 — Fit Poisson frequency and heavy-tailed severity (Lognormal vs Gamma).",
    figRegion: "Fit",
  },
  {
    title: "Wang (2004) — Primary",
    body: "Two-factor distortion on the exceedance curve with Student-t correction for parameter uncertainty (df = n − 2).",
    formula: "S*(x) = Q_t( Φ⁻¹(S(x)) + λ_W )",
    caption: "Step 3 — Wang two-factor primary model with Student-t uncertainty correction.",
    figRegion: "Wang",
  },
  {
    title: "Ma (2025) — Benchmark",
    body: "Esscher transform on compound Poisson–Gamma: distorts both severity (β* = β − h) and frequency λ*.",
    caption: "Step 4 — Ma Esscher benchmark distorts frequency and severity together.",
    figRegion: "Ma / Esscher",
  },
  {
    title: "Monte Carlo simulation",
    body: "Simulate annual losses and CAT bond cash flows under each pricing operator.",
    caption: "Step 5 — Monte Carlo turns distorted measures into risk-adjusted CAT cash flows.",
    figRegion: "Monte Carlo",
  },
  {
    title: "Compare & select",
    body: "Quantify the Wang–Ma pricing gap and select the operator that best fits small-sample heavy-tailed Egyptian risk.",
    caption: "Step 6 — Compare spreads and select the operator best suited to Egypt’s sample.",
    figRegion: "Selection",
  },
];

export function PricingPipeline() {
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const { setCaption } = useSyncedCaption();

  useEffect(() => {
    setCaption(`${steps[step].caption} · PDF Figure 5 flowchart available beside the live pipeline.`);
  }, [step, setCaption]);

  useEffect(() => {
    if (!autoPlay) return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [autoPlay]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <ChartDualView
        figureLabel={pdfFigures.fig5.label}
        sourceNote={pdfFigures.fig5.source}
        originalSrc={pdfFigures.fig5.src}
        originalAlt={pdfFigures.fig5.alt}
        defaultView="both"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <div className="chip">Live pipeline · mirrors Figure 5</div>
            <button className="btn" type="button" onClick={() => setAutoPlay((v) => !v)}>
              {autoPlay ? "Pause auto-play" : "Auto-play steps"}
            </button>
          </div>

          <div className="pipeline-progress">
            {steps.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`pipeline-dot ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}
                onClick={() => {
                  setAutoPlay(false);
                  setStep(i);
                }}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {steps.map((s, i) => (
              <button
                key={s.title}
                className={`tab ${step === i ? "active" : ""}`}
                onClick={() => {
                  setAutoPlay(false);
                  setStep(i);
                }}
              >
                {i + 1}. {s.figRegion}
              </button>
            ))}
          </div>

          <motion.div
            key={step}
            className="panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3>
              Step {step + 1} — {steps[step].title}
            </h3>
            <p style={{ margin: 0, lineHeight: 1.55 }}>{steps[step].body}</p>
            {steps[step].formula && (
              <pre
                style={{
                  marginTop: 12,
                  padding: 12,
                  borderRadius: 10,
                  background: "var(--bg-soft)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  overflowX: "auto",
                }}
              >
                {steps[step].formula}
              </pre>
            )}
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button
                className="btn"
                disabled={step === 0}
                onClick={() => {
                  setAutoPlay(false);
                  setStep((s) => Math.max(0, s - 1));
                }}
              >
                Previous
              </button>
              <button
                className="btn btn-primary"
                disabled={step === steps.length - 1}
                onClick={() => {
                  setAutoPlay(false);
                  setStep((s) => Math.min(steps.length - 1, s + 1));
                }}
              >
                Next step
              </button>
            </div>
          </motion.div>
        </div>
      </ChartDualView>

      <ModelCriteriaTable />
    </div>
  );
}
