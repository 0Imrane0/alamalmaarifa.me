/** Canonical public facts — confirmed June 2026 */
export const SCHOOL = {
  name: "École Alam Al Maarifa",
  nameShort: "Alam Al Maarifa",
  arabicName: "مدرسة عالم المعرفة",
  tagline: "Vers l'Excellence",
  type: "École privée · Maternelle et Primaire",
  location: "Casablanca · Hay Rahma",
  address: "66 boulevard Khalifa Ben Esmail, Hay Rahma, Casablanca 20650",
  addressShort: "Hay Rahma, Casablanca",
  domain: "https://alamalmaarifa.me",
  campaign: {
    inscriptions: "Inscriptions ouvertes 2026/2027",
    startDate: "Début des cours : septembre 2026",
    levels: "Maternelle et Primaire",
    transport: "Transport scolaire disponible",
  },
  contact: {
    whatsapp: "+212669911090",
    whatsappDisplay: "+212 669 911 090",
    landline: "0522709548",
    landlineDisplay: "05 22 70 95 48",
    email: "ealamalmaarifa@gmail.com",
    instagram: "https://www.instagram.com/ecole.alam.almaarifa",
    facebook: "https://www.facebook.com/ealamalmaarifa",
  },
  maps: {
    query: "66 boulevard Khalifa Ben Esmail, Hay Rahma, Casablanca",
    embed:
      "https://maps.google.com/maps?q=66+boulevard+Khalifa+Ben+Esmail,+Hay+Rahma,+Casablanca&output=embed",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=66+boulevard+Khalifa+Ben+Esmail,+Hay+Rahma,+Casablanca",
  },
};

export const WHATSAPP_URL = `https://wa.me/${SCHOOL.contact.whatsapp}?text=${encodeURIComponent(
  "Bonjour, je souhaite obtenir des informations sur les inscriptions 2026/2027 à l'École Alam Al Maarifa.",
)}`;

export const COLORS = {
  deepNavy: "#0D2347",
  navy: "#1B3A6B",
  gold: "#C5A028",
  bronze: "#8C7434",
  red: "#A01830",
  cream: "#FAF8F4",
  wa: "#25D366",
};

export const NAV_LINKS = [
  { label: "Accueil", id: "hero" },
  { label: "Notre école", id: "vision" },
  { label: "Offre", id: "offres" },
  { label: "Campus", id: "campus" },
  { label: "Inscriptions", id: "inscriptions" },
  { label: "Contact", id: "footer" },
];

export const LEVELS = {
  maternelle: [
    { code: "PS", name: "Petite Section" },
    { code: "MS", name: "Moyenne Section" },
    { code: "GS", name: "Grande Section" },
  ],
  primaire: [
    { code: "CP", name: "Cours Préparatoire" },
    { code: "CE1", name: "Cours Élémentaire 1" },
    { code: "CE2", name: "Cours Élémentaire 2" },
    { code: "CM1", name: "Cours Moyen 1" },
    { code: "CM2", name: "Cours Moyen 2" },
  ],
};

/* Real, truthful metrics for the hero stats strip */
export const HERO_STATS = [
  { val: "8", sub: "niveaux scolaires" },
  { val: "2026", sub: "rentrée en cours" },
  { val: "Hay Rahma", sub: "Casablanca" },
];

export const PILLARS = [
  { key: "vision", label: "Vision", glb: "pillar-01-vision-lite.glb" },
  { key: "savoir", label: "Savoir", glb: "pillar-02-savoir-lite.glb" },
  { key: "protection", label: "Protection", glb: "pillar-03-protection-lite.glb" },
  { key: "confiance", label: "Confiance", glb: "pillar-04-confiance-lite.glb" },
  { key: "envol", label: "Envol", glb: "pillar-05-envol-lite.glb" },
];

export const FAQ_ITEMS = [
  {
    q: "Quels niveaux sont ouverts pour 2026/2027 ?",
    a: "Nous accueillons les élèves en Maternelle (PS, MS, GS) et en Primaire (CP à CM2). Contactez-nous sur WhatsApp pour connaître les places disponibles par niveau.",
  },
  {
    q: "Quand commence la rentrée 2026/2027 ?",
    a: "Les cours débutent en septembre 2026. Les inscriptions sont ouvertes dès maintenant.",
  },
  {
    q: "Proposez-vous le transport scolaire ?",
    a: "Oui, un transport scolaire est disponible. Contactez-nous pour vérifier si votre quartier est desservi.",
  },
  {
    q: "Où se trouve l'école ?",
    a: "66 boulevard Khalifa Ben Esmail, Hay Rahma, Casablanca. Un plan et l'itinéraire sont disponibles en bas de page.",
  },
  {
    q: "Comment obtenir les informations d'inscription et les tarifs ?",
    a: "Envoyez-nous un message sur WhatsApp ou appelez-nous. Notre équipe vous répondra avec les informations adaptées à votre enfant.",
  },
  {
    q: "Puis-je visiter l'école ?",
    a: "Oui. Contactez-nous sur WhatsApp ou par téléphone pour planifier une visite.",
  },
];

/** Scroll sections — eagle anchor positions in normalized viewport space */
export const SCROLL_SECTIONS = [
  { id: "hero", eagle: { x: 0.3, y: 0.05, z: 0, rotY: -0.4, scale: 3.8 } },
  { id: "vision", eagle: { x: -0.5, y: -0.1, z: 0.2, rotY: 0.6, scale: 2.8 } },
  {
    id: "offres",
    eagle: { x: 0.45, y: -0.05, z: -0.1, rotY: -0.8, scale: 2.5 },
  },
  { id: "campus", eagle: { x: -0.35, y: 0.1, z: 0.15, rotY: 0.3, scale: 3.0 } },
  { id: "transport", eagle: { x: 0.4, y: -0.2, z: 0, rotY: -0.5, scale: 2.3 } },
  { id: "inscriptions", eagle: { x: 0, y: 0.2, z: 0.3, rotY: 0, scale: 3.2 } },
  { id: "footer", eagle: { x: 0, y: 0, z: 0.5, rotY: 0.2, scale: 2.0 } },
];

export const MOMENTS = {
  hero: "/moments/moment_01_hero.png",
  vision: "/moments/moment_02_vision.png",
  offres: "/moments/moment_03_maternelle.png",
  campus: "/moments/moment_04_campus.png",
  transport: "/moments/moment_05_transport.png",
  inscriptions: "/moments/moment_06_inscriptions.png",
  footer: "/moments/moment_07_footer.png",
};

export const SEO = {
  title: "École privée Casablanca | Alam Al Maarifa — Inscriptions 2026/2027",
  description:
    "École privée à Casablanca pour la maternelle et le primaire. Inscriptions 2026/2027 ouvertes, transport scolaire disponible, Hay Rahma.",
};

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "School",
    name: SCHOOL.name,
    alternateName: SCHOOL.arabicName,
    url: SCHOOL.domain,
    logo: `${SCHOOL.domain}/logo.png`,
    description: SEO.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "66 boulevard Khalifa Ben Esmail",
      addressLocality: "Casablanca",
      addressRegion: "Casablanca-Settat",
      postalCode: "20650",
      addressCountry: "MA",
    },
    telephone: [
      `+${SCHOOL.contact.whatsapp}`,
      `+212${SCHOOL.contact.landline.slice(1)}`,
    ],
    email: SCHOOL.contact.email,
    sameAs: [SCHOOL.contact.instagram, SCHOOL.contact.facebook],
  };
}
