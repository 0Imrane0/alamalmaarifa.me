import {
  FAQ_ITEMS,
  HERO_STATS,
  LEVELS,
  MOMENTS,
  PILLARS,
  SCHOOL,
  WHATSAPP_URL,
} from "../data/schoolFacts";
import {
  FadeUp,
  GoldRule,
  MoroccanBg,
  ParallaxBg,
  PictureImage,
  Tag,
  TextReveal,
} from "./UI";
import { Fragment, useState } from "react";
import { useScrollState } from "../hooks/useScrollState";

/* ─────────────────────────────────────────────
   01 HERO — No logo in hero. Clean A24 poster
   composition. Full-bleed. Typography is the art.
   ───────────────────────────────────────────── */
export function HeroSection() {
  return (
    <section id="hero" className="section section--hero">
      <ParallaxBg src={MOMENTS.hero} id="hero-bg" eager />
      <div className="hero-cinematic-overlay" />
      <MoroccanBg />

      {/* Atmospheric gold beam */}
      <div className="hero-beam" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-copy">
          {/* Editorial tag — very small, spaced out */}
          <div className="hero-eyebrow">
            <span className="hero-eyebrow__line" />
            <span>{SCHOOL.type}</span>
            <span className="hero-eyebrow__dot" />
            <span>{SCHOOL.location}</span>
          </div>

          {/* Title — No logo here. Pure typography. */}
          <h1 className="hero-title">
            <TextReveal className="hero-title__pre" text="École" delay={0.2} />
            <br />
            <TextReveal
              className="hero-title__main gold-gradient-text"
              text="Alam Al"
              delay={0.4}
            />
            <br />
            <TextReveal
              className="hero-title__end"
              text="Maarifa"
              delay={0.6}
            />
          </h1>

          <div className="arabic-name">
            <TextReveal text={SCHOOL.arabicName} delay={0.8} />
          </div>

          {/* Tagline — glows subtly */}
          <p className="hero-tagline">
            <TextReveal text={SCHOOL.tagline} delay={1.0} />
          </p>

          {/* Live inscription badge — pulsing dot signals open enrolment */}
          <div
            className="hero-live-badge"
            aria-label="Inscriptions 2026/27 ouvertes"
          >
            <span className="hero-live-badge__dot" aria-hidden="true" />
            Inscriptions 2026/27 ouvertes
          </div>

          <div className="hero-actions">
            <a
              href={WHATSAPP_URL}
              className="btn btn-red btn--hero-primary cta-wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="btn__icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </span>
              Parler à l'école
            </a>
            <button
              onClick={() =>
                document
                  .getElementById("vision")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn btn--hero-ghost"
            >
              Découvrir l'école
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </button>
          </div>

          <div className="stats-strip">
            {HERO_STATS.map((stat, i) => (
              <Fragment key={stat.val}>
                {i > 0 && <div className="stat-div" />}
                <div className="stat">
                  <span className="stat__val">{stat.val}</span>
                  <span className="stat__sub">{stat.sub}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        {/* Right slot: 3D eagle overlays here via CSS fixed canvas */}
        <div className="hero-eagle-slot" aria-hidden="true">
          <div className="eagle-halo" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-cue" aria-hidden="true">
        <div className="scroll-cue__line" />
        <span className="scroll-cue__text">Défiler</span>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   02 VISION — Story of why this school exists.
   Cinematic image / text split with reveal anim.
   ───────────────────────────────────────────── */
export function VisionSection() {
  return (
    <section id="vision" className="section section--vision">
      <div className="section-num" aria-hidden="true">
        02
      </div>
      <div className="container">
        <div className="vision-grid">
          {/* Image column */}
          <div className="vision-image">
            <PictureImage
              src={MOMENTS.vision}
              alt=""
              className="vision-image__bg"
              loading="eager"
              decoding="async"
            />
            <div className="vision-image__overlay" />
            {/* Floating quote on image */}
            <div className="vision-image__caption">
              <blockquote className="vision-image__quote">
                « L'aigle guide les parents vers l'excellence. »
              </blockquote>
            </div>
          </div>

          {/* Text column */}
          <FadeUp className="vision-text" delay={0.1}>
            <Tag>NOTRE VISION</Tag>
            <h2>
              Donner à chaque enfant
              <br />
              <span className="gold-gradient-text">
                les repères pour grandir
              </span>
            </h2>
            <GoldRule />
            <p className="body-text">
              Donner à chaque enfant les repères, la rigueur et la confiance
              nécessaires pour grandir — pas à pas, vers l'excellence.
            </p>
            <p className="body-text body-text--dim">
              Une pédagogie exigeante et bienveillante, pensée pour la
              Maternelle et le Primaire.
            </p>

            <div className="pillars-row">
              {PILLARS.map((p) => (
                <span key={p.key} className="pillar-badge">
                  {p.label}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   03 OFFRES — Two immersive level cards.
   Each card tells its own story.
   ───────────────────────────────────────────── */
export function OffresSection() {
  return (
    <section id="offres" className="section section--offres">
      <ParallaxBg src={MOMENTS.offres} id="offres-bg" />
      <div className="section__overlay section__overlay--offres" />
      <div className="container">
        <FadeUp className="text-center offres-header">
          <Tag>NOTRE OFFRE PÉDAGOGIQUE</Tag>
          <h2>Maternelle &amp; Primaire</h2>
          <p className="body-text">
            Deux cycles, un même engagement pour l'excellence
          </p>
        </FadeUp>

        <div className="levels-grid">
          <FadeUp className="level-block" delay={0.1}>
            <div className="level-block__number">01</div>
            <h3>Maternelle</h3>
            <p>
              Les premiers pas vers l'autonomie, dans un cadre rassurant et
              stimulant.
            </p>
            <ul className="level-list">
              {LEVELS.maternelle.map((l) => (
                <li key={l.code}>
                  <strong>{l.code}</strong> — {l.name}
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp className="level-block" delay={0.2}>
            <div className="level-block__number">02</div>
            <h3>Primaire</h3>
            <p>
              Des fondations solides en langues, sciences et savoir-être, pour
              préparer la suite avec confiance.
            </p>
            <ul className="level-list">
              {LEVELS.primaire.map((l) => (
                <li key={l.code}>
                  <strong>{l.code}</strong> — {l.name}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   04 CAMPUS — Full-bleed scene. The school itself.
   Glassmorphic panel floats over it.
   ───────────────────────────────────────────── */
export function CampusSection() {
  return (
    <section id="campus" className="section section--campus">
      <ParallaxBg src={MOMENTS.campus} id="campus-bg" />
      <div className="section__overlay section__overlay--campus" />
      <div className="container">
        <FadeUp className="campus-panel">
          <Tag>NOTRE CAMPUS</Tag>
          <h2>
            Un cadre de vie
            <br />
            <span className="gold-gradient-text">dédié à l'épanouissement</span>
          </h2>
          <GoldRule />
          <p className="body-text">
            Un campus à taille humaine, implanté au cœur de Hay Rahma, pensé
            pour le confort et la sécurité des enfants au quotidien.
          </p>
          <a
            href={SCHOOL.maps.directions}
            className="btn btn-outline mt-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir sur la carte →
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   05 TRANSPORT — Safe journeys. Editorial layout.
   ───────────────────────────────────────────── */
export function TransportSection() {
  return (
    <section id="transport" className="section section--transport">
      {/* Full-bleed parallax — right-aligned panel mirrors Campus's left panel */}
      <ParallaxBg src={MOMENTS.transport} id="transport-bg" />
      <div className="section__overlay section__overlay--transport" />
      <div className="container">
        <FadeUp className="transport-panel">
          <Tag>TRANSPORT SCOLAIRE</Tag>
          <h2>
            Un trajet en toute{" "}
            <span className="gold-gradient-text">sérénité</span>
          </h2>
          <GoldRule />
          <p className="body-text">
            {SCHOOL.campaign.transport} pour accompagner sereinement les trajets
            de votre enfant, chaque jour.
          </p>
          <ul className="transport-features">
            <li>Zones desservies à Casablanca</li>
            <li>Horaires réguliers et fiables</li>
            <li>Trajet sécurisé et accompagné</li>
          </ul>
          <a
            href={WHATSAPP_URL}
            className="btn btn-outline mt-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vérifier votre quartier →
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   06 INSCRIPTIONS — The climax. Full-bleed CTA.
   Urgency + aspiration. Cinematic final act.
   ───────────────────────────────────────────── */
export function InscriptionsSection({ onOpenForm }) {
  return (
    <section id="inscriptions" className="section section--inscriptions">
      <ParallaxBg src={MOMENTS.inscriptions} id="inscriptions-bg" />
      <div className="section__overlay section__overlay--inscriptions" />
      <div className="container">
        <FadeUp className="inscriptions-content">
          {/* School logo appears here — not in the hero */}
          <div className="inscriptions-logo-wrap">
            <img
              src="/logo.png"
              alt="Logo Alam Al Maarifa"
              className="inscriptions-logo"
            />
          </div>

          <h2 className="inscriptions-title">
            Inscriptions ouvertes
            <br />
            <span className="gold-gradient-text">2026/2027</span>
          </h2>
          <p className="inscriptions-date">{SCHOOL.campaign.startDate}</p>
          <p className="inscriptions-sub">
            Réservez la place de votre enfant et donnez-lui les ailes de la
            réussite.
          </p>

          <div className="inscriptions-actions">
            <button
              onClick={onOpenForm}
              className="btn btn--inscription-primary"
            >
              <span>Pré-inscription Prioritaire</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <a
              href={WHATSAPP_URL}
              className="btn btn-red cta-wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              Parler à l'école sur WhatsApp
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   07 FAQ — Accordion with cinematic treatment.
   ───────────────────────────────────────────── */
export function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="section section--faq">
      <div className="container">
        <FadeUp className="text-center mb-5">
          <Tag>QUESTIONS FRÉQUENTES</Tag>
          <h2>Tout ce que les parents nous demandent</h2>
        </FadeUp>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className={`faq-item ${open === i ? "faq-item--open" : ""}`}>
                <button
                  type="button"
                  className="faq-item__q"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {item.q}
                  <span className="faq-item__icon">
                    {open === i ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`faq-item__a-wrap ${open === i ? "faq-item__a-wrap--open" : ""}`}
                >
                  <div className="faq-item__a">{item.a}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   08 FOOTER — Clean. Institutional. Premium.
   No logo duplication — logo only in Inscriptions.
   ───────────────────────────────────────────── */
export function FooterSection() {
  const telLand = `tel:+212${SCHOOL.contact.landline.slice(1)}`;

  return (
    <footer id="footer" className="footer">
      <PictureImage
        src={MOMENTS.footer}
        alt=""
        className="footer__bg"
        loading="lazy"
        decoding="async"
      />
      <div className="footer__overlay" aria-hidden="true" />
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <p className="footer-school-name">{SCHOOL.name}</p>
            <p className="footer-arabic">{SCHOOL.arabicName}</p>
            <p className="footer-address">{SCHOOL.address}</p>
            <p className="footer-tagline">{SCHOOL.tagline}</p>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp — {SCHOOL.contact.whatsappDisplay}
            </a>
            <a href={telLand}>Téléphone — {SCHOOL.contact.landlineDisplay}</a>
            <a href={`mailto:${SCHOOL.contact.email}`}>
              {SCHOOL.contact.email}
            </a>
            <a
              href={SCHOOL.maps.directions}
              target="_blank"
              rel="noopener noreferrer"
            >
              Itinéraire Google Maps →
            </a>
          </div>

          <div className="footer-map">
            <iframe
              title="Carte École Alam Al Maarifa"
              src={SCHOOL.maps.embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="footer-bottom-row">
          <div className="footer-social">
            <a
              href={SCHOOL.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href={SCHOOL.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} {SCHOOL.name}. Tous droits réservés.
            </p>
            <p className="footer-domain">
              {SCHOOL.domain.replace("https://", "")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   STICKY WHATSAPP — subtle, not intrusive
   ───────────────────────────────────────────── */
export function StickyWhatsApp() {
  // Derives visibility from the shared scroll context — no own listener.
  const { scrollY } = useScrollState();
  const visible = scrollY > 300;

  return (
    <a
      href={WHATSAPP_URL}
      className={`sticky-wa ${visible ? "sticky-wa--visible" : ""}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}
