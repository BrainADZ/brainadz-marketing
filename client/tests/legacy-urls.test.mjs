import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { isLegacyPostQuery, isRemovedServicePath, legacyRedirects, removedServicePaths } from "../lib/legacy-urls.ts";

test("every migration destination has a real route and no redirect chain", () => {
  for (const [source, destination] of Object.entries(legacyRedirects)) {
    const route = destination.startsWith("/blog/") ? "/blog/[slug]" : destination;
    assert.ok(existsSync(fileURLToPath(new URL(`../app${route}/page.tsx`, import.meta.url))), destination);
    assert.notEqual(source, destination);
    assert.equal(legacyRedirects[destination], undefined, `Redirect chain at ${source}`);
  }
});

test("unrelated and missing content has no invented redirect", () => {
  for (const path of ["/2025/09/11/peter-sons", "/downloads", "/wp-content/plugins", "/not-a-page"]) {
    assert.equal(legacyRedirects[path], undefined);
  }
});

test("retired service aliases have no redirect or route, and current service pages are allowed", () => {
  for (const path of removedServicePaths) {
    assert.equal(legacyRedirects[path], undefined, path);
    assert.equal(existsSync(fileURLToPath(new URL(`../app${path}/page.tsx`, import.meta.url))), false, path);
    assert.equal(isRemovedServicePath(`${path}/`), true, path);
  }
  for (const path of ["/services", "/services/performance-marketing", "/services/performance-marketing/google-ads", "/blog", "/about"]) {
    assert.equal(isRemovedServicePath(path), false, path);
  }
});

test("only root WordPress numeric post queries are classified as removed", () => {
  assert.equal(isLegacyPostQuery("/", new URLSearchParams("p=22129")), true);
  assert.equal(isLegacyPostQuery("/", new URLSearchParams("utm_source=google")), false);
  assert.equal(isLegacyPostQuery("/", new URLSearchParams("p=pricing")), false);
  assert.equal(isLegacyPostQuery("/blog", new URLSearchParams("p=2")), false);
});
