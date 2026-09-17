import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contributions } from "../data/research";
import { SceneShell, useSyncedCaption } from "../components/SceneShell";

const icons = ["◈", "⬡", "◎"];

export function ContributionScene() {
  const [active, setActive] = useState(0);
  const { setCaption } = useSyncedCaption();
  const item = contributions[active];

  useEffect(() => {
    setCaption(`${item.title}: ${item.text}`);
  }, [item, setCaption]);

  return (
    <SceneShell
      sectionId="contribution"
      eyebrow="11 · Contribution"
      title="Three doors of impact"
      lede="Click each door — Academic · NatCat · Government. Full text restores §6 Research Importance."
    >
      <div className="impact-lab">
        <div className="impact-doors" role="tablist">
          {contributions.map((c, i) => (
            <button
              key={c.title}
              type="button"
              role="tab"
              aria-selected={active === i}
              className={`impact-door ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="impact-door-icon" aria-hidden>
                {icons[i]}
              </span>
              <span className="impact-door-num">0{i + 1}</span>
              <strong>{c.title}</strong>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={item.title}
            className="panel impact-panel"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="eyebrow">Door 0{active + 1}</div>
            <h3 className="impact-title">{item.title}</h3>
            <p className="impact-copy">{item.text}</p>
            <div className="impact-nav">
              {contributions.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`pipeline-dot ${i === active ? "active" : ""} ${i < active ? "done" : ""}`}
                  onClick={() => setActive(i)}
                  aria-label={`Open door ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SceneShell>
  );
}
