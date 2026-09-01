import { NextResponse } from "next/server";
import { Resend } from "resend";
import { formatInquiry, parseInquiry } from "@/lib/inquiry";
import { site } from "@/lib/site";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return req.headers.get("cf-connecting-ip") ?? "unknown";
}

function isAllowedOrigin(origin: string): boolean {
  let host: string;
  try {
    host = new URL(origin).hostname;
  } catch {
    return false;
  }

  const siteHost = new URL(site.url).hostname;
  if (host === siteHost || host === `www.${siteHost}`) {
    return true;
  }
  if (host.endsWith(".vercel.app")) {
    return true;
  }

  const extra = (process.env.INQUIRY_ORIGIN ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return extra.includes(origin);
}

function isLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((stamp) => now - stamp < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    const origin = req.headers.get("origin");
    if (origin && !isAllowedOrigin(origin)) {
      return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
    }
  }

  if (isLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "Too many inquiries. Try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = parseInquiry(body);
  if (!parsed.ok) {
    return NextResponse.json({ errors: parsed.errors }, { status: 400 });
  }

  if (parsed.spam) {
    return NextResponse.json({ ok: true });
  }

  const to = process.env.INQUIRY_TO;
  const key = process.env.RESEND_API_KEY;

  if (!to || !key) {
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ ok: true, dev: true });
    }
    return NextResponse.json(
      { error: "Inbox is not connected yet." },
      { status: 503 },
    );
  }

  const from =
    process.env.RESEND_FROM ?? "A8 Enterprises <beth.t@example.com>";
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: parsed.data.email,
    subject: `Inquiry from ${parsed.data.company}`,
    text: formatInquiry(parsed.data),
  });

  if (error) {
    return NextResponse.json(
      { error: "Could not send. Email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
