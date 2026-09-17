import { motion } from "framer-motion";

/** Sparks pinned toward the four edges so the frame feels alive */
const edgeSparks = [
  { left: "6%", top: "12%" },
  { left: "14%", top: "28%" },
  { left: "8%", top: "55%" },
  { left: "18%", top: "78%" },
  { left: "88%", top: "14%" },
  { left: "94%", top: "32%" },
  { left: "86%", top: "58%" },
  { left: "92%", top: "80%" },
  { left: "32%", top: "6%" },
  { left: "52%", top: "4%" },
  { left: "68%", top: "8%" },
  { left: "28%", top: "92%" },
  { left: "48%", top: "94%" },
  { left: "72%", top: "90%" },
];

export function CoverScene({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="cover-scene">
      <div className="cover-glow cover-glow-tl" aria-hidden />
      <div className="cover-glow cover-glow-tr" aria-hidden />
      <div className="cover-glow cover-glow-bl" aria-hidden />
      <div className="cover-glow cover-glow-br" aria-hidden />
      <div className="cover-ring cover-ring-a" aria-hidden />
      <div className="cover-ring cover-ring-b" aria-hidden />

      {edgeSparks.map((pos, i) => (
        <motion.span
          key={i}
          className="cover-spark"
          aria-hidden
          style={{ left: pos.left, top: pos.top }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{
            opacity: [0, 0.9, 0.25],
            scale: [0.4, 1.1, 0.75],
            y: [0, -12, 0],
          }}
          transition={{
            duration: 2.8 + (i % 5) * 0.35,
            repeat: Infinity,
            delay: i * 0.12,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.header
        className="cover-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          className="cover-logo cover-logo-faculty"
          src="/brand/faculty-commerce.png?v=2"
          alt="Faculty of Commerce"
        />
        <div className="cover-institution">
          <p>Cairo University</p>
          <p>Faculty of Commerce</p>
          <p>Insurance &amp; Actuarial Science Department</p>
        </div>
        <img
          className="cover-logo cover-logo-cu"
          src="/brand/cairo-university.png?v=2"
          alt="Cairo University"
        />
      </motion.header>

      <motion.div
        className="cover-body"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12 }}
      >
        <p className="cover-eyebrow">Master Proposal</p>
        <h1 className="cover-title">
          Insurance-Linked Securities for Hydrometeorological risks: Pricing a
          Catastrophe Bond for the Egyptian Market.
        </h1>

        <div className="cover-submitter">
          <p className="cover-submitted">Submitted by Mostafa Taha Atrees</p>
          <p>Teaching Assistant</p>
          <p>Insurance &amp; Actuarial Science Department</p>
        </div>

        <motion.div
          className="cover-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.button
          type="button"
          className="btn btn-primary"
          onClick={onEnter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue →
        </motion.button>
      </motion.div>
    </div>
  );
}
