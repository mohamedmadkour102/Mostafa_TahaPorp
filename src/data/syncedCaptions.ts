import type { SectionId } from "./research";

/** Default caption shown when entering a section in Present mode */
export const defaultCaptions: Partial<Record<SectionId, string>> = {
  opening:
    "Start from the research question — then walk the committee through the evidence.",
  global:
    "In 2024 climate disasters caused ~$320bn losses; ~$180bn were uninsured (Munich Re).",
  egypt:
    "Explore GFDRR Figure 4: river vs coastal flood exposure — click hotspots (Alexandria, Delta, flash-flood sites) then scrub the future timeline.",
  finance:
    "NatCat helps fiscal resilience, but alone remains insufficient for heavy-tail risks — ILS / CAT bonds open capital markets.",
  catbond:
    "A CAT bond transfers catastrophe risk through an SPV: investors fund collateral; a trigger decides payout.",
  gap: "Physical and macro studies exist for Egypt — an empirical hydrometeorological CAT bond pricing framework does not.",
  hypotheses:
    "Five hypotheses test Wang vs Ma spreads, tail fit, attachment sensitivity, market comparability, and climate trend.",
  method:
    "Distortion pricing + Monte Carlo on EM-DAT (n=18) — Wang primary with t-correction; Ma as Esscher benchmark.",
  simulation:
    "Illustrative dual-path demo for H1/H3/H5 storytelling — not final Chapter 4 results.",
  contribution:
    "Impact across academy, Egyptian NatCat (IFE–FRA), and sovereign climate-finance resilience.",
  limits:
    "n=18, Egypt-only, hydro-only — scope limits motivate Wang’s uncertainty correction.",
  close:
    "Return to the question: how Egypt can price hydro catastrophe risk and transfer it via a CAT bond.",
};
