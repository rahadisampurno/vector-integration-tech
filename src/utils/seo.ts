// SEO & Routing utilities for VEINTECH enterprise website

export interface AlternateUrls {
  id: string;
  en: string;
  canonical: string;
}

export const ID_TO_EN_SLUGS: Record<string, string> = {
  '/services/ai-otomatisasi': '/en/services/ai-automation',
  '/services/integrasi-sistem': '/en/services/system-integration',
  '/services/pengembangan-software': '/en/services/software-development',
  '/services/konsultasi': '/en/services/consulting',
  '/services/website-umkm': '/en/services/business-website',
  '/services/ai-computer-vision': '/en/services/ai-computer-vision',
  '/services/chatbot-ai': '/en/services/chatbot-ai',
  '/services/integrasi-api': '/en/services/integrasi-api',
  '/services/cyber-security': '/en/services/cyber-security',
  '/services/saas-web-dev': '/en/services/saas-web-dev',
  '/services/mobile-app-dev': '/en/services/mobile-app-dev',
  '/services/audit-it': '/en/services/audit-it',
  '/services/ecommerce-solutions': '/en/services/ecommerce-solutions',
  '/services/website-bisnis': '/en/services/website-bisnis',
};

export const EN_TO_ID_SLUGS: Record<string, string> = Object.fromEntries(
  Object.entries(ID_TO_EN_SLUGS).map(([id, en]) => [en.replace(/^\/en/, ''), id])
);

export function normalizePathname(pathname: string): string {
  const clean = pathname.replace(/^\/en/, '') || '/';
  if (clean.length > 1 && clean.endsWith('/')) {
    return clean.slice(0, -1);
  }
  return clean;
}

export function computeAlternatePaths(pathname: string): { idPath: string; enPath: string } {
  const norm = normalizePathname(pathname);
  const enPath = ID_TO_EN_SLUGS[norm] ?? `/en${norm === '/' ? '' : norm}`;
  const idPath = EN_TO_ID_SLUGS[norm] ?? norm;
  return { idPath, enPath };
}

export function formatSEOTitle(pageTitle: string, brand = 'VEINTECH'): string {
  if (!pageTitle || pageTitle === brand) return `${brand} | Technology Partner for Business Growth`;
  return `${pageTitle} | ${brand}`;
}
