import type { MetadataRoute } from "next";

import { getBlogPosts, getCaseStudies } from "@/lib/cms";

const siteURL = "https://brainadz.marketing";
const staticRoutes = ["", "/about", "/services", "/blog", "/case-studies", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, caseStudies] = await Promise.all([getBlogPosts(), getCaseStudies()]);

  return [
    ...staticRoutes.map((route) => ({ url: `${siteURL}${route}` })),
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
