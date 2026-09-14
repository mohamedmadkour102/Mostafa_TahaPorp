export const meta = {
  title:
    "Insurance-Linked Securities for Hydrometeorological risks: Pricing a Catastrophe (CAT) Bond for the Egyptian insurance Market.",
  researcher: "Mostafa Taha",
  shortTitle: "CAT Bond Egypt",
  researchQuestion:
    "How can Egypt price hydrometeorological catastrophe risk and transfer it to capital markets through a CAT bond?",
};

/** Table 1 — Researcher’s elaboration based on Munich Re */
export const decadeLosses = [
  {
    decade: "1980s",
    total: 57.4,
    insured: 9.61,
    uninsured: 47.79,
    gap: 81.54,
  },
  {
    decade: "1990s",
    total: 126.3,
    insured: 29.3,
    uninsured: 97,
    gap: 76.18,
  },
  {
    decade: "2000s",
    total: 141.7,
    insured: 44.8,
    uninsured: 96.9,
    gap: 70.23,
  },
  {
    decade: "2010s",
    total: 217.6,
    insured: 79,
    uninsured: 138.6,
    gap: 64.92,
  },
  {
    decade: "2020s",
    total: 281.17,
    insured: 121.17,
    uninsured: 160,
    gap: 56.9,
  },
];

/**
 * Figure 1 / 2 series — aligned to proposal figures (2024, 2025)
 * and decade averages from Table 1. Same framing as the PDF:
 * Researcher’s elaboration based on Munich Re.
 */
export const yearlyClimateLosses = [
  { year: 2015, total: 100, insured: 35, uninsured: 65 },
  { year: 2016, total: 175, insured: 50, uninsured: 125 },
  { year: 2017, total: 330, insured: 135, uninsured: 195 },
  { year: 2018, total: 160, insured: 80, uninsured: 80 },
  { year: 2019, total: 150, insured: 60, uninsured: 90 },
  { year: 2020, total: 210, insured: 82, uninsured: 128 },
  { year: 2021, total: 280, insured: 120, uninsured: 160 },
  { year: 2022, total: 270, insured: 125, uninsured: 145 },
  { year: 2023, total: 250, insured: 110, uninsured: 140 },
  { year: 2024, total: 320, insured: 140, uninsured: 180 },
  { year: 2025, total: 224, insured: 108, uninsured: 116 },
];

/** Table 2 */
export const climateIndices = [
  {
    name: "ND-GAIN Country Index",
    year: 2023,
    rank: "103rd / 181",
    detail:
      "Vulnerability (exposure, sensitivity, adaptive capacity) and Readiness (economic, governance, social).",
  },
  {
    name: "INFORM Risk Index",
    year: 2024,
    rank: "37th — High Risk",
    detail: "Vulnerability to humanitarian crises and disasters.",
  },
  {
    name: "Climate Change Performance Index",
    year: 2025,
    rank: "20th / 63 (2nd Arab World)",
    detail: "Climate protection performance — Medium performers.",
  },
];

/** Figure 3 — CRED disaster mix (approx. as stated in proposal) */
export const egyptDisasterMix = [
  { name: "Floods (Hydrological)", value: 41, color: "#3d9ebd" },
  { name: "Storms & Extreme Temp.", value: 40, color: "#d97757" },
  { name: "Other", value: 19, color: "#8aa0b5" },
];

/** Table 3 — Mitigation */
export const mitigationSectors = [
  { sector: "Industry", cost: 130.3 },
  { sector: "Electricity", cost: 144153 },
  { sector: "Petroleum", cost: 1688.5 },
  { sector: "Transport", cost: 57477.4 },
  { sector: "Civil Aviation", cost: 25 },
  { sector: "Housing & Utilities", cost: 31 },
  { sector: "Waste", cost: 7627.4 },
];

export const mitigationSummary = {
  totalBn: 211,
  securedBn: 57.6,
  gapBn: 153.6,
};

