import { useState } from "react";
import { hypotheses, objectives, problemStatement } from "../data/research";
import { SceneShell } from "../components/SceneShell";

export function HypothesesScene() {
  const [open, setOpen] = useState("H1");

  return (
    <SceneShell
      sectionId="hypotheses"
      eyebrow="07 · Problem · Hypotheses · Objectives"
      title="From gap to testable claims"
      lede="Interactive cards — Full text restores complete H1–H5 and objectives wording from the proposal."
    >
      <div className="panel" style={{ marginBottom: 12 }}>
        <h3>Research problem</h3>
        <p style={{ margin: 0, lineHeight: 1.55 }}>{problemStatement}</p>
      </div>

      <div className="grid-2" style={{ flex: 1, minHeight: 0 }}>
        <div className="panel" style={{ overflowY: "auto" }}>
          <h3>Hypotheses H1–H5</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {hypotheses.map((h) => (
              <button
                key={h.id}
                onClick={() => setOpen(h.id)}
                style={{
                  textAlign: "left",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 12,
                  background: open === h.id ? "var(--bg-soft)" : "transparent",
                  color: "inherit",
                }}
              >
                <strong style={{ color: "var(--proposed)" }}>{h.id}</strong>
                <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.45 }}>{h.text}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>Objectives</h3>
          <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.55 }}>
            {objectives.map((o) => (
              <li key={o} style={{ marginBottom: 10 }}>
                {o}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SceneShell>
  );
}
