import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { getBlogCategories, getBlogPosts, getCMSCategoryTitle, getCMSImageURL } from "@/lib/cms";
import { getRichTextPreview } from "@/components/RichText";
import BlogSidebar from "./BlogSidebar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Blog & Insights | BrainADZ Marketing",
  description:
    "Explore practical insights from BrainADZ on social media, SEO, performance marketing, websites, content and digital growth.",
};

export default async function BlogPage() {
  const [cmsPosts, cmsCategories] = await Promise.all([getBlogPosts(), getBlogCategories()]);
  const blogPosts = cmsPosts.map((post) => ({
        category: getCMSCategoryTitle(post.categoryRelation, post.category),
        excerpt: getRichTextPreview(post.content, 200),
        id: post.slug,
        image: getCMSImageURL(post.heroImage),
        imageAlt:
          typeof post.heroImage === "object" && post.heroImage.alt
            ? post.heroImage.alt
            : post.title,
        readTime: `${post.readTime || 5} min read`,
        slug: post.slug,
        title: post.title,
      }));
  const categories = [
    { label: "All insights", count: blogPosts.length, href: "#articles" },
    ...cmsCategories.map((category) => {
      const posts = cmsPosts.filter((post) => {
        const relation = post.categoryRelation;
        const id = typeof relation === "object" ? relation?.id : relation;
        return id != null ? String(id) === String(category.id) : post.category === category.title;
      });
      return {
        label: category.title,
        count: posts.length,
        href: posts.length ? `#${posts[0].slug}` : "#articles",
      };
    }),
  ];

  return (
    <main className="dm-sans bg-white text-[#111111]">
      <section className="relative min-h-[420px] overflow-hidden bg-black sm:min-h-[500px] lg:min-h-[540px]">
        <Image
          src="/banner/blog-banner.webp"
          alt="BrainADZ team workspace"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.78)_30%,rgba(0,0,0,0.38)_55%,rgba(0,0,0,0.02)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.06)_48%,rgba(0,0,0,0.26)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[420px] max-w-[1800px] flex-col px-5 py-8 sm:min-h-[500px] sm:px-8 lg:min-h-[540px] lg:px-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[14px] font-medium leading-none"
          >
            <Link
              href="/"
              className="text-[#E1122B] transition hover:text-white"
            >
              Home
            </Link>
            <span className="text-white/70">/</span>
            <span className="text-white">Blog</span>
          </nav>

          <h1 className="mt-7 max-w-[760px] text-[32px] font-semibold leading-[1.04] tracking-[-0.04em] text-white sm:text-[42px] lg:text-[52px]">
            Blog &amp; Insights
          </h1>

          <div className="mt-auto max-w-[700px] pb-6 sm:pb-10 lg:pb-12">
            <p className="text-[18px] font-normal leading-[1.5] text-white/88 sm:text-[21px] lg:text-[24px]">
              Practical thinking on digital marketing, creative execution and
              the decisions that help brands grow with more clarity.
            </p>

            <Link
              href="#articles"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-9 rounded-full bg-[#E1122B] px-5 text-[15px] font-semibold text-white transition hover:bg-black sm:min-h-14 sm:px-6"
            >
              Explore articles
              <ArrowRight className="h-5 w-5" strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="articles"
        className="scroll-mt-24 bg-[#fbfbfb] py-16 text-black sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-6 border-b border-black/10 pb-10 lg:grid-cols-[1fr_0.65fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#E1122B]">
                Latest insights
              </p>
              <h2 className="mt-4 max-w-[920px] text-[38px] font-semibold leading-[1.08] tracking-[-0.04em] text-black sm:text-[50px] lg:text-[60px]">
                Ideas you can put to work
              </h2>
            </div>
            <p className="max-w-[620px] text-[15px] leading-7 text-black/60 sm:text-[16px] sm:leading-8">
              Browse practical guidance across marketing, social media, search,
              paid campaigns, content and digital experiences.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] xl:gap-10">
            <div className="grid content-start gap-5 md:grid-cols-2">
              {blogPosts.map((post) => (
                <article
                  id={String(post.id)}
                  key={post.id}
                  className="group scroll-mt-28 overflow-hidden rounded-[14px] border border-black/10 bg-white shadow-[0_16px_42px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#E1122B]/45 hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-black/10 bg-white">
                    {post.image ? <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className={`transition-transform duration-500 group-hover:scale-[1.03] ${
                        post.image === "/perfomance.png"
                          ? "object-contain p-8"
                          : "object-cover object-top"
                      }`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 38vw"
                    /> : null}
                  </div>

                  <div className="flex min-h-[285px] flex-col p-6 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#E1122B]">
                        {post.category}
                      </p>
                      <span className="inline-flex items-center gap-2 text-[12px] text-black/46">
                        <Clock3 className="h-4 w-4" strokeWidth={1.6} />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="mt-5 text-[25px] font-semibold leading-[1.2] tracking-[-0.035em] text-black sm:text-[28px]">
                      {post.title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-7 text-black/60 sm:text-[15px]">
                      {post.excerpt}
                    </p>

                    {post.slug ? (
                      <Link
                        href={`/blog/${post.slug}`}
                        className="mt-auto inline-flex items-center gap-2 pt-7 text-[13px] font-semibold text-[#E1122B]"
                      >
                        Read article
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <p className="mt-auto pt-7 text-[13px] font-medium text-black/42">
                        Article coming soon
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <BlogSidebar categories={categories} />
          </div>
        </div>
      </section>
    </main>
  );
}
