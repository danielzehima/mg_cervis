import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

/**
 * Route Handler pour la réception des prospects (leads).
 * POST /api/leads
 *
 * Corps attendu (JSON) :
 *   { firstName: string, email: string, service: string }
 *
 * Les leads validés sont enregistrés dans la table `leads` de Supabase.
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

    // --- Enregistrement en base (Supabase) ---
    const { error } = await supabaseAdmin
      .from("leads")
      .insert({ first_name: firstName, email, service });

    if (error) {
      console.error("Erreur insertion Supabase /api/leads :", error);
      return NextResponse.json(
        { error: "Erreur serveur. Merci de réessayer plus tard." },
        { status: 500 }
      );
    }

    console.log("📩 Nouveau lead enregistré :", { firstName, email, service });

    // 💡 Optionnel (étape suivante) : email de notification interne + email
    //    de bienvenue au prospect via Resend.

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
