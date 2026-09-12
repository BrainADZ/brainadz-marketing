"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe2,
  Handshake,
  Quote,
} from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  category: string;
  quote: string;
};

const INITIAL_VISIBLE_TESTIMONIALS = 15;
const TESTIMONIALS_PER_LOAD = 6;

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Client Name",
    role: "Designation",
    company: "Company Name",
    category: "Digital Marketing",
    quote:
      "Replace this text with the client’s approved testimonial. Keep the quote concise, outcome-focused and written exactly as approved by the client.",
  },
  {
    name: "Client Name",
    role: "Designation",
    company: "Company Name",
    category: "Performance Marketing",
    quote:
      "Replace this text with a genuine client review about campaign performance, lead quality, communication or measurable business improvement.",
  },
  {
    name: "Client Name",
    role: "Designation",
    company: "Company Name",
    category: "Web Design",
    quote:
      "Replace this text with the client’s approved feedback about website strategy, design quality, development, delivery or conversion improvement.",
  },
  {
    name: "Client Name",
    role: "Designation",
    company: "Company Name",
    category: "SEO",
    quote:
      "Replace this placeholder with a verified client quote about SEO execution, organic growth, reporting, content direction or search visibility.",
  },
  {
    name: "Client Name",
    role: "Designation",
    company: "Company Name",
    category: "Creative & Media",
    quote:
      "Use the client’s real words here to highlight creative quality, brand consistency, campaign assets, video production or design support.",
  },
  {
    name: "Client Name",
    role: "Designation",
    company: "Company Name",
    category: "Integrated Marketing",
    quote:
      "Add a genuine testimonial covering the overall working experience, responsiveness, strategic clarity and cross-functional execution.",
  },
  {
    name: "Client Name",
    role: "Designation",
    company: "Company Name",
    category: "Digital Marketing",
    quote:
      "Replace this placeholder with an approved client testimonial. Strong reviews work best when they mention the challenge, experience and result.",
  },
  {
    name: "Client Name",
    role: "Designation",
    company: "Company Name",
    category: "Web Development",
    quote:
      "Add the client’s genuine review here about the project process, communication, technical execution, launch support or website experience.",
  },
  {
    name: "Client Name",
    role: "Designation",
    company: "Company Name",
    category: "Growth Consulting",
    quote:
      "Replace this with a verified client statement about strategy, clarity, planning, execution support or the value delivered by the BrainADZ team.",
  },

  {
    name: "Client 10",
    role: "Designation",
    company: "Company Name",
    category: "SEO",
    quote:
      "Replace this placeholder with the client’s approved testimonial.",
  },
  {
    name: "Client 11",
    role: "Designation",
    company: "Company Name",
    category: "Digital Marketing",
    quote:
      "Replace this placeholder with the client’s approved testimonial.",
  },
  {
    name: "Client 12",
    role: "Designation",
    company: "Company Name",
    category: "Creative & Media",
    quote:
      "Replace this placeholder with the client’s approved testimonial.",
  },
  {
    name: "Client 13",
    role: "Designation",
    company: "Company Name",
    category: "Performance Marketing",
    quote:
      "Replace this placeholder with the client’s approved testimonial.",
  },
  {
    name: "Client 14",
    role: "Designation",
    company: "Company Name",
    category: "Web Design",
    quote:
      "Replace this placeholder with the client’s approved testimonial.",
  },
  {
    name: "Client 15",
    role: "Designation",
    company: "Company Name",
    category: "Growth Consulting",
    quote:
      "Replace this placeholder with the client’s approved testimonial.",
  },
  {
    name: "Client 16",
    role: "Designation",
    company: "Company Name",
    category: "SEO",
    quote:
      "Replace this placeholder with the client’s approved testimonial.",
  },
  {
    name: "Client 17",
    role: "Designation",
    company: "Company Name",
    category: "Digital Marketing",
    quote:
      "Replace this placeholder with the client’s approved testimonial.",
  },
  {
    name: "Client 18",
    role: "Designation",
    company: "Company Name",
    category: "Creative & Media",
    quote:
      "Replace this placeholder with the client’s approved testimonial.",
  },
  {
    name: "Client 19",
    role: "Designation",
    company: "Company Name",
    category: "Performance Marketing",
    quote:
      "Replace this placeholder with the client’s approved testimonial.",
  },
  {
    name: "Client 20",
    role: "Designation",
    company: "Company Name",
    category: "Web Development",
    quote:
      "Replace this placeholder with the client’s approved testimonial.",
  },
  {
    name: "Client 21",
    role: "Designation",
    company: "Company Name",
    category: "Integrated Marketing",
    quote:
      "Replace this placeholder with the client’s approved testimonial.",
  },
  {
    name: "Client 22",
    role: "Designation",
    company: "Company Name",
    category: "SEO",
    quote:
      "Replace this placeholder with the client’s approved testimonial.",
  },
  {
    name: "Client 23",
    role: "Designation",
    company: "Company Name",
    category: "Digital Marketing",
    quote:
      "Replace this placeholder with the client’s approved testimonial.",
  },
  {
    name: "Client 24",
    role: "Designation",
    company: "Company Name",
    category: "Web Design",
    quote:
      "Replace this placeholder with the client’s approved testimonial.",
  },
  {
    name: "Client 25",
    role: "Designation",
    company: "Company Name",
    category: "Creative & Media",
    quote:
      "Replace this placeholder with the client’s approved testimonial.",
  },
  {
    name: "Client 26",
    role: "Designation",
    company: "Company Name",
    category: "Performance Marketing",
    quote:
      "Replace this placeholder with the client’s approved testimonial.",
  },
  {
    name: "Client 27",
    role: "Designation",
    company: "Company Name",
    category: "Growth Consulting",
    quote:
      "Replace this placeholder with the client’s approved testimonial.",
  },
];

