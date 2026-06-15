import Image from "next/image";
import {
  ArrowRight,
  Award,
  CalendarCheck,
  Mail,
  MapPin,
  PencilRuler,
  Phone,
  Star,
} from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/Reveal";

// Galerie de chantiers réels (photos dans /public/realisations/).
const REALISATIONS = [
  {
    image: "/realisations/moquette-salle-reunion.jpg",
    label: "Moquettes",
    tagline: "Confort & acoustique",
    description:
      "Pose de moquette haut de gamme pour salons, salles de réunion et chambres d'hôtel. Finitions soignées et isolation phonique.",
  },
  {
    image: "/realisations/habillage-mural-arcade.jpg",
    label: "Habillages muraux",
    tagline: "Caractère & élégance",
    description:
      "Fresques murales et panoramiques rétro-éclairés qui transforment une pièce et lui donnent une véritable identité.",
  },
  {
    image: "/realisations/habillage-bois.jpg",
    label: "Habillage bois & acoustique",
    tagline: "Chaleur & design",
    description:
      "Panneaux à tasseaux et habillages bois pour des murs chaleureux, design et acoustiquement performants.",
  },
  {
    image: "/realisations/store-banne.jpg",
    label: "Stores & bannes",
    tagline: "Lumière maîtrisée",
    description:
      "Stores bannes et toiles sur mesure pour terrasses et balcons : protection solaire et confort tout au long de l'année.",
  },
  {
    image: "/realisations/rideaux.jpg",
    label: "Rideaux",
    tagline: "Habillage textile",
    description:
      "Confection et pose de rideaux et voilages sur mesure : tissus occultants, embrasses à pampilles et finitions cousues main.",
  },
  {
    image: "/realisations/gazon-stade.jpg",
    label: "Gazons synthétiques",
    tagline: "Vert toute l'année",
    description:
      "Gazon synthétique réaliste et durable pour stades, terrasses et espaces extérieurs. Rendu naturel, zéro entretien.",
  },
  {
    image: "/realisations/terrain-sport.jpg",
    label: "Terrains de sport",
    tagline: "Revêtements techniques",
    description:
      "Revêtements sportifs sur mesure pour terrains de tennis, padel et multisports : adhérence, traçage et finitions pro.",
  },
];