/** Table 4 — Adaptation */
export const adaptationSectors = [
  { sector: "Agriculture", cost: 52400 },
  { sector: "Transport", cost: 1273 },
  { sector: "Civil Aviation", cost: 9.1 },
  { sector: "Irrigation & Water", cost: 59108.3 },
  { sector: "Biodiversity", cost: 199.1 },
];

export const adaptationSummary = {
  totalBn: 113,
  securedBn: 18.3,
  gapBn: 94.7,
};

/** Table 5 — Research gap matrix */
export const gapMatrix = [
  {
    theme: "Hazard / Hydrodynamic Modeling",
    existing:
      "GIS & DEM flash-flood mapping (Ras Gharib, Sinai); storm/Medicane exposure and loss estimates.",
    studies: "Helmi & Zohny 2020; Esmat / Thomas / Elshinnawy et al.",
    gap: "Physical outputs rarely become probability indices for parametric insurance or actuarial pricing.",
  },
  {
    theme: "Economic & Macro-Fiscal Impacts",
    existing:
      "CGE estimates of macroeconomic costs of coastal and pluvial flooding in Egyptian port cities.",
    studies: "Haddad et al., 2025",
    gap: "Damages estimated without localized disaster risk financing strategies.",
  },
  {
    theme: "CAT Bond Pricing Models",
    existing:
      "Jump diffusion, Markov environments, Monte Carlo, Wang & Esscher distortion operators.",
    studies: "Wang 2004; Shao et al. 2017; Ma 2025",
    gap: "Calibrated mainly on US PCS or Asian hydrological data — MENA geographic gap.",
  },
  {
    theme: "Hydrometeorological CAT Bonds",
    existing: "Emerging flood/hydro CAT bond pricing literature.",
    studies: "Ibrahim et al. 2026; Kurniawan 2021; Siyamah et al. 2021",
    gap: "Confined to Indonesia — no hydrometeorological CAT bond study for Egypt.",
  },
];

export const problemStatement =
  "Hydrometeorological risks in Egypt are well documented from a physical and economic standpoint, yet no study has developed a financial pricing model to transfer this risk to capital markets. Existing CAT bond pricing models have been calibrated almost exclusively on US or Southeast Asian data, and flood-specific CAT bonds have so far been studied only in Indonesia.";

export const hypotheses = [
  {
    id: "H1",
    text: "Wang (2004) and Ma (2025) produce statistically different fair CAT bond yield spreads for Egyptian hydrometeorological risk.",
  },
  {
    id: "H2",
    text: "Heavy-tailed distributions (e.g. Lognormal) fit Egyptian severity data better than lighter-tailed alternatives (e.g. Gamma).",
  },
  {
    id: "H3",
    text: "For identical loss scenarios, the two models give different prices; the gap grows as the attachment layer moves to higher severity.",
  },
  {
    id: "H4",
    text: "After market risk premium, model spreads will not differ significantly from observed spreads of comparable international hydro CAT bonds.",
  },
  {
    id: "H5",
    text: "Assuming constant event frequency underprices vs. a model with an increasing climate-driven trend.",
  },
];

export const objectives = [
  "Build an overall flood-loss distribution for the Egyptian insurance market using EM-DAT 1987–2025 (n = 18 events).",
  "Apply Wang two-factor transform with Student-t correction for parameter uncertainty (df = n − 2).",
  "Construct a benchmark with Esscher transform on compound Poisson–Gamma (Ma 2025).",
  "Compare yield spreads and assess Gamma (Esscher) vs Lognormal tails (Wang).",
];

/** Table 6 */
export const modelCriteria = [
  {
    criterion: "Suitable for small samples (n=18)",
    wang: "High",
    ma: "Moderate",
  },
  {
    criterion: "Accounts for parameter uncertainty",
    wang: "t-student correction",
    ma: "No explicit correction",
  },
  {
    criterion: "Handles heavy-tailed Lognormal losses",
    wang: "Native support",
    ma: "Gamma approximation required",
  },
  {
    criterion: "Requires finite MGF",
    wang: "No",
    ma: "Yes",
  },
];

