import type { Metadata } from "next";

export function getRobotsMetadata(value?: string | null): Metadata["robots"] {
  if (!value) return undefined;

  const directives = value.toLowerCase().split(",").map((item) => item.trim());
  return {
    follow: !directives.includes("nofollow"),
    index: !directives.includes("noindex"),
  };
}
