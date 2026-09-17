import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { meta } from "../data/research";

/** Live proposal document on the deployed defense site */
export const PROPOSAL_URL = "https://cat-bond-defense.vercel.app/proposal";

export function QrIntroScene({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="qr-intro-scene">
      <div className="qr-intro-glow" aria-hidden />

      <motion.p
        className="qr-intro-kicker"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Scan for the full proposal
      </motion.p>

      <motion.h1
        className="qr-intro-title"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
      >
        {meta.shortTitle}
      </motion.h1>

      <motion.div
        className="qr-intro-card"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        <QRCodeSVG
          value={PROPOSAL_URL}
          size={240}
          level="M"
          includeMargin
          bgColor="#ffffff"
          fgColor="#0b1f3a"
        />
      </motion.div>

      <motion.p
        className="qr-intro-url"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.28 }}
      >
        {PROPOSAL_URL}
      </motion.p>

      <motion.p
        className="qr-intro-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        Opens the full proposal text &amp; figures · then continue to the title page
      </motion.p>

      <motion.button
        type="button"
        className="btn btn-primary"
        onClick={onEnter}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue to title →
      </motion.button>
    </div>
  );
}
