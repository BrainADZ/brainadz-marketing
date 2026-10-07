/** Exact migrations only: unrelated removed pages must keep returning 404. */
export const legacyRedirects: Record<string, string> = {
  "/about": "/about-us",
  "/contact-us": "/contact",
  "/our-team": "/teams",
  "/blogs": "/blog",
  "/blogs/best-seo-aeo-tools": "/blog/best-seo-aeo-tools",
  "/category/blog": "/blog",
  "/website": "/services/web-design-development",
  "/graphic-designing": "/services/creative-media/graphic-design-services",
  "/social-media-marketing": "/services/digital-marketing/social-media-marketing-services-smm",
  "/email-marketing": "/services/digital-marketing/email-marketing",
  "/whatsapp-marketing": "/services/digital-marketing/whatsapp-marketing",
  "/digital-campaigns-and-content": "/services/digital-marketing",
};

/** Removed service aliases return 404 even if an old CMS redirect remains. */
export const removedServicePaths = [
  "/services/google-ads",
  "/services/youtube-ads",
  "/services/display-ads",
  "/services/ppc-audit-services",
  "/services/ecommerce-ppc",
  "/services/google-shopping-ads",
  "/services/lead-generation",
  "/services/meta-ads",
  "/services/ecommerce-seo-services",
  "/services/local-seo-services",
  "/services/seo-audit-services",
  "/services/technical-seo",
  "/services/international-seo",
  "/services/on-page-seo",
  "/services/off-page-seo",
  "/services/enterprise-seo",
  "/services/digital-marketing/online-reputation-management",
  "/services/digital-marketing/smo-services",
  "/services/digital-marketing/sem-services",
  "/services/digital-marketing/content-marketing",
  "/services/web-design-development/web-development",
  "/services/web-design-development/website-maintenance",
] as const;

export function isRemovedServicePath(pathname: string): boolean {
  return (removedServicePaths as readonly string[]).includes(pathname.replace(/\/+$/, ""));
}

export function isLegacyPostQuery(pathname: string, searchParams: URLSearchParams): boolean {
  return pathname === "/" && /^\d+$/.test(searchParams.get("p") || "");
}
