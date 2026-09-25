import { useEffect, useRef, useState } from "react";
import { Map as MapLibreMap, Marker as MapLibreMarker, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  EGYPT_MAP_BOUNDS,
  EGYPT_MAP_CENTER,
  EGYPT_MAP_ZOOM,
  type ExplorerSpot,
} from "../data/egyptExplorer";

/** Same idea as Landing Map V5: Esri imagery + place labels, real geography. */
const SATELLITE_STYLE = {
  version: 8 as const,
  name: "Nile Blue · satellite",
  sources: {
    esri: {
      type: "raster" as const,
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: "Tiles © Esri",
      maxzoom: 18,
    },
    labels: {
      type: "raster" as const,
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      maxzoom: 16,
    },
  },
  layers: [
    {
      id: "esri-satellite",
      type: "raster" as const,
      source: "esri",
      paint: {
        "raster-saturation": -0.25,
        "raster-brightness-min": 0.08,
        "raster-brightness-max": 0.82,
        "raster-contrast": 0.12,
      },
    },
    {
      id: "place-labels",
      type: "raster" as const,
      source: "labels",
      paint: { "raster-opacity": 0.72 },
    },
  ],
};

const NILE: [number, number][] = [
  [32.9, 24.05],
  [32.65, 25.7],
  [32.55, 26.15],
  [31.18, 27.18],
  [31.24, 30.04],
  [31.1, 30.6],
  [30.42, 31.38],
  [31.75, 31.45],
];

const COAST: [number, number][] = [
  [25.2, 31.55],
  [27.2, 31.2],
  [29.2, 31.15],
  [29.9, 31.2],
  [30.4, 31.35],
  [31.6, 31.45],
  [32.6, 31.25],
  [34.2, 31.25],
];

type RiskLevel = "red" | "orange" | "yellow";

/** Exposure color by layer — GFDRR Figure 4 reading, not a new GIS product. */
const RISK: Record<"river" | "coastal", Record<string, RiskLevel>> = {
  river: {
    delta: "red",
    "cairo-nile": "red",
    "wadi-elarish": "red",
    "upper-egypt": "orange",
    alexandria: "orange",
    sinai: "orange",
    "ras-ghareb": "orange",
  },
  coastal: {
    alexandria: "red",
    delta: "red",
    "abu-qir": "orange",
  },
};

const RISK_COLOR: Record<RiskLevel, string> = {
  red: "#e23b2f",
  orange: "#f08a24",
  yellow: "#f6d156",
};

function levelFor(layer: "river" | "coastal", id: string): RiskLevel {
  return RISK[layer][id] ?? "yellow";
}

function haloData(
  spots: ExplorerSpot[],
  layer: "river" | "coastal",
  activeId: string,
) {
  return {
    type: "FeatureCollection" as const,
    features: spots.map((spot) => {
      const level = levelFor(layer, spot.id);
      const active = spot.id === activeId;
      const base = level === "red" ? 58 : level === "orange" ? 46 : 34;
      return {
        type: "Feature" as const,
        properties: {
          color: RISK_COLOR[level],
          radius: active ? base + 42 : base,
          opacity: active ? 0.88 : 0.55,
        },
        geometry: {
          type: "Point" as const,
          coordinates: [spot.lng, spot.lat],
        },
      };
    }),
  };
}

function nearestIndex(line: [number, number][], lng: number, lat: number) {
  let best = 1;
  let bestD = Infinity;
  line.forEach(([x, y], i) => {
    const d = (x - lng) ** 2 + (y - lat) ** 2;
    if (d < bestD) {
      best = Math.max(1, i);
      bestD = d;
    }
  });
  return best;
}

function segmentBearing(a: [number, number], b: [number, number]) {
  return (Math.atan2(b[0] - a[0], b[1] - a[1]) * 180) / Math.PI;
}

function markerEl(spot: ExplorerSpot, level: RiskLevel) {
  const root = document.createElement("button");
  root.type = "button";
  root.className = `nile-sat-marker level-${level}`;
  root.title = spot.label;
  root.innerHTML = `
    <span class="nile-sat-core"></span>
    <span class="nile-sat-label">${spot.label}</span>
  `;
  return root;
}

