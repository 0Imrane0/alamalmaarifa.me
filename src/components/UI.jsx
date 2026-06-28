import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { COLORS, NAV_LINKS, SCHOOL, WHATSAPP_URL } from "../data/schoolFacts";
import { scrollToSection, useScrollState } from "../hooks/useScrollState";

/* ─────────────────────────────────────────────────────────────────
   Mobile menu — Framer Motion stagger variants
   Container staggers children in on open, reverse on close.
   ───────────────────────────────────────────────────────────────── */
const menuContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.065, delayChildren: 0.18 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const menuItemVariants = {
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─────────────────────────────────────────────────────────────────
   NAV
   scrolled state now derived from shared useScrollState context —
   eliminates the dedicated window.scroll listener entirely.
   ───────────────────────────────────────────────────────────────── */
export default function Nav() {
  const { scrollY } = useScrollState();
  const scrolled = scrollY > 50;
  const [open, setOpen] = useState(false);

  // Close mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  const go = (id) => {
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <>
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <button type="button" className="brand" onClick={() => go("hero")}>
            <img
              src="/logo.png"
              alt="Logo Alam Al Maarifa"
              className="brand__logo"
            />
            <div className="brand__text">
              <span className="brand__name">{SCHOOL.nameShort}</span>
              <span className="brand__tagline">{SCHOOL.tagline}</span>
            </div>
          </button>

          <div className="nav__links">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                type="button"
                className="nav__link"
                onClick={() => go(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <a
            href={WHATSAPP_URL}
            className="btn btn-red nav__cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Parler à l'école
          </a>

          <button
            type="button"
            className="nav__toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* ── Full-screen mobile menu ── */}
      <div
        className={`mobile-menu ${open ? "mobile-menu--open" : ""}`}
        aria-hidden={!open}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        {/* Close button — positioned absolute, always in DOM */}
        <button
          type="button"
          className="mobile-menu__close"
          onClick={() => setOpen(false)}
          aria-label="Fermer le menu"
        >
          ✕
        </button>

        {/* Staggered links — only animate when menu is open */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-links"
              className="mobile-menu__links"
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {NAV_LINKS.map(({ label, id }) => (
                <motion.button
                  key={id}
                  variants={menuItemVariants}
                  type="button"
                  className="mobile-menu__link"
                  onClick={() => go(id)}
                >
                  {label}
                </motion.button>
              ))}

              <motion.div
                variants={menuItemVariants}
                className="mobile-menu__divider"
              />

              <motion.a
                variants={menuItemVariants}
                href={WHATSAPP_URL}
                className="btn btn-red"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "1rem", padding: "0.9rem 2rem" }}
              >
                Parler à l'école sur WhatsApp
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SCROLL PROGRESS BAR
   Reads progress (0–1) from shared context — no own listener.
   ───────────────────────────────────────────────────────────────── */
export function ScrollProgress() {
  const { progress } = useScrollState();
  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress * 100}%` }}
      aria-hidden="true"
    />
  );
}

/* ─────────────────────────────────────────────────────────────────
   GRAIN OVERLAY
   ───────────────────────────────────────────────────────────────── */
export function Grain() {
  return <div className="grain-overlay" aria-hidden="true" />;
}

/* ─────────────────────────────────────────────────────────────────
   MOROCCAN GEOMETRIC BACKGROUND
   ───────────────────────────────────────────────────────────────── */
export function MoroccanBg() {
  const id = "moroccan-pattern";
  return (
    <svg className="moroccan-bg" aria-hidden="true">
      <defs>
        <pattern id={id} width="72" height="72" patternUnits="userSpaceOnUse">
          <polygon
            points="36,2 68,20 68,52 36,70 4,52 4,20"
            fill="none"
            stroke={COLORS.gold}
            strokeWidth="0.6"
          />
          <polygon
            points="36,16 54,26 54,46 36,56 18,46 18,26"
            fill="none"
            stroke={COLORS.gold}
            strokeWidth="0.4"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   GOLD RULE DIVIDER
   ───────────────────────────────────────────────────────────────── */
export function GoldRule() {
  return <div className="gold-rule" />;
}

/* ─────────────────────────────────────────────────────────────────
   TAG / EYEBROW LABEL
   ───────────────────────────────────────────────────────────────── */
export function Tag({ children, light = false }) {
  return <div className={`tag ${light ? "tag--light" : ""}`}>{children}</div>;
}

/* ─────────────────────────────────────────────────────────────────
   FADE UP — scroll-triggered entrance animation
   ───────────────────────────────────────────────────────────────── */
export function FadeUp({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   TEXT REVEAL — word-by-word clip reveal
   ───────────────────────────────────────────────────────────────── */
export function TextReveal({ text, className = "", delay = 0 }) {
  const words = text.split(" ");
  return (
    <span className={className} style={{ display: "inline-block" }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            paddingRight: "0.2em",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PICTURE IMAGE — WebP source with PNG fallback
   ───────────────────────────────────────────────────────────────── */
export function PictureImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  decoding = "async",
  ...rest
}) {
  const webp = src.replace(/\.png$/, ".webp");
  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={className}
        {...rest}
      />
    </picture>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PARALLAX BACKGROUND
   Driven by the shared scroll context (Lenis-smoothed when available).
   Reads getBoundingClientRect() only on scroll, not on every frame,
   and uses a <picture> element so browsers can load WebP with PNG fallback.
   ───────────────────────────────────────────────────────────────── */
export function ParallaxBg({ src, id, eager = false }) {
  const { scrollY } = useScrollState();
  const ref = useRef(null);

  useEffect(() => {
    const wrapper = ref.current;
    if (!wrapper) return;
    const parent = wrapper.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    wrapper.style.transform = `translateY(${rect.top * 0.25}px)`;
  }, [scrollY, id]);

  return (
    <div id={id} ref={ref} className="bg-parallax">
      <PictureImage
        src={src}
        alt=""
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}
