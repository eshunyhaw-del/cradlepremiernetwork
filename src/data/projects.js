// The Living Index — the studio's real, shipped catalogue.
//
// Every entry carries a screen recording of the live site (in /public/work/video)
// with a poster frame pulled from it (/public/work/poster), plus `href` — the
// live URL. Rows open the real site in a new tab; the sticky frame plays the
// recording so you can see it move before you commit to the click.
//
// Source recordings live in /Assets/Videos/Real Work Videos and are re-encoded
// to 1280px / 30fps / no audio for the web, cropped to the page viewport
// (crop=1824:976:0:112) so no browser chrome — tabs, URL bar, bookmarks —
// ships with them. Frames keep that 1824×976 ratio; see PreviewFrame.

const vid = (slug) => `/work/video/${slug}.mp4`;
const pos = (slug) => `/work/poster/${slug}.webp`;

/** Shorthand builder so the table below stays readable. */
const entry = (slug, title, client, href, industry, discipline) => ({
  id: slug,
  title,
  client,
  href,
  industry,
  discipline,
  image: pos(slug),
  video: vid(slug),
});

export const catalog = [
  // ── Commerce ──────────────────────────────────────────────
  entry("roberto-collina", "Roberto Collina", "Roberto Collina", "https://www.robertocollina.it/", "E-Commerce", "Storefront"),
  entry("kindred-of-ireland", "Kindred of Ireland", "Kindred", "https://kindredofireland.com/", "E-Commerce", "Storefront"),
  entry("zoumboulakis-galleries", "Zoumboulakis Galleries", "Zoumboulakis", "https://www.zoumboulakis.gr/en/", "E-Commerce", "Storefront"),
  entry("lightship", "Lightship", "Lightship", "https://www.lightshiprv.com/", "E-Commerce", "Storefront"),
  entry("coffee-collective", "Coffee Collective", "Coffee Collective", "https://coffeecollective.dk/", "E-Commerce", "Storefront"),
  entry("alanyo-group", "Alanyo Group", "Alanyo", "https://alanyogroup.com/", "E-Commerce", "Storefront"),
  entry("madge-treats", "Madge Treats", "Madge Treats", "https://www.madgetreats.com", "Restaurants & Food", "Storefront"),

  // ── Architecture & spaces ─────────────────────────────────
  entry("bloom-3d-studio", "Bloom 3D Studio", "Bloom", "https://www.bloom3d.studio/", "Architecture", "Studio Site"),
  entry("hba", "HBA", "HBA", "https://hba.com/", "Architecture", "Studio Site"),
  entry("studio-dado", "Studio Dado", "Studio Dado", "https://www.studiodado.com/", "Architecture", "Studio Site"),
  entry("atom-height", "Atom Height Apartments", "Atom Height", "https://www.atomheight.com/", "Hospitality", "Booking Site"),
  entry("inlove-residences", "INLOVE Residences", "INLOVE", "https://inlove.dviga.marketing/", "Real Estate", "Website"),

  // ── Business & corporate ──────────────────────────────────
  entry("matter-intelligence", "Matter Intelligence", "Matter", "https://www.matter.com/", "Technology", "Website"),
  entry("lions-creek", "Lions Creek", "Lions Creek", "https://www.livelionscreek.com/", "Real Estate", "Website"),
  entry("prep-partners-group", "Prep Partners Group", "Prep Partners", "https://preppartnersgroup.com/", "Logistics", "Website"),
  entry("hello-hair-studio", "Hello Hair Studio", "Hello Hair", "https://www.hellohairstudio.com/", "Fashion & Beauty", "Booking Site"),
  entry("borderlink-investments", "BorderLink Investments", "BorderLink", "https://borderlinkinvestments.com/", "Real Estate", "Website"),
  entry("social-city", "Social City", "Social City", "https://socialcity.ca/", "Corporate", "Website"),

  // ── Mission-led ───────────────────────────────────────────
  entry("ram-foundation", "Rebecca Agroh Memorial Foundation", "RAM Foundation", "https://ramfoundationgh.com/", "NGOs & Nonprofits", "Website"),
  entry("ibon-world", "IBON World", "IBON", "https://www.ibonworld.org", "NGOs & Nonprofits", "Website"),
  entry("learn-french-ms-grace", "Learn French with Ms Grace", "ESFEL", "https://learnfrenchwithmsgrace.netlify.app/", "Education", "Website"),

  // ── Illustration-led ──────────────────────────────────────
  entry("nervana", "Nervana", "Reform Collective", "https://nervana.reformcollective.com/", "Corporate", "Illustration · Web"),
  entry("red-antler", "Red Antler", "Red Antler", "https://www.redantler.com/", "Corporate", "Illustration · Web"),

  // ── Templates we build fast on ────────────────────────────
  entry("tpl-mariana", "Mariana", "Squarespace", "https://www.squarespace.com/templates/mariana-fluid-demo", "Templates", "Squarespace Template"),
  entry("tpl-clove", "Clove", "Squarespace", "https://www.squarespace.com/templates/clove-fluid-demo", "Templates", "Squarespace Template"),
  entry("tpl-wesley", "Wesley", "Squarespace", "https://www.squarespace.com/templates/wesley-fluid-demo", "Templates", "Squarespace Template"),
  entry("tpl-looped", "Looped", "Squarespace", "https://www.squarespace.com/templates/looped-fluid-demo", "Templates", "Squarespace Template"),
].map((p, i) => ({
  ...p,
  n: String(i + 1).padStart(2, "0"),
  category:
    p.discipline === "Storefront"
      ? "storefront"
      : p.discipline === "Squarespace Template"
      ? "template"
      : "site",
}));

/** The three shapes of build in the catalogue — drives the Legend on Home. */
export const CATEGORIES = {
  site: "Websites",
  storefront: "Storefronts",
  template: "Templates",
};

export const byCategory = (key) => catalog.filter((p) => p.category === key);

/** Industries actually represented, most-worked first — no empty filter chips. */
const counts = catalog.reduce((acc, p) => ((acc[p.industry] = (acc[p.industry] || 0) + 1), acc), {});
export const INDUSTRIES = Object.keys(counts).sort(
  (a, b) => counts[b] - counts[a] || a.localeCompare(b)
);

export const byIndustry = (name) => catalog.filter((p) => p.industry === name);
export const byId = (id) => catalog.find((p) => p.id === id);
export const liveCount = catalog.filter((p) => p.href).length;

/**
 * Hero index — the sectors we build for, each fronted by one live build.
 * Derived from `catalog` so the hero can never contradict the Work page.
 * `Templates` is left out: it's a starting point, not a sector.
 */
export const heroRows = INDUSTRIES.filter((name) => name !== "Templates")
  .slice(0, 8)
  .map((name, i) => {
    // front the sector with a build that actually has a live URL to send people to
    const inSector = byIndustry(name);
    const lead = inSector.find((p) => p.href) ?? inSector[0];
    return {
      id: `ind-${name.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "")}`,
      n: String(i + 1).padStart(2, "0"),
      title: name,
      discipline: lead.discipline,
      client: lead.title,
      tag: `${counts[name]} ${counts[name] === 1 ? "build" : "builds"}`,
      image: lead.image,
      video: lead.video,
    };
  });

/** The clip behind the knocked-out word in the manifesto band. */
export const manifestoClip = { video: vid("bloom-3d-studio"), poster: pos("bloom-3d-studio") };
