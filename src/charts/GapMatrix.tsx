import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { gapMatrix } from "../data/research";
import { useSyncedCaption } from "../components/SceneShell";

export function GapMatrix() {
  const [active, setActive] = useState<number | null>(0);
  const [converged, setConverged] = useState(false);
  const { setCaption } = useSyncedCaption();

  useEffect(() => {
    if (converged) {
      setCaption(
        "Four research islands collapse into one claim: first hydrometeorological CAT bond pricing framework for Egypt.",
      );
    } else if (active !== null) {
      setCaption(`${gapMatrix[active].theme} — Gap: ${gapMatrix[active].gap}`);
    }
  }, [active, converged, setCaption]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <span className="chip">Table 5 · Research gap matrix</span>
        <button
          className="btn btn-primary"
          onClick={() => setConverged((v) => !v)}
        >
          {converged ? "Reset landscape" : "Converge → Egypt gap"}
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          position: "relative",
          minHeight: 220,
        }}
      >
        {gapMatrix.map((row, i) => (
          <motion.button
            key={row.theme}
            layout
            onClick={() => {
              setActive(i);
              setConverged(false);
            }}
            className="panel"
            style={{
              textAlign: "left",
              cursor: "pointer",
              borderColor:
                active === i && !converged ? "rgba(61,158,189,0.6)" : "var(--border)",
              opacity: converged ? 0.35 : 1,
              color: "inherit",
            }}
            animate={
              converged
                ? { x: (1.5 - i) * 12, y: 40, scale: 0.92 }
                : { x: 0, y: 0, scale: 1 }
            }
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <div className="eyebrow">0{i + 1}</div>
            <h3 style={{ fontSize: 14, minHeight: 40 }}>{row.theme}</h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}>
              {row.existing}
            </p>
          </motion.button>
        ))}

        <AnimatePresence>
          {converged && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="panel"
              style={{
                position: "absolute",
                left: "50%",
                top: "42%",
                transform: "translate(-50%, -50%)",
                width: "min(520px, 90%)",
                borderColor: "rgba(226,184,74,0.55)",
                background: "linear-gradient(160deg, #1a3550, #132a40)",
                zIndex: 2,
                textAlign: "center",
              }}
            >
              <div className="chip" style={{ marginBottom: 8 }}>
                ★ Proposed research
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem" }}>
                First hydrometeorological CAT bond pricing framework for Egypt
              </h3>
              <p className="lede" style={{ margin: "8px auto 0" }}>
                Physical & macro studies exist. Pricing frameworks exist elsewhere. Egypt still
                has no empirical hydro CAT bond valuation model.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {active !== null && !converged && (
        <div className="panel">
          <h3>{gapMatrix[active].theme}</h3>
          <div className="grid-2" style={{ flex: "unset" }}>
            <div>
              <div className="label" style={{ color: "var(--text-muted)", fontSize: 12 }}>
                Existing contribution
              </div>
              <p style={{ margin: "6px 0 0", lineHeight: 1.45 }}>{gapMatrix[active].existing}</p>
              <div className="source">{gapMatrix[active].studies}</div>
            </div>
            <div>
              <div className="label" style={{ color: "var(--uninsured)", fontSize: 12 }}>
                Research gap
              </div>
              <p style={{ margin: "6px 0 0", lineHeight: 1.45 }}>{gapMatrix[active].gap}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
