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
    question: "How can BrainADZ help my business grow online?",
    answer:
      "BrainADZ combines strategy, design, content, paid media, SEO, and development so your digital presence can attract, convert, and retain better customers.",
  },
  {
    question: "Do you handle both website development and marketing?",
    answer:
      "Yes. We build websites, landing pages, campaigns, social media systems, paid ads, SEO plans, and analytics dashboards under one execution team.",
  },
  {
    question: "What types of businesses do you work with?",
    answer:
      "We work with service brands, manufacturers, e-commerce companies, events, exhibitions, startups, and established businesses that need measurable growth.",
  },
  {
    question: "How long does it take to launch a project?",
    answer:
      "Timelines depend on scope. Smaller landing pages and campaigns can move quickly, while custom websites, apps, and full digital systems are planned in milestones.",
  },
  {
    question: "Can BrainADZ manage paid ads and performance reporting?",
    answer:
      "Yes. We set up campaigns, tracking, creative testing, landing page improvements, and reporting so the campaign is optimized around real business outcomes.",
  },
  {
    question: "Do you provide creative design and brand support?",
    answer:
      "Yes. Our team supports logo design, campaign creatives, social media content, brand assets, presentations, brochures, and exhibition communication.",
  },
  {
    question: "Do you provide creative design and brand support?",
    answer:
      "Yes. Our team supports logo design, campaign creatives, social media content, brand assets, presentations, brochures, and exhibition communication.",
  },
  {
    question: "Do you provide creative design and brand support?",
    answer:
      "Yes. Our team supports logo design, campaign creatives, social media content, brand assets, presentations, brochures, and exhibition communication.",
  },
  {
    question: "Do you provide creative design and brand support?",
    answer:
      "Yes. Our team supports logo design, campaign creatives, social media content, brand assets, presentations, brochures, and exhibition communication.",
  },
  {
    question: "Do you provide creative design and brand support?",
    answer:
      "Yes. Our team supports logo design, campaign creatives, social media content, brand assets, presentations, brochures, and exhibition communication.",
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
