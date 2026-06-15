import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase côté SERVEUR uniquement (clé service_role).
 * Ne JAMAIS l'exposer au navigateur ; à n'importer que dans des
 * Route Handlers / Server Actions.
 *
 * Initialisation paresseuse : on ne crée le client (et on ne vérifie les
 * variables d'environnement) qu'au premier appel. Cela évite de casser le
 * build ou la page d'accueil si les variables ne sont pas encore définies.
 */
let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      "Variables d'environnement manquantes : SUPABASE_URL et/ou SUPABASE_SERVICE_ROLE_KEY. " +
        "Définissez-les dans .env.local (local) et dans Vercel → Settings → Environment Variables (production)."
    );
  }

  client = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
