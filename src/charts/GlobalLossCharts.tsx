import ReactECharts from "echarts-for-react";
import { yearlyClimateLosses, decadeLosses } from "../data/research";
import { useEffect, useMemo, useState } from "react";
import { chartTheme } from "./chartTheme";
import { useSyncedCaption } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import { ChartDualView } from "../components/ChartDualView";
import { pdfFigures } from "../data/pdfFigures";
import { useIsMobile } from "../hooks/useMediaQuery";

type Mode = "both" | "insured" | "uninsured";

export function GlobalLossCharts() {
  const [mode, setMode] = useState<Mode>("both");
  const [decadeIdx, setDecadeIdx] = useState(decadeLosses.length - 1);
  const [activeYear, setActiveYear] = useState(2024);
  const [pdfFocus, setPdfFocus] = useState<"fig1" | "fig2">("fig1");
  const isMobile = useIsMobile();
  const chartH = isMobile ? 200 : 240;
  const decade = decadeLosses[decadeIdx];
  const yearRow =
    yearlyClimateLosses.find((d) => d.year === activeYear) ?? yearlyClimateLosses.at(-2)!;
  const { setCaption } = useSyncedCaption();

  useEffect(() => {
    const gapPct = ((yearRow.uninsured / yearRow.total) * 100).toFixed(1);
    setCaption(
      `${activeYear}: total $${yearRow.total}bn · insured $${yearRow.insured}bn · uninsured $${yearRow.uninsured}bn (gap ~${gapPct}%). Compare with PDF Figure ${pdfFocus === "fig1" ? "1" : "2"}.`,
    );
  }, [activeYear, yearRow, pdfFocus, setCaption]);

  const option = useMemo(() => {
    const t = chartTheme();
    const series = [];
    if (mode === "both" || mode === "insured") {
      series.push({
        name: "Insured",
        type: "bar",
        stack: mode === "both" ? "loss" : undefined,
        data: yearlyClimateLosses.map((d) => d.insured),
        itemStyle: { color: t.insured },
        animationDuration: 900,
        animationEasing: "cubicOut",
      });
    }
    if (mode === "both" || mode === "uninsured") {
      series.push({
        name: "Uninsured",
        type: "bar",
        stack: mode === "both" ? "loss" : undefined,
        data: yearlyClimateLosses.map((d) => d.uninsured),
        itemStyle: { color: t.uninsured },
        animationDuration: 900,
        animationEasing: "cubicOut",
      });
    }
    series.push({
      name: "Total",
      type: "line",
      data: yearlyClimateLosses.map((d) => d.total),
      itemStyle: { color: t.nile },
      lineStyle: { width: 3 },
      symbolSize: 10,
      animationDuration: 1100,
      markPoint: {
        data: [
          {
            name: String(activeYear),
            coord: [String(activeYear), yearRow.total],
            value: yearRow.total,
          },
        ],
        itemStyle: { color: t.proposed },
        label: { formatter: "{b}", color: t.text },
      },
    });

    return {
      backgroundColor: "transparent",
      animation: true,
      textStyle: { color: t.muted, fontFamily: "Cairo, system-ui, sans-serif" },
      tooltip: {
        trigger: "axis",
        backgroundColor: t.tooltipBg,
        borderColor: t.tooltipBorder,
        textStyle: { color: t.tooltipText },
      },
      legend: { textStyle: { color: t.muted }, top: 0 },
      grid: { left: 48, right: 16, top: 40, bottom: 32 },
      xAxis: {
        type: "category",
        data: yearlyClimateLosses.map((d) => String(d.year)),
        axisLabel: { color: t.axis },
        axisLine: { lineStyle: { color: t.grid } },
      },
      yAxis: {
        type: "value",
        name: "USD bn",
        nameTextStyle: { color: t.muted },
        axisLabel: { color: t.axis },
        splitLine: { lineStyle: { color: t.grid } },
      },
      series,
    };
  }, [mode, activeYear, yearRow]);

  const fig = pdfFocus === "fig1" ? pdfFigures.fig1 : pdfFigures.fig2;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div className="tabs">
        <button
          type="button"
          className={`tab ${pdfFocus === "fig1" ? "active" : ""}`}
          onClick={() => setPdfFocus("fig1")}
        >
          PDF Figure 1
        </button>
        <button
          type="button"
          className={`tab ${pdfFocus === "fig2" ? "active" : ""}`}
          onClick={() => setPdfFocus("fig2")}
        >
          PDF Figure 2
        </button>
      </div>

      <ChartDualView
        figureLabel={fig.label}
        sourceNote={fig.source}
        originalSrc={fig.src}
        originalAlt={fig.alt}
        defaultView="both"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="grid-3">
            <div className="metric">
              <div className="label">{activeYear} total</div>
              <div className="value">
                <CountUp value={yearRow.total} prefix="$" suffix="bn" />
              </div>
            </div>
            <div className="metric">
              <div className="label">Insured</div>
              <div className="value" style={{ color: "var(--insured)" }}>
                <CountUp value={yearRow.insured} prefix="$" suffix="bn" />
              </div>
            </div>
            <div className="metric">
              <div className="label">Uninsured</div>
              <div className="value" style={{ color: "var(--uninsured)" }}>
                <CountUp value={yearRow.uninsured} prefix="$" suffix="bn" />
              </div>
            </div>
          </div>

          <div className="tabs">
            {(
              [
                ["both", "Insured + Uninsured"],
                ["insured", "Insured only"],
                ["uninsured", "Uninsured only"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                className={`tab ${mode === id ? "active" : ""}`}
                onClick={() => setMode(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="year-chip-rail">
            {yearlyClimateLosses.map((d) => (
              <button
                key={d.year}
                type="button"
                className={`hazard-chip ${activeYear === d.year ? "active" : ""}`}
                onClick={() => setActiveYear(d.year)}
              >
                {d.year}
              </button>
            ))}
          </div>

          <div className="panel">
            <h3>Interactive reconstruction · click a year</h3>
            <ReactECharts
              option={option}
              style={{ height: chartH }}
              opts={{ renderer: "svg" }}
              notMerge
              onEvents={{
                click: (params: { name?: string }) => {
                  const y = Number(params.name);
                  if (!Number.isNaN(y)) setActiveYear(y);
                },
              }}
            />
            <div className="source">
              Interactive layer aligned to proposal anchors (2024/2025 Munich Re + Table 1). Use PDF
              original beside it for the exact proposal chart.
            </div>
          </div>
        </div>
      </ChartDualView>

      <div className="panel">
        <h3>Table 1 — Decade averages & protection gap</h3>
        <input
          type="range"
          min={0}
          max={decadeLosses.length - 1}
          value={decadeIdx}
          onChange={(e) => setDecadeIdx(Number(e.target.value))}
          style={{ width: "100%" }}
        />
        <div className="grid-3" style={{ marginTop: 12 }}>
          <div className="metric">
            <div className="label">{decade.decade}</div>
            <div className="value">
              $<CountUp value={decade.total} decimals={1} suffix="bn" />
            </div>
            <div className="note">Avg total losses</div>
          </div>
          <div className="metric">
            <div className="label">Insured / Uninsured</div>
            <div className="value" style={{ fontSize: "1.3rem" }}>
              <span style={{ color: "var(--insured)" }}>${decade.insured}bn</span>
              {" / "}
              <span style={{ color: "var(--uninsured)" }}>${decade.uninsured}bn</span>
            </div>
          </div>
          <div className="metric">
            <div className="label">Protection gap</div>
            <div className="value" style={{ color: "var(--uninsured)" }}>
              <CountUp value={decade.gap} decimals={2} suffix="%" />
            </div>
            <div className="note">Fell from 81.5% (1980s) → 56.9% (2020s)</div>
          </div>
        </div>
        <div className="source">Table 1 · Researcher’s elaboration based on Munich Re</div>
      </div>
    </div>
  );
}
