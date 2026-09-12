/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Palette,
  Search,
  SearchCheck,
  Target,
  Workflow,
} from "lucide-react";


type CaseStudyCategory =
  | "All Case Studies"
  | "Digital Marketing"
  | "Performance Marketing"
  | "SEO"
  | "Web Design & Development"
  | "Creative & Media";

export type CaseStudy = {
  title: string;
  summary: string;
  category: Exclude<CaseStudyCategory, "All Case Studies">;
  industry: string;
  image: string;
  href: string;
  services: string[];
};

const categories: CaseStudyCategory[] = [
  "All Case Studies",
  "Digital Marketing",
  "Performance Marketing",
  "SEO",
  "Web Design & Development",
  "Creative & Media",
];

const fallbackFeaturedCaseStudy: CaseStudy = {
  title: "Building a Search-Led Growth Foundation for a B2B Business",
  summary:
    "A connected marketing approach bringing technical SEO, search-focused content, landing page improvements and conversion thinking into one structured growth system.",
  category: "SEO",
  industry: "B2B",
  image: "/portfolio/web-insight1.webp",
  href: "/contact",
  services: [
    "SEO Audit",
    "Technical SEO",
    "On-Page SEO",
    "Content Strategy",
  ],
};

const fallbackCaseStudies: CaseStudy[] = [
  {
    title: "Organic Search Growth Framework for a B2B Manufacturing Brand",
    summary:
      "A search strategy shaped around technical cleanup, keyword-to-page mapping, content structure and stronger organic discovery across priority service areas.",
    category: "SEO",
    industry: "Manufacturing",
    image: "/portfolio/national-engineers.webp",
    href: "/contact",
    services: ["Technical SEO", "On-Page SEO", "Content Marketing"],
  },
  {
    title: "Local Search Visibility System for a Multi-Service Business",
    summary:
      "A local SEO framework connecting location intent, service pages, business profile optimization and local relevance signals into one discoverability strategy.",
    category: "SEO",
    industry: "Local Services",
    image: "/portfolio/rubber-hose-india.webp",
    href: "/contact",
    services: ["Local SEO", "On-Page SEO", "SEO Audit"],
  },
  {
    title: "Ecommerce Search Architecture for Better Product Discovery",
    summary:
      "An ecommerce SEO approach focused on category structure, product discoverability, faceted navigation, technical crawl control and commercial search intent.",
    category: "SEO",
    industry: "Ecommerce",
    image: "/portfolio/khadi-organique.webp",
    href: "/contact",
    services: ["Ecommerce SEO", "Technical SEO", "Content Strategy"],
  },
  {
    title: "Lead Generation Funnel Built Around Google Search Ads",
    summary:
      "A performance marketing structure connecting keyword intent, campaign segmentation, landing pages, conversion tracking and ongoing paid search optimization.",
    category: "Performance Marketing",
    industry: "Business Services",
    image: "/portfolio/okay-trip.webp",
    href: "/contact",
    services: ["Google Ads", "Lead Generation", "Landing Page Optimization"],
  },
  {
    title: "Meta Campaign System for Multi-Creative Customer Acquisition",
    summary:
      "A structured Meta Ads approach built around audience testing, campaign creative variations, funnel stages, remarketing and measurable acquisition workflows.",
    category: "Performance Marketing",
    industry: "Consumer Brand",
    image: "/portfolio/instagram/1.png",
    href: "/contact",
    services: ["Meta Ads", "Remarketing Ads", "Ad Creative Design"],
  },
  {
    title: "LinkedIn Demand Generation for a B2B Service Offering",
    summary:
      "A B2B acquisition framework combining audience definition, message positioning, LinkedIn campaigns, lead capture and conversion-focused landing experiences.",
    category: "Performance Marketing",
    industry: "B2B Services",
    image: "/portfolio/instagram/2.png",
    href: "/contact",
    services: ["LinkedIn Ads", "Lead Generation", "Landing Page Optimization"],
  },
  {
    title: "Social Content System for a Consistent Consumer Brand Presence",
    summary:
      "A social media workflow covering content pillars, campaign planning, visual consistency, publishing structure and ongoing audience-facing communication.",
    category: "Digital Marketing",
    industry: "Consumer Brand",
    image: "/portfolio/social-media-design.webp",
    href: "/contact",
    services: ["Social Media Marketing", "SMO", "Content Marketing"],
  },
  {
    title: "Reputation and Brand Communication Framework",
    summary:
      "A digital reputation workflow designed around brand monitoring, response planning, content support and consistent public-facing communication across channels.",
    category: "Digital Marketing",
    industry: "Professional Services",
    image: "/portfolio/instagram/3.png",
    href: "/contact",
    services: ["ORM", "Content Marketing", "Social Media Optimization"],
  },
  {
    title: "Retention Communication Through Email and WhatsApp Journeys",
    summary:
      "A customer communication setup connecting campaign planning, audience segments, messaging journeys and follow-up touchpoints across email and WhatsApp.",
    category: "Digital Marketing",
    industry: "Ecommerce",
    image: "/portfolio/instagram/4.png",
    href: "/contact",
    services: ["Email Marketing", "WhatsApp Marketing", "Content Marketing"],
  },
  {
    title: "Conversion-Focused Website Redesign for a Service Business",
    summary:
      "A website redesign shaped around clearer information architecture, stronger service journeys, responsive UI and a more practical path from visit to enquiry.",
    category: "Web Design & Development",
    industry: "Business Services",
    image: "/portfolio/web-insight2.webp",
    href: "/contact",
    services: ["UI/UX Design", "Web Development", "Landing Page Optimization"],
  },
  {
    title: "Shopify Store Experience Built Around Product Discovery",
    summary:
      "A Shopify experience structured around navigation, collection organization, product presentation, responsive behaviour and a smoother ecommerce purchase journey.",
    category: "Web Design & Development",
    industry: "Retail & Ecommerce",
    image: "/portfolio/country-home.webp",
    href: "/contact",
    services: ["Shopify Development", "UI/UX Design", "E-Commerce Development"],
  },
  {
    title: "Custom Web Application for a Connected Business Workflow",
    summary:
      "A custom web experience translating business requirements into clear interfaces, structured workflows, responsive behaviour and scalable application architecture.",
    category: "Web Design & Development",
    industry: "Business Operations",
    image: "/portfolio/synergy-infra.webp",
    href: "/contact",
    services: ["Custom Web Application", "UI/UX Design", "Web Development"],
  },
  {
    title: "Campaign Creative System for Multi-Channel Advertising",
    summary:
      "A flexible creative system designed to adapt campaign messages across paid social, display formats, landing experiences and multiple content dimensions.",
    category: "Creative & Media",
    industry: "Consumer Campaign",
    image: "/portfolio/design-insight.webp",
    href: "/contact",
    services: ["Ad Creative Design", "Graphic Design", "Visual Content Creation"],
  },
  {
    title: "Social Video Editing System for Short-Form Content",
    summary:
      "A repeatable short-form editing workflow combining pacing, visual hierarchy, branded treatments and practical delivery across Reels, Shorts and campaign formats.",
    category: "Creative & Media",
    industry: "Digital Content",
    image: "/portfolio/inhouse-studio.webp",
    href: "/contact",
    services: ["Reel Editing", "Short Video Editing", "Motion Graphics"],
  },
  {
    title: "Brand Identity and Visual Communication Toolkit",
    summary:
      "A visual identity system bringing brand direction, graphic language, campaign assets and reusable communication formats into one consistent creative framework.",
    category: "Creative & Media",
    industry: "Brand & Corporate",
    image: "/portfolio/logo-insight.webp",
    href: "/contact",
    services: ["Branding Design", "Graphic Design", "Presentation Design"],
  },
];

