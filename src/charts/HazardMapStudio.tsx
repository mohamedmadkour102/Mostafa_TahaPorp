import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  futureBeats,
  mapHotspots,
  type MapMode,
} from "../data/mapHotspots";
import { useSyncedCaption } from "../components/SceneShell";
import { EgyptBuiltInMap, type EgyptExplorerTheme } from "./EgyptBuiltInMap";
import { NileSatelliteHazardMap } from "./NileSatelliteHazardMap";
import { filterExplorerSpots } from "../data/egyptExplorer";

const MAPS = {
  river: "/maps/fig4-river-flood.png",
  coastal: "/maps/fig4-coastal-flood.png",
} as const;

type MapView = "gfdrr" | "explorer";
type SkinTheme = "midnight" | "classic" | "azure" | "storm";

function useSkinTheme() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [skin, setSkin] = useState<SkinTheme>("classic");

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const sync = () => {
      if (el.closest(".midnight-skin")) setSkin("midnight");
      else if (el.closest(".azure-skin")) setSkin("azure");
      else if (el.closest(".storm-skin")) setSkin("storm");
      else setSkin("classic");
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      subtree: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  return { rootRef, skin };
}

function explorerThemeFor(skin: SkinTheme): EgyptExplorerTheme {
  if (skin === "midnight") return "midnight";
  if (skin === "azure") return "azure";
  return "classic";
}

