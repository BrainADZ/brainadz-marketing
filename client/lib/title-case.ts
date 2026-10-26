const SMALL_WORDS = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into",
  "is", "nor", "of", "on", "onto", "or", "over", "per", "so", "than",
  "that", "the", "this", "to", "via", "with", "yet",
]);
const ACRONYMS = new Set([
  "ADZ", "AEO", "AI", "API", "B2B", "B2C", "CEO", "CMS", "CRM", "CSS",
  "FAQ", "FAQS", "GEO", "HTML", "JS", "NCR", "PPC", "ROI", "SEM", "SEO",
  "SMM", "SMO", "UI", "URL", "URLS", "UX",
]);

const WORD = /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu;

export function toWebsiteTitleCase(value: string): string {
  const matches = [...value.matchAll(WORD)];

  return value.replace(WORD, (word, offset: number) => {
    // Leave URLs, email addresses, numbers, acronyms, and branded casing intact.
    const before = value.slice(0, offset);
    const tokenStart = Math.max(before.lastIndexOf(" "), before.lastIndexOf("\n"), before.lastIndexOf("\t")) + 1;
    const token = value.slice(tokenStart).split(/\s/)[0];
    if (/[@:/\\]/.test(token) || /^\d/.test(word) || ACRONYMS.has(word) ||
        /[a-z][A-Z]|[A-Z][a-z]+[A-Z]/.test(word)) {
      return word;
    }

    const lower = word.toLocaleLowerCase("en");
    if (offset !== matches[0]?.index && SMALL_WORDS.has(lower)) {
      return lower;
    }
    return lower.charAt(0).toLocaleUpperCase("en") + lower.slice(1);
  });
}
