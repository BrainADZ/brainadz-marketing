/* eslint-disable @next/next/no-img-element */

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    title: "Digital Marketing",
    description:
      "Build a stronger online presence with our digital marketing services in Delhi. We offer social media marketing, content marketing, online reputation management, influencer marketing, and audience engagement strategies to help businesses connect with their customers.",
    href: "/services/digital-marketing",
    image: "/home/digital-marketing.webp",
    imageAlt: "Digital marketing campaign illustration",
    imageClassName: "object-cover",
    tileClassName: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Search Engine Optimization (SEO)",
    description:
      "Improve organic visibility with our SEO services in Delhi and across India. Our SEO solutions include technical SEO, on-page SEO, local SEO, eCommerce SEO, keyword research, content optimization, and link building to help your website attract relevant search traffic. We also support Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) strategies to improve content clarity and discoverability across evolving AI-powered search experiences.",
    href: "/services/seo-services",
    image: "/image2.jpeg",
    imageAlt: "SEO optimization illustration",
    imageClassName: "object-cover",
    tileClassName: "bg-[#090909]",
  },
  {
    title: "Creative & Media Services",
    description:
      "Strengthen your brand identity with professional creative and media services. From graphic design and branding to video editing, motion graphics, social media creatives, and advertising design, we help businesses communicate effectively across digital platforms.",
    href: "/services/creative-media",
    image: "/home/creative-media.webp",
    imageAlt: "Creative media design illustration",
    imageClassName: "object-cover",
    tileClassName: "bg-[#0f0f0f]",
  },
  {
    title: "Website Design & Development",
    description:
      "Create fast, responsive, and SEO-friendly websites with our website development services in Delhi. Our team builds corporate websites, WordPress websites, Shopify stores, eCommerce platforms, and custom web applications designed to support usability, conversions, and business growth.",
    href: "/services/web-design-development",
    image: "/home/website-development.webp",
    imageAlt: "Website development illustration",
    imageClassName: "object-cover",
    tileClassName: "bg-[#151515]",
  },
  {
    title: "Performance Marketing",
    description:
      "Reach potential customers through targeted, data-driven advertising campaigns. As a performance marketing agency in Delhi, we provide Google Ads management, Meta Ads, LinkedIn Ads, PPC advertising, remarketing, and lead generation services focused on measurable campaign outcomes.",
    href: "/services/performance-marketing",
    image: "/home/performance-marketing.webp",
    imageAlt: "Performance marketing growth illustration",
    imageClassName: "object-cover",
    tileClassName: "bg-[#0d0d0d]",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white text-[#151515]">
      <div className="mx-auto max-w-full py-16 md:py-20 lg:py-24">
        {/* Heading */}
        <div className="mx-auto mb-12 flex max-w-[1800px] flex-col gap-7 border-b border-black/10 px-5 pb-10 md:mb-14 md:flex-row md:items-end md:justify-between md:px-10 md:pb-12 lg:px-12">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-0.5 w-8 bg-[#d71920]" />

              <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#d71920]">
                Our Services
              </span>
            </div>

            <h2 className="max-w-[850px] text-[38px] font-normal leading-[1.1] tracking-[-0.03em] text-black sm:text-[46px] lg:text-[58px]">
              Ideas, technology and marketing
              <span className="block text-[#d71920]">
                working together.
              </span>
            </h2>
          </div>

          <p className="max-w-[430px] text-[15px] leading-7 text-black/60 md:text-right">
            We bring strategy, creativity, and technology together to build
            stronger digital experiences for ambitious brands.
          </p>
        </div>

        {/* Full Height Service Grid */}
        <div className="grid overflow-hidden border-y border-black/10 bg-[#111] shadow-[0_22px_55px_rgba(0,0,0,0.12)] sm:grid-cols-2 lg:min-h-[880px] lg:grid-cols-4 lg:grid-rows-2">
          {SERVICES.map((service, index) => (
            <Link
              key={`${service.title}-${index}`}
              href={service.href}
              data-aos="fade-up"
              data-aos-delay={(index % 4) * 80}
              aria-label={`${service.title}: ${service.description}`}
              className={`group relative block min-h-[430px] overflow-hidden border-b border-white/10 outline-none transition-transform duration-300 focus-visible:ring-2 focus-visible:ring-[#d71920] focus-visible:ring-inset sm:border-r lg:h-full ${service.tileClassName}`}
            >
              <img
                src={service.image}
                alt={service.imageAlt}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05] ${service.imageClassName}`}
              />

              <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/75" />

              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div className="translate-y-0 px-4 opacity-100 transition-all duration-300 lg:translate-y-5 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                  <h3 className="mx-auto max-w-[340px] text-[28px] font-semibold leading-tight tracking-[-0.03em] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.35)] sm:text-[30px]">
                    {service.title}
                  </h3>

                  <p className="mx-auto mt-4 max-w-[340px] text-[11px] leading-[1.35] text-white/90 sm:text-[12px]">
                    {service.description}
                  </p>

                  <span className="mx-auto mt-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/45 text-white transition-colors duration-300 group-hover:border-[#d71920] group-hover:bg-[#d71920]">
                    <ArrowUpRight
                      className="h-5 w-5"
                      strokeWidth={1.8}
                    />
                  </span>
                </div>
              </div>

              {/* Title visible before hover */}
              {/* <div className="absolute bottom-7 left-7 right-7 transition-opacity duration-300 lg:group-hover:opacity-0">
                <h3 className="text-[25px] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[28px]">
                  {service.title}
                </h3>
              </div> */}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
