"use client";

import { useEffect } from "react";
import { toWebsiteSentenceCase, toWebsiteTitleCase } from "@/lib/title-case";

const SKIP = "script, style, noscript, textarea, input, select, option, code, pre, svg, [contenteditable], [data-preserve-case]";

export default function TitleCaseContent() {
  useEffect(() => {
    const update = (root: Node) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = root.nodeType === Node.TEXT_NODE ? [root as Text] : [];
      while (walker.nextNode()) nodes.push(walker.currentNode as Text);

      for (const node of nodes) {
        const parent = node.parentElement;
        if (!parent || parent.closest(SKIP)) continue;
        const original = node.nodeValue;
        if (!original || !/[a-z]/i.test(original)) continue;
        const isHeading = parent.closest('h1, h2, h3, h4, h5, h6, [data-title-case]');
        const paragraph = parent.closest("p");
        // Short paragraphs often contain names, roles, locations, or UI labels.
        // Only prose paragraphs should be rewritten as sentences.
        const isProse = paragraph && (original.trim().split(/\s+/).length >= 8 || /[.!?]\s*$/.test(original.trim()));
        if (!isHeading && !isProse) continue;
        const formatted = isHeading
          ? toWebsiteTitleCase(original)
          : toWebsiteSentenceCase(original);
        if (formatted !== original) node.nodeValue = formatted;
      }
    };

    update(document.body);
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === "characterData") update(record.target.parentNode ?? record.target);
        else for (const node of record.addedNodes) update(node);
      }
    });
    observer.observe(document.body, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
