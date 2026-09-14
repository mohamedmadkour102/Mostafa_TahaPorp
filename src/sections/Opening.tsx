import { motion } from "framer-motion";
import { meta } from "../data/research";
import {
  ProposalProse,
  useContentMode,
} from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import { defaultCaptions } from "../data/syncedCaptions";

export function OpeningScene({ onEnter }: { onEnter: () => void }) {
  const { mode, setMode, toggleDrawer, drawerOpen, setDrawerOpen } = useContentMode();

  return (
    <div className={`scene scene-${mode}`}>
      <div className="scene-header-row" style={{ marginBottom: 8 }}>
        <div className="eyebrow">Master’s Thesis Proposal Defense · {meta.researcher}</div>
        <div className="mode-toggle">
          <button
            className={`tab ${mode === "present" ? "active" : ""}`}
            onClick={() => setMode("present")}
            type="button"
          >
            Present
          </button>
          <button
            className={`tab ${mode === "full" ? "active" : ""}`}
            onClick={() => setMode("full")}
            type="button"
          >
            Study
          </button>
          <button className="tab" type="button" onClick={toggleDrawer}>
            Text · T
          </button>
        </div>
      </div>

      <div className={`scene-body ${mode === "full" ? "with-prose" : ""}`} style={{ flex: 1 }}>
        <div
          className="scene-visual"
          style={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 18,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              margin: 0,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.14em",
              color: "var(--nile)",
              fontSize: 13,
            }}
          >
            THE RESEARCH QUESTION
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              margin: 0,
              maxWidth: 900,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 3.2vw, 2.4rem)",
              lineHeight: 1.2,
              fontWeight: 700,
            }}
          >
            {meta.researchQuestion}
          </motion.h1>

          <div className="grid-3" style={{ width: "min(720px, 100%)", marginTop: 8 }}>
            <div className="metric" style={{ textAlign: "left" }}>
              <div className="label">2024 climate losses</div>
              <div className="value">
                <CountUp value={320} prefix="$" suffix="bn" />
              </div>
            </div>
            <div className="metric" style={{ textAlign: "left" }}>
              <div className="label">Uninsured</div>
              <div className="value" style={{ color: "var(--uninsured)" }}>
                <CountUp value={180} prefix="$" suffix="bn" />
              </div>
            </div>
            <div className="metric" style={{ textAlign: "left" }}>
              <div className="label">Egypt adaptation gap</div>
              <div className="value" style={{ color: "var(--proposed)" }}>
                <CountUp value={94.7} decimals={1} prefix="$" suffix="bn" />
              </div>
            </div>
          </div>

          {mode === "present" && (
            <motion.div
              className="synced-caption"
              style={{ maxWidth: 640, textAlign: "left" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="synced-caption-label">Now explaining</span>
              <p>{defaultCaptions.opening}</p>
            </motion.div>
          )}

          <button className="btn btn-primary" onClick={onEnter} style={{ marginTop: 4 }}>
            Explore the Research ↓
          </button>
        </div>

        {mode === "full" && (
          <aside className="scene-prose">
            <ProposalProse sectionId="opening" />
          </aside>
        )}
      </div>

      {/* Drawer handled globally via same provider — opening uses Presentation Escape;
          local open uses ContentMode drawer; SceneShell not wrapping opening, so mount mini drawer */}
      {drawerOpen && (
        <>
          <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)} />
          <aside className="text-drawer" aria-label="Proposal text drawer">
            <div className="drawer-header">
              <strong>Proposal text</strong>
              <button className="btn" type="button" onClick={() => setDrawerOpen(false)}>
                Close · Esc
              </button>
            </div>
            <div className="drawer-body">
              <ProposalProse sectionId="opening" />
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