const PROOF_POINTS = [
  {
    value: "550+",
    label: "Clients served across industries",
  },
  {
    value: "600+",
    label: "Projects delivered across growth, creative and technology",
  },
  {
    value: "10+",
    label: "Years of marketing and digital execution experience",
  },
];

const EXPERIENCE_POINTS = [
  {
    icon: Handshake,
    title: "Partnership mindset",
    description:
      "Clear communication, shared priorities and an execution process designed around long-term client relationships.",
  },
  {
    icon: Building2,
    title: "Business-first thinking",
    description:
      "Every recommendation connects creative, marketing and technology work back to a practical business objective.",
  },
  {
    icon: Globe2,
    title: "Integrated execution",
    description:
      "Strategy, SEO, performance, websites, content, design and media work together instead of operating in silos.",
  },
];

export default function ClientTestimonialsPage() {
  return (
    <main className="dm-sans w-full overflow-x-hidden bg-white text-[#111111]">
      <TestimonialsHero />
      <ProofStrip />
      <TestimonialsGrid />
      <ClientExperienceSection />
    </main>
  );
}

function TestimonialsHero() {
  return (
    <section className="relative min-h-[420px] overflow-hidden bg-black sm:min-h-[500px] lg:min-h-[560px]">
      <img
        src="/gallery/8.jpeg"
        alt="BrainADZ team working with clients"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.84)_34%,rgba(0,0,0,0.48)_65%,rgba(0,0,0,0.12)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.06)_48%,rgba(0,0,0,0.42)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[420px] max-w-[1800px] flex-col px-5 py-8 sm:min-h-[500px] sm:px-8 lg:min-h-[560px] lg:px-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[14px] font-medium leading-none"
        >
          <Link href="/" className="text-[#E1122B] transition hover:text-white">
            Home
          </Link>
          <span className="text-white/65">/</span>
          <span className="text-white">Client Testimonials</span>
        </nav>

        <h1 className="mt-7 max-w-[900px] text-[38px] font-semibold leading-[1.06] tracking-[-0.04em] text-white sm:text-[48px] lg:text-[58px]">
          Trusted partnerships. Real experiences. Work that moves forward.
        </h1>

        <div className="mt-auto max-w-[800px] pb-6 sm:pb-10 lg:pb-12">
          <p className="text-[18px] font-normal leading-[1.5] tracking-[-0.02em] text-white/86 sm:text-[22px] lg:text-[25px]">
            Hear from businesses that have worked with BrainADZ across marketing,
            websites, performance, SEO, creative and integrated growth execution.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#testimonials"
              className="inline-flex min-h-14 items-center justify-center gap-5 rounded-full bg-[#E1122B] px-7 text-[13px] font-semibold text-white transition hover:bg-black"
            >
              Read client stories
              <ArrowRight className="h-5 w-5" strokeWidth={1.8} />
            </a>

            <Link
              href="/contact"
              data-enquiry-trigger
              data-enquiry-source="Testimonials Page CTA"
              className="inline-flex min-h-14 items-center justify-center gap-5 rounded-full border border-white/45 bg-black/25 px-7 text-[13px] font-semibold text-white transition hover:border-[#E1122B] hover:bg-[#E1122B]"
            >
              Work with BrainADZ
              <ArrowRight className="h-5 w-5" strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <section className="border-y border-black/10 bg-[#fbfbfb] text-black">
      <div className="mx-auto grid max-w-[1800px] px-5 sm:grid-cols-3 sm:px-8 lg:px-10">
        {PROOF_POINTS.map((item) => (
          <div
            key={item.value}
            className="border-b border-black/10 py-7 sm:border-b-0 sm:border-r sm:px-8 first:sm:pl-0 last:sm:border-r-0"
          >
            <p className="text-[38px] font-medium leading-none tracking-[-0.05em] text-[#E1122B] sm:text-[48px]">
              {item.value}
            </p>
            <p className="mt-3 max-w-[380px] text-[15px] leading-6 text-black/60">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsGrid() {
  const [visibleCount, setVisibleCount] = useState(
    INITIAL_VISIBLE_TESTIMONIALS,
  );

  const visibleTestimonials = TESTIMONIALS.slice(0, visibleCount);
  const hasMoreTestimonials = visibleCount < TESTIMONIALS.length;

  const handleViewMore = () => {
    setVisibleCount((currentCount) =>
      Math.min(
        currentCount + TESTIMONIALS_PER_LOAD,
        TESTIMONIALS.length,
      ),
    );
  };

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 bg-white py-16 text-black sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-8 bg-[#E1122B]" />
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#E1122B]">
                Client testimonials
              </p>
            </div>

            <h2 className="mt-5 max-w-[760px] text-[38px] font-semibold leading-[1.08] tracking-[-0.04em] text-black sm:text-[48px] lg:text-[58px]">
              What our clients say about working with BrainADZ.
            </h2>
          </div>

          <p className="max-w-[690px] text-[16px] leading-8 text-black/60 lg:ml-auto">
            Strong partnerships are built through clarity, consistency and
            accountability. This page is designed to showcase genuine,
            client-approved feedback across the services BrainADZ delivers.
          </p>
        </div>

        {/* Testimonials: desktop exactly 3 columns */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.company}-${testimonial.name}-${index}`}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/*
          VIEW MORE POSITION:
          - Mobile: centered
          - Tablet: centered
          - Desktop XL: exact middle column of a 3-column row
        */}
        {hasMoreTestimonials && (
          <div className="mt-10 grid grid-cols-1 xl:grid-cols-3">
            <div className="flex justify-center xl:col-start-2">
              <button
                type="button"
                onClick={handleViewMore}
                className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-black/15 bg-white px-7 text-[13px] font-semibold text-black transition duration-300 hover:border-[#E1122B] hover:bg-[#E1122B] hover:text-white"
              >
                View More
                <ArrowDown
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  strokeWidth={1.9}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <article
      data-aos="fade-up"
      data-aos-delay={(index % 3) * 70}
      className="group flex min-h-[365px] flex-col rounded-[14px] border border-black/10 bg-[#fbfbfb] p-6 shadow-[0_16px_42px_rgba(0,0,0,0.045)] transition duration-300 hover:-translate-y-1 hover:border-[#E1122B]/35 hover:bg-white hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)] sm:p-7"
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E1122B]/20 bg-[#fff1f1] text-[#E1122B]">
          <Quote className="h-5 w-5" strokeWidth={1.8} />
        </div>

        <span className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[11px] font-semibold text-black/52">
          {testimonial.category}
        </span>
      </div>

      <blockquote className="mt-8 flex-1 text-[16px] leading-8 text-black/68">
        “{testimonial.quote}”
      </blockquote>

      <div className="mt-8 border-t border-black/10 pt-5">
        <div className="flex items-center gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-black text-[14px] font-semibold text-white">
            {testimonial.name
              .split(" ")
              .map((part) => part.charAt(0))
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold text-black">
              {testimonial.name}
            </p>
            <p className="mt-1 truncate text-[12px] text-black/48">
              {testimonial.role} · {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function ClientExperienceSection() {
  return (
    <section className="border-y border-black/10 bg-[#fbfbfb] py-16 text-black sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-10">
        <div className="max-w-[850px]">
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-8 bg-[#E1122B]" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#E1122B]">
              The BrainADZ experience
            </p>
          </div>

          <h2 className="mt-5 text-[38px] font-semibold leading-[1.08] tracking-[-0.04em] text-black sm:text-[48px] lg:text-[58px]">
            Built around clear thinking, reliable execution and measurable work.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {EXPERIENCE_POINTS.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="min-h-[260px] rounded-[14px] border border-black/10 bg-white p-6 shadow-[0_14px_38px_rgba(0,0,0,0.04)] sm:p-7"
              >
                <div className="flex h-13 w-13 items-center justify-center rounded-[10px] border border-[#E1122B]/20 bg-[#fff1f1] text-[#E1122B]">
                  <Icon className="h-6 w-6" strokeWidth={1.7} />
                </div>

                <h3 className="mt-8 text-[24px] font-semibold tracking-[-0.03em] text-black">
                  {item.title}
                </h3>

                <p className="mt-4 text-[15px] leading-7 text-black/58">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Clear scope and communication",
            "Strategy connected to execution",
            "Cross-functional specialist teams",
            "Performance-focused reporting",
          ].map((item) => (
            <div
              key={item}
              className="flex min-h-[72px] items-center gap-3 rounded-[10px] border border-black/10 bg-white px-4 py-4"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#E1122B]" />
              <span className="text-[14px] font-medium leading-6 text-black/64">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}