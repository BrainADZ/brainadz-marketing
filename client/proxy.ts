import { NextRequest, NextResponse } from "next/server";
import { isLegacyPostQuery } from "@/lib/legacy-urls";

type RedirectDocument = {
  from?: string;
  to?: {
    reference?: {
      relationTo?: string;
      value?: { slug?: string } | string;
    };
    type?: "custom" | "reference";
    url?: string;
  };
  type?: "301" | "302";
};

const cmsURL = (process.env.CMS_API_URL || process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001").replace(/\/$/, "");

function resolveDestination(redirect: RedirectDocument): string | null {
  if (redirect.to?.type === "custom") return redirect.to.url || null;

  const reference = redirect.to?.reference;
  const value = reference?.value;
  if (!reference || typeof value !== "object" || !value?.slug) return null;

  if (reference.relationTo === "blog-posts") return `/blog/${value.slug}`;
  if (reference.relationTo === "case-studies") return `/case-studies/${value.slug}`;
  return null;
}

export async function proxy(request: NextRequest) {
  // Old WordPress post IDs have no mapping in the new CMS. Serving the
  // homepage here falsely reports a successful page for removed content.
  if (isLegacyPostQuery(request.nextUrl.pathname, request.nextUrl.searchParams)) {
    return new NextResponse("This page could not be found.", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  try {
    const query = new URLSearchParams({
      depth: "1",
      limit: "1",
      "where[from][equals]": request.nextUrl.pathname,
    });
    const response = await fetch(`${cmsURL}/api/redirects?${query}`, {
      headers: { accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!response.ok) return NextResponse.next();

    const data = (await response.json()) as { docs?: RedirectDocument[] };
    const redirect = data.docs?.[0];
    const destination = redirect ? resolveDestination(redirect) : null;
    if (!redirect || !destination) return NextResponse.next();

    return NextResponse.redirect(new URL(destination, request.url), Number(redirect.type || 301));
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
