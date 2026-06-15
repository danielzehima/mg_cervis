"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Send, AlertCircle, ShieldCheck } from "lucide-react";
import { SERVICES } from "@/lib/services";

type Status = "idle" | "loading" | "error";

export default function LeadForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      firstName: String(formData.get("firstName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      service: String(formData.get("service") || ""),
    };

    // Validation côté client (le backend re-valide de toute façon)
    if (!payload.firstName || !payload.email || !payload.service) {
      setStatus("error");
      setErrorMsg("Merci de remplir tous les champs.");
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Une erreur est survenue. Réessayez.");
      }

      // Succès → redirection vers la page de remerciement
      router.push("/merci");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Une erreur est survenue."
      );
    }
  }

  const isLoading = status === "loading";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="firstName"
          className="mb-1.5 block text-sm font-medium text-ink-soft"
        >
          Prénom
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          required
          autoComplete="given-name"
          placeholder="Votre prénom"
          disabled={isLoading}
          className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30 disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-ink-soft"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="vous@exemple.com"
          disabled={isLoading}
          className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30 disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="service"
          className="mb-1.5 block text-sm font-medium text-ink-soft"
        >
          Le service qui vous intéresse
        </label>
        <select
          id="service"
          name="service"
          required
          defaultValue=""
          disabled={isLoading}
          className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30 disabled:opacity-60"
        >
          <option value="" disabled>
            Sélectionnez un service…
          </option>
          {SERVICES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
          <option value="autre">Autre / Plusieurs services</option>
        </select>
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand/20 transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Envoi en cours…
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Recevoir mon devis gratuit
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-stone-500">
        <ShieldCheck className="h-3.5 w-3.5" />
        Vos données restent confidentielles. Aucun spam.
      </p>
    </form>
  );
}
