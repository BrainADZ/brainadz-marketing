import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

const appDir = join(import.meta.dirname, "..", "app");
const errors = [];
let checked = 0;

function checkDirectory(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) checkDirectory(join(dir, entry.name));
  }

  const pageFile = join(dir, "page.tsx");
  let page;
  try {
    page = readFileSync(pageFile, "utf8");
  } catch {
    return;
  }

  const route = `/${relative(appDir, dir).split(sep).filter(Boolean).join("/")}`;
  if (route.includes("[")) return; // CMS routes have a canonical built from the slug.

  const layoutFile = join(dir, "layout.tsx");
  const metadata = page.includes("export const metadata: Metadata")
    ? page
    : existsSync(layoutFile)
      ? readFileSync(layoutFile, "utf8")
      : page;
  const match = metadata.match(/\bcanonical:\s*["']([^"']+)["']/);
  const canonical = match?.[1];
  const expected = route === "/" ? "/" : route;

  checked += 1;
  if (!canonical) errors.push(`${route}: missing canonical`);
  else if (canonical !== expected) errors.push(`${route}: ${canonical} (expected ${expected})`);
}

checkDirectory(appDir);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${checked} static page canonicals.`);
}
