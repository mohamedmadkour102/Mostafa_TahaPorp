import { useEffect, useState, type ReactNode } from "react";
import { useIsMobile } from "../hooks/useMediaQuery";

type Props = {
  figureLabel: string;
  sourceNote: string;
  originalSrc: string;
  originalAlt: string;
  children: ReactNode;
  defaultView?: "both" | "original" | "interactive";
};

export function ChartDualView({
  figureLabel,
  sourceNote,
  originalSrc,
  originalAlt,
  children,
  defaultView = "both",
}: Props) {
  const isMobile = useIsMobile();
  const [view, setView] = useState<"both" | "original" | "interactive">(defaultView);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    if (isMobile) setView("interactive");
    else setView(defaultView);
  }, [isMobile, defaultView]);

  return (
    <div className="chart-dual">
      <div className="chart-dual-toolbar">
        <span className="chip">{figureLabel}</span>
        <div className="tabs chart-dual-tabs">
          {!isMobile && (
            <button
              type="button"
              className={`tab ${view === "both" ? "active" : ""}`}
              onClick={() => setView("both")}
            >
              Both
            </button>
          )}
          <button
            type="button"
            className={`tab ${view === "interactive" ? "active" : ""}`}
            onClick={() => setView("interactive")}
          >
            Interactive
          </button>
          <button
            type="button"
            className={`tab ${view === "original" ? "active" : ""}`}
            onClick={() => setView("original")}
          >
            {isMobile ? "PDF" : "PDF original"}
          </button>
        </div>
      </div>

      <div className={`chart-dual-body ${view}`}>
        {(view === "both" || view === "original") && (
          <div className="chart-dual-original panel">
            <div className="chart-dual-original-head">
              <h3>From Proposal V4</h3>
              <button type="button" className="btn" onClick={() => setLightbox(true)}>
                Expand
              </button>
            </div>
            <button
              type="button"
              className="chart-dual-img-btn"
              onClick={() => setLightbox(true)}
              title="Tap to enlarge"
            >
              <img src={originalSrc} alt={originalAlt} className="chart-dual-img" />
            </button>
            <div className="source">{sourceNote}</div>
          </div>
        )}

        {(view === "both" || view === "interactive") && (
          <div className="chart-dual-interactive">{children}</div>
        )}
      </div>

      {lightbox && (
        <div className="chart-lightbox" onClick={() => setLightbox(false)} role="dialog">
          <div className="chart-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <div className="chart-dual-original-head">
              <strong>{figureLabel}</strong>
              <button type="button" className="btn" onClick={() => setLightbox(false)}>
                Close
              </button>
            </div>
            <img src={originalSrc} alt={originalAlt} className="chart-lightbox-img" />
            <div className="source">{sourceNote}</div>
          </div>
        </div>
      )}
    </div>
  );
}
