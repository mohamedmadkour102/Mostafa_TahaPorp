import { meta } from "../data/research";
import { SceneShell } from "../components/SceneShell";

export function CloseScene() {
  return (
    <SceneShell
      sectionId="close"
      eyebrow="12 · Close"
      title={meta.researchQuestion}
      lede="Thank you — questions welcome. Use Full text for the closing proposal framing."
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 14,
          minHeight: 220,
        }}
      >
        <p className="lede" style={{ maxWidth: 640 }}>
          Proposed answer path: EM-DAT Egyptian hydro losses → Wang & Ma distortion operators →
          Monte Carlo CAT bond valuation → model selection for Egypt’s NatCat / ILS agenda.
        </p>
        <div className="chip">Thank you — questions welcome</div>
        <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
          {meta.researcher} · {meta.shortTitle}
        </p>
      </div>
    </SceneShell>
  );
}
