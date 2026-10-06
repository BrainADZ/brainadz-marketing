/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services | BrainADZ Marketing",
  description:
    "Explore BrainADZ Marketing services across digital marketing, SEO, performance marketing, creative media, web design, development, and conversion-focused growth execution.",
};

const SERVICE_CATEGORIES = [
  {
    title: "Digital Marketing Services",
    eyebrow: "Visibility + engagement",
    href: "/services/digital-marketing",
    description:
      "SEO, social media, content, email, WhatsApp, ORM, influencer and visual content systems for brand growth.",
    image: "/portfolio/instagram/1.png",
    imageAlt: "Digital marketing and social media work by BrainADZ",
    metrics: ["Social growth", "Content planning", "Lead journeys"],
    services: [
      { label: "SMO Services", href: "/services/digital-marketing/social-media-optimization-services-smo" },
      { label: "SMM Services", href: "/services/digital-marketing/social-media-marketing-services-smm" },
      { label: "Email Marketing", href: "/services/digital-marketing/email-marketing" },
      { label: "SEM Services", href: "/services/performance-marketing/search-engine-marketing-sem" },
      { label: "Content Marketing", href: "/services/digital-marketing/content-marketing-services" },
      { label: "Online Reputation Management (ORM)", href: "/services/digital-marketing/online-reputation-management-orm" },
      { label: "Influencer Marketing", href: "/services/digital-marketing/influencer-marketing" },
      { label: "WhatsApp Marketing", href: "/services/digital-marketing/whatsapp-marketing" },
      { label: "Visual Content Creation", href: "/services/creative-media/visual-content-creation" },
    ],
  },
  {
    title: "Web Design & Development",
    eyebrow: "Websites + platforms",
    href: "/services/web-design-development",
    description:
      "Conversion-focused websites, e-commerce builds, custom apps, UI/UX, WordPress, Shopify and maintenance.",
    image: "/portfolio/web/1.png",
    imageAlt: "Website design and development project by BrainADZ",
    metrics: ["Fast websites", "UI/UX flows", "Conversion pages"],
    services: [
      { label: "Web Development Services", href: "/services/web-design-development/web-development-services" },
      { label: "E-Commerce Development", href: "/services/web-design-development/e-commerce-development" },
      { label: "Custom Web Application Development", href: "/services/web-design-development/custom-web-application-development" },
      { label: "Mobile App Development", href: "/services/web-design-development/mobile-app-development" },
      { label: "WordPress Development", href: "/services/web-design-development/wordpress-development" },
      { label: "Shopify Development", href: "/services/web-design-development/shopify-development" },
      { label: "Website Maintenance", href: "/services/web-design-development/website-maintenance-services" },
      { label: "UI/UX Design", href: "/services/web-design-development/ui-ux-design" },
    ],
  },
  {
    title: "Creative & Media Services",
    eyebrow: "Design + storytelling",
    href: "/services/creative-media",
    description:
      "Branding, creative design, motion, videos, reels, thumbnails, presentations and campaign-ready visual assets.",
    image: "/gallery/3.jpeg",
    imageAlt: "BrainADZ creative media and brand event work",
    metrics: ["Brand design", "Video edits", "Ad creatives"],
    services: [
      { label: "Graphic Design Services", href: "/services/creative-media/graphic-design-services" },
      { label: "Creative Design Services", href: "/services/creative-media/creative-design-services" },
      { label: "Motion Graphics Services", href: "/services/creative-media/motion-graphics-services" },
      { label: "Branding Design Services", href: "/services/creative-media/branding-design-services" },
      { label: "Social Media Creative Design", href: "/services/creative-media/social-media-creative-design" },
      { label: "Presentation Design Services", href: "/services/creative-media/presentation-design-services" },
      { label: "Ad Creative Design", href: "/services/creative-media/ad-creative-design" },
      { label: "Infographic Design Services", href: "/services/creative-media/infographic-design-services" },
      { label: "YouTube Thumbnail Design", href: "/services/creative-media/youtube-thumbnail-design" },
      { label: "Short Video Editing", href: "/services/creative-media/short-video-editing" },
      { label: "Video Editing Services", href: "/services/creative-media/video-editing-services" },
      { label: "Corporate Video Editing", href: "/services/creative-media/corporate-video-editing" },
      { label: "Reel Editing Services", href: "/services/creative-media/reel-editing-services" },
    ],
  },
  {
    title: "SEO Services",
    eyebrow: "Organic search",
    href: "/services/seo-services",
    description:
      "Local, ecommerce, technical, on-page, off-page, link building, enterprise and international SEO support.",
    image: "/perfomance.png",
    imageAlt: "SEO targeting and growth strategy visual",
    metrics: ["Keyword growth", "Technical fixes", "Local visibility"],
    services: [
      { label: "Local SEO Services", href: "/services/seo-services/local-seo-services" },
      { label: "Ecommerce SEO Services", href: "/services/seo-services/ecommerce-seo-services" },
      { label: "Link Building SEO Services", href: "/services/seo-services/link-building-services" },
      { label: "Technical SEO", href: "/services/seo-services/technical-seo" },
      { label: "On Page SEO", href: "/services/seo-services/on-page-seo" },
      { label: "Off Page SEO", href: "/services/seo-services/off-page-seo" },
      { label: "SEO Audit Services", href: "/services/seo-services/seo-audit-services" },
      { label: "Enterprise SEO", href: "/services/seo-services/enterprise-seo-services" },
      { label: "International SEO", href: "/services/seo-services/international-seo-services" },
    ],
  },
  {
    title: "Performance Marketing",
    eyebrow: "Paid media + ROI",
    href: "/services/performance-marketing",
    description:
      "Google Ads, Meta Ads, YouTube Ads, PPC, retargeting, lead generation and landing page optimization.",
    image: "/scale.png",
    imageAlt: "Performance marketing and growth chart visual",
    metrics: ["Google Ads", "Meta Ads", "Lead generation"],
    services: [
      { label: "Google Ads", href: "/services/performance-marketing/google-ads" },
      { label: "Meta Ads", href: "/services/performance-marketing/meta-ads" },
      { label: "YouTube Ads", href: "/services/performance-marketing/youtube-ads" },
      { label: "Ecommerce PPC", href: "/services/performance-marketing/ecommerce-ppc" },
      { label: "Remarketing Ads", href: "/services/performance-marketing/remarketing-ads" },
      { label: "Lead Generation", href: "/services/performance-marketing/lead-generation-services" },
      { label: "Landing Page Optimization", href: "/services/performance-marketing/landing-page-optimization" },
      { label: "PPC Audit Services", href: "/services/performance-marketing/ppc-audit-services" },
      { label: "Google Shopping Ads", href: "/services/performance-marketing/google-shopping-ads" },
      { label: "Display Ads", href: "/services/performance-marketing/display-advertising" },
      { label: "Performance Marketing", href: "/services/performance-marketing" },
      { label: "LinkedIn Ads", href: "/services/performance-marketing/linkedin-ads" },
    ],
  },
];