const capabilityCards = [
  {
    title: "Search & Organic Growth",
    description:
      "SEO audits, technical SEO, on-page strategy, content, local search, ecommerce SEO and link-building work connected to measurable search visibility.",
    icon: SearchCheck,
  },
  {
    title: "Paid Acquisition & Lead Generation",
    description:
      "Google, Meta, LinkedIn, YouTube, shopping and remarketing campaigns planned around intent, conversion paths and accountable media performance.",
    icon: Target,
  },
  {
    title: "Digital Experience & Creative",
    description:
      "Web design, development, ecommerce, branding, campaign creatives, motion and video work shaped around practical customer journeys.",
    icon: Palette,
  },
];

type CaseStudiesClientProps = {
  initialCaseStudies?: CaseStudy[];
  initialFeaturedCaseStudy?: CaseStudy | null;
  initialCategories?: string[];
};

export default function CaseStudiesClient({
  initialCaseStudies = fallbackCaseStudies,
  initialFeaturedCaseStudy = fallbackFeaturedCaseStudy,
  initialCategories,
}: CaseStudiesClientProps) {
  const caseStudies = initialCaseStudies;
  const featuredCaseStudy = initialFeaturedCaseStudy;
  const categoryOptions = initialCategories ? ["All Case Studies", ...initialCategories] : categories;
  const [activeCategory, setActiveCategory] =
    useState<string>("All Case Studies");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredCaseStudies = caseStudies.filter((caseStudy) => {
    const matchesCategory =
      activeCategory === "All Case Studies" ||
      caseStudy.category === activeCategory;

    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      !query ||
      caseStudy.title.toLowerCase().includes(query) ||
      caseStudy.summary.toLowerCase().includes(query) ||
      caseStudy.category.toLowerCase().includes(query) ||
      caseStudy.industry.toLowerCase().includes(query) ||
      caseStudy.services.some((service) =>
        service.toLowerCase().includes(query),
      );

    return matchesCategory && matchesSearch;
  });

  const visibleCaseStudies = filteredCaseStudies.slice(0, visibleCount);
  const hasMoreCaseStudies = visibleCount < filteredCaseStudies.length;

  return (
    <main className="dm-sans bg-white text-[#161616]">
      {/* HERO */}
      <section className="relative min-h-[420px] overflow-hidden bg-black text-white sm:min-h-[500px] lg:min-h-[540px]">
        <img
          src="/banner/case-study.webp"
          alt="BrainADZ Marketing Case Studies"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.82)_32%,rgba(0,0,0,0.48)_60%,rgba(0,0,0,0.12)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[420px] max-w-[1800px] flex-col px-5 py-8 sm:min-h-[500px] sm:px-8 lg:min-h-[540px] lg:px-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[14px] font-medium leading-none"
          >
            <Link
              href="/"
              className="text-[#E1122B] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Home
            </Link>
            <span className="text-white/70">/</span>
            <span className="text-white">Case Studies</span>
          </nav>

          <h1 className="mt-7 max-w-[950px] text-[38px] font-semibold leading-[1.06] tracking-[-0.04em] text-white sm:text-[48px] lg:text-[58px]">
            See how marketing strategy turns into practical growth systems
          </h1>

          <div className="mt-auto max-w-[900px] pb-6 sm:pb-10 lg:pb-12">
            <p className="text-[14px] font-normal leading-[1.48] tracking-[-0.02em] text-white sm:text-[16px] lg:text-[20px]">
              Explore marketing work across SEO, paid media, social, web
              experiences and creative delivery. Each case study is structured
              around the business challenge, the strategy, the execution and the
              system built to support better marketing outcomes.
            </p>

            <a
              href="#case-studies"
              className="mt-8 inline-flex min-h-14 items-center justify-center gap-5 rounded-full bg-[#E1122B] px-7 text-[13px] font-semibold text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Explore Case Studies
              <ArrowRight className="h-5 w-5" strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED CASE STUDY */}
      <section className="border-b border-black/10 bg-white py-16 text-black sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-10">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-0.5 w-8 bg-[#E1122B]" />
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#E1122B]">
                Featured Case Study
              </p>
              </div>

              <h2 className="mt-5 max-w-[900px] text-[38px] font-semibold leading-[1.08] tracking-[-0.04em] text-black sm:text-[48px] lg:text-[58px]">
                From business challenge to connected digital growth
              </h2>
            </div>

            <p className="max-w-[720px] text-[15px] leading-7 text-black/60 sm:text-[16px] sm:leading-8">
              See how research, channel strategy, content, design and measurement
              come together to solve a defined marketing problem—not as isolated
              deliverables, but as one practical growth system.
            </p>
          </div>

          {featuredCaseStudy ? <Link
            href={featuredCaseStudy.href}
            className="group grid overflow-hidden rounded-[14px] border border-black/10 bg-[#fbfbfb] shadow-[0_18px_55px_rgba(0,0,0,0.06)] lg:grid-cols-[1.05fr_0.95fr]"
            data-aos="fade-up"
          >
            <div className="relative min-h-80 overflow-hidden bg-[#f3f3f3] sm:min-h-100 lg:min-h-145">
              <img
                src={featuredCaseStudy.image}
                alt={featuredCaseStudy.title}
                className="relative z-10 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="flex flex-col justify-center p-8 md:p-10 lg:p-14">
              <div className="flex flex-wrap items-center gap-3 text-[13px] font-light">
                <span className="rounded-full bg-[#E1122B] px-4 py-2 font-semibold text-white">
                  {featuredCaseStudy.category}
                </span>

                <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-black/60">
                  {featuredCaseStudy.industry}
                </span>
              </div>

              <h3 className="mt-8 max-w-[760px] text-[30px] font-semibold leading-[1.12] tracking-[-0.03em] text-black transition group-hover:text-[#E1122B] sm:text-[38px]">
                {featuredCaseStudy.title}
              </h3>

              <p className="mt-5 max-w-[720px] text-[15px] leading-7 text-black/60 sm:text-[16px] sm:leading-8">
                {featuredCaseStudy.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {featuredCaseStudy.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-[6px] border border-black/10 bg-white px-3.5 py-2 text-[13px] text-black/60"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <span className="mt-10 inline-flex items-center gap-3 text-[14px] font-semibold text-[#E1122B]">
                Discuss a Similar Project
                <ArrowRight
                  size={19}
                  className="transition group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link> : null}
        </div>
      </section>

      {/* CASE STUDIES GRID */}
      <section
        id="case-studies"
        className="scroll-mt-24 border-b border-black/10 bg-[#fbfbfb] py-16 text-black sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-10">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-0.5 w-8 bg-[#E1122B]" />
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#E1122B]">
                Case Study Library
              </p>
              </div>

              <h2 className="mt-5 text-[38px] font-semibold leading-[1.08] tracking-[-0.04em] text-black sm:text-[48px] lg:text-[58px]">
                Explore work by marketing discipline
              </h2>
            </div>

            <div className="flex flex-col gap-5 lg:items-end">
              <div className="relative w-full max-w-145">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]"
                />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setVisibleCount(6);
                  }}
                  placeholder="Search case studies"
                  className="h-14 w-full rounded-full border border-black/10 bg-white pl-12 pr-5 text-[15px] text-black outline-none transition placeholder:text-black/40 focus:border-[#E1122B] focus:ring-2 focus:ring-[#E1122B]/10"
                />
              </div>
            </div>
          </div>

          <div className="mb-10 flex flex-wrap gap-3">
            {categoryOptions.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setVisibleCount(6);
                  }}
                  className={`rounded-full border px-5 py-2.5 text-[14px] font-medium transition ${
                    isActive
                      ? "border-[#E1122B] bg-[#E1122B] text-white"
                      : "border-black/10 bg-white text-black/65 hover:border-[#E1122B] hover:text-[#E1122B]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {filteredCaseStudies.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleCaseStudies.map((caseStudy) => (
                <Link
                  key={caseStudy.title}
                  href={caseStudy.href}
                  className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-black/10 bg-white shadow-[0_12px_36px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#E1122B]/40 hover:shadow-[0_20px_55px_rgba(0,0,0,0.08)]"
                >
                  <div className="relative h-64 overflow-hidden bg-[#f1ecea]">
                    <img
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      className="relative z-10 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex flex-wrap items-center justify-between gap-3 text-[13px]">
                      <span className="font-semibold text-[#E1122B]">
                        {caseStudy.category}
                      </span>

                      <span className="text-black/50">
                        {caseStudy.industry}
                      </span>
                    </div>

                    <h3 className="mt-5 text-[24px] font-semibold leading-[1.25] tracking-[-0.02em] text-black transition group-hover:text-[#E1122B]">
                      {caseStudy.title}
                    </h3>

                    <p className="mt-4 text-[14px] leading-7 text-black/58 sm:text-[15px]">
                      {caseStudy.summary}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {caseStudy.services.slice(0, 3).map((service) => (
                        <span
                          key={service}
                          className="rounded-[6px] bg-[#fff1f1] px-3 py-1.5 text-[12px] text-black/60"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    <span className="mt-auto inline-flex items-center gap-3 pt-7 text-[14px] font-semibold text-[#E1122B]">
                      Read More
                      <ArrowRight
                        size={17}
                        className="transition group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-[18px] border border-[#e7ddda] bg-white px-6 py-16 text-center">
              <Workflow
                size={36}
                strokeWidth={1.5}
                className="mx-auto text-[#d9362b]"
              />

              <h3 className="mt-5 text-[24px] font-normal text-[#262626]">
                No case studies found
              </h3>

              <p className="mx-auto mt-3 max-w-130 text-[15px] font-light leading-[1.7] text-[#616161]">
                Try another search term or switch back to all case studies.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All Case Studies");
                  setVisibleCount(6);
                }}
                className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-[#d9362b]"
              >
                Clear Filters
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {filteredCaseStudies.length > 0 && hasMoreCaseStudies && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setVisibleCount((currentCount) =>
                    Math.min(currentCount + 6, filteredCaseStudies.length),
                  )
                }
                className="group inline-flex h-13.5 min-w-52 items-center justify-between rounded-sm border border-[#d9362b] px-6 text-[15px] font-medium text-[#d9362b] transition-all duration-300 hover:bg-[#d9362b] hover:text-white"
              >
                <span>Load More Case Studies</span>

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* WHAT THE CASE STUDIES COVER */}
      <section className="border-b border-black/10 bg-white py-16 text-black sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-10">
          <div className="mb-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-0.5 w-8 bg-[#E1122B]" />
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#E1122B]">
                  Capabilities in Practice
                </p>
              </div>

              <h2 className="mt-5 text-[38px] font-semibold leading-[1.08] tracking-[-0.04em] text-black sm:text-[48px] lg:text-[58px]">
                Specialist execution connected to one business objective
              </h2>
            </div>

            <p className="max-w-[720px] text-[15px] leading-7 text-black/60 sm:text-[16px] sm:leading-8">
              Every engagement starts with the commercial goal. We then combine
              the channels and capabilities needed to improve visibility,
              acquisition, customer experience and measurable performance.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {capabilityCards.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[14px] border border-black/10 bg-[#fbfbfb] p-8 shadow-[0_12px_36px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#E1122B]/40"
                  data-aos="fade-up"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-[10px] border border-[#E1122B]/20 bg-[#fff1f1] text-[#E1122B]">
                    <Icon size={27} strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-8 text-[24px] font-semibold leading-tight tracking-[-0.02em] text-black">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-[14px] leading-7 text-black/58 sm:text-[15px]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}
