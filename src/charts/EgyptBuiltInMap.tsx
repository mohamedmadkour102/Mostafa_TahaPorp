import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Map as MapLibreMap,
  Marker as MapLibreMarker,
  NavigationControl,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  EGYPT_MAP_BOUNDS,
  EGYPT_MAP_CENTER,
  EGYPT_MAP_MAX_ZOOM,
  EGYPT_MAP_STYLE_DARK,
  EGYPT_MAP_STYLE_LIGHT,
  EGYPT_MAP_STYLE_NILE,
  EGYPT_MAP_STYLE_SATELLITE_DARK,
  EGYPT_MAP_STYLE_SATELLITE_LIGHT,
  EGYPT_MAP_STYLE_SATELLITE_NILE,
  EGYPT_MAP_ZOOM,
  explorerSpots,
  filterExplorerSpots,
  type ExplorerFilter,
  type ExplorerSpot,
} from "../data/egyptExplorer";
import { useSyncedCaption } from "../components/SceneShell";
import { pdfFigures } from "../data/pdfFigures";

export type EgyptExplorerTheme = "midnight" | "classic" | "azure";

function createMarkerEl(spot: ExplorerSpot) {
  const root = document.createElement("button");
  root.type = "button";
  root.className = "egypt-ml-marker";
  root.dataset.id = spot.id;
  root.title = spot.label;
  root.innerHTML = `
    <span class="egypt-ml-pulse" aria-hidden="true"></span>
    <span class="egypt-ml-dot"></span>
    <span class="egypt-ml-tip">${spot.label}</span>
  `;
  return root;
}

function styleFor(theme: EgyptExplorerTheme, satellite: boolean) {
  if (theme === "classic") {
    return satellite ? EGYPT_MAP_STYLE_SATELLITE_LIGHT : EGYPT_MAP_STYLE_LIGHT;
  }
  if (theme === "azure") {
    return satellite ? EGYPT_MAP_STYLE_SATELLITE_NILE : EGYPT_MAP_STYLE_NILE;
  }
  return satellite ? EGYPT_MAP_STYLE_SATELLITE_DARK : EGYPT_MAP_STYLE_DARK;
}

