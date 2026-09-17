import type { SectionId } from "./research";

export type ProseBlock = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
};

export const proposalProse: Record<SectionId, ProseBlock[]> = {
  cover: [
    {
      heading: "Title page",
      paragraphs: [
        "Master Proposal — Insurance-Linked Securities for Hydrometeorological risks: Pricing a Catastrophe Bond for the Egyptian Market.",
        "Submitted by Mostafa Taha Atrees, Teaching Assistant, Insurance & Actuarial Science Department, Faculty of Commerce, Cairo University.",
      ],
    },
  ],

  opening: [
    {
      heading: "1. Introduction",
      paragraphs: [
        "Sustainability has become one of the most concerns that captures the globe attention and priorities in the 21st century, due to rapid economic growth, population expansion, increased consumption and scarcity of natural resources. These factors created significant pressure and serious environmental and social challenges such as resources depletion, ecological degradation and of course the topic of great current interest climate change. As a result of the appearance of these challenges governments, businesses, and researchers are increasingly focusing on sustainable development where they seek approaches that reconcile economic progress with environmental protection and social welfare.",
        "Sustainability is not a new concept on the globe; this concept began to gain its priority and significancy since 1987 specifically in Brundtland Report also known as Our common future report that were published by the World Commission on Environment and development (WCED) which formally introduced and defined sustainable development as: Development that meets the needs of the present without compromising the ability of future generations to meet their own needs. (World Commission on Environment and Development [WCED], 1987).",
        "Over the last 4 decades, various international conferences and initiatives have been globally advocated for this vision, most of them organized by the United Nations.",
      ],
      bullets: [
        "The 1992 Earth Summit in Rio de Janeiro came with the Rio Declaration that set out key principles for achieving sustainable development through: environmental protection, economic development, and social inclusion. (United Nations, 1992)",
        "The 2012 Rio +20 Summit, which strengthened dedication to eco-friendly economies and sustainable development. (United Nations, 2012)",
        "In 2015 the United Nations Sustainable Development Goals (SDGs) were globally published and adopted as a universal framework for addressing a wide range of global issues. Among these Goals Climate Action demands immediate actions to address and quantify climate change and its effects. However, this framework opened the way for The COP27 Summit held in Sharm El Sheikh.",
        "The 2022 COP27 Summit in Sharm El Sheikh emphasized the urgency of addressing climate change, particularly with developing countries committed to enhance mitigation and adaptation strategies. Key outcomes included: Loss and damage fund; and Adaptation goals. (United Nations Framework Convention on Climate Change [UNFCCC], 2022)",
      ],
    },
    {
      paragraphs: [
        "These events have been crucial in shaping discussions on sustainable development, tackling major challenges, and globalizing a framework for handling such challenges, especially regarding climate change.",
      ],
    },
  ],

  global: [
    {
      heading: "1.1 Climate-related disasters (globally)",
      paragraphs: [
        "Climate change alongside geopolitical conflicts and other large-scales risks are the primary cause of the substantial financial losses confronting the global economy. According to Munich Re financial losses that composed from climate-related disasters in 2024 were US $320 bn of which around US $140 bn (43.75%) were insured and US $180 bn were uninsured. In 2025 US $224 bn of which around US $108 bn were insured (48.21%) and US $116 bn were uninsured. These two years are not exception, they are part of a series of 6 consecutive years that accounted +US $200 bn each arise from climate-related disasters. (Munich Re, 2025, 2026)",
        "Figure 2 provides a year-over-year breakdown of the climate-related disasters (in totals) into insured losses and uninsured losses.",
        "Although historical data shows that there is a protection gap by 67% approximately, Table 1 shows the positive relationship between rapid increase of losses from decade to decade and global awareness for covering and using proactive approaches to face such risks.",
      ],
    },
  ],

  egypt: [
    {
      heading: "1.2 Climate-related disasters (Locally)",
      paragraphs: [
        "A — Egypt’s geographical and urban landscape: The Arab Republic of Egypt is considered as one of the most constrained countries in a geographical basis and highly vulnerable to climate change risks. Although the land area of Egypt is 995,450 km² its human and economic activities are almost constrained to a narrow land mere 5.5% of its total area along the Nile valley, this concentration creates a remarkable level of systemic risk, as any disturbance to the Nile's hydrological cycle or the stability of the Mediterranean coastline yields immediate and extensive consequences for the entire population. (World Bank Group [WBG], 2021)",
        "B — Egypt’s Standing in Global Climate Risk and Performance Indices: The nature of Egypt alongside its risks, policies and readiness in comparison with the rest of the world make it one of the highest countries that are vulnerable to climate-related risks, according to many international indices Egypt is excelling in climate policy and mitigation yet is inherently constrained by significant physical and socio-economic concerns.",
        "C — Statistical overview: The climate-related risks are not recent threats on Egypt, according to world bank in the last 4 decades Egypt has experienced 27 climate-related events encountered in losses accounted $346.7 million (WBG, 2021).",
        "I. Dominance of hydrological hazards (Floods): represent the single largest category of natural disasters recorded in the mentioned period by 41% approximately, this makes Egypt within the highest ranked countries that will be affected by sea-level rise (SLR).",
        "II. Climatological and Meteorological: The aggregated proportion of Storms and extreme temperature occurrences record approximately 40% of the overall disaster tally.",
        "Egypt's physical vulnerability is anchored in its extreme reliance on the Nile River which supplies over 97% of the country's renewable water resources (Egyptian Environmental Affairs Agency [EEAA], 2016). Flow projections for Nile River by 2030 show that there might be 5% reduction from the current flow; by 2060 the potential for decline expands further to forecast a 37% reduction (pessimistic scenario) in the Nile flow, which would lead to 43% decline in agricultural output and a 37% decrease in the sector employment. (WBG, 2022, pp.18)",
        "The Nile delta which contributes approximately 20% of Egypt's national GDP through intensive agriculture, industry, and fisheries faces a combined threat from sea-level rise and land subsidence. A sea-level rise of just 1.0 meters would increase the proportion of Alexandria’s land area below sea level from 30% to 60%, placing millions of residents at risk of annual flooding. (WBG, 2022)",
        "Extreme temperature: from 1900 to 2013 temperature rose by 0.1° per decade; between 2000 and 2022 this rate increased to 0.38° per decade — more than the global average rate 0.31° per decade. Projections indicate that by the end of 2100 temperature in Egypt could be 2.5°–6° higher than pre-industrial levels. Nearly 50% of all electricity in Cairo is consumed for air conditioning during peak summer months. (WBG, 2022)",
        "The Egypt Country Climate and Development Report (CCDR) estimates that without sustained adaptation efforts, the country faces a potential GDP loss of 2% to 6% by 2060, driven by agricultural decline, human capital erosion, and infrastructure damage. (WBG, 2022)",
      ],
    },
    {
      heading: "2.1 Literature — Hydrometeorological Hazards (Floods)",
      paragraphs: [
        "Egypt's arid climate and distinctive landscape, especially its desert areas and extensive dry wadi systems, make several regions, including the Sinai Peninsula, the Red Sea coast, and Upper Egypt, highly vulnerable to flash floods (Helmi & Zohny, 2020). For instance, the 2010 flash flood in Wadi El-Arish destroyed around 780 houses, damaged agricultural land and property, and resulted in direct economic losses of more than US$25.3 million (Helmi & Zohny, 2020). More recently, severe floods in Ras Ghareb in 2016 and 2020, as well as the 2015 flooding in Alexandria, caused fatalities, damaged roads, buildings, and public facilities, and forced many people to leave their homes (Arnous et al., 2022; Haddad et al., 2025).",
        "The severity and frequency of flash floods in Egypt are expected to increase as a result of climate change (Tarek et al., 2024; World Bank, 2022). These changes could expose an additional 1.1 million people to severe flood risk each year (World Bank, 2022). Rapid urban growth and paved surfaces reduce natural drainage, making urban and coastal areas more vulnerable to flooding.",
      ],
    },
    {
      heading: "2.1 Literature — Storms and Mediterranean Cyclones",
      paragraphs: [
        "Egypt’s northern coast is historically exposed to extreme weather events, ranging from typical winter storms to highly destructive mesoscale cyclones, known as Mediterranean Hurricanes or \"Medicanes\" (Miglietta, 2019; Reale et al., 2022). An unexpected late-spring convective storm on May 31, 2025, dropped 13.0 mm of rainfall in Abu Qir within a few hours — more than six times the monthly historical average — causing rapid localized urban flooding across Alexandria (Labib et al., 2026).",
        "Global climate models project that sea surface temperatures near Alexandria will rise by 2.5°C to 3.0°C by the end of the 21st century under CMIP6 scenarios (Thomas et al., 2025). Med-CORDEX projections indicate that while overall annual frequency of Mediterranean cyclones may decrease by 35% to 50%, individual events will become more intense (Reale et al., 2022). Relative sea-level rise is projected to reach 0.74 meters in Alexandria and 0.73 meters in the Nile Delta by 2100, alongside land subsidence rates of up to 14.0 mm per year in districts like Muntazah.",
        "In Alexandria, up to 74% of the urban population will face direct risk from coastal flooding by 2100. A 1.0-meter relative sea-level rise could submerge up to 15% of agricultural land in the Nile Delta, displace 6.7 million residents, and cause over $35 billion USD in direct economic losses (Esmat et al., 2025). With only 12% of the required $246 billion USD in national adaptation investments secured by 2030, there is an urgent necessity for private insurance risk-transfer mechanisms and catastrophe bonds.",
      ],
    },
  ],

  finance: [
    {
      heading: "1.3 Egypt’s climate change action strategy",
      paragraphs: [
        "These systemic risks were the drivers for formulating Egyptian natural catastrophe pool (NatCat). In 2015, the Insurers Federation of Egypt (IFE) first seriously considered the creation of an insurance pool dedicated to natural catastrophes. However, the 2015 project was significantly delayed due to several technical hurdles. The Egyptian market lacked a comprehensive claims database and sophisticated risk mapping making it difficult for insurers and international reinsurers to price the pool's capacity accurately. (Zaki, 2023).",
        "Over the recent years, the IFE worked to resolve these data gaps, eventually forming a dedicated committee in July 2023 to study the establishment of the pool. By December 2024, the collaboration between the IFE and the Egyptian Financial Regulatory Authority (FRA) had intensified, with IFE Chairman Alaa El-Zoheiry confirming that the two organizations were finalizing the pool's structure alongside new parametric insurance products. The formulation of NatCat will alleviate the financial burden on the government and help it achieve resilience.",
      ],
      bullets: [
        "Eradicating poverty and improving the living standards of Egyptian citizens.",
        "Promoting social justice and equality.",
        "Establishing an integrated and sustainable ecosystem.",
        "Achieving a stable and diversified economy.",
        "Developing advanced infrastructure.",
        "Strengthening governance and partnerships.",
      ],
    },
    {
      paragraphs: [
        "Out of the total estimated cost of approximately 211 billion USD for mitigation programs, around 57.6 billion USD has been secured in financing, resulting in a financing gap of approximately 153.6 billion USD. (Table 3 — Ministry of Environment, 2022).",
        "Out of the total estimated cost of approximately 113 billion USD for adaptation programs, around 18.3 billion USD has been secured, leaving a financing gap of approximately 94.7 billion USD. (Table 4 — Ministry of Environment, 2022).",
        "Previous tables illustrate Egypt’s commitment to adopt global sustainability goals. However, insufficient financing constitutes a significant constraint on the implementation of such strategic plans. Egyptian NatCat may decrease the fiscal pressure imposed by climate-related risks on the government. However, NatCat alone remains insufficient for absorbing heavy-tail risks. The pool would benefit from the introduction and issuance of insurance-linked securities (ILS) and financial instruments such as catastrophe bonds (CAT Bonds), which could enhance the accessibility of the Egyptian insurance market and broader economy to international financial markets.",
        "This study proposes to examine the valuation of CAT bonds as an applicable risk transfer instrument for Egypt.",
      ],
    },
  ],

  litHazard: [
    {
      heading: "2.1 Literature — Hydrometeorological Hazards (Floods)",
      paragraphs: [
        "Egypt's arid climate and distinctive landscape, especially its desert areas and extensive dry wadi systems, make several regions, including the Sinai Peninsula, the Red Sea coast, and Upper Egypt, highly vulnerable to flash floods (Helmi & Zohny, 2020). For instance, the 2010 flash flood in Wadi El-Arish destroyed around 780 houses, damaged agricultural land and property, and resulted in direct economic losses of more than US$25.3 million (Helmi & Zohny, 2020). More recently, severe floods in Ras Ghareb in 2016 and 2020, as well as the 2015 flooding in Alexandria, caused fatalities, damaged roads, buildings, and public facilities, and forced many people to leave their homes (Arnous et al., 2022; Haddad et al., 2025).",
        "The severity and frequency of flash floods in Egypt are expected to increase as a result of climate change (Tarek et al., 2024; World Bank, 2022). These changes could expose an additional 1.1 million people to severe flood risk each year (World Bank, 2022). Rapid urban growth and paved surfaces reduce natural drainage, making urban and coastal areas more vulnerable to flooding.",
      ],
    },
    {
      heading: "2.1 Literature — Storms and Mediterranean Cyclones",
      paragraphs: [
        "Egypt’s northern coast is historically exposed to extreme weather events, ranging from typical winter storms to highly destructive mesoscale cyclones, known as Mediterranean Hurricanes or \"Medicanes\" (Miglietta, 2019; Reale et al., 2022). An unexpected late-spring convective storm on May 31, 2025, dropped 13.0 mm of rainfall in Abu Qir within a few hours — more than six times the monthly historical average — causing rapid localized urban flooding across Alexandria (Labib et al., 2026).",
        "In Alexandria, up to 74% of the urban population will face direct risk from coastal flooding by 2100. A 1.0-meter relative sea-level rise could submerge up to 15% of agricultural land in the Nile Delta, displace 6.7 million residents, and cause over $35 billion USD in direct economic losses (Esmat et al., 2025).",
      ],
    },
  ],

  litInstrument: [
    {
      heading: "2.2 Catastrophe (CAT) Bonds — Emergence and definitions",
      paragraphs: [
        "CAT Bonds first introduced in the early-1990s after Hurricane Andrew which exposed significant limitations in traditional reinsurance capacity. (Polacek, 2018)",
      ],
      bullets: [
        "Economic Efficiency (Froot, 2001): CAT bonds are high-yield debt instruments whose coupon and/or principal payments are reduced or eliminated if a specified catastrophic event occurs. They transfer risk from insurers to the capital markets, bypassing traditional reinsurance capacity constraints.",
        "Legal & structural (Cummins, 2008): A CAT bond is a fully collateralized instrument that pays a coupon and returns principal to investors unless a specified catastrophic event occurs. In a qualifying catastrophe, the principal is released to the sponsoring insurer to pay claims.",
        "Policy & regulatory (OECD, 2021): CAT bonds are a type of insurance-linked security (ILS) that transfers a specific set of risks from an issuer to investors when a predefined trigger event occurs.",
        "Technical (Barrieu & Albertini, 2009): Risk is transferred through a Special Purpose Vehicle (SPV). The SPV issues the bonds and invests proceeds in low-risk collateral. The trigger may be indemnity, industry index, or physical parameters.",
      ],
    },
    {
      heading: "Valuation challenges & actuarial approaches",
      paragraphs: [
        "By transferring catastrophe risk to capital markets, Cat Bonds provide issuers with additional financial protection while offering investors an attractive investment opportunity. Since their performance depends on localized catastrophic events rather than broader financial market conditions, Cat Bonds generally have little or no correlation with traditional financial assets (Lai, Parcollet, & Lamond, 2013; Ma, 2025).",
        "Valuing Cat Bonds remains a major challenge because they are traded in incomplete markets, where catastrophic risks cannot be perfectly hedged or replicated using conventional financial instruments (Shao et al., 2017; Siyamah, Putri, & Imron, 2021). Natural disasters occur infrequently but often cause extremely large losses, limiting historical data availability (Kurniawan et al., 2021; Ma, 2025).",
        "Many studies rely on actuarial expected loss models combined with probability distortion techniques, using measures such as Probability of First Loss (PFL) and Expected Loss (EL) (Burnecki, Teuerle, & Zdeb, 2025). The Wang transform adjusts the pricing measure to better reflect extreme tail risks (Wang, 2004). Recent studies propose the Esscher transform, which offers greater mathematical tractability by modifying the entire aggregate loss distribution, incorporating both frequency and severity (Ma, 2025).",
      ],
    },
  ],

  gap: [
    {
      heading: "3. Research gap and problem",
      paragraphs: [
        "Table 5 summarizes four research themes and the gaps this study addresses:",
        "Hazard Identification and Hydrodynamic Modeling — Existing work maps flash flood vulnerabilities using GIS and DEM in areas like Ras Gharib and the Sinai Peninsula, and quantifies future storm/Medicane exposure and economic losses (Helmi & Zohny, 2020; Tügel et al., 2020; Esmat et al., 2025; Thomas et al., 2025; Elshinnawy & Almaliki, 2021). Gap: physical and morphometric model outputs are rarely translated directly into probability indices for parametric insurance or actuarial pricing.",
        "Economic and Macro-Fiscal Impacts — CGE frameworks estimate macroeconomic costs of coastal and pluvial flooding in Egyptian port cities (Haddad et al., 2025). Gap: assessments focus on broad economic damages without proposing localized disaster risk financing strategies.",
        "CAT Bond Pricing Models — Stochastic processes, Monte Carlo, and probability distortion operators (Wang, Esscher) price CAT bonds (Wang, 2004; Shao et al., 2017; Ma, 2025). Gap: frameworks are predominantly calibrated using US PCS or Asian hydrological data, leaving a geographical gap for MENA.",
        "Hydrometeorological CAT Bonds specifically — Emerging literature exists (Ibrahim, Santoso & Sukono, 2026; Kurniawan et al., 2021; Siyamah, Putri & Imron, 2021) but is confined to Indonesia; no hydrometeorological CAT bond study exists for Egypt.",
      ],
    },
    {
      heading: "3.2 Research problem",
      paragraphs: [
        "Hydrometeorological risks in Egypt are well documented from a physical and economic standpoint, yet no study has developed a financial pricing model to transfer this risk to capital markets. Existing catastrophe bond pricing models have been calibrated almost exclusively on data from the United States or Southeast Asia, and flood-specific catastrophe bonds have so far been studied only in Indonesia. As a result, there is no established framework for pricing Hydrometeorological catastrophe risk in Egypt, despite the country's high exposure to Hydrometeorological losses and its notably low insurance penetration. This research addresses that gap by applying two distortion-based pricing models Wang (2004) and Ma (2025) to a dataset of Egyptian Hydrometeorological events, offering the first empirical pricing framework for a Hydrometeorological catastrophe bond in Egypt.",
      ],
    },
  ],

  hypotheses: [
    {
      heading: "4. Research Hypothesis",
      paragraphs: [],
      bullets: [
        "(H1): The Wang (2004) two-factor distortion model and the Ma (2025) Esscher transform produce statistically different estimates of fair CAT bond yield spreads for Egyptian Hydrometeorological risk.",
        "(H2): Heavy-tailed probability distributions such as (Lognormal) provide a statistically superior fit to Egyptian Hydrometeorological-loss severity data than lighter-tailed alternatives such as (Gamma).",
        "(H3): For identical catastrophe loss scenarios, the Wang (2004) and Ma (2025) pricing models generate significantly different CAT bond prices, and the magnitude of this difference increases as the bond's attachment layer moves toward higher-severity losses.",
        "(H4): After incorporating an appropriate market risk premium, the yield spreads estimated by the Wang (2004) and Ma (2025) models will not differ significantly from the observed spreads of comparable Hydrometeorological catastrophe bonds issued in international markets.",
        "(H5): Assuming that Hydrometeorological risk frequency is constant over time will significantly underprice the bond compared to a model that includes an increasing climate-driven trend.",
      ],
    },
    {
      heading: "5. Research Objectives",
      paragraphs: [
        "This research aims to develop and evaluate a solid actuarial model for pricing Hydrometeorological CAT bond in Egypt through:",
      ],
      bullets: [
        "Setting up an overall flood-loss distribution for the Egyptian insurance market by using EM-DAT database from 1987-2025.",
        "Applying the two-factor Wang transfer by utilizing t-student distribution to correct the parameter uncertainty that derived from the scarcity of data (sample size = 18).",
        "Constructing a benchmark pricing model using the Esscher transform on a compound Poisson-Gamma distribution.",
        "Comparing the yield spreads derived from both models and assessing how the Gamma-severity assumption required by Esscher differ from the Lognormal tail captured by Wang transform.",
      ],
    },
  ],

  method: [
    {
      heading: "7. Research Methodology",
      paragraphs: [
        "7.1 Research framework: This study adopts a distortion-based catastrophe bond pricing to estimate the fair value of a Cat Bond rather than conventional pricing approaches that are based on econometric regression. The valuation process will be implemented by using Monte Carlo simulation which generates realization of annual Hydrometeorological losses and evaluates the corresponding Cat Bond cash flows under each pricing operator.",
        "7.2 Data collection: This study employs dataset of 18 Hydrometeorological events in Egypt that were extracted from the international disaster database (EM-DAT) and occurred between 1987-2025. The dataset is used to estimate two components: Hydrometeorological event frequency modeled using Poisson process; and Hydrometeorological event severity modeled using the best fitting heavy-tailed distribution.",
        "7.3 Proposed pricing models: The pricing process in this study will be implemented under two distortion-based pricing models that are specifically chosen due to limited historical observations.",
        "Model I (Primary) — Wang (2004) two-factor distortion model: The primary pricing model applies the Wang probability distortion to the loss exceedance function S*(x) = Q_t(Φ⁻¹(S(x)) + λ_W), k = n − 2, where S*(x) is distorted exceedance probability; Q_t is t-student CDF; Φ⁻¹ is the inverse standard normal; S(x) is the original loss exceedance probability; λ_W is the Wang market price of catastrophe risk; and degrees of freedom discount for parameter estimation uncertainty at this small sample size.",
        "Model II (Benchmark) — Ma (2025) Esscher Transform: For aggregate loss X = Σ Z_i with N ~ Poisson(λ) and Z_i ~ Gamma(α, β), the Esscher transform with parameter h decomposes as severity β* = β − h and frequency λ* = λ (β/(β − h))^α, with condition 0 < h < β.",
        "7.5 Models’ comparison: The study will compare the pricing results generated by Wang and Ma distortion operators under a common CAT bond structure. The principal contribution of the comparison section is quantifying the pricing gap between Lognormal of Wang and Gamma of Esscher to clarify which operator fits best for this small sample and heavy-tailed risks. Figure 5 summarizes the pricing process.",
      ],
    },
  ],

  simulation: [
    {
      heading: "Linked methodology note (from §7)",
      paragraphs: [
        "The valuation process will be implemented by using Monte Carlo simulation which generates realization of annual Hydrometeorological losses and evaluates the corresponding Cat Bond cash flows under each pricing operator.",
        "Hypothesis H3 anticipates that pricing differences between Wang and Ma increase as the bond's attachment layer moves toward higher-severity losses. Hypothesis H5 anticipates that assuming constant hydrometeorological risk frequency will significantly underprice the bond compared to a model with an increasing climate-driven trend.",
        "Important: the interactive sandbox on this screen is an illustrative defense demo only. Final calibrated prices, fitted distributions, and yield spreads will appear in Chapter 4 empirical results of the thesis.",
      ],
    },
  ],

  contribution: [
    {
      heading: "6. Research Importance",
      paragraphs: [
        "This research will have a significant importance due to combining careful financial engineering with policy solution that can be put into action and that will help Egypt to deal with macroeconomic and environmental challenges. The study contribution will be shown up in 3 dimensions:",
        "I. Academically: the research contributes to the Egyptian literature by providing a pricing framework for Hydrometeorological CAT bond and filling the gap of absence any literature about this topic.",
        "II. Egyptian NatCat Pool: With the recent collaboration between Insurance Federation of Egypt (IFE) and Financial Regulatory Authority (FRA) to formulate and finalize natural catastrophe pool’s structure and develop Insurance-linked securities and parametric products, this study provides mathematical framework that directly supports these regulatory and actuarial objectives. The study demonstrates that a domestic insurance pool alone may be insufficient to absorb such massive shocks, so by structuring a CAT Bond the research provides a blueprint to bypass the constraints on NatCat pool’s capacity of traditional reinsurance and helps in accessing global capital markets.",
        "III. Egyptian government, fiscal policy and sustainability: This research structures a financial instrument that shields the government’s budget from the sudden and unbudgeted fiscal shocks required for emergency response and infrastructure resilience. The proposed Hydrometeorological Cat Bond helps with a critical shift in the government’s disaster management strategy by moving from slow reactive ex-post funding to proactive disaster risk financing. Egypt’s National Climate Change Strategy 2050 identifies $94.7 billion financing gap for adaptation programs. The valuation and potential issuance of sovereign catastrophe bonds introduce an innovative and non-traditional channel of international climate finance directly supporting Egypt’s Vision 2030.",
      ],
    },
  ],

  limits: [
    {
      heading: "8. Research Structure",
      paragraphs: [
        "Chapter one: Introduces the research background covering global and local climate-related risks, Egypt's exposure to Hydrometeorological hazards, and the motivation for exploring CAT bonds as a risk transfer instrument.",
        "Chapter two: Reviews the relevant literature on Hydrometeorological risk in Egypt and the evolution of CAT bond pricing models leading to the identification of the research gap and problem statement.",
        "Chapter three: Outlines the research methodology, including the data source, the two candidate pricing models (Wang, 2004; Ma, 2025), and the Monte Carlo simulation framework used to generate risk-adjusted bond prices.",
        "Chapter four: Presents the empirical results, including the fitted frequency and severity distributions, the calibrated pricing outputs under each model, and the comparative analysis of yield spreads.",
        "These 4 chapters will lead to conclusions summarizing key findings, discussing their implications for Egypt's disaster risk financing strategy, and outlining directions for future research.",
      ],
    },
    {
      heading: "9. Research limitations",
      paragraphs: [
        "9.1 Data scarcity: The analysis is based on 18 recorded Hydrometeorological events; this limitation motivates the adoption of the Wang Two-Factor Distortion Model, which explicitly accounts for estimation uncertainty.",
        "9.2 Time & geographic scope: The dataset spans a 39-year window (1987–2026). The study focuses on Egypt as a single country. This national focus enables a tailored and market-specific pricing framework though the calibrated parameters are not intended to generalize to other MENA countries.",
        "9.3 Study Scope: The study is limited to a comparative evaluation of the Wang (2004) Two-Factor Distortion Model and the Ma (2025) Esscher (Poisson, Gamma) Model. Other CAT bond pricing approaches are beyond the scope of this research. The study focuses exclusively on hydrometeorological risk rather than a multi-peril model; other climate-related risks such as seismic hazards were excluded due to the lack of sufficient historical data required to construct a reliable probability distribution.",
      ],
    },
  ],

  close: [
    {
      heading: "Closing from the proposal framing",
      paragraphs: [
        "This research addresses the absence of an established framework for pricing Hydrometeorological catastrophe risk in Egypt by applying two distortion-based pricing models — Wang (2004) and Ma (2025) — to Egyptian Hydrometeorological events, offering the first empirical pricing framework for a Hydrometeorological catastrophe bond in Egypt.",
        "The expected contribution spans academic literature, the Egyptian NatCat pool (IFE–FRA), and government fiscal / sustainability strategy including Vision 2030 and the adaptation financing gap.",
      ],
    },
  ],

  thanks: [],
};
