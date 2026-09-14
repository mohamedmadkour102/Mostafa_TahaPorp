import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSyncedCaption } from "../components/SceneShell";

const nodes = [
  {
    id: "investors",
    title: "Investors",
    subtitle: "Capital markets",
    detail:
      "Receive coupon for bearing catastrophe risk — typically low correlation with financial markets.",
    caption:
      "Investors provide principal to the SPV and earn a coupon for holding catastrophe risk.",
  },
  {
    id: "spv",
    title: "SPV",
    subtitle: "Special Purpose Vehicle",
    detail:
      "Issues the CAT bond, holds collateral, and governs payout logic via the trigger.",
    caption: "The SPV warehouses collateral and sits between sponsor and capital markets.",
  },
  {
    id: "trigger",
    title: "Trigger",
    subtitle: "Indemnity · Index · Parametric",
    detail:
      "Defines when principal is diverted to the sponsor to pay claims after a qualifying event.",
    caption: "If the trigger fires, collateral flows to the sponsor instead of returning to investors.",
  },
  {
    id: "sponsor",
    title: "Sponsor",
    subtitle: "Insurer / NatCat pool",
    detail:
      "Transfers hydrometeorological tail risk seeking capacity beyond traditional reinsurance.",
    caption: "Sponsor receives claim-paying capacity precisely when hydrometeorological losses hit.",
  },
];

export function CatBondDiagram() {
  const [active, setActive] = useState("spv");
  const [flowOn, setFlowOn] = useState(true);
  const { setCaption } = useSyncedCaption();
  const node = nodes.find((n) => n.id === active)!;

  const activate = (id: string) => {
    setActive(id);
    const n = nodes.find((x) => x.id === id);
    if (n) setCaption(n.caption);
  };

  return (
    <div className="panel">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h3 style={{ margin: 0 }}>What is a CAT Bond? — Interactive structure</h3>
        <button className="btn" type="button" onClick={() => setFlowOn((v) => !v)}>
          {flowOn ? "Pause flow" : "Play money flow"}
        </button>
      </div>

      <div className="cat-flow" data-active={flowOn}>
        <div className="cat-flow-track">
          <span className="cat-flow-label">Investors</span>
          <div className="cat-flow-line">
            {flowOn && (
              <>
                <motion.span
                  className="cat-flow-dot dot-a"
                  animate={{ x: ["0%", "100%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                />
                <motion.span
                  className="cat-flow-dot dot-b"
                  animate={{ x: ["0%", "100%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "linear", delay: 1.4 }}
                />
              </>
            )}
          </div>
          <span className="cat-flow-label">SPV / Collateral</span>
          <div className="cat-flow-line">
            {flowOn && (
              <motion.span
                className="cat-flow-dot dot-c"
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: 0.6 }}
              />
            )}
          </div>
          <span className="cat-flow-label">Trigger?</span>
          <div className="cat-flow-branch">
            <div className="cat-flow-branch-item">
              <span>Event → Sponsor</span>
              <div className="cat-flow-line danger">
                {flowOn && (
                  <motion.span
                    className="cat-flow-dot dot-danger"
                    animate={{ x: ["0%", "100%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.3 }}
                  />
                )}
              </div>
            </div>
            <div className="cat-flow-branch-item">
              <span>No event → Investors</span>
              <div className="cat-flow-line safe">
                {flowOn && (
                  <motion.span
                    className="cat-flow-dot dot-safe"
                    animate={{ x: ["0%", "100%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 1.1 }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          marginTop: 16,
        }}
      >
        {nodes.map((n, i) => (
          <button
            key={n.id}
            onClick={() => activate(n.id)}
            className="metric"
            style={{
              cursor: "pointer",
              borderColor: active === n.id ? "rgba(47,111,143,0.55)" : "var(--border)",
              textAlign: "left",
            }}
          >
            <div className="label">Step {i + 1}</div>
            <div className="value" style={{ fontSize: "1.15rem" }}>
              {n.title}
            </div>
            <div className="note">{n.subtitle}</div>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={node.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          style={{ marginTop: 14 }}
        >
          <div className="chip">{node.title}</div>
          <p style={{ margin: "10px 0 0", lineHeight: 1.55, maxWidth: "70ch" }}>{node.detail}</p>
        </motion.div>
      </AnimatePresence>

      <div className="source" style={{ marginTop: 14 }}>
        Definitions synthesized from Froot (2001), Cummins (2008), OECD (2021), Barrieu &
        Albertini (2009) — as reviewed in the proposal
      </div>
    </div>
  );
}
