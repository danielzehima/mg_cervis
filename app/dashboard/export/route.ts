import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/** Échappe un champ pour le format CSV. */
function csvCell(value: string): string {
  const v = value ?? "";
  return /[",\n;]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("leads")
    .select("first_name, email, service, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const header = ["Prénom", "Email", "Service", "Reçu le"];
  const rows = (data ?? []).map((l) =>
    [l.first_name, l.email, l.service, l.created_at].map((c) => csvCell(String(c))).join(",")
  );
  // BOM pour qu'Excel ouvre l'UTF-8 correctement.
  const csv = "﻿" + [header.join(","), ...rows].join("\n");

  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-mg-cervis-${date}.csv"`,
    },
  });
}
