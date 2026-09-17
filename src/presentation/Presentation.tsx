import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { sections, speakerNotes, type SectionId } from "../data/research";
import {
  ContentModeProvider,
  useContentMode,
} from "../components/SceneShell";
import { CoverScene } from "../sections/Cover";
import { OpeningScene } from "../sections/Opening";
import { GlobalScene } from "../sections/Global";
import { EgyptScene } from "../sections/Egypt";
import { FinanceScene } from "../sections/Finance";
import { LitHazardScene } from "../sections/LitHazard";
import { LitInstrumentScene } from "../sections/LitInstrument";
import { GapScene } from "../sections/Gap";
import { HypothesesScene } from "../sections/Hypotheses";
import { MethodScene } from "../sections/Method";
import { SimulationScene } from "../sections/Simulation";
import { ContributionScene } from "../sections/Contribution";
import { LimitsScene } from "../sections/Limits";
import { CloseScene } from "../sections/Close";
import { ThanksScene } from "../sections/Thanks";
import { QrIntroScene } from "../sections/QrIntro";

const sceneMap: Record<SectionId, ReactNode> = {
  qr: null,
  cover: null,
  opening: null,
  global: <GlobalScene />,
  egypt: <EgyptScene />,
  finance: <FinanceScene />,
  litHazard: <LitHazardScene />,
  litInstrument: <LitInstrumentScene />,
  gap: <GapScene />,
  hypotheses: <HypothesesScene />,
  method: <MethodScene />,
  simulation: <SimulationScene />,
  contribution: <ContributionScene />,
  limits: <LimitsScene />,
  close: <CloseScene />,
  thanks: null,
};

function PresentationInner() {
  const [index, setIndex] = useState(0);
  const [presenter, setPresenter] = useState(false);
  const [overview, setOverview] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const { mode, toggleMode, toggleDrawer, setDrawerOpen, drawerOpen } = useContentMode();

  const section = sections[index];
  const progress = ((index + 1) / sections.length) * 100;

  const go = useCallback((next: number) => {
    setIndex(Math.max(0, Math.min(sections.length - 1, next)));
    setOverview(false);
    setDrawerOpen(false);
    requestAnimationFrame(() => {
      const stage = document.querySelector(".stage");
      if (stage instanceof HTMLElement) stage.scrollTop = 0;
    });
  }, [setDrawerOpen]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme === "dark" ? "dark" : "light",
    );
  }, [theme]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key.toLowerCase() === "p") {
        setPresenter((v) => !v);
      } else if (e.key.toLowerCase() === "o") {
        setOverview((v) => !v);
      } else if (e.key.toLowerCase() === "l") {
        setTheme((t) => (t === "dark" ? "light" : "dark"));
      } else if (e.key.toLowerCase() === "f") {
        toggleMode();
      } else if (e.key.toLowerCase() === "t") {
        toggleDrawer();
      } else if (e.key === "Escape") {
        setOverview(false);
        setPresenter(false);
        setDrawerOpen(false);
      } else if (/^[1-9]$/.test(e.key)) {
        go(Number(e.key) - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, toggleMode, toggleDrawer, setDrawerOpen]);

  return (
    <div className="presentation">
      <aside className="rail" aria-label="Sections">
        {sections.map((s, i) => (
          <button
            key={s.id}
            className={i === index ? "active" : ""}
            title={s.label}
            onClick={() => go(i)}
          >
            <span className="rail-num">{s.short}</span>
            <span className="rail-label">{s.label}</span>
          </button>
        ))}
      </aside>

      <div className="stage-wrap">
        <div className="defense-topbar">
          <span className="defense-top-title">CAT Bond Egypt · Defense</span>
          <Link className="defense-top-link" to="/proposal">
            Full proposal →
          </Link>
        </div>
        <main className="stage">
          <AnimatePresence mode="wait">
            <motion.div
              key={section.id}
              className="stage-scene"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              {section.id === "qr" ? (
                <QrIntroScene
                  onEnter={() =>
                    go(sections.findIndex((s) => s.id === "cover"))
                  }
                />
              ) : section.id === "cover" ? (
                <CoverScene
                  onEnter={() =>
                    go(sections.findIndex((s) => s.id === "opening"))
                  }
                />
              ) : section.id === "opening" ? (
                <OpeningScene
                  onEnter={() =>
                    go(sections.findIndex((s) => s.id === "global"))
                  }
                />
              ) : section.id === "thanks" ? (
                <ThanksScene />
              ) : (
                sceneMap[section.id]
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="footer-bar">
          <span className="footer-meta">
            {section.short} · {section.label} ·{" "}
            {mode === "full" ? "Study" : "Present"}
            {drawerOpen ? " · Text open" : ""}
          </span>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="kbd-hint">→ ← · T · F · O · P · L</span>
        </footer>

        {presenter && (
          <div className="presenter">
            <h4>Presenter · {section.label}</h4>
            <p>{speakerNotes[section.id]}</p>
            <p style={{ marginTop: 10 }}>
              Next: {sections[Math.min(sections.length - 1, index + 1)].label}
            </p>
          </div>
        )}

        {overview && (
          <div className="overview" onClick={() => setOverview(false)}>
            <div className="overview-grid" onClick={(e) => e.stopPropagation()}>
              {sections.map((s, i) => (
                <button key={s.id} onClick={() => go(i)}>
                  <span>{s.short}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Presentation() {
  return (
    <ContentModeProvider>
      <PresentationInner />
    </ContentModeProvider>
  );
}
