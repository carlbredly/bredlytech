/** URL publique du site (SEO, sitemap, JSON-LD). Surchargable via NEXT_PUBLIC_SITE_URL. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bredlytech.com";

export const SITE_NAME = "Bredly Technologies LLC";

export const SITE_DESCRIPTION =
  "Software & AI agency building custom web apps, SaaS platforms, and AI-powered digital experiences for modern businesses.";

/**
 * Chemin public pour l’image de partage Open Graph / Twitter (fichier à placer dans `public/`, ex. `public/og.png`).
 * Utilisé par les métadonnées des pages ; sans fichier, les réseaux n’affichent pas d’aperçu image.
 */
export const OG_SHARE_IMAGE_PATH = "/og.png";
