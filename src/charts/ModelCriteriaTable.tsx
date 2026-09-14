import { modelCriteria } from "../data/research";

export function ModelCriteriaTable() {
  return (
    <div className="panel" style={{ overflowX: "auto" }}>
      <h3>Table 6 — Models’ selection criteria</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ color: "var(--text-muted)", textAlign: "left" }}>
            <th style={{ padding: "8px 6px", borderBottom: "1px solid var(--border)" }}>
              Criterion
            </th>
            <th style={{ padding: "8px 6px", borderBottom: "1px solid var(--border)" }}>
              Wang (2004) · Primary
            </th>
            <th style={{ padding: "8px 6px", borderBottom: "1px solid var(--border)" }}>
              Ma (2025) · Benchmark
            </th>
          </tr>
        </thead>
        <tbody>
          {modelCriteria.map((row) => (
            <tr key={row.criterion}>
              <td style={{ padding: "10px 6px", borderBottom: "1px solid var(--border)" }}>
                {row.criterion}
              </td>
              <td
                style={{
                  padding: "10px 6px",
                  borderBottom: "1px solid var(--border)",
                  color: "var(--insured)",
                }}
              >
                {row.wang}
              </td>
              <td
                style={{
                  padding: "10px 6px",
                  borderBottom: "1px solid var(--border)",
                  color: "var(--nile)",
                }}
              >
                {row.ma}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="source">Table 6 · Researcher’s elaboration — n=18 favors Wang two-factor</div>
    </div>
  );
}