export const contributions = [
  {
    title: "Academic",
    text: "First empirical pricing framework for a hydrometeorological CAT bond in Egypt — filling a clear literature gap.",
  },
  {
    title: "Egyptian NatCat Pool",
    text: "Mathematical blueprint supporting IFE–FRA NatCat structure, ILS and parametric products, and capacity beyond traditional reinsurance.",
  },
  {
    title: "Government & Sustainability",
    text: "Shifts disaster response from reactive ex-post funding to proactive risk financing — a channel toward the ~$94.7bn adaptation gap and Vision 2030.",
  },
];

export const limitations = [
  {
    title: "Data scarcity",
    text: "Based on 18 recorded hydrometeorological events — motivating Wang two-factor with explicit uncertainty correction.",
  },
  {
    title: "Time & geographic scope",
    text: "39-year window (1987–2026), Egypt only — tailored national framework, not generalized to MENA.",
  },
  {
    title: "Study scope",
    text: "Comparative Wang vs Ma only; hydrometeorological risk exclusively — seismic/multi-peril out of scope due to data limits.",
  },
];

export const egyptFacts = [
  {
    label: "Land concentration",
    value: "5.5%",
    note: "of land hosts almost all population & economic activity (Nile valley)",
  },
  {
    label: "Climate events (4 decades)",
    value: "27",
    note: "~$346.7m losses (World Bank)",
  },
  {
    label: "Nile water dependency",
    value: ">97%",
    note: "of renewable water resources",
  },
  {
    label: "GDP risk by 2060",
    value: "2–6%",
    note: "potential loss without sustained adaptation",
  },
];

export const sections = [
  { id: "opening", label: "Opening", short: "01" },
  { id: "global", label: "Global Gap", short: "02" },
  { id: "egypt", label: "Egypt", short: "03" },
  { id: "finance", label: "Finance Gap", short: "04" },
  { id: "catbond", label: "CAT Bond", short: "05" },
  { id: "gap", label: "Research Gap", short: "06" },
  { id: "hypotheses", label: "Hypotheses", short: "07" },
  { id: "method", label: "Pricing Engine", short: "08" },
  { id: "simulation", label: "Simulation", short: "09" },
  { id: "contribution", label: "Contribution", short: "10" },
  { id: "limits", label: "Limits", short: "11" },
  { id: "close", label: "Close", short: "12" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const speakerNotes: Record<SectionId, string> = {
  opening:
    "Open with the research question. Pause. Then invite the committee to explore.",
  global:
    "Walk Fig 1 → Fig 2 → Table 1. Emphasize: gap % fell, absolute uninsured losses still rose.",
  egypt:
    "Open Figure 4 maps first. Toggle River vs Coastal, click Alexandria/Delta hotspots, then timeline 2030→2100. Punchline: mapped ≠ priced.",
  finance:
    "Show $153.6bn mitigation gap and $94.7bn adaptation gap. Punchline: NatCat alone insufficient → need ILS/CAT bonds.",
  catbond:
    "Explain SPV, collateral, trigger types. Risk moves to capital markets.",
  gap: "Click through four themes, then trigger converge to Egypt star. This is the thesis justification.",
  hypotheses: "Skim H1–H5; linger on H2 (tails) and H3 (attachment layer).",
  method:
    "Step the pricing pipeline. Use Table 6 to justify Wang as primary for n=18.",
  simulation:
    "Stress this is illustrative pending empirical results. Show attachment & trend toggles (H3, H5).",
  contribution: "Three doors: academy, NatCat/IFE–FRA, sovereign resilience.",
  limits: "Own n=18 and scope limits — builds credibility.",
  close: "Return to the question. Open for questions.",
};
