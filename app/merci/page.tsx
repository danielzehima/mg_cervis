import Link from "next/link";
import { CheckCircle2, Home, Instagram, Facebook } from "lucide-react";

export const metadata = {
  title: "Merci ! Votre demande a bien été reçue",
  robots: { index: false }, // pas d'indexation de la page de confirmation
};

export default function MerciPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-5 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-stone-200 bg-white p-9 text-center shadow-xl sm:p-12">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand/10">
          <CheckCircle2 className="h-11 w-11 text-brand" />
        </div>

        <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">
          Merci pour votre demande !
        </h1>

        <p className="mt-4 text-ink-soft">
          Votre demande de devis a bien été enregistrée. Notre équipe étudie
          votre projet et vous recontactera{" "}
          <span className="font-semibold text-ink">sous 24 heures</span> pour
          échanger sur vos besoins.
        </p>

        <p className="mt-3 text-sm text-stone-500">
          Pensez à vérifier vos courriers indésirables si vous ne recevez pas de
          réponse de notre part.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-7 py-3.5 font-semibold text-white transition hover:bg-ink-soft"
        >
          <Home className="h-5 w-5" />
          Retour à l&apos;accueil
        </Link>

        <div className="mt-9 border-t border-stone-100 pt-6">
          <p className="mb-4 text-sm text-ink-soft">
            En attendant, suivez nos réalisations
          </p>
          <div className="flex justify-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink transition hover:bg-brand hover:text-white"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink transition hover:bg-brand hover:text-white"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
