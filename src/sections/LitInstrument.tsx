import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { litInstrumentPath } from "../data/research";
import { SceneShell, useSyncedCaption } from "../components/SceneShell";

const flowNodes = [
  {
    id: "sponsor",
    title: "Sponsor",
    detail: "Insurer / NatCat — buys protection, sheds hydro tail risk",
  },
  {
    id: "spv",
    title: "SPV",
    detail: "Issues the bond · holds collateral · applies the trigger",
  },
  {
    id: "investors",
    title: "Investors",
    detail: "Provide capital · earn coupon · lose principal if trigger hits",
  },
];

export function LitInstrumentScene() {
  const [step, setStep] = useState(0);
  const [flowOn, setFlowOn] = useState(true);
  const [flowMode, setFlowMode] = useState<"premium" | "payout">("premium");
  const active = litInstrumentPath[step];
  const { setCaption } = useSyncedCaption();
  const showFlow = active.id === "how" || active.id === "tool";

  useEffect(() => {
    setCaption(`${active.label}: ${active.title}`);
  }, [active, setCaption]);

  useEffect(() => {
    if (active.id === "how") {
      setFlowMode("premium");
      setFlowOn(true);
    }
  }, [active.id]);

  return (
    <SceneShell
      sectionId="litInstrument"
      eyebrow="06 · Literature Review · §2.2"
      title="CAT bonds: what they are, how they work, and Egypt’s need"
      lede="Five cards for the committee: the tool → how it operates → how literature prices it → where it was applied → why Egypt needs it."
    >
      <div className="lit-lab">
        <div className="lit-path-rail" role="tablist">
          {litInstrumentPath.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              className={`lit-path-step ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}
              onClick={() => setStep(i)}
            >
              <span className="lit-path-idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="lit-path-label">{s.label}</span>
            </button>
          ))}
        </div>

        <div className={`lit-instrument-grid ${showFlow ? "" : "single"}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="panel lit-path-panel"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.32 }}
            >
              <p className="lit-stage-kicker">{active.label}</p>
              <h3 className="lit-stage-title">{active.title}</h3>
              <p className="lit-stage-line">{active.text}</p>

              {active.hook && <p className="lit-hook-line">{active.hook}</p>}

              {active.bullets && active.bullets.length > 0 && (
                <ul className="lit-bullet-list">
                  {active.bullets.map((b) => (
                    <li key={b.slice(0, 48)}>{b}</li>
                  ))}
                </ul>
              )}

              {active.id === "egyptNeed" && (
                <div className="lit-empty-chair">
                  <span className="lit-chip">Documented Egypt hydro risk (§2.1)</span>
                  <span className="lit-chip">CAT tool exists in literature</span>
                  <span className="lit-chip lit-chip-empty">Missing: Egypt pricing framework</span>
                </div>
              )}

              <div className="lit-path-nav">
                <button
                  type="button"
                  className="btn"
                  disabled={step === 0}
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={step === litInstrumentPath.length - 1}
                  onClick={() => setStep((s) => Math.min(litInstrumentPath.length - 1, s + 1))}
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {showFlow && (
            <div className="panel lit-flow-panel">
              <div className="lit-flow-head">
                <h3>{active.id === "how" ? "Watch the mechanism" : "Structure preview"}</h3>
                <div className="tabs">
                  <button
                    type="button"
                    className={`tab ${flowMode === "premium" ? "active" : ""}`}
                    onClick={() => setFlowMode("premium")}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    className={`tab ${flowMode === "payout" ? "active" : ""}`}
                    onClick={() => setFlowMode("payout")}
                  >
                    Trigger fires
                  </button>
                  <button type="button" className="tab" onClick={() => setFlowOn((v) => !v)}>
                    {flowOn ? "Pause" : "Play"}
                  </button>
                </div>
              </div>

              <div className={`lit-flow ${flowMode}`} data-active={flowOn}>
                {flowNodes.map((n, i) => (
                  <div key={n.id} className="lit-flow-node">
                    <div className="lit-flow-node-title">{n.title}</div>
                    <div className="lit-flow-node-detail">{n.detail}</div>
                    {i < flowNodes.length - 1 && (
                      <div className="lit-flow-pipe">
                        {flowOn && (
                          <motion.span
                            className="lit-flow-dot"
                            animate={
                              flowMode === "premium"
                                ? { x: ["0%", "100%"] }
                                : { x: ["100%", "0%"] }
                            }
                            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <p className="source">
                {flowMode === "premium"
                  ? "Normal: investors fund collateral · sponsor pays coupon for protection"
                  : "Trigger: collateral released to sponsor for claims · investors absorb the loss"}
              </p>
            </div>
          )}
        </div>
      </div>
    </SceneShell>
  );
}
