import { contributions } from "../data/research";
import { SceneShell } from "../components/SceneShell";

export function ContributionScene() {
  return (
    <SceneShell
      sectionId="contribution"
      eyebrow="10 · Contribution"
      title="Three doors of impact"
      lede="Academic · NatCat · Government — Full text restores §6 Research Importance wording."
    >
      <div className="grid-3" style={{ flex: 1 }}>
        {contributions.map((c, i) => (
          <div key={c.title} className="panel" style={{ display: "flex", flexDirection: "column" }}>
            <div className="eyebrow">0{i + 1}</div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                marginTop: 8,
              }}
            >
              {c.title}
            </h3>
            <p style={{ lineHeight: 1.55, color: "var(--text-muted)", flex: 1 }}>{c.text}</p>
          </div>
        ))}
      </div>
    </SceneShell>
  );
}
