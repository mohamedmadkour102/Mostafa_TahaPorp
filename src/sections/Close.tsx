import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { meta } from "../data/research";
import { SceneShell, useSyncedCaption } from "../components/SceneShell";

const path = [
  {
    id: "data",
    label: "EM-DAT",
    detail: "Egyptian hydro losses · n = 18 · 1987–2025",
  },
  {
    id: "price",
    label: "Wang & Ma",
    detail: "Distortion operators · primary vs benchmark",
  },
  {
    id: "sim",
    label: "Monte Carlo",
    detail: "Risk-adjusted CAT bond cash flows & prices",
  },
  {
    id: "use",
    label: "NatCat / ILS",
    detail: "Capacity for Egypt’s insurance & fiscal agenda",
  },
] as const;

export function CloseScene() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const { setCaption } = useSyncedCaption();
  const active = path[step];

  useEffect(() => {
    setCaption(`${active.label}: ${active.detail}`);
  }, [active, setCaption]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % path.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <SceneShell
      sectionId="close"
      eyebrow="13 · Close"
      title="Back to the research question"
      lede="Walk the proposed answer path — then open the floor for questions."
    >
      <div className="close-lab">
        <motion.blockquote
          className="close-question"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {meta.researchQuestion}
        </motion.blockquote>

        <div className="close-path" role="tablist">
          {path.map((p, i) => (
            <div key={p.id} className="close-path-item">
              <button
                type="button"
                role="tab"
                className={`close-path-node ${step === i ? "active" : ""} ${i < step ? "done" : ""}`}
                onClick={() => {
                  setPaused(true);
                  setStep(i);
                }}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{p.label}</strong>
              </button>
              {i < path.length - 1 && (
                <span
                  className={`close-path-arrow ${i < step ? "lit" : ""}`}
                  aria-hidden
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className="panel close-path-detail"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="eyebrow">Proposed answer path · step 0{step + 1}</div>
            <h3>{active.label}</h3>
            <p>{active.detail}</p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="close-cta"
          animate={{ boxShadow: ["0 0 0 0 rgba(47,111,143,0)", "0 0 0 10px rgba(47,111,143,0.12)", "0 0 0 0 rgba(47,111,143,0)"] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          <span className="chip">Questions welcome</span>
          <p>
            {meta.researcher} · {meta.shortTitle}
          </p>
        </motion.div>
      </div>
    </SceneShell>
  );
}
