export type CaseStudyCategory = "All Case Studies" | "Digital Marketing" | "Performance Marketing" | "SEO" | "Web Design & Development" | "Creative & Media";

export type CaseStudy = {
  slug: string; title: string; summary: string;
  category: Exclude<CaseStudyCategory, "All Case Studies">;
  industry: string; image: string; services: string[];
};

export const categories: CaseStudyCategory[] = ["All Case Studies", "Digital Marketing", "Performance Marketing", "SEO", "Web Design & Development", "Creative & Media"];

export const featuredCaseStudy: CaseStudy = {
  slug: "search-led-growth-foundation-b2b", title: "Building a Search-Led Growth Foundation for a B2B Business",
  summary: "A connected marketing approach bringing technical SEO, search-focused content, landing page improvements and conversion thinking into one structured growth system.",
  category: "SEO", industry: "B2B", image: "/portfolio/web-insight1.webp", services: ["SEO Audit", "Technical SEO", "On-Page SEO", "Content Strategy"],
};

export const caseStudies: CaseStudy[] = [
  { slug: "organic-search-growth-b2b-manufacturing", title: "Organic Search Growth Framework for a B2B Manufacturing Brand", summary: "A search strategy shaped around technical cleanup, keyword-to-page mapping, content structure and stronger organic discovery across priority service areas.", category: "SEO", industry: "Manufacturing", image: "/portfolio/national-engineers.webp", services: ["Technical SEO", "On-Page SEO", "Content Marketing"] },
  { slug: "local-search-visibility-multi-service", title: "Local Search Visibility System for a Multi-Service Business", summary: "A local SEO framework connecting location intent, service pages, business profile optimization and local relevance signals into one discoverability strategy.", category: "SEO", industry: "Local Services", image: "/portfolio/rubber-hose-india.webp", services: ["Local SEO", "On-Page SEO", "SEO Audit"] },
  { slug: "ecommerce-search-product-discovery", title: "Ecommerce Search Architecture for Better Product Discovery", summary: "An ecommerce SEO approach focused on category structure, product discoverability, faceted navigation, technical crawl control and commercial search intent.", category: "SEO", industry: "Ecommerce", image: "/portfolio/khadi-organique.webp", services: ["Ecommerce SEO", "Technical SEO", "Content Strategy"] },
  { slug: "google-search-ads-lead-generation", title: "Lead Generation Funnel Built Around Google Search Ads", summary: "A performance marketing structure connecting keyword intent, campaign segmentation, landing pages, conversion tracking and ongoing paid search optimization.", category: "Performance Marketing", industry: "Business Services", image: "/portfolio/okay-trip.webp", services: ["Google Ads", "Lead Generation", "Landing Page Optimization"] },
  { slug: "meta-ads-customer-acquisition", title: "Meta Campaign System for Multi-Creative Customer Acquisition", summary: "A structured Meta Ads approach built around audience testing, campaign creative variations, funnel stages, remarketing and measurable acquisition workflows.", category: "Performance Marketing", industry: "Consumer Brand", image: "/portfolio/instagram/1.png", services: ["Meta Ads", "Remarketing Ads", "Ad Creative Design"] },
  { slug: "linkedin-b2b-demand-generation", title: "LinkedIn Demand Generation for a B2B Service Offering", summary: "A B2B acquisition framework combining audience definition, message positioning, LinkedIn campaigns, lead capture and conversion-focused landing experiences.", category: "Performance Marketing", industry: "B2B Services", image: "/portfolio/instagram/2.png", services: ["LinkedIn Ads", "Lead Generation", "Landing Page Optimization"] },
  { slug: "social-content-consumer-brand", title: "Social Content System for a Consistent Consumer Brand Presence", summary: "A social media workflow covering content pillars, campaign planning, visual consistency, publishing structure and ongoing audience-facing communication.", category: "Digital Marketing", industry: "Consumer Brand", image: "/portfolio/social-media-design.webp", services: ["Social Media Marketing", "SMO", "Content Marketing"] },
  { slug: "reputation-brand-communication", title: "Reputation and Brand Communication Framework", summary: "A digital reputation workflow designed around brand monitoring, response planning, content support and consistent public-facing communication across channels.", category: "Digital Marketing", industry: "Professional Services", image: "/portfolio/instagram/3.png", services: ["ORM", "Content Marketing", "Social Media Optimization"] },
  { slug: "email-whatsapp-retention-journeys", title: "Retention Communication Through Email and WhatsApp Journeys", summary: "A customer communication setup connecting campaign planning, audience segments, messaging journeys and follow-up touchpoints across email and WhatsApp.", category: "Digital Marketing", industry: "Ecommerce", image: "/portfolio/instagram/4.png", services: ["Email Marketing", "WhatsApp Marketing", "Content Marketing"] },
  { slug: "service-business-website-redesign", title: "Conversion-Focused Website Redesign for a Service Business", summary: "A website redesign shaped around clearer information architecture, stronger service journeys, responsive UI and a more practical path from visit to enquiry.", category: "Web Design & Development", industry: "Business Services", image: "/portfolio/web-insight2.webp", services: ["UI/UX Design", "Web Development", "Landing Page Optimization"] },
  { slug: "shopify-product-discovery", title: "Shopify Store Experience Built Around Product Discovery", summary: "A Shopify experience structured around navigation, collection organization, product presentation, responsive behaviour and a smoother ecommerce purchase journey.", category: "Web Design & Development", industry: "Retail & Ecommerce", image: "/portfolio/country-home.webp", services: ["Shopify Development", "UI/UX Design", "E-Commerce Development"] },
  { slug: "connected-business-web-application", title: "Custom Web Application for a Connected Business Workflow", summary: "A custom web experience translating business requirements into clear interfaces, structured workflows, responsive behaviour and scalable application architecture.", category: "Web Design & Development", industry: "Business Operations", image: "/portfolio/synergy-infra.webp", services: ["Custom Web Application", "UI/UX Design", "Web Development"] },
  { slug: "multi-channel-campaign-creative", title: "Campaign Creative System for Multi-Channel Advertising", summary: "A flexible creative system designed to adapt campaign messages across paid social, display formats, landing experiences and multiple content dimensions.", category: "Creative & Media", industry: "Consumer Campaign", image: "/portfolio/design-insight.webp", services: ["Ad Creative Design", "Graphic Design", "Visual Content Creation"] },
  { slug: "short-form-social-video-editing", title: "Social Video Editing System for Short-Form Content", summary: "A repeatable short-form editing workflow combining pacing, visual hierarchy, branded treatments and practical delivery across Reels, Shorts and campaign formats.", category: "Creative & Media", industry: "Digital Content", image: "/portfolio/inhouse-studio.webp", services: ["Reel Editing", "Short Video Editing", "Motion Graphics"] },
  { slug: "brand-identity-visual-toolkit", title: "Brand Identity and Visual Communication Toolkit", summary: "A visual identity system bringing brand direction, graphic language, campaign assets and reusable communication formats into one consistent creative framework.", category: "Creative & Media", industry: "Brand & Corporate", image: "/portfolio/logo-insight.webp", services: ["Branding Design", "Graphic Design", "Presentation Design"] },
];

export const allCaseStudies = [featuredCaseStudy, ...caseStudies];
export const slugifyCaseStudyTitle = (title: string) =>
  title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getCaseStudyHref = (study: Pick<CaseStudy, "title">) =>
  `/case-studies/${slugifyCaseStudyTitle(study.title)}`;
