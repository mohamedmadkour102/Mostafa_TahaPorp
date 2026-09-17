import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { litHazardStudies, type LitStudyCard } from "../data/research";
import { SceneShell, useSyncedCaption } from "../components/SceneShell";
import { CountUp } from "../components/CountUp";

type Horizon = "past" | "future";
type Peril = "flood" | "storm" | "all";

const places = [
  { id: "sinai", label: "Sinai", x: 78, y: 38, match: "Sinai" },
  { id: "ras", label: "Ras Ghareb", x: 72, y: 52, match: "Ras Ghareb" },
  { id: "alex", label: "Alexandria", x: 48, y: 18, match: "Alexandria" },
  { id: "delta", label: "Delta", x: 55, y: 28, match: "Delta" },
  { id: "national", label: "National", x: 58, y: 55, match: "National" },
];

export function LitHazardScene() {
  const [horizon, setHorizon] = useState<Horizon>("past");
  const [peril, setPeril] = useState<Peril>("all");
  const [activeId, setActiveId] = useState(litHazardStudies[0].id);
  const { setCaption } = useSyncedCaption();

  const filtered = useMemo(() => {
    return litHazardStudies.filter((s) => {
      if (s.mode !== horizon) return false;
      if (peril !== "all" && s.peril !== peril) return false;
      return true;
    });
  }, [horizon, peril]);

  const active: LitStudyCard =
    filtered.find((s) => s.id === activeId) ?? filtered[0] ?? litHazardStudies[0];

  useEffect(() => {
    if (!filtered.some((s) => s.id === activeId) && filtered[0]) {
      setActiveId(filtered[0].id);
    }
  }, [filtered, activeId]);

  useEffect(() => {
    setCaption(
      `${active.authors} (${active.year}) · ${active.place}: ${active.finding.slice(0, 140)}…`,
    );
  }, [active, setCaption]);

  const selectPlace = (match: string) => {
    const hit = filtered.find((s) => s.place.includes(match));
    if (hit) setActiveId(hit.id);
  };

  return (
    <SceneShell
      sectionId="litHazard"
      eyebrow="05 · Literature Review · §2.1"
      title="Egypt’s flood and storm literature — proven risk, rising future"
      lede="Click studies and map points. Toggle Past vs Future, Floods vs Storms — every card is from the proposal’s §2.1."
    >
      <div className="lit-lab">
        <div className="lit-lab-controls">
          <div className="tabs">
            <button
              type="button"
              className={`tab ${horizon === "past" ? "active" : ""}`}
              onClick={() => setHorizon("past")}
            >
              Past & present evidence
            </button>
            <button
              type="button"
              className={`tab ${horizon === "future" ? "active" : ""}`}
              onClick={() => setHorizon("future")}
            >
              Future projections
            </button>
          </div>
          <div className="tabs">
            {(
              [
                ["all", "All perils"],
                ["flood", "Floods"],
                ["storm", "Storms / Medicanes"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={`tab ${peril === id ? "active" : ""}`}
                onClick={() => setPeril(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="lit-lab-grid">
          <div className="lit-map panel">
            <h3>Where the studies speak</h3>
            <div className="lit-map-canvas" aria-hidden>
              <svg viewBox="0 0 100 100" className="lit-map-svg">
                <path
                  d="M42 8 L62 10 L78 22 L88 40 L82 62 L70 78 L55 88 L40 82 L32 60 L28 35 Z"
                  className="lit-map-land"
                />
                <path d="M48 12 L58 14 L60 28 L52 32 L46 24 Z" className="lit-map-delta" />
              </svg>
              {places.map((p) => {
                const lit = filtered.some((s) => s.place.includes(p.match));
                return (
                  <button
                    key={p.id}
                    type="button"
                    className={`lit-map-pin ${lit ? "lit" : ""} ${
                      active.place.includes(p.match) ? "active" : ""
                    }`}
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    onClick={() => selectPlace(p.match)}
                    title={p.label}
                  >
                    <span className="lit-map-pin-dot" />
                    <span className="lit-map-pin-label">{p.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="source">
              {filtered.length} studies in view · {horizon === "past" ? "observed impacts" : "projections"}
            </p>
          </div>

          <div className="lit-cards">
            <div className="lit-card-rail">
              {filtered.map((s, i) => (
                <motion.button
                  key={s.id}
                  type="button"
                  className={`lit-study-chip ${s.id === active.id ? "active" : ""}`}
                  onClick={() => setActiveId(s.id)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <span className="lit-study-chip-year">{s.year}</span>
                  <span className="lit-study-chip-name">{s.authors}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="lit-study-detail panel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="lit-study-meta">
                  <span className={`lit-badge peril-${active.peril}`}>
                    {active.peril === "flood" ? "Flood" : "Storm"}
                  </span>
                  <span className="lit-badge">{active.mode === "past" ? "Evidence" : "Projection"}</span>
                  <span className="lit-badge quiet">{active.place}</span>
                </div>
                <h3>
                  {active.authors} ({active.year})
                </h3>
                <p className="lit-study-finding">{active.finding}</p>
                <div className="lit-study-metric">
                  {active.metricValue != null ? (
                    <>
                      <div className="label">{active.metricLabel}</div>
                      <div className="value">
                        <CountUp
                          key={active.id}
                          value={active.metricValue}
                          decimals={active.metricDecimals ?? 0}
                          prefix={active.metricPrefix ?? ""}
                          suffix={active.metricSuffix ?? ""}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="label">Key marker</div>
                      <div className="value" style={{ fontSize: "1.25rem" }}>
                        {active.metricText}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SceneShell>
  );
}
