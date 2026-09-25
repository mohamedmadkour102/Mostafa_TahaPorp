import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SectionId } from "../data/research";
import { slideSummaries } from "../data/slideSummaries";
import { defaultCaptions } from "../data/syncedCaptions";

type ModeCtx = {
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  toggleDrawer: () => void;
};

const ContentModeContext = createContext<ModeCtx | null>(null);

type CaptionCtx = {
  caption: string;
  setCaption: (c: string) => void;
  resetCaption: () => void;
};

const CaptionContext = createContext<CaptionCtx | null>(null);

export function ContentModeProvider({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const value = useMemo(
    () => ({
      drawerOpen,
      setDrawerOpen,
      toggleDrawer: () => setDrawerOpen((v) => !v),
    }),
    [drawerOpen],
  );
  return (
    <ContentModeContext.Provider value={value}>{children}</ContentModeContext.Provider>
  );
}

export function useContentMode() {
  const ctx = useContext(ContentModeContext);
  if (!ctx) throw new Error("useContentMode requires ContentModeProvider");
  return ctx;
}

export function useSyncedCaption() {
  const ctx = useContext(CaptionContext);
  if (!ctx) {
    return {
      caption: "",
      setCaption: (_c: string) => undefined,
      resetCaption: () => undefined,
    };
  }
  return ctx;
}

export function SlideSummaryPanel({ sectionId }: { sectionId: SectionId }) {
  const summary = slideSummaries[sectionId];
  if (!summary) {
    return (
      <div className="prose-panel">
        <p>No summary for this slide yet.</p>
      </div>
    );
  }
  return (
    <div className="prose-panel summary-panel">
      <div className="prose-badge">Slide summary · from the proposal</div>
      <section className="prose-block">
        <h3>{summary.title}</h3>
        {summary.paragraphs?.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <ul>
          {summary.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function SummaryDrawer({
  sectionId,
  open,
  onClose,
}: {
  sectionId: SectionId;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="text-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            aria-label="Slide summary drawer"
          >
            <div className="drawer-header">
              <strong>Summary</strong>
              <button className="btn" type="button" onClick={onClose}>
                Close · Esc
              </button>
            </div>
            <div className="drawer-body">
              <SlideSummaryPanel sectionId={sectionId} />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function SceneShell({
  sectionId,
  eyebrow,
  title,
  lede,
  children,
}: {
  sectionId: SectionId;
  eyebrow: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  const { drawerOpen, setDrawerOpen, toggleDrawer } = useContentMode();
  const [caption, setCaptionState] = useState(defaultCaptions[sectionId] ?? "");

  const setCaption = useCallback((c: string) => setCaptionState(c), []);
  const resetCaption = useCallback(() => {
    setCaptionState(defaultCaptions[sectionId] ?? "");
  }, [sectionId]);

  useEffect(() => {
    resetCaption();
  }, [sectionId, resetCaption]);

  const captionValue = useMemo(
    () => ({ caption, setCaption, resetCaption }),
    [caption, setCaption, resetCaption],
  );

  return (
    <CaptionContext.Provider value={captionValue}>
      <div className="scene scene-present">
        <div className="scene-header">
          <div className="scene-header-row">
            <div>
              <div className="eyebrow">{eyebrow}</div>
              <h2>{title}</h2>
              {lede && <p className="lede">{lede}</p>}
            </div>
            <div className="mode-toggle" role="group" aria-label="Slide tools">
              <button
                className={`tab ${drawerOpen ? "active" : ""}`}
                type="button"
                onClick={toggleDrawer}
              >
                Summary · S
              </button>
            </div>
          </div>
        </div>

        <div className="scene-body">
          <div className="scene-visual">
            {children}
            {caption && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={caption}
                  className="synced-caption"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="synced-caption-label">Now explaining</span>
                  <p>{caption}</p>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        <SummaryDrawer
          sectionId={sectionId}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      </div>
    </CaptionContext.Provider>
  );
}
