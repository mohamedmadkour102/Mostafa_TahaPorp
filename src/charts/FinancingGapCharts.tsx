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
        legend: {
          textStyle: { color: t.muted },
          top: 4,
          left: "center",
          itemGap: 18,
        },
        grid: { left: 72, right: 20, top: 52, bottom: 36, containLabel: false },
        xAxis: {
          type: "category",
          data: ["Total need", "Secured", "Financing gap"],
          axisLabel: { color: t.axis, fontSize: 12, margin: 12 },
          axisTick: { alignWithLabel: true },
        },
        yAxis: {
          type: "value",
          name: "USD bn",
          nameGap: 12,
          nameTextStyle: { color: t.muted, padding: [0, 0, 0, 8] },
          axisLabel: { color: t.axis },
          splitLine: { lineStyle: { color: t.grid } },
        },
        series: [
          {
            name: "Mitigation",
            type: "bar",
            barGap: "28%",
            data: [
              mitigationSummary.totalBn,
              mitigationSummary.securedBn,
              mitigationSummary.gapBn,
            ],
            itemStyle: { color: t.nile, borderRadius: [6, 6, 0, 0] },
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
            itemStyle: { color: t.uninsured, borderRadius: [6, 6, 0, 0] },
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
      grid: { left: 8, right: 28, top: 16, bottom: 24, containLabel: true },
      xAxis: {
        type: "value",
        axisLabel: { color: t.axis },
        splitLine: { lineStyle: { color: t.grid } },
      },
      yAxis: {
        type: "category",
        data: top.map((r) => r.sector).reverse(),
        axisLabel: {
          color: t.text,
          width: isMobile ? 88 : 120,
          overflow: "truncate",
          fontSize: 12,
        },
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
  }, [plan, isMobile]);

  const summary = plan === "adaptation" ? adaptationSummary : mitigationSummary;

  return (
    <div className="finance-lab">
      <div className="finance-filter-bar" role="tablist" aria-label="Financing plan filter">
        <button
          type="button"
          role="tab"
          className={`tab ${plan === "mitigation" ? "active" : ""}`}
          onClick={() => setPlan("mitigation")}
        >
          Table 3 · Mitigation
        </button>
        <button
          type="button"
          role="tab"
          className={`tab ${plan === "adaptation" ? "active" : ""}`}
          onClick={() => setPlan("adaptation")}
        >
          Table 4 · Adaptation
        </button>
        <button
          type="button"
          role="tab"
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

      <div className="panel finance-chart-panel">
        <h3 className="finance-chart-title">
          {plan === "mitigation" && "Table 3 — Mitigation plan by sector"}
          {plan === "adaptation" && "Table 4 — Adaptation plan by sector"}
          {plan === "compare" && "Tables 3 & 4 — Financing gaps side by side"}
        </h3>
        <div className="finance-chart-frame">
          <ReactECharts
            option={option}
            style={{ height: isMobile ? 240 : 300, width: "100%" }}
            opts={{ renderer: "svg" }}
            notMerge
          />
        </div>
        <div className="source">
          Source: Ministry of Environment (2022) · Egypt National Climate Change Strategy 2050
        </div>
      </div>
    </div>
  );
}
