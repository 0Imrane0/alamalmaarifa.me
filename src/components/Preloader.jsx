import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function Preloader() {
  const { progress } = useProgress();
  const [show, setShow] = useState(true);

  // Minimum 800ms display time for cinematic effect,
  // even when assets are cached and load instantly.
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setShow(false), 800);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#0D2347",
            zIndex: 300 /* --z-preloader */,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {/* Logo — served from publicDir */}
          <motion.img
            src="/logo.png"
            alt="Alam Al Maarifa"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              height: "60px",
              filter: "drop-shadow(0 0 15px rgba(197,160,40,0.3))",
            }}
          />

          {/* Progress bar */}
          <div
            style={{
              width: "250px",
              height: "2px",
              backgroundColor: "rgba(197,160,40,0.1)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "circOut" }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                background: "linear-gradient(to right, transparent, #C5A028)",
                boxShadow: "0 0 10px #C5A028",
              }}
            />
          </div>

          {/* Percentage counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#C5A028",
              fontSize: "0.85rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {Math.round(progress)}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
