import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { hypotheses, objectives, problemStatement } from "../data/research";
import { useSyncedCaption } from "../components/SceneShell";

type NodeId = "problem" | "hypotheses" | "objectives";

const nodes: { id: NodeId; label: string; kicker: string }[] = [
  { id: "problem", label: "Research problem", kicker: "01" },
  { id: "hypotheses", label: "Hypotheses H1–H5", kicker: "02" },
  { id: "objectives", label: "Objectives", kicker: "03" },
];

export function HypothesesFlowDiagram() {
  const [active, setActive] = useState<NodeId>("problem");
  const [openH, setOpenH] = useState("H1");
  const { setCaption } = useSyncedCaption();

  const activate = (id: NodeId) => {
    setActive(id);
    if (id === "problem") {
      setCaption("Research problem: physical risk is mapped — financial pricing for Egypt is missing.");
    } else if (id === "hypotheses") {
      setCaption("Five testable claims (H1–H5) convert the gap into an empirical agenda.");
    } else {
      setCaption("Four objectives: build loss distribution → Wang → Ma → compare spreads.");
    }
  };

  return (
    <div className="hypo-flow">
      <div className="hypo-flow-rail" role="tablist" aria-label="Problem to objectives">
        {nodes.map((n, i) => (
          <div key={n.id} className="hypo-flow-item">
            <button
              type="button"
              role="tab"
              aria-selected={active === n.id}
              className={`hypo-flow-node ${active === n.id ? "active" : ""}`}
              onClick={() => activate(n.id)}
            >
              <span className="hypo-flow-kicker">{n.kicker}</span>
              <strong>{n.label}</strong>
            </button>
            {i < nodes.length - 1 && (
              <span className="hypo-flow-arrow" aria-hidden>
                →
              </span>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="panel hypo-flow-panel"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
        >
          {active === "problem" && (
            <>
              <h3>Research problem</h3>
              <p className="hypo-flow-copy">{problemStatement}</p>
            </>
          )}

          {active === "hypotheses" && (
            <>
              <h3>Hypotheses H1–H5</h3>
              <div className="hypo-flow-list">
                {hypotheses.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    className={`hypo-flow-card ${openH === h.id ? "active" : ""}`}
                    onClick={() => setOpenH(h.id)}
                  >
                    <strong>{h.id}</strong>
                    <span>{h.text}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {active === "objectives" && (
            <>
              <h3>Objectives</h3>
              <ol className="hypo-flow-objectives">
                {objectives.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ol>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
