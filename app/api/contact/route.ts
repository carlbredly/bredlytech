import { NextResponse } from "next/server";
import { insertContactSubmission } from "@/lib/contacts";
import { sendContactNotificationEmail } from "@/lib/notify-contact-email";

const PROJECT_TYPES = new Set([
  "",
  "Web Development",
  "Mobile App",
  "SaaS Platform",
  "AI Solution",
  "UI/UX Design",
  "Other",
]);

function clamp(s: string, max: number): string {
  return s.trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? clamp(b.name, 200) : "";
  const email = typeof b.email === "string" ? clamp(b.email, 320) : "";
  const company = typeof b.company === "string" ? clamp(b.company, 200) : "";
  const projectType =
    typeof b.projectType === "string" ? clamp(b.projectType, 100) : "";
  const message = typeof b.message === "string" ? clamp(b.message, 10000) : "";

  if (!name) {
    return NextResponse.json({ error: "name_required" }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "email_invalid" }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "message_required" }, { status: 400 });
  }
  if (!PROJECT_TYPES.has(projectType)) {
    return NextResponse.json({ error: "project_type_invalid" }, { status: 400 });
  }

  const result = await insertContactSubmission({
    name,
    email,
    company,
    projectType,
    message,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 503 });
  }

  const emailResult = await sendContactNotificationEmail({
    name,
    email,
    company,
    projectType,
    message,
  });

  if (emailResult.outcome === "failed") {
    console.error(
      "[api/contact] Supabase OK mais Resend a refusé / échoué:",
      emailResult.message
    );
  }

  return NextResponse.json({ ok: true });
}
