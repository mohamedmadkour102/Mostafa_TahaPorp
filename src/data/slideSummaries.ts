import type { SectionId } from "./research";

export type SlideSummary = {
  title: string;
  paragraphs?: string[];
  bullets: string[];
};

/** Per-slide proposal summary — fuller than a caption, shorter than the full proposal. */
export const slideSummaries: Record<SectionId, SlideSummary> = {
  qr: {
    title: "QR · Full proposal",
    paragraphs: [
      "This deck is the oral defense. The QR opens the written Proposal V4, with the full text, figures, and tables, at the proposal route.",
    ],
    bullets: [
      "Scan during the introduction so the committee can follow figures while you speak.",
      "The Summary button on each slide is a reading of that slide only — not a replacement for the PDF.",
    ],
  },
  cover: {
    title: "Title page",
    paragraphs: [
      "The defense is a Master proposal on pricing a hydrometeorological catastrophe bond for the Egyptian insurance market. The instrument is insurance-linked securities, not a traditional reinsurance treaty.",
    ],
    bullets: [
      "Full title: Insurance-Linked Securities for Hydrometeorological Risks — Pricing a Catastrophe Bond for the Egyptian Market.",
      "Submitted by Mostafa Taha Atrees, Teaching Assistant, Insurance & Actuarial Science, Faculty of Commerce, Cairo University.",
      "The picture frames the hazard: urban flood under extreme weather, which the pricing chapters then try to transfer.",
    ],
  },
  opening: {
    title: "Research question",
    paragraphs: [
      "The question is how Egypt can price hydrometeorological catastrophe risk and transfer it to capital markets through a CAT bond. The numbers on this slide are the motive, not the model.",
    ],
    bullets: [
      "2024 climate losses about $320bn, of which about $180bn were uninsured (Munich Re).",
      "Egypt’s adaptation financing gap is about $94.7bn — mitigation gap about $153.6bn.",
      "A domestic NatCat pool helps, but heavy tails still need access to global capital via ILS.",
    ],
  },
  global: {
    title: "Global climate losses and the protection gap",
    paragraphs: [
      "Munich Re’s last several years of climate losses sit above $200bn a year. The share that is insured has improved, which makes the protection-gap percentage look smaller. The dollars that remain uninsured have not shrunk.",
    ],
    bullets: [
      "2024: about $320bn total, about $140bn insured (44%), about $180bn uninsured.",
      "2025: about $224bn total, about $108bn insured (48%), about $116bn uninsured.",
      "Table 1, decade averages: gap falls from about 82% in the 1980s to about 57% in the 2020s, while uninsured losses rise from about $48bn to about $160bn.",
      "Figure 1 and Figure 2 split the same story into annual totals versus insured and uninsured stacks.",
      "Defense line: the gap is shrinking in percentage, not in dollars.",
    ],
  },
  egypt: {
    title: "Egypt’s concentrated exposure",
    paragraphs: [
      "Almost all people and economic activity sit on a narrow Nile strip, about 5.5% of the land area, while more than 97% of renewable water depends on the river. Figure 4 then locates that physical exposure: river and flash flood inland, coastal flood and sea-level rise on the Mediterranean edge. The maps describe hazard. They do not price a bond.",
    ],
    bullets: [
      "Alexandria: a 1.0m sea-level rise takes land below sea level from about 30% to 60%. By 2100, up to 74% of the urban population may face coastal flooding, with literature losses above $35bn (WBG; Esmat et al.).",
      "Nile Delta: about 20% of national GDP in agriculture, industry, and fisheries, plus subsidence. Relative sea-level rise on the Delta and Alexandria coast is projected near 0.73–0.74m by 2100.",
      "Nile corridor: systemic concentration. A shock to the hydrological cycle is a national shock, not a local one (WBG, 2021).",
      "Wadi El-Arish, 2010: about 780 houses and more than $25.3m in direct losses (Helmi & Zohny).",
      "Ras Ghareb (2016, 2020) and the Sinai / Red Sea wadis: flash-flood pattern away from the main stem.",
      "Abu Qir, 31 May 2025: 13mm in a few hours, more than six times the monthly average (Labib et al.).",
      "Upper Egypt (Luxor–Aswan) shows strongly on the river-flood plate.",
    ],
  },
  finance: {
    title: "Strategy, NatCat, and the financing gap",
    paragraphs: [
      "Egypt’s climate strategy prices mitigation near $211bn and adaptation near $113bn. What is actually secured leaves two large holes. The IFE–FRA natural-catastrophe pool is the domestic answer now taking shape, but a pool alone cannot absorb a heavy tail.",
    ],
    bullets: [
      "Mitigation: about $57.6bn secured of about $211bn, so a gap of about $153.6bn (Table 3, Ministry of Environment, 2022).",
      "Adaptation: about $18.3bn secured of about $113bn, so a gap of about $94.7bn (Table 4).",
      "The 2015 NatCat idea stalled on missing claims data and risk maps. A dedicated committee returned in July 2023; by December 2024 IFE and FRA were closing the pool structure and parametric products (Zaki, 2023).",
      "A CAT bond is proposed as the layer that takes the tail the pool cannot keep, and opens the Egyptian market to international capital.",
    ],
  },
  litHazard: {
    title: "Literature · floods and storms",
    paragraphs: [
      "Section 2.1 is evidence first, then projections. Past cards document events that already happened. Future cards scale the same coast and wadis under climate scenarios. The slide is the bridge from physical studies to a pricing problem.",
    ],
    bullets: [
      "Helmi & Zohny (2020): Sinai, Red Sea, and Upper Egypt flash floods; Wadi El-Arish 2010 losses above $25.3m.",
      "Arnous et al. (2022) and Haddad et al. (2025): Ras Ghareb 2016 and 2020, and Alexandria 2015 — fatalities, roads, buildings, displacement.",
      "Miglietta (2019) and Reale et al. (2022): Mediterranean cyclones (Medicanes) on the northern coast. Frequency may fall 35–50%, but events intensify.",
      "Labib et al. (2026): the 31 May 2025 Abu Qir storm, 13mm in hours.",
      "World Bank: climate change could add about 1.1 million people a year to severe flood risk.",
      "Esmat et al. (2025): up to 15% of Delta agricultural land, about 6.7 million people displaced, and more than $35bn under a 1m relative rise. Only about 12% of a $246bn adaptation need is described as secured by 2030.",
    ],
  },
  litInstrument: {
    title: "Literature · what a CAT bond is",
    paragraphs: [
      "Section 2.2 moves from the hazard to the instrument. A catastrophe bond appeared after Hurricane Andrew showed that traditional reinsurance capacity can run out. The bond is fully collateralized: investors earn a coupon unless a defined trigger releases principal to the sponsor.",
    ],
    bullets: [
      "Sponsor (insurer or NatCat) buys protection. An SPV issues the bond, holds collateral, and applies the trigger. Investors provide capital.",
      "Triggers in the literature include indemnity, industry index, and physical parameters (Barrieu & Albertini; Cummins; OECD).",
      "The bonds are weakly correlated with financial markets, which is why investors hold them (Lai et al.; Ma, 2025).",
      "Pricing is hard because the market is incomplete and events are rare. Studies use expected loss, probability of first loss, and distortion operators.",
      "Wang (2004) distorts the tail with a two-factor transform. Ma (2025) uses an Esscher transform on a compound Poisson–Gamma loss, which is easier to compute but assumes a Gamma severity.",
      "Existing calibrations are mostly US, Asian, or Indonesian flood bonds. None price Egyptian hydrometeorological risk.",
    ],
  },
  gap: {
    title: "Research gap and the problem statement",
    paragraphs: [
      "Table 5 lines up four literatures that stop short of an Egyptian price. Hazard models map water. Fiscal models count GDP. Pricing models exist, but on other countries’ data. This proposal is the missing join.",
    ],
    bullets: [
      "Hazard identification: GIS and DEM work on Ras Gharib and Sinai, and storm-loss studies on the coast, rarely become probability indices an actuary can price (Helmi & Zohny; Tügel; Esmat; Thomas).",
      "Macro impacts: CGE studies of port-city flooding do not design a local risk-financing instrument (Haddad et al.).",
      "CAT bond pricing: Wang, Shao, and Ma are calibrated on US PCS or Asian hydrology, not MENA.",
      "Hydrometeorological CAT bonds that do exist are concentrated on Indonesia.",
      "Problem: Egypt’s exposure and low insurance penetration are documented, and there is still no framework that prices that risk for capital markets.",
    ],
  },
  hypotheses: {
    title: "Hypotheses and objectives",
    paragraphs: [
      "The hypotheses say what “different price” means. The objectives say what will actually be estimated from EM-DAT.",
    ],
    bullets: [
      "H1: Wang (2004) and Ma (2025) give statistically different fair yield spreads for Egyptian hydrometeorological risk.",
      "H2: a heavy-tailed severity such as lognormal fits Egyptian loss sizes better than a lighter Gamma.",
      "H3: the price gap between the two models widens as the attachment point moves into the tail.",
      "H4: after a market risk premium, the model spreads should be comparable to observed hydrometeorological CAT bonds abroad.",
      "H5: assuming a constant event frequency underprices the bond relative to a model with a rising climate-driven frequency.",
      "Objectives: fit an Egyptian flood-loss distribution on EM-DAT 1987–2025; apply Wang’s two-factor transform with a Student-t correction (degrees of freedom n − 2) because n is about 18; benchmark it with Esscher on Poisson–Gamma; compare spreads and tails.",
    ],
  },
  method: {
    title: "Pricing pipeline (Figure 5)",
    paragraphs: [
      "The method is distortion pricing plus Monte Carlo, not a regression of bond spreads. One common bond structure is priced twice so the only difference is the operator: Wang as primary, Ma as benchmark.",
    ],
    bullets: [
      "Data: 18 hydrometeorological events in Egypt from EM-DAT, 1987–2025. Frequency is a Poisson process. Severity is the best-fitting heavy-tailed distribution.",
      "Wang (primary): S*(x) = Q_t(Φ⁻¹(S(x)) + λ_W), with t degrees of freedom k = n − 2 to discount parameter uncertainty on a small sample.",
      "Ma (benchmark): aggregate loss is Poisson frequency and Gamma severity. The Esscher parameter h shifts severity to β* = β − h and frequency to λ* = λ (β / (β − h))^α, with 0 < h < β.",
      "Figure 5 order: data, fit, Wang and Ma in parallel, Monte Carlo cash flows, then selection.",
      "The comparison asks which operator fits a small, heavy-tailed Egyptian sample — lognormal Wang versus Gamma Esscher — not which paper is newer.",
    ],
  },
  simulation: {
    title: "Simulation lab",
    paragraphs: [
      "Monte Carlo draws annual hydrometeorological losses and the bond cash flows under each pricing operator. This screen is a defense sandbox so the committee can see the mechanism. The calibrated prices belong in Chapter 4.",
    ],
    bullets: [
      "H3: the Wang–Ma gap should grow as the attachment layer moves into higher losses.",
      "H5: a flat frequency assumption should underprice the bond relative to a rising climate trend.",
      "Do not quote the on-screen sliders as thesis results.",
    ],
  },
  contribution: {
    title: "Why the study matters",
    paragraphs: [
      "The contribution is one pricing framework used in three places: the literature, the pool the regulator is building, and the fiscal budget that still pays for disasters after they happen.",
    ],
    bullets: [
      "Academic: first framework that prices a hydrometeorological CAT bond on Egyptian events.",
      "NatCat / IFE–FRA: a formula the pool can sit next to, showing that pool capital plus traditional reinsurance may still be short, and that a bond is the spillover to global markets.",
      "Government: moves financing from unbudgeted ex-post relief toward an ex-ante instrument. It speaks to the $94.7bn adaptation gap and to Vision 2030 without claiming the bond closes that gap by itself.",
    ],
  },
  limits: {
    title: "Limits and thesis structure",
    paragraphs: [
      "The same small sample that makes the study possible also bounds it. Wang’s t-correction is in the model because n is 18, not as a footnote.",
    ],
    bullets: [
      "Data: 18 events over 1987–2026. Parameters are for Egypt, not a transferable MENA price.",
      "Scope: Wang two-factor versus Ma Esscher (Poisson–Gamma) only. Other CAT bond methods, and seismic or multi-peril risk, are out.",
      "Chapter 1 background and Egypt’s exposure. Chapter 2 literature and the gap. Chapter 3 the two models and Monte Carlo. Chapter 4 fitted distributions, prices, and spread comparison. Then implications for disaster-risk financing.",
    ],
  },
  close: {
    title: "Close",
    paragraphs: [
      "Return to the question. Egypt’s hydrometeorological exposure is mapped and costed. What did not exist is a price that can be taken to capital markets. This proposal builds that price with two distortion models on Egyptian events.",
    ],
    bullets: [
      "Path: EM-DAT frequency and severity, Wang primary, Ma benchmark, Monte Carlo, then a NatCat reading.",
      "The result is a pricing path for a hydrometeorological CAT bond, not a claim that the bond has already been issued.",
      "Invite questions. The written proposal stays on the QR.",
    ],
  },
  thanks: {
    title: "Thank you",
    paragraphs: [
      "Stop on the question the committee actually asks. The slide does not add a new result.",
    ],
    bullets: [
      "Full text, figures, and tables remain at the proposal link from the QR slide.",
    ],
  },
};
