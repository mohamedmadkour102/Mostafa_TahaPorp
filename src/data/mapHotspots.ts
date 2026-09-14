export type MapMode = "river" | "coastal" | "compare";

export type MapHotspot = {
  id: string;
  label: string;
  /** % from left of map image */
  x: number;
  /** % from top of map image */
  y: number;
  modes: MapMode[];
  metric: string;
  detail: string;
  source: string;
};

export const mapHotspots: MapHotspot[] = [
  {
    id: "alexandria",
    label: "Alexandria",
    x: 42,
    y: 16,
    modes: ["river", "coastal", "compare"],
    metric: "1.0m SLR → land below sea level 30% → 60%",
    detail:
      "A sea-level rise of just 1.0 meters would increase the proportion of Alexandria’s land area below sea level from 30% to 60%, placing millions of residents at risk of annual flooding. Coastal flooding and Medicane/storm exposure compound the risk along the northern coast.",
    source: "WBG CCDR, 2022 · GFDRR Figure 4",
  },
  {
    id: "delta",
    label: "Nile Delta",
    x: 48,
    y: 22,
    modes: ["river", "coastal", "compare"],
    metric: "~20% of national GDP at stake",
    detail:
      "The Nile Delta contributes approximately 20% of Egypt's national GDP through intensive agriculture, industry, and fisheries, and faces a combined threat from sea-level rise and land subsidence. Relative SLR projections reach ~0.73–0.74m by 2100 on the Delta/Alexandria coast.",
    source: "WBG, 2022 · Esmat / Thomas et al.",
  },
  {
    id: "cairo-nile",
    label: "Nile corridor",
    x: 49,
    y: 34,
    modes: ["river", "compare"],
    metric: "~5.5% of land holds almost all activity",
    detail:
      "Although Egypt’s land area is 995,450 km², human and economic activities are almost constrained to a narrow ~5.5% along the Nile valley. Any disturbance to the Nile hydrological cycle yields immediate nationwide consequences — systemic concentration risk.",
    source: "WBG, 2021 · Proposal §1.2",
  },
  {
    id: "wadi-elarish",
    label: "Wadi El-Arish",
    x: 68,
    y: 20,
    modes: ["river", "compare"],
    metric: "2010 flash flood · >US$25.3m losses",
    detail:
      "The 2010 flash flood in Wadi El-Arish destroyed around 780 houses, damaged agricultural land and property, and resulted in direct economic losses of more than US$25.3 million — illustrating Egypt’s flash-flood vulnerability beyond the main Nile stem.",
    source: "Helmi & Zohny, 2020",
  },
  {
    id: "ras-ghareb",
    label: "Ras Ghareb",
    x: 72,
    y: 42,
    modes: ["river", "compare"],
    metric: "Severe floods 2016 & 2020",
    detail:
      "Severe floods in Ras Ghareb (2016, 2020) caused fatalities, damaged roads, buildings, and public facilities, and forced displacement — part of the Red Sea / desert wadi flash-flood pattern highlighted in the literature review.",
    source: "Arnous et al., 2022 · Haddad et al., 2025",
  },
  {
    id: "sinai",
    label: "Sinai / Red Sea",
    x: 74,
    y: 32,
    modes: ["river", "compare"],
    metric: "High flash-flood vulnerability",
    detail:
      "Egypt's arid climate and dry wadi systems make the Sinai Peninsula, the Red Sea coast, and Upper Egypt highly vulnerable to flash floods. Physical GIS/DEM models map these hazards — yet rarely translate into actuarial probability indices.",
    source: "Helmi & Zohny, 2020 · Research gap Table 5",
  },
  {
    id: "upper-egypt",
    label: "Upper Egypt",
    x: 54,
    y: 68,
    modes: ["river", "compare"],
    metric: "Luxor–Aswan corridor · river flood exposure",
    detail:
      "Upper Egypt’s Nile corridor appears prominently in river-flood exposure mapping. Combined with national hydro-dependency (>97% of renewable water from the Nile), river hazard here is a core underwriting concern for any hydrometeorological risk transfer.",
    source: "GFDRR Figure 4 (river) · EEAA, 2016",
  },
  {
    id: "abu-qir",
    label: "Abu Qir / North coast",
    x: 44,
    y: 14,
    modes: ["coastal", "compare"],
    metric: "31 May 2025 storm · 13mm in hours",
    detail:
      "An unexpected late-spring convective storm on May 31, 2025 dropped 13.0 mm of rainfall in Abu Qir within a few hours — more than six times the monthly historical average — causing rapid localized urban flooding across Alexandria.",
    source: "Labib et al., 2026",
  },
];

export const futureBeats = [
  {
    id: "today",
    label: "Today",
    year: "Now",
    points: [
      "27 climate-related events over ~4 decades · ~$346.7m losses (WBG)",
      "Floods ~41% of recorded hydro/climatological disasters (CRED)",
      "GFDRR maps already show concentrated river & coastal exposure",
    ],
  },
  {
    id: "2030",
    label: "2030",
    year: "2030",
    points: [
      "Nile flow may fall ~5% from current levels",
      "Agriculture (85% of water use) faces mounting stress",
      "Adaptation financing gap already constrains protection",
    ],
  },
  {
    id: "2060",
    label: "2060",
    year: "2060",
    points: [
      "Pessimistic Nile flow decline up to ~37%",
      "Agricultural output −43% · sector employment −37% (scenario)",
      "Without adaptation: GDP loss risk ~2–6%",
    ],
  },
  {
    id: "2100",
    label: "2100",
    year: "2100",
    points: [
      "Alexandria / Delta relative SLR ~0.73–0.74m (projections)",
      "Up to 74% of Alexandria’s urban population may face coastal flood risk",
      "1m relative SLR could displace ~6.7m and cause >$35bn coastal losses (literature)",
    ],
  },
] as const;
