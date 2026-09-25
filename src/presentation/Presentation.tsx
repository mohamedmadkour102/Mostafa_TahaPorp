import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
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
import { WeatherAtmosphere } from "../components/WeatherAtmosphere";

export type PresentationVariant = "classic" | "storm" | "azure" | "midnight";

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

function PresentationInner({ variant }: { variant: PresentationVariant }) {
  const storm = variant === "storm";
  const azure = variant === "azure";
  const midnight = variant === "midnight";
  const [index, setIndex] = useState(0);
  const [presenter, setPresenter] = useState(false);
  const [overview, setOverview] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const { toggleDrawer, setDrawerOpen } = useContentMode();

  const deck = useMemo(
    () => (azure ? sections.filter((s) => s.id !== "opening") : sections),
    [azure],
  );

  const section = deck[index] ?? deck[0];
  const progress = ((index + 1) / deck.length) * 100;

  const go = useCallback((next: number) => {
    setIndex(Math.max(0, Math.min(deck.length - 1, next)));
    setOverview(false);
    setDrawerOpen(false);
    requestAnimationFrame(() => {
      const stage = document.querySelector(".stage");
      if (stage instanceof HTMLElement) stage.scrollTop = 0;
    });
  }, [setDrawerOpen, deck.length]);

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
      } else if (e.key.toLowerCase() === "s" || e.key.toLowerCase() === "t") {
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
  }, [go, index, toggleDrawer, setDrawerOpen]);

  const variantLabel =
    storm ? " · V2" : azure ? " · V3" : midnight ? " · V4" : "";

  return (
    <div
      className={`presentation no-rail ${
        storm ? "storm-chrome hydro-fullbleed" : ""
      } ${azure ? "azure-chrome" : ""} ${
        azure && section.id === "cover" ? "azure-cover-full" : ""
      } ${midnight ? "midnight-chrome" : ""}`}
    >
      {storm && <WeatherAtmosphere />}

      <div className="stage-wrap">
        <div className="defense-topbar">
          <span className="defense-top-title">
            CAT Bond Egypt · Defense{variantLabel}
          </span>
          <div className="defense-top-links">
            {variant !== "classic" && (
              <Link className="defense-top-link" to="/">
                Classic
              </Link>
            )}
            {variant !== "storm" && (
              <Link className="defense-top-link" to="/v2">
                Storm V2
              </Link>
            )}
            {variant !== "azure" && (
              <Link className="defense-top-link" to="/v3">
                Nile Blue V3
              </Link>
            )}
            {variant !== "midnight" && (
              <Link className="defense-top-link" to="/v4">
                Midnight V4
              </Link>
            )}
            <Link className="defense-top-link" to="/proposal">
              Full proposal →
            </Link>
          </div>
        </div>
        <main
          className={`stage ${storm ? "storm-skin" : ""} ${
            azure ? "azure-skin" : ""
          } ${midnight ? "midnight-skin" : ""}`}
        >
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
                <div className={azure ? "nile-cover-stage" : undefined}>
                  {azure && (
                    <div className="nile-cover-atmosphere" aria-hidden>
                      <WeatherAtmosphere />
                      <div className="nile-cover-scrim" />
                    </div>
                  )}
                  <CoverScene
                    onEnter={() =>
                      go(
                        deck.findIndex((s) =>
                          s.id === (azure ? "global" : "opening"),
                        ),
                      )
                    }
                  />
                </div>
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

        <footer className="footer-bar footer-elegant">
          <div className="footer-slide">
            <span className="footer-index">
              {String(index + 1).padStart(2, "0")}
              <span className="footer-index-sep">/</span>
              {String(deck.length).padStart(2, "0")}
            </span>
            <span className="footer-label">{section.label}</span>
          </div>
          <div className="progress-track" aria-hidden>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="footer-actions">
            <button
              type="button"
              className="footer-overview-btn"
              onClick={() => setOverview(true)}
              title="Overview (O)"
            >
              Overview
            </button>
            <span className="kbd-hint">← → · O · S Summary</span>
          </div>
        </footer>

        {presenter && (
          <div className="presenter">
            <h4>Presenter · {section.label}</h4>
            <p>{speakerNotes[section.id]}</p>
            <p style={{ marginTop: 10 }}>
              Next: {deck[Math.min(deck.length - 1, index + 1)].label}
            </p>
          </div>
        )}

        {overview && (
          <div className="overview" onClick={() => setOverview(false)}>
            <div className="overview-grid" onClick={(e) => e.stopPropagation()}>
              {deck.map((s, i) => (
                <button
                  key={s.id}
                  className={i === index ? "active" : ""}
                  onClick={() => go(i)}
                >
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

export function Presentation({
  variant = "classic",
}: {
  variant?: PresentationVariant;
}) {
  return (
    <ContentModeProvider>
      <PresentationInner variant={variant} />
    </ContentModeProvider>
  );
}
