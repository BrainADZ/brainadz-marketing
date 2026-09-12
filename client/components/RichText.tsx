import type { ReactNode } from "react";

type RichTextNode = {
  children?: RichTextNode[];
  fields?: {
    blockType?: string;
    heading?: string;
    items?: Array<{ answer?: string; id?: string; question?: string }>;
  };
  format?: number;
  tag?: string;
  text?: string;
  type?: string;
};

const nodeText = (node: RichTextNode): string =>
  node.text || node.children?.map(nodeText).join("") || "";

const headingID = (node: RichTextNode): string =>
  nodeText(node)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function getTableOfContents(data: unknown) {
  const root = (data as { root?: RichTextNode } | null)?.root;
  return (root?.children || [])
    .filter((node) => node.type === "heading" && (node.tag === "h2" || node.tag === "h3"))
    .map((node) => ({ id: headingID(node), label: nodeText(node), level: node.tag === "h3" ? 3 : 2 }))
    .filter((item) => item.id && item.label);
}

function renderNode(node: RichTextNode, key: string): ReactNode {
  if (node.type === "text") {
    let content: ReactNode = node.text || "";
    if (node.format && (node.format & 1) !== 0) content = <strong>{content}</strong>;
    if (node.format && (node.format & 2) !== 0) content = <em>{content}</em>;
    return <span key={key}>{content}</span>;
  }

  const children = node.children?.map((child, index) =>
    renderNode(child, `${key}-${index}`),
  );

  if (node.type === "heading") {
    const Heading = node.tag === "h3" ? "h3" : "h2";
    return <Heading id={headingID(node)} key={key} className="scroll-mt-28 pt-4 text-3xl font-semibold tracking-[-0.03em]">{children}</Heading>;
  }
  if (node.type === "block" && node.fields?.blockType === "faq") {
    return (
      <section key={key} className="my-12 rounded-2xl border border-black/10 bg-[#fbfbfb] p-6 sm:p-8">
        <h2 className="text-3xl font-semibold tracking-[-0.03em]">{node.fields.heading || "Frequently Asked Questions"}</h2>
        <div className="mt-6 divide-y divide-black/10 border-y border-black/10">
          {node.fields.items?.map((item, index) => (
            <details key={item.id || `${key}-${index}`} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold">
                {item.question}
                <span className="text-2xl font-light text-[#E1122B] group-open:rotate-45">+</span>
              </summary>
              <p className="pr-10 pt-4 leading-7 text-black/65">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    );
  }
  if (node.type === "list") return <ul key={key} className="my-6 list-disc space-y-2 pl-6">{children}</ul>;
  if (node.type === "listitem") return <li key={key}>{children}</li>;
  if (node.type === "paragraph") return <p key={key} className="text-[16px] leading-8 text-black/68 sm:text-[18px]">{children}</p>;
  return <div key={key}>{children}</div>;
}

export function RichText({ data }: { data: unknown }) {
  const root = (data as { root?: RichTextNode } | null)?.root;
  if (!root?.children?.length) return null;
  return <div className="space-y-5">{root.children.map((node, index) => renderNode(node, String(index)))}</div>;
}
