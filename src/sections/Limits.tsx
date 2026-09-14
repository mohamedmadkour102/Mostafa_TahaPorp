import { limitations } from "../data/research";
import { SceneShell } from "../components/SceneShell";

export function LimitsScene() {
  return (
    <SceneShell
      sectionId="limits"
      eyebrow="11 · Limitations & structure"
      title="Credibility through scope discipline"
      lede="Cards for quick defense — Full text includes §8 Research Structure and §9 Limitations."
    >
      <div className="grid-3" style={{ flex: 1 }}>
        {limitations.map((l) => (
          <div key={l.title} className="panel">
            <h3>{l.title}</h3>
            <p style={{ margin: 0, lineHeight: 1.55, color: "var(--text-muted)" }}>{l.text}</p>
          </div>
        ))}
      </div>
      <div className="metric" style={{ marginTop: 12 }}>
        <div className="label">Design implication</div>
        <div className="value" style={{ fontSize: "1.25rem" }}>
          Small sample (n = 18) is why Wang’s t-correction is primary — not a footnote.
        </div>
      </div>
    </SceneShell>
  );
}
