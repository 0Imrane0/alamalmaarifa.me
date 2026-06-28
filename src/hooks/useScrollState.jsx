import { createContext, useContext, useEffect, useRef, useState } from "react";
import { SCROLL_SECTIONS } from "../data/schoolFacts";

const ScrollContext = createContext({
  progress: 0,
  sectionIndex: 0,
  sectionProgress: 0,
  scrollY: 0,
  eagleAnchor: null,
});

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpAnchor(a, b, t) {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    z: lerp(a.z, b.z, t),
    rotY: lerp(a.rotY, b.rotY, t),
    scale: lerp(a.scale, b.scale, t),
  };
}

export function ScrollProvider({ children, lenis = null }) {
  const [state, setState] = useState({
    progress: 0,
    sectionIndex: 0,
    sectionProgress: 0,
    scrollY: 0,
    eagleAnchor: SCROLL_SECTIONS[0].eagle,
  });
  const rafRef = useRef(null);

  useEffect(() => {
    const sections = SCROLL_SECTIONS.map(({ id }) =>
      document.getElementById(id),
    ).filter(Boolean);
    if (!sections.length) return;

    const compute = () => {
      const scrollY = lenis ? lenis.scroll : window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;

      let activeIndex = 0;
      let sectionProgress = 0;

      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        const sectionTop = scrollY + rect.top;
        const sectionHeight = sections[i].offsetHeight;
        const mid = sectionTop + sectionHeight * 0.35;

        if (scrollY >= mid - window.innerHeight * 0.5) {
          activeIndex = i;
        }
      }

      const current = sections[activeIndex];
      if (current) {
        const rect = current.getBoundingClientRect();
        const traveled = window.innerHeight * 0.5 - rect.top;
        sectionProgress = Math.min(
          1,
          Math.max(0, traveled / (rect.height + window.innerHeight * 0.3)),
        );
      }

      const from =
        SCROLL_SECTIONS[activeIndex]?.eagle ?? SCROLL_SECTIONS[0].eagle;
      const to =
        SCROLL_SECTIONS[Math.min(activeIndex + 1, SCROLL_SECTIONS.length - 1)]
          ?.eagle ?? from;
      const eagleAnchor = lerpAnchor(from, to, sectionProgress * 0.85);

      setState({
        progress,
        sectionIndex: activeIndex,
        sectionProgress,
        scrollY,
        eagleAnchor,
      });
    };

    if (lenis) {
      // Sync with Lenis's smoothed scroll for buttery eagle/pillar motion.
      lenis.on("scroll", compute);
      compute();
      return () => lenis.off("scroll", compute);
    }

    // Fallback for reduced-motion / no Lenis.
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [lenis]);

  return (
    <ScrollContext.Provider value={state}>{children}</ScrollContext.Provider>
  );
}

export function useScrollState() {
  return useContext(ScrollContext);
}

export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
