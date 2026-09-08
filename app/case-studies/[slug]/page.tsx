import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import {
  allCaseStudies,
  getCaseStudyHref,
  slugifyCaseStudyTitle,
} from "../data";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allCaseStudies.map((study) => ({
    slug: slugifyCaseStudyTitle(study.title),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = allCaseStudies.find(
    (item) => slugifyCaseStudyTitle(item.title) === slug,
  );
  if (!study) return {};
  return { title: `${study.title} | BrainADZ`, description: study.summary };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const studyIndex = allCaseStudies.findIndex(
    (item) => slugifyCaseStudyTitle(item.title) === slug,
  );
  if (studyIndex === -1) notFound();

  const study = allCaseStudies[studyIndex];
  const nextStudy = allCaseStudies[(studyIndex + 1) % allCaseStudies.length];

  const approach = [
    `Reviewed the existing ${study.category.toLowerCase()} journey, audience intent and the points creating friction.`,
    `Built a focused roadmap connecting ${study.services.join(", ")} around one measurable business objective.`,
    "Created a practical execution and measurement rhythm so the system could improve with real performance signals.",
  ];

  return (
    <main className="dm-sans bg-white text-[#161616]">
      <section className="bg-[#111] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1400px]">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/case-studies" className="hover:text-white">Case Studies</Link><span>/</span>
            <span className="text-white">{study.category}</span>
          </nav>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[.15em] text-[#ff8178]">
                <span>{study.category}</span><span className="text-white/30">•</span><span>{study.industry}</span>
              </div>
              <h1 className="mt-6 max-w-4xl text-[40px] font-semibold leading-[1.06] tracking-[-.04em] sm:text-[54px] lg:text-[68px]">{study.title}</h1>
            </div>
            <p className="text-base leading-8 text-white/65 sm:text-lg">{study.summary}</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-[1400px] overflow-hidden rounded-2xl bg-[#f3f3f3]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={study.image} alt={study.title} className="h-[340px] w-full object-cover sm:h-[520px] lg:h-[680px]" />
        </div>
      </section>

      <section className="border-y border-black/10 px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <aside>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#E1122B]">Project overview</p>
            <dl className="mt-7 divide-y divide-black/10 border-y border-black/10">
              <div className="py-5"><dt className="text-xs uppercase tracking-wider text-black/45">Industry</dt><dd className="mt-2 font-semibold">{study.industry}</dd></div>
              <div className="py-5"><dt className="text-xs uppercase tracking-wider text-black/45">Discipline</dt><dd className="mt-2 font-semibold">{study.category}</dd></div>
            </dl>
          </aside>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#E1122B]">The challenge</p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-.03em] sm:text-5xl">Turning a defined marketing need into a connected growth system</h2>
            <p className="mt-7 text-base leading-8 text-black/60 sm:text-lg">The work called for more than isolated deliverables. The opportunity was to connect strategy, customer intent, channel execution and measurement so every activity supported a clear path from discovery to action.</p>
            <p className="mt-12 text-xs font-semibold uppercase tracking-[.18em] text-[#E1122B]">Our approach</p>
            <div className="mt-6 space-y-4">
              {approach.map((item) => <div key={item} className="flex gap-4 rounded-xl bg-[#fbfbfb] p-5"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#E1122B]"/><p className="leading-7 text-black/65">{item}</p></div>)}
            </div>
            <p className="mt-12 text-xs font-semibold uppercase tracking-[.18em] text-[#E1122B]">Capabilities used</p>
            <div className="mt-5 flex flex-wrap gap-3">{study.services.map((service) => <span key={service} className="rounded-full border border-black/10 px-5 py-2.5 text-sm">{service}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="bg-[#E1122B] px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div><p className="text-sm font-semibold uppercase tracking-[.16em] text-white/70">Have a similar challenge?</p><h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-.03em] sm:text-5xl">Let&apos;s build the right growth system for your business.</h2></div>
          <Link href="/contact" data-enquiry-trigger data-enquiry-source="Case Study Detail CTA" className="inline-flex min-h-14 shrink-0 items-center justify-center gap-4 rounded-full bg-white px-7 text-sm font-semibold text-black transition hover:bg-black hover:text-white">Start a Conversation <ArrowRight className="h-5 w-5"/></Link>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm font-semibold text-[#E1122B]"><ArrowLeft className="h-4 w-4"/> All Case Studies</Link>
          <Link href={getCaseStudyHref(nextStudy)} className="group text-left sm:text-right"><span className="text-xs uppercase tracking-wider text-black/40">Next case study</span><span className="mt-1 flex max-w-lg items-center gap-2 font-semibold group-hover:text-[#E1122B]">{nextStudy.title}<ArrowRight className="h-4 w-4 shrink-0"/></span></Link>
        </div>
      </section>
    </main>
  );
}
