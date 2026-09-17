import assert from "node:assert/strict";
import { legacyRedirects } from "../lib/legacy-urls.ts";

// Run against a production build: node scripts/check-legacy-redirects.mjs http://localhost:3107
const base = process.argv[2];
if (!base) throw new Error("Provide the local production server URL.");

for (const [source, destination] of Object.entries(legacyRedirects)) {
  const response = await fetch(new URL(source, base), { redirect: "manual" });
  assert.equal(response.status, 301, source);
  assert.equal(new URL(response.headers.get("location"), base).pathname, destination, source);
  const target = await fetch(new URL(destination, base));
  assert.equal(target.status, 200, destination);
}

for (const path of ["/?p=22129", "/2025/09/11/peter-sons", "/downloads", "/not-a-real-page"]) {
  assert.equal((await fetch(new URL(path, base))).status, 404, path);
}
const sitemap = await (await fetch(new URL("/sitemap.xml", base))).text();
assert.ok(sitemap.includes("https://brainadz.marketing/about-us</loc>"));
assert.ok(!sitemap.includes("https://brainadz.marketing/about</loc>"));
console.log(`PASS: ${Object.keys(legacyRedirects).length} redirects return 301 and resolve to 200; removed URLs return 404; sitemap uses /about-us.`);
