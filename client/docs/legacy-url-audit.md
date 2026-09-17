# Search Console URL audit — 17 September 2026

All 606 rows from the supplied export were classified against current routes.
This is not a live crawl of all 606 URLs. Representative live responses and
all 34 configured redirects were checked separately.

| Classification | Count | Handling |
| --- | ---: | --- |
| Moved pages with matching destinations | 34 | Exact 301 redirects in `lib/legacy-urls.ts` |
| Current pages | 3 | `/portfolio`, `/contact`, `/about-us` each returned live HTTP 200 |
| Historical numeric WordPress post IDs | 14 | Return 404 instead of incorrectly serving the homepage |
| Unrelated dated URLs under `/2025/09/11/` | 529 | Retain 404; predominantly gambling/casino content |
| No verified replacement | 26 | Retain 404 pending content recovery or exact mapping |

The historical gambling URLs suggest old spam URLs, but do not establish a
current compromise. No unrelated URL is redirected to the homepage.

The sitemap incorrectly listed `/about`; it now lists `/about-us`.

## URLs requiring a content decision

Restore original content from a trusted backup or provide an equivalent page
before adding redirects for these URLs. Similar subject matter alone does not
make a service landing page a replacement for an old educational article.

```text
/2023/07/11/email-marketing-tips-and-strategies-for-effective-campaigns/
/wp-content/plugins/3d-flipbook-dflip-lite/assets/
/downloads/
/download/
/2023/07/14/
/wp-content/plugins/*
/wp-content/plugins/happy-elementor-addons/assets/vendor/pdfjs/lib
/2024/02/05/whatsapps-features-game-changer-digital-marketers/
/category/seo-content-writing/
/category/website-designing/
/2023/10/09/going-forward-out-of-the-loop-pull-in-ten-extra-bodies/
/tag/motion/
/category/mobile-application/
/category/digital-marketing/
/2023/10/09/product-launch-move-the-needle-out-of-scope-drink-the-kool-aid-problem/
/2023/07/23/
/2023/10/09/we-cant-hear-you-scope-creep-yet-can-you-slack-it-to-me/
/tag/digital-marketing/
/2023/06/18/
/2023/07/07/
/2023/07/10/effective-content-marketing-strategies-for-attracting-and-engaging-audiences/
/2024/02/15/master-apple-vision-pro-for-digital-marketing/
/2023/07/18/the-power-of-video-marketing-youtube-optimization-strategies/
/2023/07/23/the-power-of-influencer-marketing-and-collaborations-building-brands-in-the-digital-age/
/wp-content/themes/noile/*
/author/team-brainadz/
```

Old WordPress plugin/theme paths do not need restoration in this Next.js site.

## Verification and deployment

- Production build passed; existing CMS dynamic-rendering bailout messages appeared during build.
- Targeted ESLint passed.
- Three regression tests passed (`node --test tests/legacy-urls.test.mjs`).
- Local production HTTP check passed for all 34 redirects and their HTTP 200 destinations.
- Removed post query, dated URL, downloads and unknown URL returned HTTP 404.
- Sitemap response included `/about-us`, not `/about`.
- No live deployment was performed. Rebuild/redeploy the client and restart its production process.
- After deployment, rerun the HTTP check against the live domain and resubmit the sitemap in Search Console.

Google guidance: https://support.google.com/webmasters/answer/2445990
Redirect moved content to its equivalent page; keep real 404/410 responses for
removed content. Search Console may continue to report historical URLs after recrawling.
