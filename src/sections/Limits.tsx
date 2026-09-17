import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { limitations } from "../data/research";
import { SceneShell, useSyncedCaption } from "../components/SceneShell";

const implications = [
  "Why Wang’s t-correction is primary — not a footnote.",
  "A tailored national framework beats a forced MENA generalization.",
  "Hydro-only focus keeps the pricing problem identifiable with EM-DAT.",
];

export function LimitsScene() {
  const [active, setActive] = useState(0);
  const { setCaption } = useSyncedCaption();
  const item = limitations[active];

  useEffect(() => {
    setCaption(`${item.title}: ${item.text}`);
  }, [item, setCaption]);

  return (
    <SceneShell
      sectionId="limits"
      eyebrow="12 · Limitations & structure"
      title="Credibility through scope discipline"
      lede="Click each limit — then read the design implication. Full text includes §8–§9."
    >
      <div className="limits-lab">
        <div className="limits-rail" role="tablist">
          {limitations.map((l, i) => (
            <button
              key={l.title}
              type="button"
              role="tab"
              className={`limits-chip ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {l.title}
            </button>
          ))}
        </div>

        <div className="limits-grid">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.title}
              className="panel limits-card"
              initial={{ opacity: 0, rotateX: -8 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            key={`imp-${active}`}
            className="metric limits-implication"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="label">Design implication</div>
            <div className="value" style={{ fontSize: "1.15rem" }}>
              {implications[active]}
            </div>
          </motion.div>
        </div>

        <p className="limits-footer">
          Small sample (n = 18) is why Wang’s uncertainty correction sits at the center of the method — not at the margin.
        </p>
      </div>
    </SceneShell>
  );
}