export function EgyptBuiltInMap({
  theme = "midnight",
}: {
  theme?: EgyptExplorerTheme;
}) {
  const [filter, setFilter] = useState<ExplorerFilter>("all");
  const [pinnedId, setPinnedId] = useState<string>("delta");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [showPdf, setShowPdf] = useState(false);
  const [satellite, setSatellite] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const { setCaption } = useSyncedCaption();

  const mapNodeRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<globalThis.Map<string, MapLibreMarker>>(
    new globalThis.Map(),
  );
  const previewRef = useRef(previewId);
  const pinnedRef = useRef(pinnedId);
  const mapStyle = useMemo(
    () => styleFor(theme, satellite),
    [theme, satellite],
  );

  previewRef.current = previewId;
  pinnedRef.current = pinnedId;

  const visible = useMemo(() => filterExplorerSpots(filter), [filter]);

  const activeId = previewId ?? pinnedId;
  const active: ExplorerSpot =
    visible.find((s) => s.id === activeId) ??
    explorerSpots.find((s) => s.id === pinnedId) ??
    explorerSpots[2];

  const pin = useCallback((id: string) => {
    setPinnedId(id);
    setPreviewId(null);
  }, []);

  useEffect(() => {
    if (!visible.some((s) => s.id === pinnedId)) {
      setPinnedId(visible[0]?.id ?? "delta");
    }
  }, [filter, visible, pinnedId]);

  useEffect(() => {
    setCaption(
      `Egypt MapLibre explorer · ${active.label}: ${active.metric} — hover to preview, click to pin. GFDRR Figure 4 remains the scientific source.`,
    );
  }, [active, setCaption]);

  useEffect(() => {
    if (!mapNodeRef.current || mapRef.current || showPdf) return;

    let cancelled = false;
    const container = mapNodeRef.current;

    const map = new MapLibreMap({
      container,
      style: mapStyle,
      center: EGYPT_MAP_CENTER,
      zoom: EGYPT_MAP_ZOOM,
      maxZoom: EGYPT_MAP_MAX_ZOOM,
      fadeDuration: 0,
      attributionControl: { compact: true },
      cooperativeGestures: false,
      maxBounds: [
        [20, 18],
        [42, 36],
      ],
    });

    map.addControl(
      new NavigationControl({ visualizePitch: false }),
      "top-right",
    );
    mapRef.current = map;

    const finishReady = () => {
      if (cancelled) return;
      map.resize();
      map.fitBounds(EGYPT_MAP_BOUNDS, { padding: 40, duration: 0 });
      setMapReady(true);
      window.setTimeout(() => {
        if (!cancelled) map.resize();
      }, 150);
      window.setTimeout(() => {
        if (!cancelled) map.resize();
      }, 450);
    };

    map.on("error", (e) => {
      console.warn("[Egypt map]", e.error);
    });

    map.once("load", finishReady);

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            if (!cancelled) map.resize();
          })
        : null;
    ro?.observe(container);

    return () => {
      cancelled = true;
      ro?.disconnect();
      markersRef.current.forEach((m) => m.remove());
      markersRef.current.clear();
      map.remove();
      mapRef.current = null;
      setMapReady(false);
    };
  }, [showPdf, mapStyle]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    const keep = new Set(visible.map((s) => s.id));

    markersRef.current.forEach((marker, id) => {
      if (!keep.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    visible.forEach((spot) => {
      if (markersRef.current.has(spot.id)) return;

      const el = createMarkerEl(spot);
      el.addEventListener("mouseenter", () => setPreviewId(spot.id));
      el.addEventListener("mouseleave", () => setPreviewId(null));
      el.addEventListener("focus", () => setPreviewId(spot.id));
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        pin(spot.id);
      });

      const marker = new MapLibreMarker({ element: el, anchor: "center" })
        .setLngLat([spot.lng, spot.lat])
        .addTo(map);
      markersRef.current.set(spot.id, marker);
    });

    markersRef.current.forEach((marker, id) => {
      const el = marker.getElement();
      el.classList.toggle(
        "active",
        id === (previewRef.current ?? pinnedRef.current),
      );
      el.classList.toggle("pinned", id === pinnedRef.current);
    });
  }, [visible, mapReady, pin]);

  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const el = marker.getElement();
      el.classList.toggle("active", id === activeId);
      el.classList.toggle("pinned", id === pinnedId);
    });
  }, [activeId, pinnedId]);

  useEffect(() => {
    const map = mapRef.current;
    const spot = explorerSpots.find((s) => s.id === pinnedId);
    if (!map || !mapReady || !spot || showPdf) return;
    map.flyTo({
      center: [spot.lng, spot.lat],
      zoom: Math.min(
        EGYPT_MAP_MAX_ZOOM,
        Math.max(map.getZoom(), 6.1),
      ),
      speed: 1.1,
      curve: 1.05,
      essential: true,
    });
  }, [pinnedId, showPdf, mapReady]);

  useEffect(() => {
    if (showPdf) return;
    const t = window.setTimeout(() => mapRef.current?.resize(), 100);
    return () => window.clearTimeout(t);
  }, [showPdf, mapReady]);

  return (
    <div
      className={`egypt-builtin egypt-ml egypt-ml--${theme}${
        satellite ? " egypt-ml--satellite" : ""
      }`}
    >
      <div
        className="egypt-builtin-filters"
        role="tablist"
        aria-label="Hazard filter"
      >
        {(
          [
            ["all", "All hotspots"],
            ["river", "River flood"],
            ["coastal", "Coastal flood"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={filter === id}
            className={`egypt-builtin-filter ${filter === id ? "active" : ""}`}
            onClick={() => setFilter(id)}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          className={`egypt-builtin-filter ${satellite ? "active" : ""}`}
          onClick={() => setSatellite((v) => !v)}
          title="Toggle satellite imagery (heavier tiles)"
        >
          {satellite ? "Satellite · on" : "Satellite"}
        </button>
        <button
          type="button"
          className={`egypt-builtin-filter egypt-builtin-pdf-btn ${showPdf ? "active" : ""}`}
          onClick={() => setShowPdf((v) => !v)}
        >
          {showPdf ? "Hide PDF maps" : "PDF original · Fig 4"}
        </button>
      </div>

      {showPdf ? (
        <div className="egypt-builtin-pdf">
          <figure>
            <img
              src={pdfFigures.fig4River.src}
              alt={pdfFigures.fig4River.alt}
            />
            <figcaption>River flood · GFDRR</figcaption>
          </figure>
          <figure>
            <img
              src={pdfFigures.fig4Coastal.src}
              alt={pdfFigures.fig4Coastal.alt}
            />
            <figcaption>Coastal flood · GFDRR</figcaption>
          </figure>
        </div>
      ) : (
        <div className="egypt-ml-stage">
          <div className="egypt-builtin-intro">
            <p className="eyebrow">Egypt hazard explorer</p>
            <h3>
              Discover exposure across <em>Egypt’s hydro risk</em>
            </h3>
            <p className="egypt-builtin-lede">
              Fast map by default · turn on Satellite when you need realism ·
              hover to preview · click to pin. Physical risk is mapped — pricing
              is still missing.
            </p>
            <div className="egypt-ml-coords" aria-hidden>
              N {active.lat.toFixed(2)}° · E {active.lng.toFixed(2)}°
            </div>
          </div>

          <div className="egypt-ml-map-wrap">
            <div ref={mapNodeRef} className="egypt-ml-map" />
          </div>

          <aside className="egypt-builtin-zones">
            <p className="eyebrow">Choose zone</p>
            <div className="egypt-zone-list" role="listbox" aria-label="Zones">
              {visible.map((spot) => (
                <button
                  key={spot.id}
                  type="button"
                  role="option"
                  aria-selected={spot.id === active.id}
                  className={`egypt-zone-item ${spot.id === active.id ? "active" : ""}`}
                  onMouseEnter={() => setPreviewId(spot.id)}
                  onMouseLeave={() => setPreviewId(null)}
                  onClick={() => pin(spot.id)}
                >
                  {spot.label}
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}

      {!showPdf && (
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className="egypt-builtin-story"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            <div className="egypt-builtin-story-top">
              <div>
                <div className="eyebrow">
                  {previewId && previewId !== pinnedId
                    ? "Preview · move to explore"
                    : "Pinned hotspot"}
                </div>
                <h3>{active.label}</h3>
              </div>
              <div className="egypt-builtin-metric">{active.metric}</div>
            </div>
            <p>{active.detail}</p>
            <div className="source">{active.source}</div>
          </motion.div>
        </AnimatePresence>
      )}

      <div className="hazard-punch panel" style={{ marginTop: 4 }}>
        <strong>Defense punchline</strong>
        <p>
          Physical exposure is already mapped (GFDRR Figure 4) — but Egypt still
          lacks an empirical hydrometeorological CAT bond pricing framework to
          transfer that risk to capital markets.
        </p>
      </div>
    </div>
  );
}
