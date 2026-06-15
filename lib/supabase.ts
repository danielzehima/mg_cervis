import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase côté SERVEUR uniquement.
 * Utilise la clé service_role : ne JAMAIS l'exposer au navigateur.
 * À n'importer que dans des Route Handlers / Server Actions.
 */
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    "Variables d'environnement manquantes : SUPABASE_URL et/ou SUPABASE_SERVICE_ROLE_KEY. " +
      "Renseignez-les dans .env.local (voir .env.local.example)."
  );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
