"use client";

/* eslint-disable @next/next/no-img-element */
import { type ChangeEvent, type FormEvent, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { CheckCircle2, Loader2 } from "lucide-react";

type Faq = {
  question: string;
  answer: string;
};

const FAQS: Faq[] = [
  {
    question: "Which is the best digital marketing agency in Delhi, India?",
    answer:
      "BrainADZ Marketing is a digital marketing agency in Delhi, India, offering SEO, performance marketing, social media marketing, website development, and branding services. We help startups, growing businesses, and established brands improve their online visibility, attract relevant customers, and build sustainable digital growth through integrated marketing strategies.",
  },
  {
    question: "What digital marketing services does BrainADZ offer in Delhi NCR?",
    answer:
      "BrainADZ Marketing provides comprehensive digital marketing services in Delhi NCR, including SEO, Google Ads, Meta Ads, social media marketing, content marketing, website development, and creative design. Our services help businesses across Delhi, Noida, Gurugram, and other Indian markets strengthen their digital presence and generate qualified leads.",
  },
  {
    question: "Why choose BrainADZ as your SEO company in Delhi?",
    answer:
      "BrainADZ offers SEO services in Delhi focused on increasing organic search visibility, improving website performance, and attracting relevant traffic. Our approach combines technical SEO, on-page optimization, keyword research, content strategy, and off-page SEO to help businesses improve their presence in competitive search markets.",
  },
  {
    question: "Does BrainADZ provide SEO services across India?",
    answer:
      "Yes, BrainADZ Marketing provides SEO services across India for startups, small businesses, eCommerce companies, and enterprises. Our SEO solutions include technical SEO, local SEO, eCommerce SEO, content optimization, and link building to help businesses reach relevant audiences through organic search.",
  },
  {
    question: "Which digital marketing agency in Delhi offers SEO and Google Ads together?",
    answer:
      "BrainADZ Marketing offers integrated SEO and Google Ads services in Delhi. Our team combines organic search optimization with targeted PPC advertising to help businesses capture relevant search demand, improve online visibility, and generate potential customer enquiries through complementary marketing channels.",
  },
  {
    question: "Does BrainADZ offer performance marketing services in India?",
    answer:
      "Yes, BrainADZ provides performance marketing services in India through platforms such as Google Ads, Meta Ads, and LinkedIn Ads. Our campaigns focus on measurable business objectives, including lead generation, conversions, customer acquisition, and advertising performance optimization.",
  },
  {
    question: "Is BrainADZ a social media marketing agency in Delhi NCR?",
    answer:
      "Yes, BrainADZ Marketing offers social media marketing services for businesses in Delhi NCR and across India. We develop platform-specific strategies for Instagram, Facebook, LinkedIn, and YouTube, including content planning, creative development, paid social campaigns, and audience engagement.",
  },
  {
    question: "Does BrainADZ provide website development services in Delhi?",
    answer:
      "Yes, BrainADZ offers website development services in Delhi for corporate businesses, startups, and eCommerce brands. Our services include responsive website design, WordPress development, Shopify development, custom web applications, and website maintenance, with a focus on usability, performance, and SEO-friendly architecture.",
  },
  {
    question: "Can BrainADZ develop SEO-friendly websites for businesses in India?",
    answer:
      "Yes, BrainADZ develops SEO-friendly websites for businesses across India. We focus on responsive layouts, logical website structure, optimized page performance, clear navigation, and search-engine-accessible content to support both user experience and long-term organic search growth.",
  },
  {
    question: "Does BrainADZ offer local SEO services in Delhi and nearby areas?",
    answer:
      "Yes, BrainADZ provides local SEO services in Delhi, Dwarka, Noida, Gurugram, and other locations across India. Our local SEO strategies include Google Business Profile optimization, local keyword research, location-focused content, and website improvements to help businesses reach nearby customers.",
  },
  {
    question: "How much do SEO services cost in Delhi, India?",
    answer:
      "SEO service costs in Delhi depend on website size, business competition, target keywords, technical requirements, and campaign objectives. BrainADZ Marketing provides customized SEO strategies and proposals based on each business\u0027s growth goals, search visibility requirements, and optimization needs.",
  },
  {
    question: "What makes BrainADZ a digital marketing company for startups in India?",
    answer:
      "BrainADZ helps Indian startups establish their digital presence through website development, SEO, social media marketing, branding, and targeted advertising. Our approach combines strategic planning with creative execution to support brand awareness, customer acquisition, and business growth.",
  },
  {
    question: "Does BrainADZ provide Google Ads management services in Delhi?",
    answer:
      "Yes, BrainADZ offers Google Ads management services in Delhi and across India. Our services include keyword research, campaign setup, Search Ads, Display Ads, remarketing, landing page optimization, and conversion tracking to help businesses reach relevant audiences and manage paid advertising performance.",
  },
  {
    question: "Can BrainADZ help businesses generate leads in Delhi NCR?",
    answer:
      "Yes, BrainADZ provides digital lead generation services for businesses in Delhi NCR through SEO, Google Ads, Meta Ads, landing page optimization, and targeted marketing campaigns. Our strategies focus on reaching relevant audiences, improving conversion opportunities, and supporting measurable business growth.",
  },
  {
    question: "Does BrainADZ offer branding and graphic design services in India?",
    answer:
      "Yes, BrainADZ offers branding and graphic design services across India, including brand identity design, logo design, social media creatives, brochures, presentations, advertising creatives, and marketing materials. Our creative team helps businesses establish consistent brand communication across digital and offline channels.",
  },
  {
    question: "What are AEO and GEO services, and how can they help Indian businesses?",
    answer:
      "Answer Engine Optimization (AEO) helps structure website content to answer user questions clearly, while Generative Engine Optimization (GEO) focuses on improving content discoverability and relevance for AI-powered search experiences. These practices help Indian businesses adapt their content strategies to evolving search behaviour.",
  },
  {
    question: "Can BrainADZ optimize websites for Google AI Overviews and AI search?",
    answer:
      "BrainADZ can support AI search optimization through structured content, technical SEO, entity-focused writing, relevant FAQs, and answer-focused content strategies. These improvements help search systems discover and interpret website information, although inclusion in Google AI Overviews or AI-generated answers is not guaranteed.",
  },
  {
    question: "Does BrainADZ provide eCommerce SEO and Shopify development in India?",
    answer:
      "Yes, BrainADZ provides eCommerce SEO and Shopify development services for businesses in India. Our services include online store development, product page optimization, category page SEO, technical improvements, and eCommerce marketing strategies to improve product discoverability and the shopping experience.",
  },
  {
    question: "How long does SEO take to show results for businesses in Delhi?",
    answer:
      "SEO results for businesses in Delhi depend on industry competition, keyword difficulty, website condition, and optimization efforts. Some improvements may become visible within a few months, while competitive search terms often require sustained work. BrainADZ focuses on continuous optimization and monitoring organic search performance.",
  },
  {
    question: "How can I hire BrainADZ for digital marketing services in Delhi or India?",
    answer:
      "You can contact BrainADZ Marketing through our official website to discuss your SEO, Google Ads, social media marketing, website development, or branding requirements. Our team reviews your business objectives and recommends a suitable digital marketing strategy based on your target market and growth goals.",
  },
];

const SERVICE_OPTIONS = {
  "Digital Marketing": [
    "Social Media Marketing Services (SMM)",
    "Social Media Optimization Services (SMO)",
    "Content Marketing Services",
    "Online Reputation Management (ORM)",
    "Influencer Marketing",
    "WhatsApp Marketing",
    "Email Marketing",
  ],
  "Performance Marketing": [
    "Google Ads",
    "Meta Ads",
    "LinkedIn Ads",
    "Search Engine Marketing (SEM)",
    "YouTube Ads",
    "Google Shopping Ads",
    "Ecommerce PPC",
    "Lead Generation Services",
    "Remarketing Ads",
    "Display Advertising",
    "Landing Page Optimization",
    "PPC Audit Services",
  ],
  "SEO Services": [
    "SEO Audit Services",
    "On-Page SEO",
    "Technical SEO",
    "Off-Page SEO",
    "Link-Building Services",
    "Local SEO Services",
    "Ecommerce SEO Services",
    "Enterprise SEO Services",
    "International SEO Services",
  ],
  "Web Design & Development": [
    "UI/UX Design",
    "Web Development Services",
    "WordPress Development",
    "Shopify Development",
    "E-Commerce Development",
    "Custom Web Application Development",
    "Mobile App Development",
    "Website Maintenance Services",
  ],
  "Creative & Media Services": [
    "Creative Design Services",
    "Graphic Design Services",
    "Branding Design Services",
    "Social Media Creative Design",
    "Ad Creative Design",
    "Visual Content Creation",
    "Motion Graphics Services",
    "Short Video Editing",
    "Reel Editing Services",
    "Video Editing Services",
    "Corporate Video Editing",
    "YouTube Thumbnail Design",
    "Presentation Design Services",
    "Infographic Design Services",
  ],
} as const;

type MainService = keyof typeof SERVICE_OPTIONS;
type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className=" bg-white  py-16 text-black  lg:py-20">
      <div className="mx-auto max-w-[1800px] px-5 md:px-8 lg:px-12">
        <div className="mb-12 grid gap-8 border-b border-black/10 pb-10 lg:grid-cols-[0.72fr_1fr] lg:items-center lg:gap-12 lg:pb-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-8 bg-[#E1122B]" />
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-black/45">
                FAQ
              </p>
            </div>

            <h2 className="mt-3 max-w-[820px] text-[32px] font-semibold leading-[1.06] tracking-[-0.04em] text-black sm:text-[48px] lg:text-[52px]">
              Frequently Asked
              <span className="block text-[#E1122B]">Questions.</span>
            </h2>
          </div>

          <div className="relative min-h-[190px] overflow-hidden sm:min-h-[230px] lg:min-h-[350px] hidden md:block">
            <img
              src="/asdFCAF.png"
              alt="Marketing questions illustration"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain object-bottom-right"
            />
          </div>
        </div>

        <div className="grid gap-8 lg:h-[660px] lg:min-h-0 lg:grid-cols-[0.86fr_1.14fr]">
          <ContactMiniForm />

          <div className="max-h-[560px] min-h-0 overflow-hidden rounded-[14px] border border-black/10 bg-white text-black shadow-[0_16px_45px_rgba(0,0,0,0.06)] lg:h-full lg:max-h-none">
            <div className="faq-panel-scroll max-h-[560px] overflow-y-auto lg:h-full lg:max-h-none">
              {FAQS.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={`${faq.question}-${index}`}
                    className={`border-b border-black/10 transition-colors last:border-b-0 ${
                      isOpen ? "bg-[#fff7f7]" : "bg-white hover:bg-[#fbfbfb]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex w-full items-start justify-between gap-6 px-6 py-6 text-left sm:px-9"
                      aria-expanded={isOpen}
                    >
                      <span className="flex gap-7 text-[20px] font-semibold leading-snug tracking-[-0.02em] sm:text-[23px]">
                        <span className="shrink-0 font-mono text-[15px] font-medium text-[#E1122B]">
                          [{index + 1}]
                        </span>
                        <span>{faq.question}</span>
                      </span>

                      <FiChevronDown
                        className={`mt-1 h-6 w-6 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-[#E1122B]" : "text-black/55"
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[760px] px-6 pb-7 pl-[86px] text-[15px] leading-7 text-black/65 sm:px-9 sm:pl-[104px]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .faq-panel-scroll {
              scrollbar-gutter: stable;
              scrollbar-width: thin;
              scrollbar-color: rgba(225, 18, 43, 0.55) transparent;
            }

            .faq-panel-scroll::-webkit-scrollbar {
              width: 8px;
            }

            .faq-panel-scroll::-webkit-scrollbar-track {
              background: transparent;
              margin: 14px 0;
            }

            .faq-panel-scroll::-webkit-scrollbar-thumb {
              background: rgba(225, 18, 43, 0.55);
              border: 2px solid #ffffff;
              border-radius: 999px;
            }

            .faq-panel-scroll:hover::-webkit-scrollbar-thumb {
              background: rgba(225, 18, 43, 0.8);
            }
          `,
        }}
      />
    </section>
  );
}

function ContactMiniForm() {
  const [mainService, setMainService] = useState<MainService | "">("");
  const [service, setService] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleMainServiceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setMainService(event.target.value as MainService);
    setService("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") ?? "").trim(),
          email: String(formData.get("email") ?? "").trim(),
          phone: String(formData.get("phone") ?? "").trim(),
          company: String(formData.get("company") ?? "").trim(),
          serviceCategory: mainService,
          service,
          message: String(formData.get("message") ?? "").trim(),
          source: "Home Page FAQ Form",
          pageUrl: window.location.href,
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(
          result?.message || "Unable to submit your enquiry right now.",
        );
      }

      form.reset();
      setMainService("");
      setService("");
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[14px] border border-black/10 bg-[#fbfbfb] p-6 text-black shadow-[0_16px_45px_rgba(0,0,0,0.06)] sm:p-7 lg:flex lg:h-full lg:flex-col">
      <span className="absolute inset-x-0 top-0 h-[3px] bg-[#E1122B]" />

      <h3 className="text-[24px] font-semibold leading-tight tracking-[-0.02em]">
        Didn&apos;t Find What You Were Looking For?
      </h3>

      <p className="mt-3 max-w-[620px] text-[14px] font-medium leading-6 text-black/62">
        We&apos;ve got more answers waiting for you. Share a few details and our
        team will reach out with the right next step.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-7 flex flex-col gap-6 lg:flex-1 lg:gap-5"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-x-6 lg:gap-y-5">
          <MinimalField
            label="Full Name *"
            name="name"
            placeholder="Enter your name"
            required
          />
          <MinimalField
            label="Work Email *"
            name="email"
            type="email"
            placeholder="name@company.com"
            required
          />
          <MinimalField
            label="Phone Number *"
            name="phone"
            type="tel"
            placeholder="10-digit number"
            required
            pattern="[0-9]{10}"
            maxLength={10}
          />
          <MinimalField
            label="Company / Brand"
            name="company"
            placeholder="Your company name"
          />
        </div>

        <MinimalSelect
          label="Main Service *"
          name="serviceCategory"
          placeholder="Select main service"
          value={mainService}
          onChange={handleMainServiceChange}
          options={Object.keys(SERVICE_OPTIONS)}
          required
        />
        <MinimalSelect
          label="Service Required *"
          name="service"
          placeholder={
            mainService ? "Select a service" : "Select main service first"
          }
          value={service}
          onChange={(event) => setService(event.target.value)}
          options={mainService ? [...SERVICE_OPTIONS[mainService]] : []}
          disabled={!mainService}
          required
        />
        <MinimalTextarea
          name="message"
          placeholder="Briefly tell us your goal, challenge or project requirement"
        />

        {status === "error" && (
          <p role="alert" className="text-[13px] text-red-700">
            {errorMessage}
          </p>
        )}
        {status === "success" && (
          <p
            role="status"
            className="flex items-center gap-2 text-[13px] text-[#E1122B]"
          >
            <CheckCircle2 className="h-4 w-4" /> Enquiry submitted successfully.
            We&apos;ll contact you shortly.
          </p>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#193175] px-12 text-[14px] font-semibold text-white transition hover:bg-[#E1122B] disabled:cursor-not-allowed disabled:opacity-65"
          >
            {status === "submitting" && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {status === "submitting" ? "Submitting" : "Submit Enquiry"}
          </button>
        </div>
      </form>
    </div>
  );
}

function MinimalField({
  label,
  name,
  placeholder,
  type = "text",
  ...props
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-black/55">
        {label}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        {...props}
        className="mt-2 h-8 w-full border-b border-black/20 bg-transparent text-[15px] text-black outline-none placeholder:text-black/35 focus:border-[#E1122B]"
      />
    </label>
  );
}

function MinimalSelect({
  label,
  name,
  placeholder,
  options,
  value,
  onChange,
  disabled = false,
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-black/55">
        {label}
      </span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className="mt-2 h-9 w-full border-b border-black/20 bg-transparent text-[15px] text-black outline-none focus:border-[#E1122B] disabled:cursor-not-allowed disabled:text-black/40"
      >
        <option value="" disabled className="text-black/45">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-black">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function MinimalTextarea({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      rows={3}
      className="min-h-[68px] w-full resize-none border-b border-black/20 bg-transparent text-[15px] text-black outline-none placeholder:text-black/35 focus:border-[#E1122B]"
    />
  );
}