const REASONS = [
  {
    icon: Award,
    title: "Matériaux de qualité",
    text: "Nous sélectionnons des matériaux durables et certifiés auprès de fournisseurs reconnus, pour des finitions qui traversent le temps.",
  },
  {
    icon: CalendarCheck,
    title: "Respect des délais",
    text: "Un planning clair, des équipes ponctuelles et un chantier livré dans les temps. Votre tranquillité est notre priorité.",
  },
  {
    icon: PencilRuler,
    title: "Devis sur mesure",
    text: "Chaque projet est unique. Nous étudions vos espaces et votre budget pour une proposition précise et transparente.",
  },
];

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      {/* ============ HEADER ============ */}
      <header className="sticky top-0 z-50 border-b border-navy/10 bg-white/90 backdrop-blur">
        <div className="container-section flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand font-serif text-lg font-extrabold text-navy">
              MG
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-lg font-bold text-navy">
                MG CERVIS
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-brand">
                Aménagement & Finitions
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-ink-soft md:flex">
            <a href="#realisations" className="transition hover:text-navy">
              Réalisations
            </a>
            <a href="#devis" className="transition hover:text-navy">
              Devis
            </a>
          </nav>

          <a
            href="#devis"
            className="inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-light"
          >
            Devis gratuit
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="relative isolate">
        {/* Image de fond */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1920&q=80"
            alt="Intérieur aménagé avec finitions soignées"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/85 to-navy-dark/95" />
        </div>

        <div className="container-section flex min-h-[88vh] flex-col justify-center py-24 text-white">
          <Reveal className="max-w-2xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <Star className="h-4 w-4 text-brand-light" />
              Aménagement & finition d&apos;espaces
            </span>

            <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Donnez à vos espaces une finition{" "}
              <span className="text-brand-light">d&apos;exception</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-stone-200">
              Moquettes, habillages muraux, stores, gazons synthétiques et
              rideaux sur mesure. De la conception à la pose, nous transformons
              vos intérieurs et extérieurs avec un savoir-faire premium.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#devis"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-7 py-4 font-bold text-navy shadow-xl shadow-brand/30 transition hover:bg-brand-light"
              >
                Demander mon devis gratuit
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#realisations"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                Voir nos réalisations
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ EXPERTISES & RÉALISATIONS ============ */}
      <section id="realisations" className="bg-cream py-20 sm:py-28">
        <div className="container-section">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">
              Nos expertises
            </p>
            <h2 className="font-serif text-3xl font-bold text-ink sm:text-4xl">
              Un savoir-faire complet pour vos espaces
            </h2>
            <p className="mt-4 text-ink-soft">
              Cinq domaines de spécialité, une seule exigence : la qualité de la
              finition. Découvrez quelques-unes de nos réalisations.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {REALISATIONS.map((realisation, i) => (
              <Reveal key={realisation.image} delay={i * 0.08}>
                <article className="group h-full overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={realisation.image}
                      alt={`Réalisation : ${realisation.label}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-ink/75 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                      {realisation.tagline}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-ink">
                      {realisation.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {realisation.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}

            {/* Carte CTA finale de la grille */}
            <Reveal delay={REALISATIONS.length * 0.08}>
              <a
                href="#devis"
                className="flex h-full min-h-[19rem] flex-col items-center justify-center gap-3 rounded-2xl bg-navy p-6 text-center text-white transition hover:bg-navy-light"
              >
                <span className="font-serif text-2xl font-bold">
                  Un projet en tête ?
                </span>
                <p className="text-sm text-stone-300">
                  Parlons-en. Recevez une estimation personnalisée et gratuite.
                </p>
                <span className="mt-2 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 font-bold text-navy">
                  Démarrer
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ POURQUOI NOUS CHOISIR ============ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-section">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">
              Pourquoi nous choisir
            </p>
            <h2 className="font-serif text-3xl font-bold text-ink sm:text-4xl">
              La confiance, du premier contact à la livraison
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {REASONS.map((reason, i) => (
              <Reveal key={reason.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-stone-100 bg-cream p-8 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <reason.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-ink">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {reason.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FORMULAIRE DE CAPTURE ============ */}
      <section id="devis" className="bg-navy py-20 sm:py-28">
        <div className="container-section">
          <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
            <Reveal className="text-white">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-light">
                Devis gratuit & sans engagement
              </p>
              <h2 className="font-serif text-3xl font-bold leading-tight sm:text-4xl">
                Recevez votre estimation personnalisée sous 24h
              </h2>
              <p className="mt-5 text-stone-300">
                Laissez-nous vos coordonnées et le service qui vous intéresse.
                Un expert vous recontacte rapidement pour étudier votre projet,
                sans aucun engagement de votre part.
              </p>
              <ul className="mt-7 space-y-3 text-stone-200">
                {[
                  "Réponse rapide d'un conseiller dédié",
                  "Étude personnalisée de vos espaces",
                  "Tarification claire et transparente",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-navy">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl bg-cream p-7 shadow-2xl sm:p-9">
                <h3 className="mb-1 font-serif text-2xl font-bold text-ink">
                  Demander mon devis
                </h3>
                <p className="mb-6 text-sm text-ink-soft">
                  Gratuit · Réponse sous 24h
                </p>
                <LeadForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-navy text-sm text-blue-100/80">
        <div className="container-section py-14">
          <div className="grid gap-10 md:grid-cols-3">
            {/* Marque */}
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand font-serif text-xl font-extrabold text-navy">
                  MG
                </span>
                <div className="leading-tight">
                  <p className="font-serif text-xl font-bold text-white">
                    MG CERVIS
                  </p>
                  <p className="text-xs uppercase tracking-widest text-brand">
                    Aménagement & Finitions
                  </p>
                </div>
              </div>
              <p className="mt-5 max-w-xs text-blue-100/70">
                Revêtement sol · Revêtement mur · Fabrication de store ·
                Confection de rideaux-Founiture et pose d'aluminium pour les fenêtres et les portes. Nous transformons vos espaces avec des finitions d'exception.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 font-semibold uppercase tracking-widest text-brand">
                Contact
              </h3>
              <p className="mb-3 text-white">
                Marcelin GOUHA{" "}
                <span className="text-blue-100/60">— Responsable</span>
              </p>
              <ul className="space-y-2.5">
                {[
                  "+225 07 10 07 52 57",
                  "+225 07 48 05 80 35",
                  "+225 01 42 01 45 17",
                  "+225 05 06 53 28 40",
                ].map((tel) => (
                  <li key={tel}>
                    <a
                      href={`tel:${tel.replace(/\s/g, "")}`}
                      className="flex items-center gap-2.5 transition hover:text-white"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-brand" />
                      {tel}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coordonnées */}
            <div>
              <h3 className="mb-4 font-semibold uppercase tracking-widest text-brand">
                Nous trouver
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:gouhamarcelino@gmail.com"
                    className="flex items-center gap-2.5 transition hover:text-white"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-brand" />
                    gouhamarcelino@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 text-brand" />
                  Abidjan, Côte d&apos;Ivoire
                </li>
              </ul>
              <a
                href="#devis"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 font-semibold text-navy transition hover:bg-brand-light"
              >
                Demander un devis
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-xs text-blue-100/60">
          © {new Date().getFullYear()} MG CERVIS — Tous droits réservés.
        </div>
      </footer>
    </main>
  );
}
