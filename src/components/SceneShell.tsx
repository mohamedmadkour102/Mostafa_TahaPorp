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
import { proposalProse } from "../data/proposalProse";
import { defaultCaptions } from "../data/syncedCaptions";

export type ContentMode = "present" | "full";

type ModeCtx = {
  mode: ContentMode;
  setMode: (m: ContentMode) => void;
  toggleMode: () => void;
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
  const [mode, setMode] = useState<ContentMode>("present");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode: () => setMode((m) => (m === "full" ? "present" : "full")),
      drawerOpen,
      setDrawerOpen,
      toggleDrawer: () => setDrawerOpen((v) => !v),
    }),
    [mode, drawerOpen],
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

export function ProposalProse({ sectionId }: { sectionId: SectionId }) {
  const blocks = proposalProse[sectionId] ?? [];
  return (
    <div className="prose-panel">
      <div className="prose-badge">Proposal text · from Mostafa Taha Proposal V4</div>
      {blocks.map((block, i) => (
        <section key={i} className="prose-block">
          {block.heading && <h3>{block.heading}</h3>}
          {block.paragraphs.map((p, j) => (
            <p key={j}>{p}</p>
          ))}
          {block.bullets && block.bullets.length > 0 && (
            <ul>
              {block.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

function TextDrawer({
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
            aria-label="Proposal text drawer"
          >
            <div className="drawer-header">
              <strong>Proposal text</strong>
              <button className="btn" type="button" onClick={onClose}>
                Close · Esc
              </button>
            </div>
            <div className="drawer-body">
              <ProposalProse sectionId={sectionId} />
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
  const { mode, setMode, drawerOpen, setDrawerOpen, toggleDrawer } = useContentMode();
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
      <div className={`scene scene-${mode}`}>
        <div className="scene-header">
          <div className="scene-header-row">
            <div>
              <div className="eyebrow">{eyebrow}</div>
              <h2>{title}</h2>
              {lede && mode === "present" && <p className="lede">{lede}</p>}
            </div>
            <div className="mode-toggle" role="group" aria-label="Content mode">
              <button
                className={`tab ${mode === "present" ? "active" : ""}`}
                onClick={() => setMode("present")}
                type="button"
              >
                Present
              </button>
              <button
                className={`tab ${mode === "full" ? "active" : ""}`}
                onClick={() => setMode("full")}
                type="button"
              >
                Study
              </button>
              <button className="tab" type="button" onClick={toggleDrawer}>
                Text · T
              </button>
            </div>
          </div>
        </div>

        <div className={`scene-body ${mode === "full" ? "with-prose" : ""}`}>
          <div className="scene-visual">
            {children}
            {mode === "present" && caption && (
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
          {mode === "full" && (
            <aside className="scene-prose">
              <ProposalProse sectionId={sectionId} />
            </aside>
          )}
        </div>

        <TextDrawer
          sectionId={sectionId}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      </div>
    </CaptionContext.Provider>
  );
}
