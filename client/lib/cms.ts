export type CMSImage = {
  alt?: string | null;
  height?: number | null;
  url?: string | null;
  width?: number | null;
};

export type CMSCategory = {
  id: number | string;
  slug: string;
  title: string;
};

export type CMSSEO = {
  canonicalURL?: string | null;
  focusKeyword?: string | null;
  image?: CMSImage | number | string | null;
  metaDescription?: string | null;
  metaTitle?: string | null;
  noIndex?: boolean | null;
  ogDescription?: string | null;
  ogImage?: CMSImage | number | string | null;
  ogTitle?: string | null;
  robots?: string | null;
};

export type BlogPost = {
  author?: { name?: string | null } | number | string | null;
  authorName?: string | null;
  category?: string | null;
  categoryRelation?: CMSCategory | number | string | null;
  excerpt: string;
  heroImage: CMSImage | string;
  id: number | string;
  publishedAt: string;
  readTime?: number | null;
  seo?: CMSSEO | null;
  slug: string;
  title: string;
  content?: unknown;
  updatedAt?: string;
};

export type CMSCaseStudy = {
  authorName?: string | null;
  createdAt?: string;
  publishedAt?: string | null;
  readTime?: number | null;
  approach?: Array<{ description: string; id?: string | null; title: string }> | null;
  beforeAfter?: {
    title?: string | null;
    description?: string | null;
    items?: Array<{ id?: string | null; label: string; beforeValue: string; afterValue: string }> | null;
  } | null;
  performanceEvidence?: {
    title?: string | null;
    description?: string | null;
    images?: Array<{ id?: string | null; image: CMSImage | number | string; altText: string; caption?: string | null }> | null;
  } | null;
  finalOutcome?: {
    title?: string | null;
    description?: unknown;
  } | null;
  category?: string | null;
  categoryRelation?: CMSCategory | number | string | null;
  challenge?: unknown;
  featured?: boolean | null;
  heroImage: CMSImage | string;
  id: number | string;
  industry: string;
  results?: Array<{ id?: string | null; label: string; value: string }> | null;
  seo?: CMSSEO | null;
  services: Array<{ id?: string | null; name: string }>;
  slug: string;
  summary: string;
  title: string;
  updatedAt?: string;
};

type CollectionResponse<T> = {
  docs: T[];
};

const cmsURL = (
  process.env.CMS_API_URL ||
  process.env.NEXT_PUBLIC_CMS_URL ||
  "http://localhost:3001"
).replace(/\/$/, "");

async function getCollection<T>(
  collection: string,
  query = "",
): Promise<T[]> {
  try {
    const response = await fetch(`${cmsURL}/api/${collection}?${query}`, {
      ...(["blog-posts", "blog-categories", "case-studies", "case-study-categories"].includes(collection) ? { cache: "no-store" as const } : { next: { revalidate: 300 } }),
    });

    if (!response.ok) {
      console.error(`CMS request failed for ${collection}: ${response.status}`);
      return [];
    }

    const data = (await response.json()) as CollectionResponse<T>;
    return Array.isArray(data.docs) ? data.docs : [];
  } catch (error) {
    console.error(`CMS request failed for ${collection}`, error);
    return [];
  }
}

export const getCMSImageURL = (image: CMSImage | number | string | null | undefined): string => {
  if (!image) return "";
  if (typeof image === "string") {
    return image;
  }

  if (typeof image === "number" || !image.url) {
    return "";
  }

  return image.url.startsWith("http") ? image.url : `${cmsURL}${image.url}`;
};

export const getCMSCategoryTitle = (
  relation: CMSCategory | number | string | null | undefined,
  fallback?: string | null,
): string =>
  typeof relation === "object" && relation?.title
    ? relation.title
    : fallback || "Uncategorized";

export const getBlogCategories = (): Promise<CMSCategory[]> =>
  getCollection<CMSCategory>("blog-categories", "depth=0&limit=100&sort=title");

export const getBlogPosts = (): Promise<BlogPost[]> =>
  getCollection<BlogPost>(
    "blog-posts",
    "depth=1&limit=100&sort=-publishedAt&where[_status][equals]=published",
  );

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getCollection<BlogPost>(
    "blog-posts",
    `depth=1&limit=1&where[_status][equals]=published&where[slug][equals]=${encodeURIComponent(slug)}`,
  );
  return posts[0] ?? null;
}

export const getCaseStudyCategories = (): Promise<CMSCategory[]> =>
  getCollection<CMSCategory>("case-study-categories", "depth=0&limit=100&sort=title");

export const getCaseStudies = (): Promise<CMSCaseStudy[]> =>
  getCollection<CMSCaseStudy>(
    "case-studies",
    "depth=1&limit=100&sort=sortOrder&where[_status][equals]=published",
  );

export async function getCaseStudy(
  slug: string,
): Promise<CMSCaseStudy | null> {
  const studies = await getCollection<CMSCaseStudy>(
    "case-studies",
    `depth=1&limit=1&where[_status][equals]=published&where[slug][equals]=${encodeURIComponent(slug)}`,
  );
  return studies[0] ?? null;
}
