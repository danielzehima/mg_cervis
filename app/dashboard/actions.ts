"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DASH_COOKIE, checkPassword, expectedToken } from "@/lib/auth";

export async function login(_prev: unknown, formData: FormData) {
  const password = String(formData.get("password") ?? "");

  let ok = false;
  try {
    ok = checkPassword(password);
  } catch {
    return { error: "Configuration manquante (DASHBOARD_PASSWORD)." };
  }

  if (!ok) {
    return { error: "Mot de passe incorrect." };
  }

  const store = await cookies();
  store.set(DASH_COOKIE, expectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  });

  redirect("/dashboard");
}

export async function logout() {
  const store = await cookies();
  store.delete(DASH_COOKIE);
  redirect("/dashboard/login");
}
