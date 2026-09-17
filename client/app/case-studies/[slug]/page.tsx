import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { RichText } from "@/components/RichText";
import { getCaseStudies, getCaseStudy, getCMSCategoryTitle, getCMSImageURL } from "@/lib/cms";
import { getRobotsMetadata } from "@/lib/seo";


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
  const nextStudy = (await getCaseStudies()).find((item) => item.slug !== slug);
  const services = (study.services ?? []).map((service) => service.name);
  const image = getCMSImageURL(study.heroImage);
  const approach = cmsStudy?.approach?.length
    ? cmsStudy.approach
    : [];
  const results = cmsStudy?.results || [];

  return (
    <main className="dm-sans bg-white text-[#161616]">
      <section className="relative overflow-hidden bg-[#111] px-5 pb-16 pt-8 text-white sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-48 -top-64 h-[600px] w-[600px] rounded-full bg-[#E1122B]/10 blur-[100px]" />
        <div className="mx-auto max-w-[1400px]">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/case-studies" className="hover:text-white">Case Studies</Link><span>/</span>
            <span aria-current="page" className="min-w-0 break-words text-white">{study.title}</span>
          </nav>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[.15em] text-[#ff8178]">
                <span>{category}</span><span className="text-white/30">•</span><span>{study.industry}</span>
              </div>
              <h1 className="mt-6 max-w-4xl text-[40px] font-semibold leading-[1.06] tracking-[-.04em] sm:text-[54px] lg:text-[68px]">{study.title}</h1>
            </div>
            <div className="border-l border-white/20 pl-6 lg:pb-2">
              <p className="text-base leading-8 text-white/75 sm:text-lg">{study.summary}</p>
              <a href="#project-overview" className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-white">Explore the project <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f5f3] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-[1400px] overflow-hidden rounded-2xl border border-black/10 bg-white p-3 sm:p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {image ? <img src={image} alt={cmsStudy && typeof cmsStudy.heroImage === "object" ? cmsStudy.heroImage.alt || study.title : study.title} className="max-h-[640px] w-full rounded-lg object-contain" /> : null}
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
                  <h3 className="break-words text-xl font-semibold leading-snug tracking-[-.025em] text-[#191919] sm:text-2xl">
                    {result.value}
                  </h3>
                  <p className="mt-3 break-words text-[15px] leading-7 text-[#626262]">
                    {result.label}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}



      {/* <section className="px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm font-semibold text-[#E1122B]"><ArrowLeft className="h-4 w-4"/> All Case Studies</Link>
          {nextStudy ? <Link href={`/case-studies/${nextStudy.slug}`} className="group text-left sm:text-right"><span className="text-xs uppercase tracking-wider text-black/40">Next case study</span><span className="mt-1 flex max-w-lg items-center gap-2 font-semibold group-hover:text-[#E1122B]">{nextStudy.title}<ArrowRight className="h-4 w-4 shrink-0"/></span></Link> : null}
        </div>
      </section> */}
    </main>
  );
}
