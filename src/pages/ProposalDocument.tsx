import { Link } from "react-router-dom";
import {
  adaptationSummary,
  climateIndices,
  decadeLosses,
  meta,
  mitigationSummary,
  modelCriteria,
  sections,
  type SectionId,
} from "../data/research";
import { proposalProse } from "../data/proposalProse";
import { pdfFigures } from "../data/pdfFigures";

const readingOrder: SectionId[] = sections
  .map((s) => s.id)
  .filter((id) => id !== "thanks" && id !== "qr");

const sectionFigures: Partial<
  Record<SectionId, { src: string; label: string; alt: string; source: string }[]>
> = {
  global: [pdfFigures.fig1, pdfFigures.fig2],
  egypt: [pdfFigures.fig3, pdfFigures.fig4River, pdfFigures.fig4Coastal],
  method: [pdfFigures.fig5],
};

function FigureBlock({
  src,
  label,
  alt,
  source,
}: {
  src: string;
  label: string;
  alt: string;
  source: string;
}) {
  return (
    <figure className="doc-figure">
      <img src={src} alt={alt} loading="lazy" />
      <figcaption>
        <strong>{label}</strong>
        <span>{source}</span>
      </figcaption>
    </figure>
  );
}

function DecadeTable() {
  return (
    <div className="doc-table-wrap">
      <h4>Table 1 — Climate-related losses by decade (USD bn)</h4>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Decade</th>
            <th>Total</th>
            <th>Insured</th>
            <th>Uninsured</th>
            <th>Gap %</th>
          </tr>
        </thead>
        <tbody>
          {decadeLosses.map((r) => (
            <tr key={r.decade}>
              <td>{r.decade}</td>
              <td>{r.total}</td>
              <td>{r.insured}</td>
              <td>{r.uninsured}</td>
              <td>{r.gap}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="doc-table-note">Researcher’s elaboration based on Munich Re.</p>
    </div>
  );
}

function IndicesTable() {
  return (
    <div className="doc-table-wrap">
      <h4>Table 2 — Egypt climate risk &amp; performance indices</h4>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Year</th>
            <th>Rank</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {climateIndices.map((r) => (
            <tr key={r.name}>
              <td>{r.name}</td>
              <td>{r.year}</td>
              <td>{r.rank}</td>
              <td>{r.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FinanceSummary() {
  return (
    <div className="doc-table-wrap">
      <h4>Tables 3–4 — Financing gaps (summary)</h4>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Program</th>
            <th>Total (USD bn)</th>
            <th>Secured</th>
            <th>Gap</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mitigation (Table 3)</td>
            <td>{mitigationSummary.totalBn}</td>
            <td>{mitigationSummary.securedBn}</td>
            <td>{mitigationSummary.gapBn}</td>
          </tr>
          <tr>
            <td>Adaptation (Table 4)</td>
            <td>{adaptationSummary.totalBn}</td>
            <td>{adaptationSummary.securedBn}</td>
            <td>{adaptationSummary.gapBn}</td>
          </tr>
        </tbody>
      </table>
      <p className="doc-table-note">Ministry of Environment, 2022.</p>
    </div>
  );
}

function CriteriaTable() {
  return (
    <div className="doc-table-wrap">
      <h4>Table 6 — Wang vs Ma model criteria</h4>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Criterion</th>
            <th>Wang (2004)</th>
            <th>Ma (2025)</th>
          </tr>
        </thead>
        <tbody>
          {modelCriteria.map((r) => (
            <tr key={r.criterion}>
              <td>{r.criterion}</td>
              <td>{r.wang}</td>
              <td>{r.ma}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProposalDocument() {
  return (
    <div className="doc-page">
      <header className="doc-topbar">
        <div>
          <p className="doc-kicker">Proposal text · from Mostafa Taha Proposal V4</p>
          <h1 className="doc-brand">{meta.shortTitle}</h1>
        </div>
        <nav className="doc-nav">
          <Link to="/" className="btn">
            ← Interactive defense
          </Link>
        </nav>
      </header>

      <article className="doc-article">
        <header className="doc-hero">
          <p className="doc-eyebrow">Master Proposal</p>
          <h2>{meta.title}</h2>
          <p className="doc-byline">
            {meta.researcher} · Cairo University · Faculty of Commerce · Insurance &amp;
            Actuarial Science
          </p>
          <p className="doc-lede-q">{meta.researchQuestion}</p>
        </header>

        <nav className="doc-toc" aria-label="Contents">
          <strong>Contents</strong>
          <ol>
            {readingOrder.map((id) => {
              const blocks = proposalProse[id] ?? [];
              if (!blocks.length) return null;
              const label =
                blocks.find((b) => b.heading)?.heading ??
                sections.find((s) => s.id === id)?.label ??
                id;
              return (
                <li key={id}>
                  <a href={`#doc-${id}`}>{label}</a>
                </li>
              );
            })}
          </ol>
        </nav>

        {readingOrder.map((id) => {
          const blocks = proposalProse[id] ?? [];
          if (!blocks.length) return null;
          const figures = sectionFigures[id] ?? [];

          return (
            <section key={id} id={`doc-${id}`} className="doc-section">
              {blocks.map((block, i) => (
                <div key={`${id}-${i}`} className="doc-block">
                  {block.heading && <h3>{block.heading}</h3>}
                  {block.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                  {block.bullets && block.bullets.length > 0 && (
                    <ul>
                      {block.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {figures.map((fig) => (
                <FigureBlock key={fig.src} {...fig} />
              ))}

              {id === "global" && <DecadeTable />}
              {id === "egypt" && <IndicesTable />}
              {id === "finance" && <FinanceSummary />}
              {id === "method" && <CriteriaTable />}
            </section>
          );
        })}
      </article>

      <footer className="doc-footer">
        <p>
          Full proposal content extracted for defense ·{" "}
          <Link to="/">Open interactive presentation</Link>
        </p>
      </footer>
    </div>
  );
}
