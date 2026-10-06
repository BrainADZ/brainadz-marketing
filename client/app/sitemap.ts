import type { MetadataRoute } from "next";

import { getBlogPosts, getCaseStudies } from "@/lib/cms";

const siteURL = "https://brainadz.marketing";
const staticRoutes = ["", "/about-us", "/services", "/blog", "/case-studies", "/contact"];
const serviceRoutes = [
  "/services/creative-media",
  "/services/creative-media/ad-creative-design",
  "/services/creative-media/branding-design-services",
  "/services/creative-media/corporate-video-editing",
  "/services/creative-media/creative-design-services",
  "/services/creative-media/graphic-design-services",
  "/services/creative-media/infographic-design-services",
  "/services/creative-media/motion-graphics-services",
  "/services/creative-media/presentation-design-services",
  "/services/creative-media/reel-editing-services",
  "/services/creative-media/short-video-editing",
  "/services/creative-media/social-media-creative-design",
  "/services/creative-media/video-editing-services",
  "/services/creative-media/visual-content-creation",
  "/services/creative-media/youtube-thumbnail-design",
  "/services/digital-marketing",
  "/services/digital-marketing/content-marketing-services",
  "/services/digital-marketing/email-marketing",
  "/services/digital-marketing/influencer-marketing",
  "/services/digital-marketing/online-reputation-management-orm",
  "/services/digital-marketing/social-media-marketing-services-smm",
  "/services/digital-marketing/social-media-optimization-services-smo",
  "/services/digital-marketing/whatsapp-marketing",
  "/services/performance-marketing",
  "/services/performance-marketing/display-advertising",
  "/services/performance-marketing/ecommerce-ppc",
  "/services/performance-marketing/google-ads",
  "/services/performance-marketing/google-shopping-ads",
  "/services/performance-marketing/landing-page-optimization",
  "/services/performance-marketing/lead-generation-services",
  "/services/performance-marketing/linkedin-ads",
  "/services/performance-marketing/meta-ads",
  "/services/performance-marketing/ppc-audit-services",
  "/services/performance-marketing/remarketing-ads",
  "/services/performance-marketing/search-engine-marketing-sem",
  "/services/performance-marketing/youtube-ads",
  "/services/seo-services",
  "/services/seo-services/ecommerce-seo-services",
  "/services/seo-services/enterprise-seo-services",
  "/services/seo-services/international-seo-services",
  "/services/seo-services/link-building-services",
  "/services/seo-services/local-seo-services",
  "/services/seo-services/off-page-seo",
  "/services/seo-services/on-page-seo",
  "/services/seo-services/seo-audit-services",
  "/services/seo-services/technical-seo",
  "/services/web-design-development",
  "/services/web-design-development/custom-web-application-development",
  "/services/web-design-development/e-commerce-development",
  "/services/web-design-development/mobile-app-development",
  "/services/web-design-development/shopify-development",
  "/services/web-design-development/ui-ux-design",
  "/services/web-design-development/web-development-services",
  "/services/web-design-development/website-maintenance-services",
  "/services/web-design-development/wordpress-development",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, caseStudies] = await Promise.all([getBlogPosts(), getCaseStudies()]);

  return [
    ...[...staticRoutes, ...serviceRoutes].map((route) => ({ url: `${siteURL}${route}` })),
    ...posts.map((post) => ({
      url: post.seo?.canonicalURL || `${siteURL}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt,
    })),
    ...caseStudies.map((study) => ({
      url: study.seo?.canonicalURL || `${siteURL}/case-studies/${study.slug}`,
      lastModified: study.updatedAt,
    })),
  ];
}
