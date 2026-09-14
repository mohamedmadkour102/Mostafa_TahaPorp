import { useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { chartTheme } from "./chartTheme";
import { useIsMobile } from "../hooks/useMediaQuery";

/** Illustrative sandbox — not final empirical thesis results */
export function SimulationLab() {
  const [running, setRunning] = useState(false);
  const [iter, setIter] = useState(0);
  const [attachment, setAttachment] = useState(0.5);
  const [climateTrend, setClimateTrend] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!running) return;
    if (iter >= 12) {
      setRunning(false);
      return;
    }
    const t = setTimeout(() => setIter((i) => i + 1), 220);
    return () => clearTimeout(t);
  }, [running, iter]);

  const paths = useMemo(() => {
    const wang = [];
    const ma = [];
    let w = 180;
    let m = 165;
    for (let i = 0; i <= 12; i++) {
      const attachBoost = attachment * 18;
      const trendBoost = climateTrend ? i * 1.8 : 0;
      w = Math.max(40, w - 9 + Math.sin(i) * 3 + attachBoost * 0.15);
      m = Math.max(35, m - 8.2 + Math.cos(i) * 2.5 + attachBoost * 0.05);
      wang.push(+(w + trendBoost * 0.4).toFixed(1));
      ma.push(+(m + trendBoost * 0.25).toFixed(1));
    }
    return { wang, ma };
  }, [attachment, climateTrend]);

  const visible = {
    wang: paths.wang.slice(0, iter + 1),
    ma: paths.ma.slice(0, iter + 1),
  };

  const gap = iter > 0 ? +(visible.wang[iter] - visible.ma[iter]).toFixed(1) : 0;

  const option = useMemo(() => {
    const t = chartTheme();
    return {
      backgroundColor: "transparent",
      legend: { textStyle: { color: t.muted } },
      tooltip: {
        trigger: "axis",
        backgroundColor: t.tooltipBg,
        borderColor: t.tooltipBorder,
        textStyle: { color: t.tooltipText },
      },
      grid: { left: 48, right: 16, top: 36, bottom: 28 },
      xAxis: {
        type: "category",
        data: Array.from({ length: 13 }, (_, i) => `t${i}`),
        axisLabel: { color: t.axis },
      },
      yAxis: {
        type: "value",
        name: "Illustrative spread",
        axisLabel: { color: t.axis },
        splitLine: { lineStyle: { color: t.grid } },
      },
      series: [
        {
          name: "Wang (2004)",
          type: "line",
          data: visible.wang,
          itemStyle: { color: t.proposed },
          lineStyle: { width: 3 },
        },
        {
          name: "Ma (2025)",
          type: "line",
          data: visible.ma,
          itemStyle: { color: t.nile },
          lineStyle: { width: 3 },
        },
      ],
    };
  }, [visible]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <span className="chip">Illustrative demo — pending empirical results</span>
        <button
          className="btn btn-primary"
          onClick={() => {
            setIter(0);
            setRunning(true);
          }}
        >
          Run simulation
        </button>
        <label style={{ fontSize: 13, color: "var(--text-muted)" }}>
          Attachment layer {(attachment * 100).toFixed(0)}%
          <input
            type="range"
            min={0.1}
            max={0.95}
            step={0.05}
            value={attachment}
            onChange={(e) => {
              setAttachment(Number(e.target.value));
              setIter(0);
              setRunning(false);
            }}
            style={{ display: "block", width: 180, marginTop: 4 }}
          />
        </label>
        <label style={{ fontSize: 13, display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={climateTrend}
            onChange={(e) => {
              setClimateTrend(e.target.checked);
              setIter(0);
              setRunning(false);
            }}
          />
          Climate-driven frequency trend (H5)
        </label>
      </div>

      <div className="grid-3">
        <div className="metric">
          <div className="label">Wang path</div>
          <div className="value" style={{ color: "var(--proposed)" }}>
            {visible.wang[iter] ?? "—"}
          </div>
        </div>
        <div className="metric">
          <div className="label">Ma path</div>
          <div className="value" style={{ color: "var(--nile)" }}>
            {visible.ma[iter] ?? "—"}
          </div>
        </div>
        <div className="metric">
          <div className="label">Pricing gap (H1/H3)</div>
          <div className="value" style={{ color: "var(--uninsured)" }}>
            {gap}
          </div>
          <div className="note">Gap tends to widen with higher attachment in the demo</div>
        </div>
      </div>

      <div className="panel" style={{ flex: 1 }}>
        <h3>Monte Carlo path — Wang vs Ma</h3>
        <ReactECharts
          option={option}
          style={{ height: isMobile ? 200 : 280 }}
          opts={{ renderer: "svg" }}
        />
        <div className="source">
          Conceptual sandbox for defense storytelling only — replace with calibrated outputs in
          Chapter 4
        </div>
      </div>
    </div>
  );
}
