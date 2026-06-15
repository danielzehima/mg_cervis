import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MG CERVIS — Aménagement & Finitions | Moquettes, Stores, Gazon & plus",
  description:
    "Spécialiste de l'aménagement et de la finition d'espaces : moquettes, habillages muraux, stores, gazons synthétiques et rideaux. Demandez votre devis gratuit.",
  openGraph: {
    title: "Aménagement & Finitions sur mesure",
    description:
      "Transformez vos espaces avec des finitions haut de gamme. Devis gratuit sous 24h.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
