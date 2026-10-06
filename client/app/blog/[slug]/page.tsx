import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronRight, Clock3, UserRound } from "lucide-react";

import { getRichTextPreview, getTableOfContents, RichText } from "@/components/RichText";
import { getBlogPost, getCMSCategoryTitle, getCMSImageURL } from "@/lib/cms";
import { getRobotsMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

// CMS content is fetched fresh for each request, including newly published slugs.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await getBlogPost(slug);
  if (!post) return {};
  const image = getCMSImageURL(post.heroImage);
  const socialImage = getCMSImageURL(post.seo?.ogImage || post.seo?.image || post.heroImage);
  const title = post.seo?.metaTitle || `${post.title} | BrainADZ`;
  const description = post.seo?.metaDescription || post.excerpt || getRichTextPreview(post.content, 200);

  return {
    title,
    description,
    alternates: { canonical: post.seo?.canonicalURL || `/blog/${post.slug}` },
    robots: getRobotsMetadata(post.seo?.robots) || (post.seo?.noIndex ? { index: false, follow: false } : undefined),
    openGraph: {
      title: post.seo?.ogTitle || title,
      description: post.seo?.ogDescription || description,
      images: socialImage || image ? [socialImage || image] : undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const slug = (await params).slug;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const imageURL = getCMSImageURL(post.heroImage);
  const imageAlt = typeof post.heroImage === "object" && post.heroImage.alt ? post.heroImage.alt : post.title;
  const category = getCMSCategoryTitle(post.categoryRelation, post.category);
  const tableOfContents = getTableOfContents(post.content);
  const authorName = post.authorName || (typeof post.author === "object" ? post.author?.name : null);
  const publishedDate = new Date(post.publishedAt);
  const hasDate = !Number.isNaN(publishedDate.getTime());
  const dateLabel = hasDate ? new Intl.DateTimeFormat("en-IN", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata",
  }).format(publishedDate) : null;

  return (
    <main className="dm-sans bg-white text-black">
      <article>
        <header className="bg-[#111] px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1100px]">
            <nav aria-label="Breadcrumb" className="border-b border-white/15 pb-6">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm leading-6 text-white/70">
                <li><Link href="/" className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4">Home</Link></li>
                <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
                <li><Link href="/blog" className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4">Blog</Link></li>
                <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
                <li aria-current="page" className="min-w-0 break-words text-white/90">{post.title}</li>
              </ol>
            </nav>
            <p className="mt-12 text-sm font-semibold uppercase tracking-[0.16em] text-[#ff8178]">{category}</p>
            <h1 className="mt-5 text-[40px] font-semibold leading-[1.07] tracking-[-0.04em] sm:text-[56px] lg:text-[68px]">{post.title}</h1>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/15 pt-6 text-sm text-white/80">
              {authorName ? <span className="inline-flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10"><UserRound aria-hidden="true" className="h-5 w-5" /></span><span><span className="block text-xs text-white/55">Written by</span><span className="font-medium text-white">{authorName}</span></span></span> : null}
              {hasDate ? <span className="inline-flex items-center gap-2"><CalendarDays aria-hidden="true" className="h-4 w-4 text-white/55" /><time dateTime={publishedDate.toISOString()}>{dateLabel}</time></span> : null}
              <span className="inline-flex items-center gap-2"><Clock3 aria-hidden="true" className="h-4 w-4 text-white/55" />{post.readTime || 5} min read</span>
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
          {imageURL ? <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#f3f3f3]"><Image src={imageURL} alt={imageAlt} fill priority className="object-cover" sizes="(max-width: 1200px) 100vw, 1200px" /></div> : null}
          <div className="mx-auto mt-12 grid max-w-[1100px] gap-12 lg:grid-cols-[250px_minmax(0,1fr)]">
            {tableOfContents.length ? (
              <aside className="self-start rounded-xl border border-black/10 bg-[#fbfbfb] p-5 lg:sticky lg:top-28">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E1122B]">Table of contents</p>
                <nav className="mt-4 space-y-3" aria-label="Table of contents">
                  {tableOfContents.map((item) => (
                    <a key={item.id} href={`#${item.id}`} className={`block text-sm leading-5 text-black/60 hover:text-[#E1122B] ${item.level === 4 ? "pl-6" : item.level === 3 ? "pl-3" : ""}`}>{item.label}</a>
                  ))}
                </nav>
              </aside>
            ) : <div />}
            <div>
              {post.excerpt ? <p className="mb-10 text-xl leading-9 text-black/72">{post.excerpt}</p> : null}
              <RichText data={post.content} />
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
