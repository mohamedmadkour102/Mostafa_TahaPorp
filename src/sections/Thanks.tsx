import { motion } from "framer-motion";
import { meta } from "../data/research";

const sparks = Array.from({ length: 14 }, (_, i) => i);
const letters = "Thank you".split("");

export function ThanksScene() {
  return (
    <div className="thanks-scene">
      <div className="thanks-glow" aria-hidden />
      <div className="thanks-ring" aria-hidden />
      {sparks.map((i) => (
        <motion.span
          key={i}
          className="thanks-spark"
          aria-hidden
          style={{
            left: `${6 + ((i * 13) % 88)}%`,
            top: `${10 + ((i * 17) % 72)}%`,
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{
            opacity: [0, 0.85, 0.25],
            scale: [0.4, 1.05, 0.8],
            y: [0, -14, 0],
          }}
          transition={{
            duration: 3 + (i % 5) * 0.4,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.p
        className="thanks-kicker"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        Master’s Thesis Proposal Defense
      </motion.p>

      <h1 className="thanks-title" aria-label="Thank you">
        {letters.map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            className={ch === " " ? "thanks-space" : undefined}
            initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.45,
              delay: 0.15 + i * 0.055,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </h1>

      <motion.p
        className="thanks-sub"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.72 }}
      >
        Questions &amp; discussion welcome
      </motion.p>

      <motion.div
        className="thanks-line"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.85, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="thanks-meta"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <strong>{meta.researcher}</strong>
        <span>{meta.shortTitle}</span>
        <span>Cairo University · Faculty of Commerce</span>
      </motion.div>
    </div>
  );
}
