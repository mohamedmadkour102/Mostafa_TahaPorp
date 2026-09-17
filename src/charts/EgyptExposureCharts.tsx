import ReactECharts from "echarts-for-react";
import { useEffect, useMemo, useState } from "react";
import { egyptDisasterMix, climateIndices, egyptFacts } from "../data/research";
import { chartTheme } from "./chartTheme";
import { useSyncedCaption } from "../components/SceneShell";
import { HazardMapStudio } from "./HazardMapStudio";
import { ChartDualView } from "../components/ChartDualView";
import { pdfFigures } from "../data/pdfFigures";
import { useIsMobile } from "../hooks/useMediaQuery";

export function EgyptExposureCharts() {
  const [selected, setSelected] = useState(0);
  const [focus, setFocus] = useState<"maps" | "mix">("maps");
  const isMobile = useIsMobile();
  const { setCaption } = useSyncedCaption();

  useEffect(() => {
    if (focus !== "mix") return;
    const mix = egyptDisasterMix[selected];
    setCaption(
      `Figure 3 · ${mix.name}: ~${mix.value}% — compare with the original CRED pie from Proposal V4.`,
    );
  }, [selected, focus, setCaption]);

  const pie = useMemo(() => {
    const t = chartTheme();
    return {
      backgroundColor: "transparent",
      animation: true,
      animationDuration: 900,
      tooltip: {
        trigger: "item",
        backgroundColor: t.tooltipBg,
        borderColor: t.tooltipBorder,
        textStyle: { color: t.tooltipText },
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "68%"],
          avoidLabelOverlap: true,
          itemStyle: { borderRadius: 6, borderColor: t.pieBorder, borderWidth: 3 },
          label: { color: t.text, formatter: "{b}\n{d}%" },
          selectedMode: "single",
          data: egyptDisasterMix.map((d, i) => ({
            name: d.name,
            value: d.value,
            selected: i === selected,
            itemStyle: { color: d.color },
          })),
        },
      ],
    };
  }, [selected]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div className="tabs">
        <button
          type="button"
          className={`tab ${focus === "maps" ? "active" : ""}`}
          onClick={() => setFocus("maps")}
        >
          Figure 4 · Hazard maps (PDF)
        </button>
        <button
          type="button"
          className={`tab ${focus === "mix" ? "active" : ""}`}
          onClick={() => setFocus("mix")}
        >
          Figure 3 · Disaster mix (PDF + interactive)
        </button>
      </div>

      {focus === "maps" ? (
        <HazardMapStudio />
      ) : (
        <>
          <ChartDualView
            figureLabel={pdfFigures.fig3.label}
            sourceNote={pdfFigures.fig3.source}
            originalSrc={pdfFigures.fig3.src}
            originalAlt={pdfFigures.fig3.alt}
            defaultView="both"
          >
            <div className="panel">
              <h3>Interactive pie · click a segment</h3>
              <ReactECharts
                option={pie}
                style={{ height: isMobile ? 210 : 260 }}
                notMerge
                onEvents={{
                  click: (params: { dataIndex: number }) => setSelected(params.dataIndex),
                }}
              />
              <div className="year-chip-rail" style={{ marginTop: 8 }}>
                {egyptDisasterMix.map((d, i) => (
                  <button
                    key={d.name}
                    type="button"
                    className={`hazard-chip ${selected === i ? "active" : ""}`}
                    onClick={() => setSelected(i)}
                  >
                    {d.name.split("(")[0].trim()} · {d.value}%
                  </button>
                ))}
              </div>
              <div className="metric" style={{ marginTop: 10 }}>
                <div className="label">Selected</div>
                <div className="value" style={{ fontSize: "1.2rem" }}>
                  {egyptDisasterMix[selected].name}
                </div>
                <div className="note">
                  Proposal text: Floods ~41% · Storms & extreme temperature ~40%
                </div>
              </div>
            </div>
          </ChartDualView>

          <div className="panel">
            <h3>Bridge to Figure 4 maps</h3>
            <p style={{ margin: 0, lineHeight: 1.55, color: "var(--text-muted)" }}>
              The CRED mix shows hydrometeorological dominance. GFDRR Figure 4 then locates river
              and coastal exposure geographically — still without an Egyptian hydro CAT pricing
              framework.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginTop: 12 }}
              onClick={() => setFocus("maps")}
            >
              Open Figure 4 interactive maps →
            </button>
          </div>

          <div className="grid-4 egypt-facts-row">
            {egyptFacts.map((f) => (
              <div key={f.label} className="metric">
                <div className="label">{f.label}</div>
                <div className="value">{f.value}</div>
                <div className="note">{f.note}</div>
              </div>
            ))}
          </div>

          <div className="grid-3">
            {climateIndices.map((idx) => (
              <div key={idx.name} className="panel" style={{ padding: 14 }}>
                <div className="eyebrow">Table 2 · {idx.year}</div>
                <h3 style={{ marginTop: 6 }}>{idx.name}</h3>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.4rem",
                    color: "var(--proposed)",
                  }}
                >
                  {idx.rank}
                </div>
                <p className="lede" style={{ marginTop: 8, fontSize: 13 }}>
                  {idx.detail}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
