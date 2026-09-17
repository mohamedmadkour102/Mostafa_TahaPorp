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
  { id: "qr", label: "QR Proposal", short: "QR" },
  { id: "cover", label: "Title", short: "00" },
  { id: "opening", label: "Opening", short: "01" },
  { id: "global", label: "Global Gap", short: "02" },
  { id: "egypt", label: "Egypt", short: "03" },
  { id: "finance", label: "Finance Gap", short: "04" },
  { id: "litHazard", label: "Lit · Hazards", short: "05" },
  { id: "litInstrument", label: "Lit · CAT Bond", short: "06" },
  { id: "gap", label: "Research Gap", short: "07" },
  { id: "hypotheses", label: "Hypotheses", short: "08" },
  { id: "method", label: "Pricing Engine", short: "09" },
  { id: "simulation", label: "Simulation", short: "10" },
  { id: "contribution", label: "Contribution", short: "11" },
  { id: "limits", label: "Limits", short: "12" },
  { id: "close", label: "Close", short: "13" },
  { id: "thanks", label: "Thank You", short: "14" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const speakerNotes: Record<SectionId, string> = {
  qr: "Invite the committee to scan the QR for the full written proposal. Then advance to the title page.",
  cover:
    "Hold on the title page. State name, department, and the proposal title. Then advance to the research question.",
  opening:
    "Open with the research question. Pause. Then invite the committee to explore.",
  global:
    "Walk Fig 1 → Fig 2 → Table 1. Emphasize: gap % fell, absolute uninsured losses still rose.",
  egypt:
    "Open Figure 4 maps first. Toggle River vs Coastal, click Alexandria/Delta hotspots, then timeline 2030→2100. Punchline: mapped ≠ priced.",
  finance:
    "Show $153.6bn mitigation gap and $94.7bn adaptation gap. Punchline: NatCat alone insufficient → need ILS/CAT bonds.",
  litHazard:
    "Open Past first — walk Helmi, Arnous, Haddad, Labib. Then Future: World Bank 1.1m, Esmat 74%/$35bn, bridge to CAT bonds.",
  litInstrument:
    "Start with what a CAT bond is and Andrew (1990s). Then mechanism + flow. Expand pricing literature. Applications. Close on Need for Egypt.",
  gap: "Click through four themes, then trigger converge to Egypt star. This is the thesis justification.",
  hypotheses: "Skim H1–H5; linger on H2 (tails) and H3 (attachment layer).",
  method:
    "Step the pricing pipeline. Use Table 6 to justify Wang as primary for n=18.",
  simulation:
    "Stress this is illustrative pending empirical results. Show attachment & trend toggles (H3, H5).",
  contribution: "Three doors: academy, NatCat/IFE–FRA, sovereign resilience.",
  limits: "Own n=18 and scope limits — builds credibility.",
  close: "Return to the question. Walk EM-DAT → Wang/Ma → MC → NatCat. Then invite questions.",
  thanks: "Hold the thank-you beat. Leave space for committee questions.",
};

/** Literature §2.1 — study cards for interactive hazard review */
export type LitStudyCard = {
  id: string;
  mode: "past" | "future";
  peril: "flood" | "storm";
  place: string;
  authors: string;
  year: string;
  finding: string;
  metricLabel?: string;
  metricValue?: number;
  metricPrefix?: string;
  metricSuffix?: string;
  metricDecimals?: number;
  metricText?: string;
};

export const litHazardStudies: LitStudyCard[] = [
  {
    id: "helmi-arish",
    mode: "past",
    peril: "flood",
    place: "Wadi El-Arish · Sinai",
    authors: "Helmi & Zohny",
    year: "2020",
    finding:
      "Flash-flood vulnerability in arid wadis: the 2010 event destroyed ~780 houses and damaged agriculture and property.",
    metricLabel: "Direct losses",
    metricValue: 25.3,
    metricPrefix: "$",
    metricSuffix: "m",
    metricDecimals: 1,
  },
  {
    id: "arnous-ras",
    mode: "past",
    peril: "flood",
    place: "Ras Ghareb · Red Sea",
    authors: "Arnous et al.",
    year: "2022",
    finding:
      "Severe floods in 2016 and 2020 caused fatalities, damaged roads, buildings, and public facilities, and forced displacement.",
    metricText: "2016 & 2020 events",
  },
  {
    id: "haddad-alex-flood",
    mode: "past",
    peril: "flood",
    place: "Alexandria",
    authors: "Haddad et al.",
    year: "2025",
    finding:
      "The 2015 Alexandria flooding damaged infrastructure and homes — part of a repeated flood pattern hitting coastal and informal settlements hardest.",
    metricText: "2015 flood impacts",
  },
  {
    id: "tarek-wbg-mgmt",
    mode: "past",
    peril: "flood",
    place: "National",
    authors: "Tarek et al. · WBG",
    year: "2024 / 2022",
    finding:
      "Repeated floods disrupt crops, transport, and services — especially for low-income rural and informal coastal communities — raising the need for better flood risk management.",
    metricText: "Social vulnerability focus",
  },
  {
    id: "wb-1.1m",
    mode: "future",
    peril: "flood",
    place: "National · coastal flash floods",
    authors: "World Bank · Tarek et al.",
    year: "2022 / 2024",
    finding:
      "Climate change is expected to raise flash-flood severity and frequency; extreme rainfall timing and intensity shift across Egypt.",
    metricLabel: "Extra people/year at severe flood risk",
    metricValue: 1.1,
    metricSuffix: "m",
    metricDecimals: 1,
  },
  {
    id: "urban-paving",
    mode: "future",
    peril: "flood",
    place: "Urban & coastal Egypt",
    authors: "Haddad et al. · Tarek et al.",
    year: "2025 / 2024",
    finding:
      "Rapid urban growth and paved surfaces reduce natural drainage, amplifying flood exposure in cities and coasts.",
    metricText: "Drainage capacity shrinks",
  },
  {
    id: "miglietta-reale",
    mode: "past",
    peril: "storm",
    place: "Northern coast · Medicanes",
    authors: "Miglietta · Reale et al.",
    year: "2019 / 2022",
    finding:
      "Egypt’s north coast faces winter storms and destructive Mediterranean hurricanes (Medicanes) driven by warm sea-surface heat and moisture fluxes.",
    metricText: "Medicane exposure",
  },
  {
    id: "labib-abuqir",
    mode: "past",
    peril: "storm",
    place: "Abu Qir · Alexandria",
    authors: "Labib et al.",
    year: "2026",
    finding:
      "Unseasonal late-spring storm (31 May 2025) dropped extreme rainfall in hours, causing rapid urban flooding and infrastructure stress.",
    metricLabel: "Rainfall in hours",
    metricValue: 13,
    metricSuffix: " mm",
  },
  {
    id: "thomas-sst",
    mode: "future",
    peril: "storm",
    place: "Alexandria offshore SST",
    authors: "Thomas et al.",
    year: "2025",
    finding:
      "CMIP6 projections: sea surface temperatures near Alexandria rise sharply by century end — elevating storm destructive potential.",
    metricLabel: "SST rise by 2100",
    metricText: "+2.5–3.0°C",
  },
  {
    id: "reale-medcordex",
    mode: "future",
    peril: "storm",
    place: "Mediterranean basin",
    authors: "Reale et al. (Med-CORDEX)",
    year: "2022",
    finding:
      "Annual cyclone frequency may fall 35–50%, but surviving events become more intense — higher hourly rain and stronger gusts.",
    metricText: "Fewer, fiercer storms",
  },
  {
    id: "esmat-slr",
    mode: "future",
    peril: "storm",
    place: "Alexandria · Nile Delta",
    authors: "Esmat · Thomas · Elshinnawy",
    year: "2025 / 2021",
    finding:
      "Relative sea-level rise plus land subsidence (up to 14 mm/year in Muntazah) compound storm-surge and coastal flood risk.",
    metricLabel: "SLR Alexandria / Delta by 2100",
    metricText: "0.74m / 0.73m",
  },
  {
    id: "esmat-macro",
    mode: "future",
    peril: "storm",
    place: "Coastal economy",
    authors: "Esmat et al.",
    year: "2025",
    finding:
      "By 2100 up to 74% of Alexandria’s urban population faces coastal flood risk; 1m SLR could hit 15% of Delta farmland and displace millions.",
    metricLabel: "Direct economic losses (scenario)",
    metricValue: 35,
    metricPrefix: ">$",
    metricSuffix: "bn",
  },
  {
    id: "esmat-finance-bridge",
    mode: "future",
    peril: "storm",
    place: "National adaptation finance",
    authors: "Esmat et al. · Elshinnawy",
    year: "2025 / 2021",
    finding:
      "Hard engineering alone is insufficient. With only ~12% of required adaptation investment secured by 2030, literature calls for private insurance risk transfer and catastrophe bonds.",
    metricText: "~12% of $246bn secured",
  },
];

/** Literature §2.2 — committee path: tool → mechanics → pricing lit → applications → Egypt need */
export type LitInstrumentStep = {
  id: string;
  label: string;
  title: string;
  text: string;
  bullets?: string[];
  hook?: string;
};

export const litInstrumentPath: LitInstrumentStep[] = [
  {
    id: "tool",
    label: "The tool",
    title: "What is a CAT bond — and when did it appear?",
    text: "Catastrophe (CAT) bonds are insurance-linked securities that transfer a defined catastrophe risk from a sponsor to capital-market investors. They emerged in the early 1990s after Hurricane Andrew exposed the limits of traditional reinsurance capacity (Polacek, 2018).",
  },
  {
    id: "how",
    label: "How it works",
    title: "How the instrument actually operates",
    text: "Risk is transferred through a Special Purpose Vehicle (SPV). The SPV issues the bond, invests proceeds in low-risk collateral, and pays according to the trigger — indemnity, industry index, or physical/parametric rules (Barrieu & Albertini, 2009).",
    bullets: [
      "Normal times: investors fund collateral; sponsor pays a coupon for protection.",
      "Trigger fires: collateral flows to the sponsor for claims; investors take the loss.",
      "Why it helps hydro tails: capacity beyond traditional reinsurance, with payout timing tied to the catastrophe — not to fiscal rescue after the fact.",
    ],
  },
  {
    id: "price",
    label: "How literature prices it",
    title: "Why pricing is hard — and which models papers use",
    text: "CAT bonds trade in incomplete markets: catastrophe risk cannot be perfectly hedged with ordinary financial instruments (Shao et al., 2017; Siyamah et al., 2021). Events are rare but extremely large, so historical data are scarce (Kurniawan et al., 2021; Ma, 2025).",
    bullets: [
      "Practice often starts from actuarial expected-loss building blocks such as Probability of First Loss (PFL) and Expected Loss (EL) (Burnecki, Teuerle & Zdeb, 2025).",
      "Heavy tails need distortion of the pricing measure to reflect investor risk aversion (Ma, 2025).",
      "Wang (2004) two-factor transform: widely used to link actuarial and financial pricing and emphasize extreme severity — but less tractable for complex non-normal aggregate losses (Wang, 2004; Chen, 2024; Li et al., 2023; Ma, 2025).",
      "Esscher / Ma (2025): modifies the full aggregate loss distribution so frequency and severity enter one framework — greater mathematical tractability for compound losses.",
      "Portfolio angle: CAT payoffs depend on localized disasters, so correlation with traditional assets is typically low (Lai, Parcollet & Lamond, 2013; Ma, 2025).",
    ],
  },
  {
    id: "applied",
    label: "Where applied",
    title: "Where hydrometeorological CAT pricing has been done",
    text: "The instrument is global; the hydro-specific pricing literature is still geographically concentrated.",
    bullets: [
      "Broad CAT pricing models are calibrated mainly on US Property Claim Services (PCS) or Asian hydrological datasets — leaving a MENA geographic gap.",
      "Flood / hydrometeorological CAT bond pricing studies exist for Indonesia (Ibrahim, Santoso & Sukono, 2026; Kurniawan et al., 2021; Siyamah, Putri & Imron, 2021).",
      "Those papers show the tool can be applied to flood-type risk — but their parameters and markets are not Egypt.",
    ],
  },
  {
    id: "egyptNeed",
    label: "Need for Egypt",
    title: "Why Egypt needs this — and what is still missing",
    text: "Egypt’s §2.1 literature already documents floods, Medicanes, and severe future coastal/fiscal exposure. Adaptation finance is constrained (only ~12% of required investment secured by 2030 in cited work), and hard engineering alone is insufficient — so papers explicitly call for private insurance risk transfer and catastrophe bonds (Esmat et al., 2025; Elshinnawy & Almaliki, 2021).",
    bullets: [
      "Need: convert documented hydro tail risk into pre-arranged capital-market capacity (not only ex-post fiscal response).",
      "Gap: no established empirical pricing framework for an Egyptian hydrometeorological CAT bond yet.",
      "This thesis: apply Wang (2004) and Ma (2025) to Egyptian hydro events — first pricing bridge from Egypt’s hazard evidence to ILS design.",
    ],
    hook: "Hazard literature is rich. The empty chair is Egyptian CAT pricing.",
  },
];