const FEATURED_SERVICE = SERVICE_CATEGORIES[0];

export default function ServicesPage() {
  return (
    <main className="bg-black text-white">
      {/* SERVICES HERO SECTION */}
      <section className="relative min-h-[420px] overflow-hidden bg-black sm:min-h-[500px] lg:min-h-[560px]">
        <img
          src="/about/about.avif"
          alt="BrainADZ team workspace for marketing and service delivery"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.78)_30%,rgba(0,0,0,0.38)_55%,rgba(0,0,0,0.02)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.06)_48%,rgba(0,0,0,0.30)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[420px] max-w-[1800px] flex-col px-5 py-8 sm:min-h-[500px] sm:px-8 lg:min-h-[560px] lg:px-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[14px] font-medium leading-none"
          >
            <Link
              href="/"
              className="text-[#1467f5] transition hover:text-white"
            >
              Home
            </Link>
            <span className="text-white/70">/</span>
            <span className="text-white">Services</span>
          </nav>

          <h1 className="mt-7 max-w-[880px] text-[34px] font-normal leading-[1.04] tracking-[-0.045em] text-white sm:text-[46px] lg:text-[62px]">
            Services that connect strategy, creative, technology and growth.
          </h1>

          <div className="mt-auto max-w-[720px] pb-6 sm:pb-10 lg:pb-12">
            <p className="text-[18px] font-normal leading-normal tracking-[-0.02em] text-white/88 sm:text-[22px] lg:text-[25px]">
              Choose focused services or build one connected growth system
              across digital marketing, websites, SEO, paid campaigns and
              creative media.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#service-paths"
                className="inline-flex min-h-12 items-center justify-center gap-8 rounded-sm bg-[#1467f5] px-5 text-[15px] font-medium text-white transition hover:bg-[#0f56d6] sm:min-h-14 sm:px-6"
              >
                Explore Services
                <ArrowRight className="h-5 w-5" strokeWidth={1.8} />
              </Link>

              <Link
                href="/contact" data-enquiry-trigger data-enquiry-source="Page CTA"
                className="inline-flex min-h-12 items-center justify-center gap-8 rounded-sm border border-white/22 bg-black/25 px-5 text-[15px] font-medium text-white transition hover:border-[#1467f5] hover:bg-[#1467f5] sm:min-h-14 sm:px-6"
              >
                Enquire Now
                <ArrowRight className="h-5 w-5" strokeWidth={1.8} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SERVICE SECTION */}
      <section
        id="service-paths"
        className="border-b border-white/10 bg-black py-16 text-white sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-center lg:gap-16">
            <Link
              href={FEATURED_SERVICE.href}
              className="group relative min-h-[420px] overflow-hidden rounded-md border border-white/10 bg-[#101010] sm:min-h-[560px]"
            >
              <Image
                src={FEATURED_SERVICE.image}
                alt={FEATURED_SERVICE.imageAlt}
                fill
                className="object-cover object-top transition duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.74)_100%)]" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-white/58">
                  Featured service path
                </p>
                <p className="mt-3 max-w-[620px] text-[32px] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[42px]">
                  Digital Marketing Services
                </p>
              </div>
            </Link>

            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6995ff]">
                Start here
              </p>
              <h2 className="mt-5 max-w-[850px] text-[40px] font-medium leading-[1.08] tracking-[-0.04em] sm:text-[54px] lg:text-[62px]">
                The growth layer that connects every other service.
              </h2>
              <p className="mt-7 max-w-[760px] text-[16px] leading-8 text-white/62">
                Digital marketing is where your website, creative, SEO, content,
                paid media and follow-up systems start working together. We use
                it to help brands become visible, trusted and easier to enquire
                with.
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                {FEATURED_SERVICE.metrics.map((metric) => (
                  <div
                    key={metric}
                    className="border-y border-white/10 py-5 sm:border sm:px-5"
                  >
                    <p className="text-[15px] font-semibold leading-6 text-white">
                      {metric}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href={FEATURED_SERVICE.href}
                className="mt-9 inline-flex min-h-14 items-center justify-center gap-8 rounded-sm bg-[#1467f5] px-6 text-[15px] font-medium text-white transition hover:bg-[#0f56d6]"
              >
                View Digital Marketing
                <ArrowRight className="h-5 w-5" strokeWidth={1.8} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE SERVICE CARDS SECTION */}
      <section className="border-b border-white/10 bg-[#080808] py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6995ff]">
                Core service paths
              </p>
              <h2 className="mt-5 max-w-[900px] text-[40px] font-medium leading-[1.08] tracking-[-0.04em] sm:text-[54px] lg:text-[62px]">
                Image-led services, built around real work.
              </h2>
            </div>
            <p className="max-w-[620px] text-[16px] leading-8 text-white/60">
              Every service path opens into its own page, and the submenu items
              below open focused detail pages.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {SERVICE_CATEGORIES.slice(1).map((category, index) => (
              <ServiceImageCard
                key={category.title}
                category={category}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE DIRECTORY SECTION */}
      <section className="bg-black py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#6995ff]">
                Service directory
              </p>
              <h2 className="mt-5 max-w-[780px] text-[40px] font-medium leading-[1.08] tracking-[-0.04em] sm:text-[54px] lg:text-[62px]">
                Browse by category, then open the exact service you need.
              </h2>
            </div>
            <p className="max-w-[720px] text-[16px] leading-8 text-white/60">
              This keeps the main page visual and clean, while the deeper pages
              handle detailed service-specific explanations.
            </p>
          </div>

          <div className="mt-12 space-y-10">
            {SERVICE_CATEGORIES.map((category, index) => (
              <ServiceDirectoryRow
                key={category.title}
                category={category}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

function ServiceImageCard({
  category,
  priority,
}: {
  category: ServiceCategory;
  priority?: boolean;
}) {
  return (
    <Link
      href={category.href}
      className="group overflow-hidden rounded-md border border-white/10 bg-[#101010] transition hover:border-[#1467f5]"
    >
      <div className="relative h-[285px] overflow-hidden bg-black sm:h-[360px]">
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          priority={priority}
          className={`transition duration-700 group-hover:scale-105 ${
            category.image.includes("perfomance") ||
            category.image.includes("scale")
              ? "object-contain p-8"
              : "object-cover object-top"
          }`}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.42)_100%)]" />
      </div>

      <div className="p-6 sm:p-7">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6995ff]">
          {category.eyebrow}
        </p>
        <h3 className="mt-4 text-[30px] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[34px]">
          {category.title}
        </h3>
        <p className="mt-4 max-w-[660px] text-[15px] leading-7 text-white/60">
          {category.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {category.metrics.map((metric) => (
            <span
              key={metric}
              className="rounded-[3px] border border-white/10 px-3 py-2 text-[12px] font-medium text-white/62"
            >
              {metric}
            </span>
          ))}
        </div>

        <span className="mt-7 inline-flex items-center gap-3 text-[14px] font-semibold text-[#6995ff] transition group-hover:text-white">
          View service
          <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
        </span>
      </div>
    </Link>
  );
}

function ServiceDirectoryRow({
  category,
  reverse,
}: {
  category: ServiceCategory;
  reverse?: boolean;
}) {
  return (
    <div
      className={`grid gap-6 border-t border-white/10 pt-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-stretch ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <Link
        href={category.href}
        className="group relative min-h-80 overflow-hidden rounded-md border border-white/10 bg-[#101010]"
      >
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          className={`transition duration-700 group-hover:scale-105 ${
            category.image.includes("perfomance") ||
            category.image.includes("scale")
              ? "object-contain p-8"
              : "object-cover object-top"
          }`}
          sizes="(max-width: 1024px) 100vw, 42vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.70)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/52">
            {category.eyebrow}
          </p>
          <p className="mt-2 text-[28px] font-semibold leading-tight tracking-[-0.04em] text-white">
            {category.title}
          </p>
        </div>
      </Link>

      <div className="flex flex-col justify-center">
        <p className="max-w-[780px] text-[16px] leading-8 text-white/62">
          {category.description}
        </p>

        <div className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2 xl:grid-cols-3">
          {category.services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group flex items-start gap-3 border-b border-white/10 pb-3 text-[14px] font-medium leading-6 text-white/70 transition hover:border-[#1467f5] hover:text-white"
            >
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#1467f5]" />
              <span>{service.label}</span>
            </Link>
          ))}
        </div>

        <Link
          href={category.href}
          className="mt-8 inline-flex w-fit min-h-12 items-center justify-center gap-6 rounded-sm border border-white/18 px-5 text-[14px] font-medium text-white transition hover:border-[#1467f5] hover:bg-[#1467f5]"
        >
          Open {category.title}
          <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
        </Link>
      </div>
    </div>
  );
}
