/** Shared ECharts theme tokens reading CSS variables */
export function chartTheme() {
  const scope =
    (document.querySelector(".finance-weather-wrap") as HTMLElement | null) ??
    document.documentElement;
  const s = getComputedStyle(scope);
  const g = (name: string, fallback: string) =>
    s.getPropertyValue(name).trim() || fallback;

  return {
    axis: g("--chart-axis", "#5a6b7d"),
    grid: g("--chart-grid", "rgba(26,35,50,0.08)"),
    tooltipBg: g("--chart-tooltip-bg", "#fff"),
    tooltipBorder: g("--chart-tooltip-border", "rgba(26,35,50,0.12)"),
    tooltipText: g("--chart-tooltip-text", "#1a2332"),
    pieBorder: g("--chart-pie-border", "#fff"),
    text: g("--text", "#1a2332"),
    muted: g("--text-muted", "#5a6b7d"),
    insured: g("--insured", "#2f9a74"),
    uninsured: g("--uninsured", "#c45c3e"),
    nile: g("--nile", "#2f6f8f"),
    proposed: g("--proposed", "#b8860b"),
  };
}
