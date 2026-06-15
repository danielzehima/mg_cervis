"use client";

import { useActionState } from "react";
import { login } from "../actions";

const initialState: { error?: string } = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand font-serif text-lg font-extrabold text-navy">
            MG
          </span>
          <div className="leading-tight">
            <p className="font-serif text-lg font-bold text-navy">MG CERVIS</p>
            <p className="text-xs uppercase tracking-widest text-brand">
              Tableau de bord
            </p>
          </div>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-ink-soft"
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoFocus
              required
              className="w-full rounded-lg border border-stone-300 px-3 py-2.5 outline-none focus:border-navy focus:ring-2 focus:ring-navy/20"
            />
          </div>

          {state?.error && (
            <p className="text-sm font-medium text-red-600">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-navy px-4 py-2.5 font-semibold text-white transition hover:bg-navy-light disabled:opacity-60"
          >
            {pending ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </main>
  );
}
