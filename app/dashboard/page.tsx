import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { SERVICES } from "@/lib/services";
import { logout } from "./actions";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  first_name: string;
  email: string;
  service: string;
  created_at: string;
};

function serviceLabel(value: string): string {
  return SERVICES.find((s) => s.value === value)?.label ?? value;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function DashboardPage() {
  if (!(await isAuthenticated())) {
    redirect("/dashboard/login");
  }

  const { data, error } = await getSupabaseAdmin()
    .from("leads")
    .select("id, first_name, email, service, created_at")
    .order("created_at", { ascending: false });

  const leads: Lead[] = data ?? [];

  // Stats
  const total = leads.length;
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const last7 = leads.filter((l) => new Date(l.created_at).getTime() >= weekAgo).length;
  const byService = new Map<string, number>();
  for (const l of leads) {
    byService.set(l.service, (byService.get(l.service) ?? 0) + 1);
  }
  const topService = [...byService.entries()].sort((a, b) => b[1] - a[1])[0];

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-navy/10 bg-navy">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand font-serif text-lg font-extrabold text-navy">
              MG
            </span>
            <div className="leading-tight">
              <p className="font-serif text-lg font-bold text-white">MG CERVIS</p>
              <p className="text-xs uppercase tracking-widest text-brand">
                Tableau de bord — Leads
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/dashboard/export"
              className="rounded-lg bg-brand px-4 py-2 text-sm font-bold text-navy transition hover:bg-brand-light"
            >
              Exporter CSV
            </a>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {error && (
          <p className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            Erreur de chargement des leads : {error.message}
          </p>
        )}

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <p className="text-sm text-ink-soft">Total leads</p>
            <p className="mt-1 font-serif text-3xl font-bold text-navy">{total}</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <p className="text-sm text-ink-soft">7 derniers jours</p>
            <p className="mt-1 font-serif text-3xl font-bold text-navy">{last7}</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <p className="text-sm text-ink-soft">Service le plus demandé</p>
            <p className="mt-1 font-serif text-xl font-bold text-navy">
              {topService ? `${serviceLabel(topService[0])} (${topService[1]})` : "—"}
            </p>
          </div>
        </div>

        {/* Liste */}
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-100 text-xs uppercase tracking-wider text-ink-soft">
              <tr>
                <th className="px-5 py-3 font-semibold">Prénom</th>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Service</th>
                <th className="px-5 py-3 font-semibold">Reçu le</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-ink-soft">
                    Aucun lead pour l&apos;instant.
                  </td>
                </tr>
              ) : (
                leads.map((l) => (
                  <tr key={l.id} className="hover:bg-stone-50">
                    <td className="px-5 py-3 font-medium text-ink">{l.first_name}</td>
                    <td className="px-5 py-3">
                      <a href={`mailto:${l.email}`} className="text-navy hover:underline">
                        {l.email}
                      </a>
                    </td>
                    <td className="px-5 py-3">
                      <span className="rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-navy">
                        {serviceLabel(l.service)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-ink-soft">{formatDate(l.created_at)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
