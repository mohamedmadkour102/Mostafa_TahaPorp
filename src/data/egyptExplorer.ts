/** Built-in Egypt explorer — real coordinates for MapLibre (Midnight V4) */
export type ExplorerFilter = "river" | "coastal" | "all";

export type ExplorerSpot = {
  id: string;
  label: string;
  /** WGS84 */
  lng: number;
  lat: number;
  layer: "river" | "coastal" | "both";
  metric: string;
  detail: string;
  source: string;
};

/**
 * Free raster basemaps — no API key.
 * ArcGIS tile path is {z}/{y}/{x}.
 * Fast canvas styles are default; satellite is opt-in (heavier tiles).
 */
const esriAttribution =
  "Tiles © Esri — Earthstar Geographics, Esri, TomTom, Garmin, FAO, NOAA, USGS";

/** Cap imagery detail — defense view rarely needs street-level satellite */
export const EGYPT_MAP_MAX_ZOOM = 11;
export const EGYPT_IMAGERY_SOURCE_MAXZOOM = 12;

const imageryTiles = [
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
];

const labelTiles = [
  "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
];

/** Midnight default — fast dark canvas */
export const EGYPT_MAP_STYLE_DARK = {
  version: 8 as const,
  name: "CAT Bond Egypt · Dark (fast)",
  sources: {
    esriDark: {
      type: "raster" as const,
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: esriAttribution,
      maxzoom: 16,
    },
  },
  layers: [
    {
      id: "background",
      type: "background" as const,
      paint: { "background-color": "#0b1c28" },
    },
    {
      id: "esri-dark",
      type: "raster" as const,
      source: "esriDark",
    },
  ],
};

/** Classic default — fast light canvas */
export const EGYPT_MAP_STYLE_LIGHT = {
  version: 8 as const,
  name: "CAT Bond Egypt · Light (fast)",
  sources: {
    esriLight: {
      type: "raster" as const,
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: esriAttribution,
      maxzoom: 16,
    },
  },
  layers: [
    {
      id: "background",
      type: "background" as const,
      paint: { "background-color": "#e8eef4" },
    },
    {
      id: "esri-light",
      type: "raster" as const,
      source: "esriLight",
    },
  ],
};

/** Midnight satellite (opt-in) */
export const EGYPT_MAP_STYLE_SATELLITE_DARK = {
  version: 8 as const,
  name: "CAT Bond Egypt · Satellite",
  sources: {
    esriImagery: {
      type: "raster" as const,
      tiles: imageryTiles,
      tileSize: 256,
      attribution: esriAttribution,
      maxzoom: EGYPT_IMAGERY_SOURCE_MAXZOOM,
    },
  },
  layers: [
    {
      id: "background",
      type: "background" as const,
      paint: { "background-color": "#0b1c28" },
    },
    {
      id: "esri-imagery",
      type: "raster" as const,
      source: "esriImagery",
    },
  ],
};

/** Classic hybrid satellite + labels (opt-in) */
export const EGYPT_MAP_STYLE_SATELLITE_LIGHT = {
  version: 8 as const,
  name: "CAT Bond Egypt · Hybrid",
  sources: {
    esriImagery: {
      type: "raster" as const,
      tiles: imageryTiles,
      tileSize: 256,
      attribution: esriAttribution,
      maxzoom: EGYPT_IMAGERY_SOURCE_MAXZOOM,
    },
    esriLabels: {
      type: "raster" as const,
      tiles: labelTiles,
      tileSize: 256,
      attribution: esriAttribution,
      maxzoom: 12,
    },
  },
  layers: [
    {
      id: "background",
      type: "background" as const,
      paint: { "background-color": "#1a2a38" },
    },
    {
      id: "esri-imagery",
      type: "raster" as const,
      source: "esriImagery",
    },
    {
      id: "esri-labels",
      type: "raster" as const,
      source: "esriLabels",
    },
  ],
};

/** Nile Blue V3 default — light canvas with medical-teal backdrop */
export const EGYPT_MAP_STYLE_NILE = {
  version: 8 as const,
  name: "CAT Bond Egypt · Nile Blue (fast)",
  sources: {
    esriLight: {
      type: "raster" as const,
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: esriAttribution,
      maxzoom: 16,
    },
  },
  layers: [
    {
      id: "background",
      type: "background" as const,
      paint: { "background-color": "#c5d4d4" },
    },
    {
      id: "esri-light",
      type: "raster" as const,
      source: "esriLight",
      paint: {
        "raster-saturation": -0.15,
        "raster-contrast": -0.05,
        "raster-opacity": 0.92,
      },
    },
  ],
};