export function NileSatelliteHazardMap({
  spots,
  activeId,
  layer,
  onSelect,
}: {
  spots: ExplorerSpot[];
  activeId: string;
  layer: "river" | "coastal";
  onSelect: (id: string) => void;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<globalThis.Map<string, MapLibreMarker>>(new globalThis.Map());
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    let cancelled = false;

    const map = new MapLibreMap({
      container: node,
      style: SATELLITE_STYLE,
      center: EGYPT_MAP_CENTER,
      zoom: EGYPT_MAP_ZOOM,
      attributionControl: { compact: true },
      maxBounds: [
        [20, 18],
        [42, 36],
      ],
    });
    map.addControl(new NavigationControl({ visualizePitch: false }), "top-right");
    mapRef.current = map;

    map.on("load", () => {
      if (cancelled) return;
      map.addSource("nile-stem", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: NILE },
        },
      });
      map.addSource("coast-line", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: COAST },
        },
      });
      map.addSource("hazard-halos", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });
      map.addLayer({
        id: "hazard-halo-outer",
        type: "circle",
        source: "hazard-halos",
        paint: {
          "circle-radius": ["*", ["get", "radius"], 1.65],
          "circle-color": ["get", "color"],
          "circle-opacity": 0.38,
          "circle-blur": 0.45,
        },
      });
      map.addLayer({
        id: "hazard-halo",
        type: "circle",
        source: "hazard-halos",
        paint: {
          "circle-radius": ["get", "radius"],
          "circle-color": ["get", "color"],
          "circle-opacity": ["get", "opacity"],
          "circle-blur": 0.12,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-opacity": 0.9,
        },
      });
      map.addLayer({
        id: "nile-glow",
        type: "line",
        source: "nile-stem",
        paint: {
          "line-color": "#e23b2f",
          "line-width": 16,
          "line-opacity": 0.55,
          "line-blur": 3,
        },
      });
      map.addLayer({
        id: "nile-core",
        type: "line",
        source: "nile-stem",
        paint: {
          "line-color": "#ffd27a",
          "line-width": 3,
          "line-opacity": 0.95,
        },
      });
      map.addLayer({
        id: "coast-glow",
        type: "line",
        source: "coast-line",
        paint: {
          "line-color": "#e23b2f",
          "line-width": 16,
          "line-opacity": 0.55,
          "line-blur": 3,
        },
      });
      map.addLayer({
        id: "coast-core",
        type: "line",
        source: "coast-line",
        paint: {
          "line-color": "#ffd27a",
          "line-width": 3,
          "line-opacity": 0.95,
        },
      });
      map.resize();
      map.fitBounds(EGYPT_MAP_BOUNDS, { padding: 36, duration: 0 });
      if (!cancelled) setReady(true);
    });

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => map.resize())
        : null;
    ro?.observe(node);

    return () => {
      cancelled = true;
      ro?.disconnect();
      markersRef.current.forEach((m) => m.remove());
      markersRef.current.clear();
      map.remove();
      mapRef.current = null;
      setReady(false);
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map || !map.getSource("hazard-halos")) return;

    const riverOn = layer === "river";
    const source = map.getSource("hazard-halos") as
      | { type: string; setData?: (data: ReturnType<typeof haloData>) => void }
      | undefined;
    if (source?.type === "geojson" && source.setData) {
      source.setData(haloData(spots, layer, activeId));
    }
    for (const id of ["nile-glow", "nile-core"]) {
      if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", riverOn ? "visible" : "none");
    }
    for (const id of ["coast-glow", "coast-core"]) {
      if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", riverOn ? "none" : "visible");
    }

    const keep = new Set(spots.map((s) => s.id));
    markersRef.current.forEach((marker, id) => {
      if (!keep.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });
    spots.forEach((spot) => {
      const level = levelFor(layer, spot.id);
      let marker = markersRef.current.get(spot.id);
      if (!marker) {
        const el = markerEl(spot, level);
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          onSelectRef.current(spot.id);
        });
        marker = new MapLibreMarker({ element: el, anchor: "center" })
          .setLngLat([spot.lng, spot.lat])
          .addTo(map);
        markersRef.current.set(spot.id, marker);
      }
      const el = marker.getElement();
      el.classList.remove("level-red", "level-orange", "level-yellow");
      el.classList.add(`level-${level}`);
      el.classList.toggle("active", spot.id === activeId);
    });
  }, [ready, layer, spots, activeId]);

  useEffect(() => {
    if (!ready) return;
    const map = mapRef.current;
    const spot = spots.find((s) => s.id === activeId);
    if (!map || !spot) return;

    map.easeTo({
      center: [spot.lng, spot.lat],
      zoom: 6.7,
      duration: 900,
      essential: true,
    });

    const line = layer === "river" ? NILE : COAST;
    const end = nearestIndex(line, spot.lng, spot.lat);
    const arrowEl = document.createElement("div");
    arrowEl.className = "nile-sat-arrow";
    arrowEl.textContent = "▲";
    const arrow = new MapLibreMarker({
      element: arrowEl,
      anchor: "center",
      rotationAlignment: "map",
    })
      .setLngLat(line[0])
      .addTo(map);

    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1100);
      const f = p * end;
      const i = Math.min(end - 1, Math.floor(f));
      const u = f - i;
      const a = line[i];
      const b = line[i + 1] ?? a;
      const lng = a[0] + (b[0] - a[0]) * u;
      const lat = a[1] + (b[1] - a[1]) * u;
      arrow.setLngLat([lng, lat]);
      arrow.setRotation(segmentBearing(a, b));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      arrow.remove();
    };
  }, [ready, activeId, layer, spots]);

  return (
    <div className="nile-sat-wrap">
      <div ref={nodeRef} className="nile-sat-map" />
      <div className="nile-sat-legend" aria-hidden>
        <span><i className="swatch yellow" /> Lower</span>
        <span><i className="swatch orange" /> Elevated</span>
        <span><i className="swatch red" /> Highest</span>
      </div>
    </div>
  );
}
