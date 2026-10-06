import Image from "next/image";
import type { ReactNode } from "react";

import { getCMSImageURL, type CMSImage } from "@/lib/cms";

type RichTextNode = {
  children?: RichTextNode[];
  colSpan?: number;
  headerState?: number;
  rowSpan?: number;
  fields?: {
    blockType?: string;
    heading?: string;
    items?: Array<{ answer?: string; id?: string; question?: string }>;
    newTab?: boolean;
    url?: string;
  };
  format?: number;
  listType?: string;
  relationTo?: string;
  tag?: string;
  text?: string;
  type?: string;
  value?: CMSImage | number | string;
};

const getRoot = (data: unknown): RichTextNode | undefined =>
  (data as { root?: RichTextNode } | null)?.root;

const nodeText = (node: RichTextNode): string => {
  if (node.text) return node.text;
  const separator = ["root", "list", "table", "tablerow", "tablecell"].includes(node.type || "") ? " " : "";
  return node.children?.map(nodeText).join(separator) || "";
};

export function getRichTextPreview(data: unknown, maxLength = 200): string {
  const text = nodeText(getRoot(data) || {}).replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

export function hasRichTextContent(data: unknown): boolean {
  const root = getRoot(data);
  return Boolean(root?.children?.some((node) => node.type === "upload" || nodeText(node).trim()));
}

const headingID = (node: RichTextNode): string =>
  nodeText(node)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function getTableOfContents(data: unknown) {
  return (getRoot(data)?.children || [])
    .filter((node) => node.type === "heading" && ["h2", "h3", "h4"].includes(node.tag || ""))
    .map((node) => ({ id: headingID(node), label: nodeText(node), level: Number(node.tag?.slice(1)) }))
    .filter((item) => item.id && item.label);
}

function renderNode(node: RichTextNode, key: string): ReactNode {
  if (node.type === "text") {
    let content: ReactNode = node.text || "";
    if (node.format && (node.format & 1) !== 0) content = <strong>{content}</strong>;
    if (node.format && (node.format & 2) !== 0) content = <em>{content}</em>;
    if (node.format && (node.format & 8) !== 0) content = <u>{content}</u>;
    if (node.format && (node.format & 4) !== 0) content = <s>{content}</s>;
    if (node.format && (node.format & 16) !== 0) content = <code>{content}</code>;
    return <span key={key}>{content}</span>;
  }

  const children = node.children?.map((child, index) => renderNode(child, `${key}-${index}`));

  if (node.type === "table") {
    return (
      <div key={key} className="my-8 max-w-full overflow-x-auto rounded-xl border border-black/15">
        <table className="w-full border-collapse text-left text-sm sm:text-base">
          <tbody>{children}</tbody>
        </table>
      </div>
    );
  }
  if (node.type === "tablerow") return <tr key={key}>{children}</tr>;
  if (node.type === "tablecell") {
    const isHeader = Boolean(node.headerState);
    const Cell = isHeader ? "th" : "td";
    return (
      <Cell
        key={key}
        colSpan={node.colSpan && node.colSpan > 1 ? node.colSpan : undefined}
        rowSpan={node.rowSpan && node.rowSpan > 1 ? node.rowSpan : undefined}
        scope={node.headerState === 1 ? "col" : node.headerState === 2 ? "row" : undefined}
        className={`min-w-32 border border-black/15 px-4 py-3 align-top [&>p]:text-inherit [&>p]:leading-7 ${isHeader ? "bg-black/5 font-semibold text-black" : "text-black/70"}`}
      >
        {children}
      </Cell>
    );
  }

  if (node.type === "heading") {
    const headings = { h1: "h1", h2: "h2", h3: "h3", h4: "h4", h5: "h5", h6: "h6" } as const;
    const Heading = headings[node.tag as keyof typeof headings] || "h2";
    const size = Heading === "h1" || Heading === "h2" ? "text-3xl" : Heading === "h3" ? "text-2xl" : "text-xl";
    return <Heading id={headingID(node)} key={key} className={`scroll-mt-28 pt-4 font-semibold tracking-[-0.03em] ${size}`}>{children}</Heading>;
  }
  if (node.type === "upload" && node.relationTo === "media") {
    const source = getCMSImageURL(node.value);
    if (!source) return null;
    const media = typeof node.value === "object" && node.value !== null ? node.value : null;
    return (
      <figure key={key} className="my-8 overflow-hidden rounded-2xl bg-[#f3f3f3]">
        <Image src={source} alt={media?.alt || "Article image"} width={media?.width || 1200} height={media?.height || 800} sizes="(max-width: 768px) 100vw, 800px" className="h-auto w-full object-contain" />
      </figure>
    );
  }
  if ((node.type === "link" || node.type === "autolink") && node.fields?.url) {
    const url = node.fields.url;
    const safeURL = /^(https?:\/\/|\/|#|mailto:|tel:)/i.test(url) ? url : "#";
    return <a key={key} href={safeURL} target={node.fields.newTab ? "_blank" : undefined} rel={node.fields.newTab ? "noopener noreferrer" : undefined} className="text-[#E1122B] underline underline-offset-2">{children}</a>;
  }
  if (node.type === "block" && node.fields?.blockType === "faq") {
    return (
      <section key={key} className="my-12 rounded-2xl border border-black/10 bg-[#fbfbfb] p-6 sm:p-8">
        <h2 className="text-3xl font-semibold tracking-[-0.03em]">{node.fields.heading || "Frequently Asked Questions"}</h2>
        <div className="mt-6 divide-y divide-black/10 border-y border-black/10">
          {node.fields.items?.map((item, index) => (
            <details key={item.id || `${key}-${index}`} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold">{item.question}<span className="text-2xl font-light text-[#E1122B] group-open:rotate-45">+</span></summary>
              <p className="pr-10 pt-4 leading-7 text-black/65">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    );
  }
  if (node.type === "list") return node.listType === "number" ? <ol key={key} className="my-6 list-decimal space-y-2 pl-6">{children}</ol> : <ul key={key} className="my-6 list-disc space-y-2 pl-6">{children}</ul>;
  if (node.type === "listitem") return <li key={key}>{children}</li>;
  if (node.type === "quote") return <blockquote key={key} className="border-l-4 border-[#E1122B] pl-5 italic text-black/70">{children}</blockquote>;
  if (node.type === "linebreak") return <br key={key} />;
  if (node.type === "paragraph") return <p key={key} className="text-[16px] leading-8 text-black/68 sm:text-[18px]">{children}</p>;
  return <div key={key}>{children}</div>;
}

export function RichText({ data }: { data: unknown }) {
  const root = getRoot(data);
  if (!root?.children?.length) return null;
  return <div className="space-y-5">{root.children.map((node, index) => renderNode(node, String(index)))}</div>;
}
