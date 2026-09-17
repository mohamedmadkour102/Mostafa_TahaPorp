import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ModelCriteriaTable } from "../charts/ModelCriteriaTable";
import { useSyncedCaption } from "../components/SceneShell";

type NodeId = "data" | "fit" | "wang" | "ma" | "monte" | "select";

const nodes: Record<
  NodeId,
  {
    title: string;
    body: string;
    caption: string;
    formula?: string;
    badge?: string;
  }
> = {
  data: {
    title: "EM-DAT · Hydrometeorological data",
    body: "18 hydrometeorological events in Egypt (1987–2025) from the international disaster database.",
    caption: "Start from EM-DAT Egyptian hydro events (n = 18, 1987–2025).",
    badge: "Sample",
  },
  fit: {
    title: "Frequency & severity fitting",
    body: "Frequency via Poisson process; severity via best-fitting heavy-tailed distribution (Lognormal vs Gamma).",
    caption: "Fit Poisson frequency and heavy-tailed severity (Lognormal vs Gamma).",
  },
  wang: {
    title: "Wang (2004) — Primary model",
    body: "Two-factor distortion on the exceedance curve with Student-t correction for parameter uncertainty (df = n − 2).",
    formula: "S*(x) = Q_t( Φ⁻¹(S(x)) + λ_W )",
    caption: "Wang two-factor primary model with Student-t uncertainty correction.",
    badge: "Primary",
  },
  ma: {
    title: "Ma (2025) — Esscher benchmark",
    body: "Esscher transform on compound Poisson–Gamma: distorts both severity (β* = β − h) and frequency λ*.",
    caption: "Ma Esscher benchmark distorts frequency and severity together.",
    badge: "Benchmark",
  },
  monte: {
    title: "Monte Carlo simulation",
    body: "Simulate annual losses and CAT bond cash flows & prices under each pricing operator.",
    caption: "Monte Carlo turns distorted measures into risk-adjusted CAT cash flows.",
  },
  select: {
    title: "Compare & select",
    body: "Quantify the Wang–Ma pricing gap and select the operator that best fits small-sample heavy-tailed Egyptian risk.",
    caption: "Compare spreads and select the operator best suited to Egypt’s sample.",
  },
};

const playOrder: NodeId[] = ["data", "fit", "wang", "ma", "monte", "select"];

export function PricingPipeline() {
  const [active, setActive] = useState<NodeId>("data");
  const [autoPlay, setAutoPlay] = useState(false);
  const { setCaption } = useSyncedCaption();
  const detail = nodes[active];

  useEffect(() => {
    setCaption(`Figure 5 · ${detail.caption}`);
  }, [detail, setCaption]);

  useEffect(() => {
    if (!autoPlay) return;
    const id = window.setInterval(() => {
      setActive((cur) => {
        const i = playOrder.indexOf(cur);
        return playOrder[(i + 1) % playOrder.length];
      });
    }, 2800);
    return () => window.clearInterval(id);
  }, [autoPlay]);

  const pick = (id: NodeId) => {
    setAutoPlay(false);
    setActive(id);
  };

  return (
    <div className="pricing-lab">
      <div className="pricing-lab-toolbar">
        <span className="chip">Figure 5 · Built-in interactive pipeline</span>
        <button className="btn" type="button" onClick={() => setAutoPlay((v) => !v)}>
          {autoPlay ? "Pause auto-play" : "Auto-play flow"}
        </button>
      </div>

      <div className="fig5-layout">
        <div className="fig5-diagram" aria-label="Figure 5 pricing methodology flowchart">
          <button
            type="button"
            className={`fig5-node fig5-node--cylinder ${active === "data" ? "active" : ""}`}
            onClick={() => pick("data")}
          >
            <span className="fig5-node-kicker">01 · Data</span>
            <strong>EM-DAT</strong>
            <em>Hydrometeorological data · Egypt · n = 18</em>
          </button>

          <div className="fig5-connector" aria-hidden>
            <span />
          </div>

          <button
            type="button"
            className={`fig5-node ${active === "fit" ? "active" : ""}`}
            onClick={() => pick("fit")}
          >
            <span className="fig5-node-kicker">02 · Fit</span>
            <strong>Frequency &amp; severity fitting</strong>
            <em>Poisson process + heavy-tailed severity</em>
          </button>

          <div className="fig5-connector fig5-connector--split" aria-hidden>
            <span className="fig5-split-stem" />
            <span className="fig5-split-bar" />
            <span className="fig5-split-left" />
            <span className="fig5-split-right" />
          </div>

          <div className="fig5-branch">
            <button
              type="button"
              className={`fig5-node fig5-node--wang ${active === "wang" ? "active" : ""}`}
              onClick={() => pick("wang")}
            >
              <span className="fig5-node-kicker">03 · Primary</span>
              <strong>Wang (2004)</strong>
              <em>Two-factor transform</em>
            </button>
            <button
              type="button"
              className={`fig5-node fig5-node--ma ${active === "ma" ? "active" : ""}`}
              onClick={() => pick("ma")}
            >
              <span className="fig5-node-kicker">04 · Benchmark</span>
              <strong>Ma (2025)</strong>
              <em>Esscher transform</em>
            </button>
          </div>

          <div className="fig5-connector fig5-connector--merge" aria-hidden>
            <span className="fig5-merge-left" />
            <span className="fig5-merge-right" />
            <span className="fig5-merge-bar" />
            <span className="fig5-merge-stem" />
          </div>

          <button
            type="button"
            className={`fig5-node ${active === "monte" ? "active" : ""}`}
            onClick={() => pick("monte")}
          >
            <span className="fig5-node-kicker">05 · Simulation</span>
            <strong>Monte Carlo simulation</strong>
            <em>Simulated cash flows &amp; prices</em>
          </button>

          <div className="fig5-connector" aria-hidden>
            <span />
          </div>

          <button
            type="button"
            className={`fig5-node fig5-node--select ${active === "select" ? "active" : ""}`}
            onClick={() => pick("select")}
          >
            <span className="fig5-node-kicker">06 · Selection</span>
            <strong>Compare &amp; select</strong>
            <em>Wang–Ma gap · operator choice</em>
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="panel fig5-detail"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.28 }}
          >
            {detail.badge && <span className="chip">{detail.badge}</span>}
            <h3>{detail.title}</h3>
            <p>{detail.body}</p>
            {detail.formula && <pre className="fig5-formula">{detail.formula}</pre>}
            <div className="fig5-detail-nav">
              <button
                type="button"
                className="btn"
                disabled={playOrder.indexOf(active) === 0}
                onClick={() => {
                  const i = playOrder.indexOf(active);
                  pick(playOrder[Math.max(0, i - 1)]);
                }}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={playOrder.indexOf(active) === playOrder.length - 1}
                onClick={() => {
                  const i = playOrder.indexOf(active);
                  pick(playOrder[Math.min(playOrder.length - 1, i + 1)]);
                }}
              >
                Next step
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <ModelCriteriaTable />
    </div>
  );
}
