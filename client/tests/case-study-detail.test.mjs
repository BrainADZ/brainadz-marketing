import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

// Render the actual server page with CMS fixtures, without a database or Next server.
function loadTS(relativePath, mocks = {}) {
  const filename = fileURLToPath(new URL(relativePath, import.meta.url));
  const localRequire = createRequire(filename);
  const output = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const loadedModule = { exports: {} };
  runInNewContext(output, {
    module: loadedModule,
    exports: loadedModule.exports,
    process: { env: {} },
    require: (name) => Object.hasOwn(mocks, name) ? mocks[name] : localRequire(name),
  }, { filename });
  return loadedModule.exports;
}

const richText = (text) => ({ root: { children: [
  { type: "paragraph", children: [{ type: "text", text, format: 1 }] },
] } });
const baseStudy = {
  title: "Fixture project", slug: "fixture", summary: "Summary fixture",
  industry: "Retail", heroImage: { url: "/hero.jpg", alt: "Hero fixture" },
  services: [{ name: "Service fixture" }], challenge: richText("Challenge fixture"),
  approach: [{ title: "Approach fixture", description: "Our strategy" }],
  results: [{ value: "Results fixture", label: "Qualified leads" }],
};
const richTextModule = loadTS("../components/RichText.tsx");
const readingTime = loadTS("../lib/case-study-reading-time.ts");
const cms = loadTS("../lib/cms.ts", {});

async function renderStudy(study) {
  const { default: Page } = loadTS("../app/case-studies/[slug]/page.tsx", {
    "@/components/RichText": richTextModule,
    "@/lib/cms": { ...cms, getCaseStudy: async () => study },
    "@/lib/seo": { getRobotsMetadata: () => undefined },
    "@/lib/case-study-reading-time": readingTime,
  });
  return renderToStaticMarkup(await Page({ params: Promise.resolve({ slug: "fixture" }) }));
}

test("renders authored sections in order, with comparison values and accessible evidence", async () => {
  const html = await renderStudy({
    ...baseStudy,
    beforeAfter: { title: "Comparison fixture", description: "Comparison context", items: [
      { label: "Conversion rate", beforeValue: "1%", afterValue: "4%" },
    ] },
    performanceEvidence: { title: "Evidence fixture", description: "Evidence context", images: [
      { image: { url: "/report.png" }, altText: "Analytics report", caption: "Reporting period" },
    ] },
    finalOutcome: { title: "Outcome fixture", description: richText("Sustainable growth") },
  });
  const sections = ["Hero fixture", "Summary fixture", "Service fixture", "Challenge fixture",
    "Approach fixture", "Comparison fixture", "Results fixture", "Evidence fixture", "Outcome fixture"];
  let previous = -1;
  for (const section of sections) {
    const position = html.indexOf(section);
    assert.ok(position > previous, `${section} should follow the preceding section`);
    previous = position;
  }
  assert.match(html, /scope="row"[^>]*>Conversion rate/);
  assert.match(html, />1%<\/td>/);
  assert.match(html, />4%<\/td>/);
  assert.match(html, /alt="Analytics report"/);
  assert.match(html, /<figcaption[^>]*>Reporting period<\/figcaption>/);
  assert.match(html, /<strong>Sustainable growth<\/strong>/);
});

test("legacy and empty optional sections render without empty headings", async () => {
  for (const study of [baseStudy, {
    ...baseStudy, beforeAfter: { items: [] }, performanceEvidence: { images: [] },
    finalOutcome: { description: richText("") },
  }]) {
    const html = await renderStudy(study);
    assert.doesNotMatch(html, /id="case-study-(before-after|evidence|final-outcome)"/);
    assert.match(html, /Results fixture/);
  }
});

test("reading time includes the final outcome and retains the one-minute minimum", () => {
  assert.equal(readingTime.estimateCaseStudyReadingTime({ summary: "Short summary" }), 1);
  assert.equal(readingTime.estimateCaseStudyReadingTime({
    summary: "Short summary", finalOutcome: { description: richText("word ".repeat(400)) },
  }), 3);
});