function MapCanvas({
  mode,
  activeId,
  onSelect,
  zoom,
}: {
  mode: "river" | "coastal";
  activeId: string | null;
  onSelect: (id: string) => void;
  zoom: number;
}) {
  const spots = mapHotspots.filter((h) => h.modes.includes(mode));

  return (
    <div className="hazard-map-frame">
      <div
        className="hazard-map-zoom"
        style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
      >
        <img
          src={MAPS[mode]}
          alt={
            mode === "river"
              ? "Egypt river flood exposure (GFDRR)"
              : "Egypt coastal flood exposure (GFDRR)"
          }
          className="hazard-map-img"
          draggable={false}
        />
        {spots.map((h) => (
          <button
            key={h.id}
            type="button"
            className={`hazard-pin ${activeId === h.id ? "active" : ""}`}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            onClick={() => onSelect(h.id)}
            title={h.label}
          >
            <span className="hazard-pin-pulse" aria-hidden="true" />
            <span className="hazard-pin-dot" />
            <span className="hazard-pin-label">{h.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Default scientific studio — GFDRR Figure 4 with hotspots + future timeline */
function ClassicHazardStudio() {
  const [mode, setMode] = useState<MapMode>("compare");
  const [activeId, setActiveId] = useState<string>("delta");
  const [futureIdx, setFutureIdx] = useState(0);
  const [zoom, setZoom] = useState(1);
  const { setCaption } = useSyncedCaption();

  const active = useMemo(
    () => mapHotspots.find((h) => h.id === activeId) ?? mapHotspots[0],
    [activeId],
  );
  const beat = futureBeats[futureIdx];

  useEffect(() => {
    setCaption(
      `Figure 4 · ${active.label}: ${active.metric} — physical exposure mapped by GFDRR, not yet priced as Egyptian hydro CAT risk.`,
    );
  }, [active, setCaption]);

  return (
    <div className="hazard-studio">
      <div className="hazard-studio-toolbar">
        <div className="hazard-mode-tabs tabs" role="tablist" aria-label="Hazard layer">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "river"}
            className={`tab ${mode === "river" ? "active" : ""}`}
            onClick={() => setMode("river")}
          >
            River flood
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "coastal"}
            className={`tab ${mode === "coastal" ? "active" : ""}`}
            onClick={() => setMode("coastal")}
          >
            Coastal flood
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "compare"}
            className={`tab ${mode === "compare" ? "active" : ""}`}
            onClick={() => setMode("compare")}
          >
            Compare
          </button>
        </div>
        <div className="hazard-zoom-controls">
          <button
            type="button"
            className="btn"
            onClick={() => setZoom((z) => Math.max(1, +(z - 0.15).toFixed(2)))}
            aria-label="Zoom out"
          >
            −
          </button>
          <span className="hazard-zoom-value">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            className="btn"
            onClick={() => setZoom((z) => Math.min(1.8, +(z + 0.15).toFixed(2)))}
            aria-label="Zoom in"
          >
            +
          </button>
          <button type="button" className="btn" onClick={() => setZoom(1)}>
            Reset
          </button>
        </div>
      </div>

      <div className={`hazard-maps ${mode === "compare" ? "compare" : ""}`}>
        {(mode === "river" || mode === "compare") && (
          <div className="hazard-map-card hazard-map-card--river">
            <div className="hazard-map-card-title">
              <span className="hazard-map-badge">Fig 4 · River</span>
              <strong>River flood risk · GFDRR</strong>
            </div>
            <MapCanvas
              mode="river"
              activeId={activeId}
              onSelect={setActiveId}
              zoom={zoom}
            />
          </div>
        )}
        {(mode === "coastal" || mode === "compare") && (
          <div className="hazard-map-card hazard-map-card--coastal">
            <div className="hazard-map-card-title">
              <span className="hazard-map-badge">Fig 4 · Coastal</span>
              <strong>Coastal flood risk · GFDRR</strong>
            </div>
            <MapCanvas
              mode="coastal"
              activeId={activeId}
              onSelect={setActiveId}
              zoom={zoom}
            />
          </div>
        )}
      </div>

      <div className="hazard-hotspot-rail" aria-label="Hotspots">
        {mapHotspots.map((h) => (
          <button
            key={h.id}
            type="button"
            className={`hazard-chip ${activeId === h.id ? "active" : ""}`}
            onClick={() => setActiveId(h.id)}
          >
            {h.label}
          </button>
        ))}
      </div>

      <div className="hazard-lower">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className="hazard-story panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            <div className="eyebrow">Selected hotspot</div>
            <h3>{active.label}</h3>
            <div className="hazard-metric">{active.metric}</div>
            <p>{active.detail}</p>
            <div className="source">{active.source}</div>
          </motion.div>
        </AnimatePresence>

        <div className="panel hazard-future">
          <div className="hazard-future-head">
            <h3>Future pressure timeline</h3>
            <span className="chip">{beat.year}</span>
          </div>
          <input
            type="range"
            min={0}
            max={futureBeats.length - 1}
            value={futureIdx}
            onChange={(e) => setFutureIdx(Number(e.target.value))}
            className="hazard-future-range"
            aria-label="Future timeline"
          />
          <div className="hazard-future-labels">
            {futureBeats.map((b, i) => (
              <button
                key={b.id}
                type="button"
                className={`tab ${futureIdx === i ? "active" : ""}`}
                onClick={() => setFutureIdx(i)}
              >
                {b.label}
              </button>
            ))}
          </div>
          <ul className="hazard-future-list">
            {beat.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hazard-punch panel">
        <strong>Defense punchline</strong>
        <p>
          Physical exposure is already mapped (GFDRR Figure 4) — but Egypt still
          lacks an empirical hydrometeorological CAT bond pricing framework to
          transfer that risk to capital markets.
        </p>
      </div>

      <div className="source hazard-studio-source">
        Figure 4 · Global Facility for Disaster Reduction and Recovery (GFDRR) —
        river flood (left) and coastal flood (right), as in Proposal V4
      </div>
    </div>
  );
}

/**
 * Nile Blue: one real satellite map (V5 style). River / Coastal swaps the overlay.
 */
function AzureHazardStudio() {
  const [layer, setLayer] = useState<"river" | "coastal">("river");
  const [activeId, setActiveId] = useState<string>("delta");
  const [futureIdx, setFutureIdx] = useState(0);
  const { setCaption } = useSyncedCaption();

  const layerSpots = useMemo(() => filterExplorerSpots(layer), [layer]);

  const active = useMemo(
    () => layerSpots.find((h) => h.id === activeId) ?? layerSpots[0],
    [layerSpots, activeId],
  );
  const beat = futureBeats[futureIdx];

  useEffect(() => {
    if (!layerSpots.some((h) => h.id === activeId) && layerSpots[0]) {
      setActiveId(layerSpots[0].id);
    }
  }, [layerSpots, activeId]);

  useEffect(() => {
    setCaption(
      `Figure 4 · ${layer} · ${active.label}: ${active.metric} — physical exposure mapped by GFDRR, not yet priced as Egyptian hydro CAT risk.`,
    );
  }, [active, layer, setCaption]);

  return (
    <div className="hazard-studio hazard-studio--single">
      <div className="hazard-studio-toolbar">
        <div className="hazard-mode-tabs tabs" role="tablist" aria-label="Hazard layer">
          <button
            type="button"
            role="tab"
            aria-selected={layer === "river"}
            className={`tab ${layer === "river" ? "active" : ""}`}
            onClick={() => setLayer("river")}
          >
            River flood
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={layer === "coastal"}
            className={`tab ${layer === "coastal" ? "active" : ""}`}
            onClick={() => setLayer("coastal")}
          >
            Coastal flood
          </button>
        </div>
      </div>

      <div className="hazard-maps">
        <div className={`hazard-map-card hazard-map-card--${layer}`}>
          <div className="hazard-map-card-title">
            <span className="hazard-map-badge">
              {layer === "river" ? "River" : "Coastal"}
            </span>
            <strong>
              {layer === "river" ? "River flood — live map" : "Coastal flood — live map"}
            </strong>
          </div>
          <div className="nile-sat-frame">
            <NileSatelliteHazardMap
              spots={layerSpots}
              activeId={active.id}
              layer={layer}
              onSelect={setActiveId}
            />
          </div>
        </div>
      </div>

      <div className="hazard-hotspot-rail" aria-label="Hotspots">
        {layerSpots.map((h) => (
          <button
            key={h.id}
            type="button"
            className={`hazard-chip ${active.id === h.id ? "active" : ""}`}
            onClick={() => setActiveId(h.id)}
          >
            {h.label}
          </button>
        ))}
      </div>

      <div className="hazard-lower">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className="hazard-story panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            <div className="eyebrow">Selected hotspot</div>
            <h3>{active.label}</h3>
            <div className="hazard-metric">{active.metric}</div>
            <p>{active.detail}</p>
            <div className="source">{active.source}</div>
          </motion.div>
        </AnimatePresence>

        <div className="panel hazard-future">
          <div className="hazard-future-head">
            <h3>Future pressure timeline</h3>
            <span className="chip">{beat.year}</span>
          </div>
          <input
            type="range"
            min={0}
            max={futureBeats.length - 1}
            value={futureIdx}
            onChange={(e) => setFutureIdx(Number(e.target.value))}
            className="hazard-future-range"
            aria-label="Future timeline"
          />
          <div className="hazard-future-labels">
            {futureBeats.map((b, i) => (
              <button
                key={b.id}
                type="button"
                className={`tab ${futureIdx === i ? "active" : ""}`}
                onClick={() => setFutureIdx(i)}
              >
                {b.label}
              </button>
            ))}
          </div>
          <ul className="hazard-future-list">
            {beat.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hazard-punch panel">
        <strong>Defense punchline</strong>
        <p>
          Physical exposure is already mapped (GFDRR Figure 4) — but Egypt still
          lacks an empirical hydrometeorological CAT bond pricing framework to
          transfer that risk to capital markets.
        </p>
      </div>

      <div className="source hazard-studio-source">
        Live satellite map of Egypt. River highlights the Nile stem; Coastal
        highlights the northern coast. Spot notes stay the proposal hotspots.
      </div>
    </div>
  );
}

/**
 * Default: GFDRR Figure 4 hazard studio (scientific risk coloring + hotspots).
 * Optional: MapLibre geographic explorer (theme-matched chrome).
 */
export function HazardMapStudio() {
  const { rootRef, skin } = useSkinTheme();
  const [view, setView] = useState<MapView>("gfdrr");

  return (
    <div ref={rootRef} className="hazard-map-studio-root">
      <div className="hazard-view-toggle tabs" role="group" aria-label="Map view">
        <button
          type="button"
          className={`tab ${view === "gfdrr" ? "active" : ""}`}
          onClick={() => setView("gfdrr")}
        >
          GFDRR hazard maps
        </button>
        <button
          type="button"
          className={`tab ${view === "explorer" ? "active" : ""}`}
          onClick={() => setView("explorer")}
        >
          Geographic explorer
        </button>
      </div>

      {view === "gfdrr" ? (
        skin === "azure" ? <AzureHazardStudio /> : <ClassicHazardStudio />
      ) : (
        <EgyptBuiltInMap theme={explorerThemeFor(skin)} />
      )}
    </div>
  );
}
