import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CalendarDays, Clock3, UserRound } from "lucide-react";
import { hasRichTextContent, RichText } from "@/components/RichText";
import { getCaseStudy, getCMSCategoryTitle, getCMSImageURL } from "@/lib/cms";
import { getRobotsMetadata } from "@/lib/seo";
import { estimateCaseStudyReadingTime } from "@/lib/case-study-reading-time";


// CMS content is fetched without caching and can be published after deployment.
// Keep every slug dynamic, including slugs that did not exist at build time.
export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cmsStudy = await getCaseStudy(slug);
  const study = cmsStudy;
  if (!study) return {};
  const title = cmsStudy?.seo?.metaTitle || `${study.title} | BrainADZ`;
  const description = cmsStudy?.seo?.metaDescription || study.summary;
  const socialImage = cmsStudy
    ? getCMSImageURL(cmsStudy.seo?.ogImage || cmsStudy.seo?.image || cmsStudy.heroImage)
    : "";
  return {
    title,
    description,
    alternates: { canonical: cmsStudy?.seo?.canonicalURL || `/case-studies/${slug}` },
    robots: getRobotsMetadata(cmsStudy?.seo?.robots) || (cmsStudy?.seo?.noIndex ? { index: false, follow: false } : undefined),
    openGraph: {
      title: cmsStudy?.seo?.ogTitle || title,
      description: cmsStudy?.seo?.ogDescription || description,
      images: socialImage ? [socialImage] : undefined,
      type: "article",
    },
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cmsStudy = await getCaseStudy(slug);
  if (!cmsStudy) notFound();
  const study = cmsStudy;
  const category = getCMSCategoryTitle(study.categoryRelation, study.category);
  const services = (study.services ?? []).map((service) => service.name);
  const image = getCMSImageURL(study.heroImage);
  const approach = cmsStudy?.approach?.length
    ? cmsStudy.approach
    : [];
  const results = cmsStudy?.results || [];
  const beforeAfter = study.beforeAfter;
  const comparisons = beforeAfter?.items || [];
  const evidence = study.performanceEvidence;
  const evidenceImages = (evidence?.images || []).flatMap((item) => {
    const src = getCMSImageURL(item.image);
    return src ? [{ ...item, src }] : [];
  });
  const finalOutcome = study.finalOutcome;
  const hasFinalDescription = hasRichTextContent(finalOutcome?.description);
  const authorName = study.authorName?.trim() || "BrainADZ Marketing";
  const readTime = study.readTime || estimateCaseStudyReadingTime(study);
  const publishedDate = new Date(study.publishedAt || study.createdAt || "");
  const hasDate = !Number.isNaN(publishedDate.getTime());
  const dateLabel = hasDate
    ? new Intl.DateTimeFormat("en-IN", {
        day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata",
      }).format(publishedDate)
    : null;

  return (
    <main className="dm-sans bg-white text-[#161616]">
      <section className="relative overflow-hidden bg-[#111] px-5 pb-16 pt-8 text-white sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-48 -top-64 h-[600px] w-[600px] rounded-full bg-[#E1122B]/10 blur-[100px]" />
        <div className="mx-auto max-w-[1400px]">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/case-studies" className="hover:text-white">Case Studies</Link><span>/</span>
            <span aria-current="page" className="min-w-0 wrap-break-wordword text-white">{study.title}</span>
          </nav>
          <div className="mt-12">
            <div>
              <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[.15em] text-[#ff8178]">
                <span>{category}</span><span className="text-white/30">•</span><span>{study.industry}</span>
              </div>
              <h1 className="mt-6 max-w-4xl text-[40px] font-semibold leading-[1.06] tracking-[-.04em] sm:text-[54px] lg:text-[68px]">{study.title}</h1>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/15 pt-6 text-sm text-white/80">
                <span className="inline-flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10">
                    <UserRound aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-white/55">Written by</span>
                    <span className="font-medium text-white">{authorName}</span>
                  </span>
                </span>
                {hasDate ? (
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays aria-hidden="true" className="h-4 w-4 text-white/55" />
                    <time dateTime={publishedDate.toISOString()}>{dateLabel}</time>
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-2">
                  <Clock3 aria-hidden="true" className="h-4 w-4 text-white/55" />
                  {readTime} min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {image ? (
      <section className="px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-[1400px] overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={typeof study.heroImage === "object" && study.heroImage ? study.heroImage.alt || study.title : study.title} className="block h-auto w-full" />
        </div>
      </section>
      ) : null}

      <section aria-labelledby="case-study-summary" className="px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <h2 id="case-study-summary" className="text-3xl font-semibold tracking-[-.03em] sm:text-4xl">Summary</h2>
          <p className="mt-6 max-w-4xl whitespace-pre-line text-base leading-8 text-black/65 sm:text-lg">{study.summary}</p>
        </div>
      </section>

      <section id="project-overview" className="scroll-mt-28 border-y border-black/10 px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <aside className="self-start rounded-2xl border border-black/10 bg-[#faf9f7] p-6 sm:p-8 lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#E1122B]">Project overview</p>
            <dl className="mt-7 divide-y divide-black/10 border-y border-black/10">
              <div className="py-5"><dt className="text-xs uppercase tracking-wider text-black/45">Industry</dt><dd className="mt-2 font-semibold">{study.industry}</dd></div>
              <div className="py-5"><dt className="text-xs uppercase tracking-wider text-black/45">Discipline</dt><dd className="mt-2 font-semibold">{category}</dd></div>
              <div className="py-5"><dt className="text-xs uppercase tracking-wider text-black/45">Services</dt><dd className="mt-3 flex flex-wrap gap-2">{services.map((service) => <span key={service} className="rounded-md border border-black/10 bg-white px-3 py-2 text-xs leading-5">{service}</span>)}</dd></div>
            </dl>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-[#E1122B]">Discuss a similar project <ArrowUpRight className="h-4 w-4" /></Link>
          </aside>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#E1122B]">01 / Project context</p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-.03em] sm:text-5xl">{cmsStudy?.challenge ? "The challenge" : "Inside the project"}</h2>
            {cmsStudy?.challenge ? (
              <div className="mt-7"><RichText data={cmsStudy.challenge} /></div>
            ) : (
              <p className="mt-7 text-base leading-8 text-black/60 sm:text-lg">{study.summary}</p>
            )}
            {approach.length > 0 ? <section className="mt-14 border-t border-black/10 pt-12">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#E1122B]">02 / Strategy & execution</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-.03em] sm:text-4xl">How we approached it</h2>
              <ol className="mt-8 divide-y divide-black/10">
                {approach.map((item, index) => <li key={item.id || index} className="flex gap-5 py-7 first:pt-0"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E1122B]/8 text-sm font-semibold text-[#E1122B]">{String(index + 1).padStart(2, "0")}</span><div><h3 className="text-xl font-semibold tracking-tight">{item.title}</h3><p className="mt-3 whitespace-pre-line leading-8 text-black/65">{item.description}</p></div></li>)}
              </ol>
            </section> : null}
          </div>
        </div>
      </section>

      {beforeAfter?.title?.trim() || beforeAfter?.description?.trim() || comparisons.length > 0 ? (
        <section aria-labelledby="case-study-before-after" className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <h2 id="case-study-before-after" className="wrap-break-word text-3xl font-semibold tracking-[-.03em] sm:text-5xl">{beforeAfter?.title || "Before vs After"}</h2>
            {beforeAfter?.description ? <p className="mt-6 max-w-4xl whitespace-pre-line leading-8 text-black/65">{beforeAfter.description}</p> : null}
            {comparisons.length > 0 ? (
              <div className="mt-8 overflow-hidden rounded-2xl border border-black/10">
                <table className="w-full table-fixed text-left text-sm sm:text-base">
                  <caption className="sr-only">Before and after project comparisons</caption>
                  <thead className="bg-[#faf9f7]">
                    <tr>
                      <th scope="col" className="w-[40%] p-3 font-semibold sm:p-6">Label</th>
                      <th scope="col" className="p-3 font-semibold sm:p-6">Before</th>
                      <th scope="col" className="bg-[#fff1f2] p-3 font-semibold text-[#E1122B] sm:p-6">After</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {comparisons.map((item, index) => (
                      <tr key={item.id || index}>
                        <th scope="row" className="wrap-break-word p-3 font-medium sm:p-6">{item.label}</th>
                        <td className="wrap-break-wordword p-3 text-black/65 sm:p-6">{item.beforeValue}</td>
                        <td className="wrap-break-word bg-[#fff1f2]/50 p-3 font-semibold sm:p-6">{item.afterValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {results.length > 0 ? (
        <section
          aria-labelledby="case-study-results"
          className="bg-[#f6f5f3] px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
        >
          <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-16">
            <header className="self-start lg:sticky lg:top-28">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-[#E1122B]">
                <span aria-hidden="true" className="h-px w-8 bg-[#E1122B]" />
                Project outcomes
              </p>
              <h2
                id="case-study-results"
                className="mt-5 text-4xl font-semibold leading-[1.1] tracking-[-.04em] sm:text-5xl lg:text-[56px]"
              >
                The results<span className="text-[#E1122B]">.</span>
              </h2>
            </header>

            <ol className="grid min-w-0 gap-4 md:grid-cols-2 lg:gap-5">
              {results.map((result, index) => (
                <li
                  key={result.id || index}
                  className="min-w-0 rounded-2xl border border-[#e5e2dd] bg-white p-6 sm:p-8"
                >
                  <div className="mb-6 flex items-center gap-4" aria-hidden="true">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff1f2] text-xs font-semibold tabular-nums text-[#E1122B]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-[#eeece8]" />
                  </div>
                  <h3 className="wrap-break-word text-xl font-semibold leading-snug tracking-[-.025em] text-[#191919] sm:text-2xl">
                    {result.value}
                  </h3>
                  <p className="mt-3 wrap-break-word text-[15px] leading-7 text-[#626262]">
                    {result.label}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}



      {evidence?.title?.trim() || evidence?.description?.trim() || evidenceImages.length > 0 ? (
        <section aria-labelledby="case-study-evidence" className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <h2 id="case-study-evidence" className="wrap-break-word text-3xl font-semibold tracking-[-.03em] sm:text-5xl">{evidence?.title || "Performance Evidence"}</h2>
            {evidence?.description ? <p className="mt-6 max-w-4xl whitespace-pre-line leading-8 text-black/65">{evidence.description}</p> : null}
            {evidenceImages.length > 0 ? (
              <div className="mt-10 space-y-8">
                {evidenceImages.map((item, index) => (
                  <figure key={item.id || index} className="overflow-hidden rounded-2xl border border-black/10 bg-[#faf9f7]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.src} alt={item.altText || (typeof item.image === "object" ? item.image.alt : "") || "Performance evidence"} loading="lazy" className="block h-auto w-full" />
                    {item.caption ? <figcaption className="whitespace-pre-line wrap-break-word p-5 text-sm leading-7 text-black/65 sm:p-6">{item.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {finalOutcome?.title?.trim() || hasFinalDescription ? (
        <section aria-labelledby="case-study-final-outcome" className="border-t border-black/10 px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <h2 id="case-study-final-outcome" className="wrap-break-word text-3xl font-semibold tracking-[-.03em] sm:text-5xl">{finalOutcome?.title || "Final Outcome"}</h2>
            {hasFinalDescription ? <div className="mt-7 max-w-4xl"><RichText data={finalOutcome?.description} /></div> : null}
          </div>
        </section>
      ) : null}
      {/* The shared Footer renders the site CTA immediately after this page. */}
    </main>
  );
}
