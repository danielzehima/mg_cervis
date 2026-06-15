import { NextResponse } from "next/server";

/**
 * Route Handler pour la réception des prospects (leads).
 * POST /api/leads
 *
 * Corps attendu (JSON) :
 *   { firstName: string, email: string, service: string }
 *
 * 👉 PROCHAINE ÉTAPE : brancher une base de données (Supabase, PostgreSQL…)
 *    à l'endroit indiqué plus bas. Pour l'instant, on valide et on logue.
 */

// Valeurs de service autorisées (alignées sur lib/services.ts)
const ALLOWED_SERVICES = [
  "moquettes",
  "habillages-muraux",
  "stores",
  "gazons-synthetiques",
  "rideaux",
  "autre",
];

// Validation basique du format email
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Requête invalide." },
        { status: 400 }
      );
    }

    const firstName = String(body.firstName ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const service = String(body.service ?? "").trim();

    // --- Validation ---
    if (!firstName || firstName.length < 2) {
      return NextResponse.json(
        { error: "Veuillez indiquer un prénom valide." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "L'adresse email n'est pas valide." },
        { status: 400 }
      );
    }

    if (!ALLOWED_SERVICES.includes(service)) {
      return NextResponse.json(
        { error: "Veuillez sélectionner un service valide." },
        { status: 400 }
      );
    }

    const lead = {
      firstName,
      email,
      service,
      createdAt: new Date().toISOString(),
    };

    // ------------------------------------------------------------------
    // 🔌 BRANCHEMENT BASE DE DONNÉES — à compléter
    // ------------------------------------------------------------------
    // Exemple avec Supabase :
    //
    //   import { createClient } from "@supabase/supabase-js";
    //   const supabase = createClient(
    //     process.env.SUPABASE_URL!,
    //     process.env.SUPABASE_SERVICE_ROLE_KEY!
    //   );
    //   const { error } = await supabase.from("leads").insert(lead);
    //   if (error) throw error;
    //
    // Exemple avec PostgreSQL (node-postgres) :
    //
    //   await pool.query(
    //     "INSERT INTO leads (first_name, email, service, created_at) VALUES ($1,$2,$3,$4)",
    //     [lead.firstName, lead.email, lead.service, lead.createdAt]
    //   );
    //
    // 💡 Optionnel : envoyer un email de notification interne (Resend, etc.)
    //    et/ou un email de bienvenue au prospect ici.
    // ------------------------------------------------------------------

    // Pour l'instant : log serveur (visible dans la console de dev / Vercel)
    console.log("📩 Nouveau lead reçu :", lead);

    return NextResponse.json(
      { success: true, message: "Lead enregistré." },
      { status: 201 }
    );
  } catch (err) {
    console.error("Erreur /api/leads :", err);
    return NextResponse.json(
      { error: "Erreur serveur. Merci de réessayer plus tard." },
      { status: 500 }
    );
  }
}

// Refuse explicitement les autres méthodes
export async function GET() {
  return NextResponse.json({ error: "Méthode non autorisée." }, { status: 405 });
}
