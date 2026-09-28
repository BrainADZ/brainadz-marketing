import type { Metadata } from "next";

import { getCaseStudies, getCaseStudyCategories, getCMSCategoryTitle, getCMSImageURL } from "@/lib/cms";
import CaseStudiesClient, { type CaseStudy } from "./CaseStudiesClient";

export const metadata: Metadata = {
  alternates: { canonical: "/case-studies" },
  title: "Case Studies | BrainADZ Marketing",
  description:
    "Explore BrainADZ case studies across SEO, paid media, digital marketing, web development and creative services.",
};

export default async function CaseStudiesPage() {
  const [cmsStudies, cmsCategories] = await Promise.all([getCaseStudies(), getCaseStudyCategories()]);


  const studies: CaseStudy[] = cmsStudies.map((study) => ({
    category: getCMSCategoryTitle(
      study.categoryRelation,
      study.category,
    ) as CaseStudy["category"],
    href: `/case-studies/${study.slug}`,
    image: getCMSImageURL(study.heroImage),
    industry: study.industry,
    services: study.services.map((service) => service.name),
    summary: study.summary,
    title: study.title,
  }));
  const featuredDocument = cmsStudies.find((study) => study.featured);
  const featuredStudy = featuredDocument
    ? studies.find((study) =>
        study.href.endsWith(`/${featuredDocument.slug}`),
      )
    : studies[0];
  const remainingStudies = studies.filter(
    (study) => study.href !== featuredStudy?.href,
  );

  return (
    <CaseStudiesClient
      initialCaseStudies={remainingStudies}
      initialFeaturedCaseStudy={featuredStudy ?? null}
      initialCategories={Array.from(new Set([...cmsCategories.map((category) => category.title), ...studies.map((study) => study.category)]))}
    />
  );
}
