import ReactECharts from "echarts-for-react";
import { useEffect, useMemo, useState } from "react";
import {
  adaptationSectors,
  adaptationSummary,
  mitigationSectors,
  mitigationSummary,
} from "../data/research";
import { chartTheme } from "./chartTheme";
import { useSyncedCaption } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";
import { useIsMobile } from "../hooks/useMediaQuery";

type Plan = "mitigation" | "adaptation" | "compare";

function toBn(costMillion: number) {
  return +(costMillion / 1000).toFixed(2);
}

export function FinancingGapCharts() {
  const [plan, setPlan] = useState<Plan>("compare");
  const { setCaption } = useSyncedCaption();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (plan === "mitigation") {
      setCaption(
        `Mitigation programs ~$211bn total — only ~$57.6bn secured → gap ~$${mitigationSummary.gapBn}bn.`,
      );
    } else if (plan === "adaptation") {
      setCaption(
        `Adaptation programs ~$113bn total — ~$18.3bn secured → gap ~$${adaptationSummary.gapBn}bn (NCCS 2050).`,
      );
    } else {
      setCaption(
        "Compare the two gaps, then land the punchline: NatCat helps — heavy tails still need ILS / CAT bonds.",
      );
    }
  }, [plan, setCaption]);

  const option = useMemo(() => {
    const t = chartTheme();
    const baseAnim = { animationDuration: 900, animationEasing: "cubicOut" as const };
    if (plan === "compare") {
      return {
        backgroundColor: "transparent",
        animation: true,
        ...baseAnim,
        tooltip: {
          trigger: "axis",
          backgroundColor: t.tooltipBg,
          borderColor: t.tooltipBorder,
          textStyle: { color: t.tooltipText },
        },
        legend: { textStyle: { color: t.muted } },
        grid: { left: 80, right: 24, top: 40, bottom: 30 },
        xAxis: {
          type: "category",
          data: ["Total need", "Secured", "Financing gap"],
          axisLabel: { color: t.axis },
        },
        yAxis: {
          type: "value",
          name: "USD bn",
          axisLabel: { color: t.axis },
          splitLine: { lineStyle: { color: t.grid } },
        },
        series: [
          {
            name: "Mitigation",
            type: "bar",
            data: [
              mitigationSummary.totalBn,
              mitigationSummary.securedBn,
              mitigationSummary.gapBn,
            ],
            itemStyle: { color: t.nile },
            ...baseAnim,
          },
          {
            name: "Adaptation",
            type: "bar",
            data: [
              adaptationSummary.totalBn,
              adaptationSummary.securedBn,
              adaptationSummary.gapBn,
            ],
            itemStyle: { color: t.uninsured },
            ...baseAnim,
          },
        ],
      };
    }

    const rows = plan === "mitigation" ? mitigationSectors : adaptationSectors;
    const top = [...rows].sort((a, b) => b.cost - a.cost).slice(0, 6);

    return {
      backgroundColor: "transparent",
      animation: true,
      ...baseAnim,
      tooltip: {
        trigger: "axis",
        backgroundColor: t.tooltipBg,
        borderColor: t.tooltipBorder,
        textStyle: { color: t.tooltipText },
        formatter: (params: { name: string; value: number }[]) => {
          const p = params[0];
          return `${p.name}<br/>$${p.value} bn`;
        },
      },
      grid: { left: 120, right: 24, top: 20, bottom: 30 },
      xAxis: {
        type: "value",
        axisLabel: { color: t.axis },
        splitLine: { lineStyle: { color: t.grid } },
      },
      yAxis: {
        type: "category",
        data: top.map((r) => r.sector).reverse(),
        axisLabel: { color: t.text, width: 100, overflow: "truncate" },
      },
      series: [
        {
          type: "bar",
          data: top.map((r) => toBn(r.cost)).reverse(),
          itemStyle: {
            color: plan === "mitigation" ? t.nile : t.uninsured,
            borderRadius: [0, 6, 6, 0],
          },
          ...baseAnim,
        },
      ],
    };
  }, [plan]);

  const summary = plan === "adaptation" ? adaptationSummary : mitigationSummary;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div className="tabs">
        <button
          className={`tab ${plan === "mitigation" ? "active" : ""}`}
          onClick={() => setPlan("mitigation")}
        >
          Table 3 · Mitigation
        </button>
        <button
          className={`tab ${plan === "adaptation" ? "active" : ""}`}
          onClick={() => setPlan("adaptation")}
        >
          Table 4 · Adaptation
        </button>
        <button
          className={`tab ${plan === "compare" ? "active" : ""}`}
          onClick={() => setPlan("compare")}
        >
          Compare gaps
        </button>
      </div>

      <div className="grid-3">
        <div className="metric">
          <div className="label">
            {plan === "compare" ? "Mitigation gap" : "Total program cost"}
          </div>
          <div className="value">
            $
            <CountUp
              value={plan === "compare" ? mitigationSummary.gapBn : summary.totalBn}
              decimals={1}
              suffix="bn"
            />
          </div>
        </div>
        <div className="metric">
          <div className="label">
            {plan === "compare" ? "Adaptation gap" : "Secured financing"}
          </div>
          <div className="value" style={{ color: "var(--insured)" }}>
            $
            <CountUp
              value={plan === "compare" ? adaptationSummary.gapBn : summary.securedBn}
              decimals={1}
              suffix="bn"
            />
          </div>
        </div>
        <div className="metric">
          <div className="label">{plan === "compare" ? "Key message" : "Financing gap"}</div>
          <div
            className="value"
            style={{
              color: "var(--uninsured)",
              fontSize: plan === "compare" ? "1.05rem" : "1.8rem",
            }}
          >
            {plan === "compare"
              ? "NatCat helps — heavy tails need ILS / CAT bonds"
              : `$${summary.gapBn}bn`}
          </div>
        </div>
      </div>

      <div className="panel" style={{ flex: 1 }}>
        <h3>
          {plan === "mitigation" && "Table 3 — Mitigation plan by sector"}
          {plan === "adaptation" && "Table 4 — Adaptation plan by sector"}
          {plan === "compare" && "Tables 3 & 4 — Financing gaps side by side"}
        </h3>
        <ReactECharts
          option={option}
          style={{ height: isMobile ? 220 : 300 }}
          opts={{ renderer: "svg" }}
          notMerge
        />
        <div className="source">
          Source: Ministry of Environment (2022) · Egypt National Climate Change Strategy 2050
        </div>
      </div>
    </div>
  );
}
