import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  futureBeats,
  mapHotspots,
  type MapMode,
} from "../data/mapHotspots";
import { useSyncedCaption } from "../components/SceneShell";

const MAPS = {
  river: "/maps/fig4-river-flood.png",
  coastal: "/maps/fig4-coastal-flood.png",
} as const;

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
  const spots = mapHotspots.filter(
    (h) => h.modes.includes(mode) || h.modes.includes("compare"),
  );

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
            <span className="hazard-pin-dot" />
            <span className="hazard-pin-label">{h.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function HazardMapStudio() {
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

  const select = (id: string) => setActiveId(id);

  return (
    <div className="hazard-studio">
      <div className="hazard-studio-toolbar">
        <div className="tabs">
          <button
            type="button"
            className={`tab ${mode === "river" ? "active" : ""}`}
            onClick={() => setMode("river")}
          >
            River flood
          </button>
          <button
            type="button"
            className={`tab ${mode === "coastal" ? "active" : ""}`}
            onClick={() => setMode("coastal")}
          >
            Coastal flood
          </button>
          <button
            type="button"
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
          >
            −
          </button>
          <span>{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            className="btn"
            onClick={() => setZoom((z) => Math.min(1.8, +(z + 0.15).toFixed(2)))}
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
          <div className="hazard-map-card">
            <div className="hazard-map-card-title">River flood risk · GFDRR</div>
            <MapCanvas
              mode="river"
              activeId={activeId}
              onSelect={select}
              zoom={zoom}
            />
          </div>
        )}
        {(mode === "coastal" || mode === "compare") && (
          <div className="hazard-map-card">
            <div className="hazard-map-card-title">Coastal flood risk · GFDRR</div>
            <MapCanvas
              mode="coastal"
              activeId={activeId}
              onSelect={select}
              zoom={zoom}
            />
          </div>
        )}
      </div>

      <div className="hazard-hotspot-rail">
        {mapHotspots.map((h) => (
          <button
            key={h.id}
            type="button"
            className={`hazard-chip ${activeId === h.id ? "active" : ""}`}
            onClick={() => select(h.id)}
          >
            {h.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          className="hazard-story panel"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
        >
          <div className="eyebrow">Selected hotspot</div>
          <h3 style={{ marginTop: 4 }}>{active.label}</h3>
          <div className="hazard-metric">{active.metric}</div>
          <p style={{ margin: "8px 0 0", lineHeight: 1.55 }}>{active.detail}</p>
          <div className="source">{active.source}</div>
        </motion.div>
      </AnimatePresence>

      <div className="panel hazard-future">
        <div className="hazard-future-head">
          <h3 style={{ margin: 0 }}>Future pressure timeline</h3>
          <span className="chip">{beat.year}</span>
        </div>
        <input
          type="range"
          min={0}
          max={futureBeats.length - 1}
          value={futureIdx}
          onChange={(e) => setFutureIdx(Number(e.target.value))}
          style={{ width: "100%", marginTop: 10 }}
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

      <div className="hazard-punch panel">
        <strong>Defense punchline</strong>
        <p>
          Physical exposure is already mapped (GFDRR Figure 4) — but Egypt still lacks an
          empirical hydrometeorological CAT bond pricing framework to transfer that risk to
          capital markets.
        </p>
      </div>

      <div className="source">
        Figure 4 · Global Facility for Disaster Reduction and Recovery (GFDRR) — river flood
        (left) and coastal flood (right), as in Proposal V4
      </div>
    </div>
  );
}
