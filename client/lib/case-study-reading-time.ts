function richTextWords(value: unknown): string {
  if (!value || typeof value !== "object") return "";
  const node = value as { text?: unknown; children?: unknown[]; root?: unknown };
  return [
    typeof node.text === "string" ? node.text : "",
    Array.isArray(node.children) ? node.children.map(richTextWords).join(" ") : "",
    node.root ? richTextWords(node.root) : "",
  ].join(" ");
}

export function estimateCaseStudyReadingTime(study: {
  summary: string;
  challenge?: unknown;
  approach?: Array<{ title: string; description: string }> | null;
  results?: Array<{ value: string; label: string }> | null;
}): number {
  const text = [
    study.summary,
    richTextWords(study.challenge),
    ...(study.approach || []).map((item) => `${item.title} ${item.description}`),
    ...(study.results || []).map((item) => `${item.value} ${item.label}`),
  ].join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}
