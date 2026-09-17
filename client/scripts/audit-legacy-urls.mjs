import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { isLegacyPostQuery, legacyRedirects } from "../lib/legacy-urls.ts";

// Usage: node scripts/audit-legacy-urls.mjs <Search Console TSV export>
const input = process.argv[2];
if (!input) throw new Error("Provide the path to the Search Console URL export.");

const counts = {};
const review = [];
const entries = readFileSync(input, "utf8").split(/\r?\n/).filter((line) => line.startsWith("https://"));
for (const line of entries) {
  const url = new URL(line.split(/\s/)[0]);
  const path = url.pathname.replace(/\/$/, "") || "/";
  let classification;
  if (legacyRedirects[path]) classification = "redirect";
  else if (isLegacyPostQuery(path, url.searchParams)) classification = "removedWordPressID";
  else if (existsSync(fileURLToPath(new URL(`../app${path}/page.tsx`, import.meta.url)))) classification = "existingRoute";
  else if (path.startsWith("/2025/09/11/")) classification = "unrelatedHistoricalURL";
  else {
    classification = "noVerifiedReplacement";
    review.push(url.href);
  }
  counts[classification] = (counts[classification] || 0) + 1;
}
console.log(JSON.stringify({ total: entries.length, counts, review }, null, 2));
