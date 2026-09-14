/** Central registry of proposal figure assets extracted from Proposal V4.pdf */
export const pdfFigures = {
  fig1: {
    src: "/maps/fig1-munich-re.png",
    label: "Figure 1",
    alt: "Global climate-related disaster losses — Munich Re (Proposal V4)",
    source: "Figure 1 · Researcher’s elaboration based on Munich Re dataset",
  },
  fig2: {
    src: "/maps/fig2-insured-uninsured.png",
    label: "Figure 2",
    alt: "Insured vs uninsured climate losses year-over-year — Munich Re (Proposal V4)",
    source: "Figure 2 · Researcher’s elaboration based on Munich Re dataset",
  },
  fig3: {
    src: "/maps/fig3-cred-pie.png",
    label: "Figure 3",
    alt: "Egypt natural disaster mix pie chart — CRED (Proposal V4)",
    source: "Figure 3 · Centre for Research on the Epidemiology of Disasters [CRED], 2026",
  },
  fig4River: {
    src: "/maps/fig4-river-flood.png",
    label: "Figure 4 · River",
    alt: "Egypt river flood exposure map — GFDRR (Proposal V4)",
    source: "Figure 4 (left) · GFDRR",
  },
  fig4Coastal: {
    src: "/maps/fig4-coastal-flood.png",
    label: "Figure 4 · Coastal",
    alt: "Egypt coastal flood exposure map — GFDRR (Proposal V4)",
    source: "Figure 4 (right) · GFDRR",
  },
  fig5: {
    src: "/maps/fig5-pricing-flowchart.png",
    label: "Figure 5",
    alt: "CAT bond pricing process flowchart (Proposal V4)",
    source: "Figure 5 · Summarizes the pricing process; Researcher’s elaboration",
  },
} as const;
