import { lazy, Suspense, useEffect, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
// Lazy-loaded: splits the entire Three.js/R3F bundle (~1.5 MB) into a
// separate chunk so the main UI is interactive before 3D assets load.
const EagleScene = lazy(() => import("./components/EagleScene"));
import Nav, { Grain, ScrollProgress } from "./components/UI";
import {
  CampusSection,
  FAQSection,
  FooterSection,
  HeroSection,
  InscriptionsSection,
  OffresSection,
  StickyWhatsApp,
  TransportSection,
  VisionSection,
} from "./components/Sections";
import { ScrollProvider } from "./hooks/useScrollState";
import Preloader from "./components/Preloader";
import LeadFormModal from "./components/LeadFormModal";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <ScrollProvider>
      <CustomCursor />
      <Preloader />
      <Grain />
      <ScrollProgress />
      <Suspense fallback={null}>
        <EagleScene />
      </Suspense>
      <Nav />
      <main className="site-main">
        <HeroSection />
        <VisionSection />
        <OffresSection />
        <CampusSection />
        <TransportSection />
        <InscriptionsSection onOpenForm={() => setIsFormOpen(true)} />
        <FAQSection />
        <FooterSection />
      </main>
      <StickyWhatsApp />

      <LeadFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </ScrollProvider>
  );
}
