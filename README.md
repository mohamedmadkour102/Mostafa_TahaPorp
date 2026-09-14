# CAT Bond Egypt — Interactive Research Defense

Fullscreen interactive presentation for Mostafa Taha’s master’s proposal:

**Insurance-Linked Securities for Hydrometeorological risks: Pricing a Catastrophe (CAT) Bond for the Egyptian insurance Market.**

## Run

```bash
cd "C:\Users\Lenovo\Downloads\Mostafa Taha\cat-bond-defense"
npm install
npm run dev
```

Open `http://localhost:5173/` — Defense deck loads directly.

## Content modes

- **Present (default):** visuals + synced caption under the chart; open proposal text with **T** (drawer)
- **Study (`F`):** side-by-side visuals + full proposal prose (prep mode)

## Keyboard

| Key | Action |
|-----|--------|
| `→` / `Space` | Next section |
| `←` | Previous |
| `T` | Open / close proposal text drawer |
| `F` | Toggle Present / Study |
| `O` | Overview grid |
| `P` | Presenter notes |
| `L` | Light (default) / dark theme |
| `1`–`9` | Jump to section |
| `Esc` | Close overlays / drawer |

## Motion

- Count-up hero metrics
- Chart draw-on (ECharts)
- CAT bond money-flow
- Pricing pipeline auto-play (pause anytime)



## What’s included

- 12 defense scenes (opening → close)
- Interactive versions of proposal **Figures 1–5** and **Tables 1–6**
- CAT bond structure diagram + live pricing pipeline
- Illustrative Monte Carlo sandbox (labeled as non-final)
- Dark “defense” palette inspired by academic Nile/insurance charts

## Data note

Figure 1/2 yearly series are researcher-style elaborations aligned to proposal anchors (2024/2025 Munich Re figures + Table 1 decades). Replace `src/data/research.ts` → `yearlyClimateLosses` with Mostafa’s exact chart extract when available.
