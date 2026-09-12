import type { BlogPost } from "@/lib/cms";

type ContentSection = { heading: string; paragraphs: string[] };

const textNode = (text: string) => ({ detail: 0, format: 0, mode: "normal", style: "", text, type: "text", version: 1 });
const paragraphNode = (text: string) => ({ children: [textNode(text)], direction: "ltr", format: "", indent: 0, type: "paragraph", version: 1 });
const headingNode = (text: string) => ({ children: [textNode(text)], direction: "ltr", format: "", indent: 0, tag: "h2", type: "heading", version: 1 });

function createContent(sections: ContentSection[], faqs: Array<{ question: string; answer: string }>) {
  return {
    root: {
      children: [
        ...sections.flatMap((section) => [
          headingNode(section.heading),
          ...section.paragraphs.map(paragraphNode),
        ]),
        {
          fields: {
            blockName: "",
            blockType: "faq",
            heading: "Frequently Asked Questions",
            items: faqs,
          },
          format: "",
          type: "block",
          version: 2,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  };
}

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: "social-media",
    authorName: "BrainADZ Team",
    slug: "social-media-strategy-that-drives-growth",
    category: "Social Media",
    title: "How to Build a Social Media Strategy That Drives Real Growth",
    excerpt: "A practical framework for choosing the right platforms, planning useful content and connecting engagement with business outcomes.",
    heroImage: { url: "/portfolio/instagram/1.png", alt: "Social media content and Instagram profile managed by BrainADZ" },
    publishedAt: "2026-09-01T00:00:00.000Z",
    readTime: 6,
    content: createContent(
      [
        { heading: "Start with the business outcome", paragraphs: ["A useful social media strategy begins with a commercial objective—not a posting calendar. Decide whether the priority is awareness, qualified enquiries, retention or community growth, then choose metrics that show meaningful progress.", "Clear objectives make it easier to decide what to publish, where to invest and which activities should stop."] },
        { heading: "Choose channels with intent", paragraphs: ["Your audience does not use every platform in the same way. Select channels based on buyer behaviour, content fit and your team’s ability to maintain quality consistently."] },
        { heading: "Build repeatable content pillars", paragraphs: ["Create a small set of themes connecting customer problems, brand expertise, proof and offers. A repeatable system produces stronger consistency than chasing every trend."] },
        { heading: "Measure signals that matter", paragraphs: ["Review reach and engagement alongside profile visits, website sessions, qualified conversations and conversions. Use those signals to improve the next content cycle."] },
      ],
      [
        { question: "How often should a business post on social media?", answer: "Choose a frequency your team can maintain without lowering quality. For many brands, three to five useful posts per week is a practical starting point." },
        { question: "Which social platform should we prioritise?", answer: "Prioritise the platform where your customers actively research, compare or discuss solutions and where your content format naturally fits." },
      ],
    ),
  },
  {
    id: "performance-marketing",
    authorName: "BrainADZ Team",
    slug: "seo-vs-paid-ads-growth-channel",
    category: "Performance Marketing",
    title: "SEO or Paid Ads: Choosing the Right Growth Channel",
    excerpt: "Understand when organic visibility, paid acquisition or a balanced combination can create the strongest path to qualified leads.",
    heroImage: { url: "/perfomance.png", alt: "Performance marketing strategy and growth visual" },
    publishedAt: "2026-09-02T00:00:00.000Z",
    readTime: 7,
    content: createContent(
      [
        { heading: "Understand the difference", paragraphs: ["Paid campaigns can create immediate visibility and faster testing. SEO compounds over time by building discoverability across valuable searches. The right choice depends on urgency, economics and search demand."] },
        { heading: "When paid ads make sense", paragraphs: ["Paid acquisition is useful when the offer is validated, conversion tracking is reliable and the business needs controlled traffic quickly. It also helps test messages before larger organic investment."] },
        { heading: "When SEO should lead", paragraphs: ["SEO is especially valuable when customers repeatedly search for your services, paid clicks are expensive and expert content can build long-term authority."] },
        { heading: "Use both as one system", paragraphs: ["Search query and conversion data from paid campaigns can guide SEO priorities. Strong organic pages can improve landing experiences and reduce dependence on paid traffic over time."] },
      ],
      [
        { question: "Is SEO cheaper than paid advertising?", answer: "SEO avoids a fee for each click, but it still requires strategy, content and technical work. Compare total investment and long-term return instead of treating organic traffic as free." },
        { question: "How quickly can paid ads generate leads?", answer: "Campaigns can generate traffic immediately, but dependable lead quality usually requires tracking validation, creative testing and ongoing optimisation." },
      ],
    ),
  },
  {
    id: "web-design",
    authorName: "BrainADZ Team",
    slug: "website-decisions-that-improve-conversions",
    category: "Web Design",
    title: "Seven Website Decisions That Improve Conversion Rates",
    excerpt: "From page hierarchy to calls to action, these focused decisions can make your website clearer, faster and easier to act on.",
    heroImage: { url: "/portfolio/web/1.png", alt: "Conversion-focused website project by BrainADZ" },
    publishedAt: "2026-09-03T00:00:00.000Z",
    readTime: 5,
    content: createContent(
      [
        { heading: "Make the first screen specific", paragraphs: ["Visitors should quickly understand what you provide, who it is for and what action to take. A specific promise is more useful than a clever but unclear headline."] },
        { heading: "Create a clear information path", paragraphs: ["Organise pages around customer questions and decisions. Strong hierarchy helps visitors scan, understand and move forward without unnecessary effort."] },
        { heading: "Reduce friction around action", paragraphs: ["Keep forms focused, explain what happens after submission and place relevant calls to action where intent naturally increases."] },
        { heading: "Treat speed and mobile UX as conversion factors", paragraphs: ["Optimised images, stable layouts, readable typography and responsive controls directly affect whether users remain engaged long enough to convert."] },
      ],
      [
        { question: "What is a good website conversion rate?", answer: "There is no universal number. Compare performance by traffic source, offer and intent, then improve against your own qualified conversion baseline." },
        { question: "Does website speed affect conversions?", answer: "Yes. Slow or unstable pages create friction, especially on mobile connections, and can reduce both engagement and completed enquiries." },
      ],
    ),
  },
];

export const getFallbackBlogPost = (slug: string) =>
  fallbackBlogPosts.find((post) => post.slug === slug) || null;
