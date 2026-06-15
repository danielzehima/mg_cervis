# Tunnel de vente — Aménagement & Finitions

Landing page de génération de leads (Next.js App Router + Tailwind CSS) pour une
entreprise d'aménagement et finition d'espaces (moquettes, habillages muraux,
stores, gazons synthétiques, rideaux).

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (design premium, mobile-first)
- **lucide-react** (icônes) · **framer-motion** (animations d'apparition)
- Backend : **Route Handler** `app/api/leads/route.ts` (validation incluse)

## Démarrage

```bash
npm install
npm run dev
```

Ouvrez http://localhost:3000

## Structure

```
app/
  layout.tsx          Layout racine + polices (Inter / Playfair Display)
  page.tsx            Landing page (Hero, Expertises, Réassurance, Formulaire)
  merci/page.tsx      Page de remerciement après soumission
  api/leads/route.ts  Réception + validation des leads (POST)
components/
  LeadForm.tsx        Formulaire de capture (états loading/erreur/succès)
  Reveal.tsx          Animation d'apparition au scroll
lib/
  services.ts         Source unique des 5 expertises (grille + select)
```

## À faire ensuite

1. **Base de données** : voir le bloc commenté dans `app/api/leads/route.ts`
   (exemples Supabase et PostgreSQL prêts à décommenter).
2. **Emails** : notification interne + email de bienvenue (Resend, etc.).
3. **Photos** : remplacer les placeholders Unsplash de `lib/services.ts` et du
   Hero par vos vraies photos de chantier (dossier `public/realisations/`).
4. **Réseaux sociaux** : compléter les liens dans `app/merci/page.tsx`.
