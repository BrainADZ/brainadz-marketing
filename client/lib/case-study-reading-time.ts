function richTextWords(value: unknown): string {
  if (!value || typeof value !== "object") return "";
  const node = value as { text?: unknown; children?: unknown[]; root?: unknown };
  return [
    typeof node.text === "string" ? node.text : "",
    Array.isArray(node.children) ? node.children.map(richTextWords).join(" ") : "",
    node.root ? richTextWords(node.root) : "",
  ].join(" ");
}

export function estimateCaseStudyReadingTime(study: Pick<
  import("./cms").CMSCaseStudy,
  "summary" | "challenge" | "approach" | "beforeAfter" | "results" | "performanceEvidence" | "finalOutcome"
>): number {
  const text = [
    study.summary,
    richTextWords(study.challenge),
    ...(study.approach || []).map((item) => `${item.title} ${item.description}`),
    study.beforeAfter?.title,
    study.beforeAfter?.description,
    ...(study.beforeAfter?.items || []).map((item) => `${item.label} ${item.beforeValue} ${item.afterValue}`),
    ...(study.results || []).map((item) => `${item.value} ${item.label}`),
    study.performanceEvidence?.title,
    study.performanceEvidence?.description,
    ...(study.performanceEvidence?.images || []).map((item) => item.caption),
    study.finalOutcome?.title,
    richTextWords(study.finalOutcome?.description),
  ].join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}