/** Nile Blue satellite (opt-in) — imagery + soft teal wash via chrome CSS */
export const EGYPT_MAP_STYLE_SATELLITE_NILE = {
  version: 8 as const,
  name: "CAT Bond Egypt · Nile Satellite",
  sources: {
    esriImagery: {
      type: "raster" as const,
      tiles: imageryTiles,
      tileSize: 256,
      attribution: esriAttribution,
      maxzoom: EGYPT_IMAGERY_SOURCE_MAXZOOM,
    },
    esriLabels: {
      type: "raster" as const,
      tiles: labelTiles,
      tileSize: 256,
      attribution: esriAttribution,
      maxzoom: 12,
    },
  },
  layers: [
    {
      id: "background",
      type: "background" as const,
      paint: { "background-color": "#224d50" },
    },
    {
      id: "esri-imagery",
      type: "raster" as const,
      source: "esriImagery",
    },
    {
      id: "esri-labels",
      type: "raster" as const,
      source: "esriLabels",
      paint: { "raster-opacity": 0.85 },
    },
  ],
};

/** @deprecated */
export const EGYPT_MAP_STYLE = EGYPT_MAP_STYLE_DARK;

export const EGYPT_MAP_CENTER: [number, number] = [31.2, 27.2];
export const EGYPT_MAP_ZOOM = 5.5;

/** Loose Egypt bounds [west, south, east, north] */
export const EGYPT_MAP_BOUNDS: [[number, number], [number, number]] = [
  [24.6, 21.7],
  [37.0, 31.8],
];

export const explorerSpots: ExplorerSpot[] = [
  {
    id: "abu-qir",
    label: "Abu Qir / North coast",
    lng: 30.07,
    lat: 31.32,
    layer: "coastal",
    metric: "31 May 2025 storm · 13mm in hours",
    detail:
      "An unexpected late-spring convective storm dropped extreme rainfall in hours — more than six times the monthly historical average — causing rapid localized urban flooding.",
    source: "Labib et al., 2026",
  },
  {
    id: "alexandria",
    label: "Alexandria",
    lng: 29.92,
    lat: 31.2,
    layer: "both",
    metric: "1.0m SLR → land below sea level 30% → 60%",
    detail:
      "Sea-level rise and Medicane/storm exposure compound risk along the northern coast, placing millions of residents at risk of annual flooding.",
    source: "WBG CCDR, 2022 · GFDRR Figure 4",
  },
  {
    id: "delta",
    label: "Nile Delta",
    lng: 31.05,
    lat: 30.85,
    layer: "both",
    metric: "~20% of national GDP at stake",
    detail:
      "Intensive agriculture, industry, and fisheries face combined sea-level rise and land subsidence — relative SLR projections reach ~0.73–0.74m by 2100.",
    source: "WBG, 2022 · Esmat / Thomas et al.",
  },
  {
    id: "wadi-elarish",
    label: "Wadi El-Arish",
    lng: 33.8,
    lat: 31.13,
    layer: "river",
    metric: "2010 flash flood · >US$25.3m losses",
    detail:
      "Destroyed ~780 houses and agricultural land — illustrating flash-flood vulnerability beyond the main Nile stem.",
    source: "Helmi & Zohny, 2020",
  },
  {
    id: "cairo-nile",
    label: "Nile corridor",
    lng: 31.24,
    lat: 30.04,
    layer: "river",
    metric: "~5.5% of land holds almost all activity",
    detail:
      "Human and economic activity is constrained to a narrow Nile strip — any hydrological shock has nationwide consequences.",
    source: "WBG, 2021 · Proposal §1.2",
  },
  {
    id: "sinai",
    label: "Sinai / Red Sea",
    lng: 33.85,
    lat: 29.0,
    layer: "river",
    metric: "High flash-flood vulnerability",
    detail:
      "Arid wadi systems make Sinai and the Red Sea coast highly exposed. Physical models map the hazard — rarely translated into actuarial pricing.",
    source: "Helmi & Zohny, 2020 · Research gap Table 5",
  },
  {
    id: "ras-ghareb",
    label: "Ras Ghareb",
    lng: 33.1,
    lat: 28.36,
    layer: "river",
    metric: "Severe floods 2016 & 2020",
    detail:
      "Fatalities, damaged roads and facilities, forced displacement — part of the Red Sea / desert wadi flash-flood pattern.",
    source: "Arnous et al., 2022 · Haddad et al., 2025",
  },
  {
    id: "upper-egypt",
    label: "Upper Egypt",
    lng: 32.65,
    lat: 25.7,
    layer: "river",
    metric: "Luxor–Aswan corridor · river flood exposure",
    detail:
      "River hazard along Upper Egypt’s Nile corridor is a core underwriting concern for hydrometeorological risk transfer — with >97% water dependency on the Nile.",
    source: "GFDRR Figure 4 (river) · EEAA, 2016",
  },
];

export function filterExplorerSpots(
  filter: ExplorerFilter,
): ExplorerSpot[] {
  if (filter === "all") return explorerSpots;
  if (filter === "river") {
    return explorerSpots.filter(
      (s) => s.layer === "river" || s.layer === "both",
    );
  }
  return explorerSpots.filter(
    (s) => s.layer === "coastal" || s.layer === "both",
  );
}
