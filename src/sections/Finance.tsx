import { FinancingGapCharts } from "../charts/FinancingGapCharts";
import { SceneShell } from "../components/SceneShell";
import { WeatherAtmosphere } from "../components/WeatherAtmosphere";

export function FinanceScene() {
  return (
    <div className="finance-weather-wrap">
      <WeatherAtmosphere />
      <SceneShell
        sectionId="finance"
        eyebrow="04 · Strategy & financing gap"
        title="NatCat is necessary — still insufficient for heavy tails"
        lede="Tables 3 & 4 from Egypt’s Climate Strategy 2050, with full NatCat / ILS narrative from the proposal."
      >
        <FinancingGapCharts />
      </SceneShell>
    </div>
  );
}
