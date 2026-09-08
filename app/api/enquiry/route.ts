import { NextResponse } from "next/server";

const DEFAULT_CRM_API_URL = "https://crmapi.brainadzlive.in";
const MAX_FIELD_LENGTHS = {
  name: 160,
  email: 254,
  phone: 30,
  company: 200,
  serviceCategory: 160,
  service: 240,
  message: 10_000,
  source: 160,
  pageUrl: 2_048,
} as const;

type EnquiryField = keyof typeof MAX_FIELD_LENGTHS;

function getText(body: Record<string, unknown>, field: EnquiryField) {
  const value = body[field];

  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, MAX_FIELD_LENGTHS[field]);
}

function getCrmApiUrl() {
  return (process.env.CRM_API_BASE_URL || DEFAULT_CRM_API_URL).replace(
    /\/$/,
    "",
  );
}

export async function POST(request: Request) {
  const ingestionKey = process.env.CRM_WEBSITE_INGESTION_KEY;

  if (!ingestionKey) {
    console.error("CRM_WEBSITE_INGESTION_KEY is not configured");

    return NextResponse.json(
      { message: "Enquiry service is temporarily unavailable." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;

  try {
    const parsedBody: unknown = await request.json();

    if (
      !parsedBody ||
      typeof parsedBody !== "object" ||
      Array.isArray(parsedBody)
    ) {
      throw new Error("Request body must be an object");
    }

    body = parsedBody as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { message: "Invalid enquiry request." },
      { status: 400 },
    );
  }

  const enquiry = {
    name: getText(body, "name"),
    email: getText(body, "email").toLowerCase(),
    phone: getText(body, "phone"),
    company: getText(body, "company"),
    serviceCategory: getText(body, "serviceCategory"),
    service: getText(body, "service"),
    message: getText(body, "message"),
    source: getText(body, "source") || "BrainADZ website",
    pageUrl: getText(body, "pageUrl"),
  };

  if (!enquiry.name || !enquiry.email || !enquiry.phone) {
    return NextResponse.json(
      { message: "Name, email and phone are required." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) {
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const phoneDigits = enquiry.phone.replace(/\D/g, "");

  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    return NextResponse.json(
      { message: "Enter a valid phone number." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `${getCrmApiUrl()}/api/website-enquiries/public`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Website-Key": ingestionKey,
        },
        body: JSON.stringify(enquiry),
        cache: "no-store",
      },
    );
    const result = (await response.json().catch(() => null)) as {
      message?: string;
      enquiryNumber?: string;
    } | null;

    if (!response.ok) {
      console.error("CRM enquiry API rejected a submission", {
        status: response.status,
        message: result?.message,
      });

      return NextResponse.json(
        { message: "Unable to submit your enquiry right now." },
        { status: response.status >= 500 ? 502 : response.status },
      );
    }

    return NextResponse.json(
      {
        message: result?.message || "Enquiry submitted successfully.",
        enquiryNumber: result?.enquiryNumber,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CRM enquiry API could not be reached", error);

    return NextResponse.json(
      { message: "Unable to submit your enquiry right now." },
      { status: 502 },
    );
  }
}
