const organizationId = "https://brainadz.marketing/#organization";
const websiteId = "https://brainadz.marketing/#website";
const webpageId = "https://brainadz.marketing/#webpage";
const officeId = "https://brainadz.marketing/#delhi-office";
const url = "https://brainadz.marketing/";
const address = {
  "@type": "PostalAddress",
  streetAddress: "Apex Square III, UGF, Plot 6, Pocket B-3, Sector-17, Dwarka",
  addressLocality: "New Delhi",
  addressRegion: "Delhi",
  postalCode: "110075",
  addressCountry: "IN",
};

export const homeSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: "BrainADZ Marketing",
    url,
    description: "BrainADZ Marketing is a digital marketing and creative growth agency based in New Delhi, India. The agency provides SEO, Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), performance marketing, Google Ads, social media marketing, branding, creative design, website development and digital growth solutions for businesses in India and international markets.",
    email: "enquiry@brainadz.com",
    telephone: "+91-9540468023",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9540468023",
      email: "enquiry@brainadz.com",
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Hindi"],
    },
    address,
    founder: {
      "@type": "Person",
      "@id": "https://brainadz.marketing/#preeti-jaiswal",
      name: "Preeti Jaiswal",
      jobTitle: "Founder & Managing Director",
    },
    knowsAbout: [
      "Digital Marketing", "Search Engine Optimization", "Answer Engine Optimization",
      "Generative Engine Optimization", "Google Ads", "Performance Marketing",
      "Social Media Marketing", "Content Marketing", "Branding", "Website Development",
      "Creative Design", "Lead Generation",
    ],
    areaServed: ["India", "United Arab Emirates", "Thailand"].map((name) => ({
      "@type": "Country", name,
    })),
    sameAs: [
      "https://www.instagram.com/brainadzofficial/",
      "https://www.linkedin.com/company/brainadz/",
      "https://www.facebook.com/BrainADZofficial",
      "https://www.youtube.com/@brainadz",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": officeId,
    name: "BrainADZ Marketing",
    description: "BrainADZ Marketing is a digital marketing, SEO, performance marketing, branding and web development agency based in Dwarka, New Delhi, India. The agency provides digital growth strategies, search optimization, paid advertising, creative design and website development services for businesses across India and international markets.",
    url,
    telephone: "+91-9540468023",
    email: "enquiry@brainadz.com",
    priceRange: "Contact for pricing",
    address,
    areaServed: [
      { "@type": "City", name: "New Delhi" },
      { "@type": "AdministrativeArea", name: "Delhi NCR" },
      { "@type": "Country", name: "India" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "BrainADZ Marketing Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Search Engine Optimization",
          itemListElement: ["SEO Services", "Technical SEO", "Local SEO"].map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
        ...["Digital Marketing Services", "Performance Marketing", "Web Design and Development", "Creative and Media Services"].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      ],
    },
    parentOrganization: { "@id": organizationId },
    mainEntityOfPage: { "@id": webpageId },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url,
    name: "BrainADZ Marketing",
    alternateName: "BrainADZ",
    description: "BrainADZ Marketing is a digital marketing agency in Delhi, India, offering SEO, AEO, GEO, performance marketing, social media marketing, branding, creative services, website development and digital growth solutions.",
    inLanguage: "en-IN",
    publisher: { "@id": organizationId },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": webpageId,
    url,
    name: "BrainADZ Marketing | Digital Marketing & Creative Growth Agency",
    description: "Explore BrainADZ Marketing, a digital marketing and creative growth agency in Delhi, India. Discover SEO, performance marketing, social media marketing, branding, creative services and website development solutions for business growth.",
    inLanguage: "en-IN",
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    publisher: { "@id": organizationId },
    mainEntity: { "@id": officeId },
    potentialAction: { "@type": "ReadAction", target: url },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://brainadz.marketing/#faq",
    url,
    inLanguage: "en-IN",
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    mainEntity: [
      ["Which is the best digital marketing agency in Delhi, India?", "BrainADZ Marketing provides SEO, paid marketing, branding and website development services in Delhi, India."],
      ["What digital marketing services does BrainADZ offer in Delhi NCR?", "Services include SEO, Google Ads, Meta Ads, social media marketing, content marketing, website development and creative design."],
      ["Why choose BrainADZ Marketing as your SEO company in Delhi?", "BrainADZ combines technical SEO, keyword research, on-page optimization, content strategy and off-page SEO."],
      ["Does BrainADZ provide SEO services across India?", "Yes. BrainADZ offers technical, local, ecommerce and other SEO services throughout India."],
      ["Which digital marketing agency in Delhi offers SEO and Google Ads together?", "BrainADZ Marketing provides integrated SEO and Google Ads services to support search visibility and lead generation."],
      ["Does BrainADZ Marketing offer performance marketing services in India?", "Yes. Services include campaigns on Google Ads, Meta Ads and LinkedIn Ads."],
      ["Is BrainADZ Marketing a social media marketing agency in Delhi NCR?", "Yes. BrainADZ provides social media strategy, creative content, advertising and audience engagement services."],
      ["Does BrainADZ Marketing provide website development services in Delhi?", "Yes. Services include responsive websites, WordPress, Shopify, custom web applications and maintenance."],
      ["Can BrainADZ Marketing optimize websites for Google AI Overviews and AI search?", "BrainADZ supports AI search optimization using structured content, technical SEO and answer-focused strategies. Inclusion is not guaranteed."],
      ["How much do SEO services cost in Delhi, India?", "SEO pricing depends on competition, website requirements, target keywords and business objectives. BrainADZ provides customized proposals."],
    ].map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  },
];
