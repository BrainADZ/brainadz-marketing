# Redirect audit - 6 October 2026

Live site checked: https://brainadz.marketing

## Findings

- All 34 redirects in `lib/legacy-urls.ts` returned HTTP 301 to the configured destination.
- Every destination returned HTTP 200 with automatic redirect following disabled.
- No redirect chains or loops occurred in those 34 mappings.
- All 71 static page routes returned HTTP 200.
- Checked 93 unique internal page-link paths extracted from those pages' HTML.
- Six internal link paths returned 301, and eleven returned 404.
- The live sitemap returned HTTP 200 and listed 12 URLs, but omitted all 55 service category/detail pages.
- Static pages had self-referencing canonical URLs (the homepage canonical omits the trailing slash).

## Internal links corrected locally

| Linked URL | Live status before changes | Correct destination |
| --- | --- | --- |
| `/about` | 301 | `/about-us` |
| `/services/digital-marketing/social-media-marketing-services` | 404 | `/services/digital-marketing/social-media-marketing-services-smm` |
| `/services/digital-marketing/social-media-optimization-services` | 404 | `/services/digital-marketing/social-media-optimization-services-smo` |
| `/services/digital-marketing/online-reputation-management` | 301 | `/services/digital-marketing/online-reputation-management-orm` |
| `/services/digital-marketing/smo-services` | 301 | `/services/digital-marketing/social-media-optimization-services-smo` |
| `/services/digital-marketing/smm-services` | 404 | `/services/digital-marketing/social-media-marketing-services-smm` |
| `/services/digital-marketing/sem-services` | 301 | `/services/performance-marketing/search-engine-marketing-sem` |
| `/services/digital-marketing/content-marketing` | 301 | `/services/digital-marketing/content-marketing-services` |
| `/services/digital-marketing/visual-content-creation` | 404 | `/services/creative-media/visual-content-creation` |
| `/services/web-design-development/website-maintenance` | 301 | `/services/web-design-development/website-maintenance-services` |
| `/services/seo-services/link-building-seo-services` | 404 | `/services/seo-services/link-building-services` |
| `/services/seo-services/enterprise-seo` | 404 | `/services/seo-services/enterprise-seo-services` |
| `/services/seo-services/international-seo` | 404 | `/services/seo-services/international-seo-services` |
| `/services/performance-marketing/lead-generation` | 404 | `/services/performance-marketing/lead-generation-services` |
| `/services/performance-marketing/display-ads` | 404 | `/services/performance-marketing/display-advertising` |
| `/services/performance-marketing/performance-marketing` | 404 | `/services/performance-marketing` |
| `/services/performance-marketing/search-engine-marketing` | 404 | `/services/performance-marketing/search-engine-marketing-sem` |

The services index now uses explicit destinations instead of generating URLs from display labels. Corrected digital marketing, performance marketing and shared About links. Added the 55 current service URLs to the sitemap.

Historical migration redirects remain in place. For example, `/services/google-ads` continues to redirect to `/services/performance-marketing/google-ads`; current internal links use the latter directly.

## Scope and deployment

Validation completed:

- Production build and TypeScript check passed.
- Targeted ESLint passed.
- All three existing legacy URL regression tests passed.
- Canonical check passed for all 71 static pages.
- Live redirect checker passed for all 34 redirects, their direct HTTP 200 destinations, representative removed URLs and the About sitemap entry.
- Local production HTTP crawl passed: all 71 static pages and all 70 internal page-link paths found in their HTML returned direct HTTP 200, with no internal migration links.
- Local sitemap contained all 55 service category/detail URLs, with no duplicate entries or configured legacy source URLs.

The local CMS at port 3001 was unavailable. The build completed with a CMS connection warning and dynamic-rendering messages; local CMS content page coverage was therefore unavailable. The local sitemap and internal-link counts exclude CMS entries that are present on the live site.

This crawl covers current static page HTML and the internal page-link paths found there. It is not a crawl of every historical URL, client-generated link, query-string variation, or CMS content page.

Changes are local and require client deployment to affect the live site.
The redirect checker now disables automatic redirect following for destinations, so it detects an additional redirect instead of silently accepting the eventual HTTP 200.

Rerun after deployment:

```text
node scripts/check-legacy-redirects.mjs https://brainadz.marketing
```
