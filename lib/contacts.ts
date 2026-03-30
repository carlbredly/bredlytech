import "server-only";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";

export interface ContactSubmissionRow {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string;
  project_type: string;
  message: string;
}

export async function insertContactSubmission(input: {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isSupabaseConfigured()) {
    console.error(
      "[contact] Supabase non configuré : définir NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY (ex. Vercel → Settings → Environment Variables)."
    );
    return { ok: false, error: "server_config" };
  }
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("contact_submissions").insert({
    name: input.name,
    email: input.email,
    company: input.company,
    project_type: input.projectType,
    message: input.message,
  });
  if (error) {
    console.error("[contact] insert error", error.message);
    return { ok: false, error: "save_failed" };
  }
  return { ok: true };
}

export async function listContactSubmissions(): Promise<ContactSubmissionRow[]> {
  if (!isSupabaseConfigured()) {
    throw new Error("supabase_not_configured");
  }
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("id, created_at, name, email, company, project_type, message")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) {
    console.error("[contact] list error", error.message);
    throw new Error("Impossible de charger les messages.");
  }
  return (data ?? []) as ContactSubmissionRow[];
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function deleteContactSubmission(
  id: string
): Promise<
  { ok: true } | { ok: false; error: "invalid_id" | "server_config" | "delete_failed" }
> {
  const trimmed = id.trim();
  if (!UUID_RE.test(trimmed)) {
    return { ok: false, error: "invalid_id" };
  }
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "server_config" };
  }
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("contact_submissions")
    .delete()
    .eq("id", trimmed);
  if (error) {
    console.error("[contact] delete error", error.message);
    return { ok: false, error: "delete_failed" };
  }
  return { ok: true };
}
