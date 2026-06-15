// Source unique de vérité pour les 5 domaines d'expertise.
// Réutilisée par la grille de la landing page ET le menu déroulant du formulaire.

export type Service = {
  /** Identifiant technique (envoyé au backend) */
  value: string;
  /** Libellé affiché */
  label: string;
  /** Accroche courte sous le titre de la carte */
  tagline: string;
  /** Description du savoir-faire */
  description: string;
  /**
   * Image de réalisation (placeholder Unsplash pour l'instant).
   * Remplacez par vos propres photos de chantier dans /public/realisations/.
   */
  image: string;
};

export const SERVICES: Service[] = [
  {
    value: "moquettes",
    label: "Moquettes",
    tagline: "Confort & acoustique",
    description:
      "Fourniture et pose de moquettes haut de gamme pour bureaux, hôtels et espaces de vie. Isolation phonique et finitions impeccables.",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=900&q=80",
  },
  {
    value: "habillages-muraux",
    label: "Habillages muraux",
    tagline: "Caractère & élégance",
    description:
      "Revêtements muraux, panneaux décoratifs et papiers peints premium qui donnent une identité forte à chaque pièce.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
  },
  {
    value: "stores",
    label: "Stores",
    tagline: "Lumière maîtrisée",
    description:
      "Stores intérieurs et extérieurs sur mesure : enrouleurs, bateaux, vénitiens et motorisés pour un contrôle parfait de la lumière.",
    image:
      "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    value: "gazons-synthetiques",
    label: "Gazons synthétiques",
    tagline: "Vert toute l'année",
    description:
      "Pose de gazon synthétique réaliste et durable pour terrasses, jardins et espaces commerciaux. Zéro entretien, rendu naturel.",
    image:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=900&q=80",
  },
  {
    value: "rideaux",
    label: "Rideaux",
    tagline: "Habillage textile",
    description:
      "Confection et installation de rideaux et voilages sur mesure : tissus nobles, tringles design et finitions cousues main.",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
  },
];
