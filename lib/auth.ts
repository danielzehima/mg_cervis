import { createHmac } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Authentification minimale du tableau de bord par mot de passe partagé.
 * Le mot de passe n'est jamais stocké dans le cookie : on y met un jeton HMAC
 * dérivé du mot de passe, infalsifiable sans connaître DASHBOARD_PASSWORD.
 */

export const DASH_COOKIE = "mgc_dash";

function getPassword(): string {
  const pwd = process.env.DASHBOARD_PASSWORD;
  if (!pwd) {
    throw new Error(
      "DASHBOARD_PASSWORD manquant. Définissez-le dans .env.local et sur Vercel."
    );
  }
  return pwd;
}

/** Jeton attendu dans le cookie pour une session valide. */
export function expectedToken(): string {
  return createHmac("sha256", getPassword())
    .update("mg-cervis-dashboard")
    .digest("hex");
}

/** Vrai si le mot de passe fourni est correct. */
export function checkPassword(candidate: string): boolean {
  return candidate === getPassword();
}

/** Vrai si la requête courante possède un cookie de session valide. */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const store = await cookies();
    return store.get(DASH_COOKIE)?.value === expectedToken();
  } catch {
    return false;
  }
}
