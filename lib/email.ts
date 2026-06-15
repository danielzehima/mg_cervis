import { Resend } from "resend";
import { SERVICES } from "./services";

/**
 * Envoi d'emails via Resend (côté serveur uniquement).
 *
 * Variables d'environnement :
 *   RESEND_API_KEY    (obligatoire pour activer les emails)
 *   RESEND_FROM       expéditeur vérifié, ex: "MG CERVIS <noreply@ton-domaine.com>"
 *   LEADS_NOTIFY_TO   destinataire de la notification interne (défaut: l'email MG CERVIS)
 *
 * Les emails sont "best-effort" : une erreur d'envoi ne doit jamais faire
 * échouer l'enregistrement du lead.
 */

const NAVY = "#14305f";
const ORANGE = "#f7941d";

const FROM = process.env.RESEND_FROM ?? "MG CERVIS <onboarding@resend.dev>";
const NOTIFY_TO = process.env.LEADS_NOTIFY_TO ?? "gouhamarcelino@gmail.com";

let resend: Resend | null = null;
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!resend) resend = new Resend(key);
  return resend;
}

function serviceLabel(value: string): string {
  return SERVICES.find((s) => s.value === value)?.label ?? value;
}

type Lead = { firstName: string; email: string; service: string };

/** Gabarit HTML simple aux couleurs de la marque. */
function layout(title: string, bodyHtml: string): string {
  return `
  <div style="margin:0;padding:24px;background:#f4f4f5;font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#1c1917">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e7e5e4">
      <div style="background:${NAVY};padding:22px 28px;display:flex;align-items:center">
        <span style="display:inline-block;width:40px;height:40px;line-height:40px;text-align:center;border-radius:50%;background:${ORANGE};color:${NAVY};font-weight:800;font-family:Georgia,serif">MG</span>
        <span style="color:#ffffff;font-size:18px;font-weight:700;margin-left:12px">MG CERVIS</span>
      </div>
      <div style="padding:28px">
        <h1 style="margin:0 0 16px;font-size:20px;color:${NAVY}">${title}</h1>
        ${bodyHtml}
      </div>
      <div style="padding:16px 28px;border-top:1px solid #e7e5e4;font-size:12px;color:#78716c">
        MG CERVIS — Aménagement &amp; Finitions · Abidjan, Côte d'Ivoire
      </div>
    </div>
  </div>`;
}

/** Notifie l'équipe MG CERVIS d'un nouveau prospect. */
async function sendInternalNotification(client: Resend, lead: Lead) {
  const label = serviceLabel(lead.service);
  const html = layout(
    "Nouveau prospect 🎉",
    `<p style="margin:0 0 14px">Un nouveau lead vient d'être enregistré :</p>
     <table style="width:100%;border-collapse:collapse;font-size:14px">
       <tr><td style="padding:8px 0;color:#78716c;width:120px">Prénom</td><td style="padding:8px 0;font-weight:600">${lead.firstName}</td></tr>
       <tr><td style="padding:8px 0;color:#78716c">Email</td><td style="padding:8px 0"><a href="mailto:${lead.email}" style="color:${NAVY}">${lead.email}</a></td></tr>
       <tr><td style="padding:8px 0;color:#78716c">Service</td><td style="padding:8px 0"><span style="background:${ORANGE};color:${NAVY};padding:3px 10px;border-radius:999px;font-weight:600">${label}</span></td></tr>
     </table>
     <p style="margin:18px 0 0;font-size:13px;color:#78716c">Recontactez ce prospect rapidement pour maximiser vos chances.</p>`
  );

  const { error } = await client.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    replyTo: lead.email,
    subject: `Nouveau lead — ${lead.firstName} (${label})`,
    html,
  });
  if (error) throw error;
}

/** Accuse réception au prospect. */
async function sendProspectAck(client: Resend, lead: Lead) {
  const label = serviceLabel(lead.service);
  const html = layout(
    `Merci ${lead.firstName} !`,
    `<p style="margin:0 0 14px">Nous avons bien reçu votre demande concernant
       <strong>${label}</strong>.</p>
     <p style="margin:0 0 14px">Un conseiller MG CERVIS vous recontacte très vite
       pour étudier votre projet et vous proposer un devis gratuit et sans engagement.</p>
     <p style="margin:0 0 14px">À très bientôt,<br/>L'équipe MG CERVIS</p>`
  );

  const { error } = await client.emails.send({
    from: FROM,
    to: lead.email,
    subject: "Votre demande de devis — MG CERVIS",
    html,
  });
  if (error) throw error;
}

/**
 * Envoie les 2 emails liés à un nouveau lead.
 * Best-effort : journalise les erreurs mais ne lève jamais d'exception.
 */
export async function sendLeadEmails(lead: Lead): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn("RESEND_API_KEY absente — emails non envoyés (lead tout de même enregistré).");
    return;
  }

  const results = await Promise.allSettled([
    sendInternalNotification(client, lead),
    sendProspectAck(client, lead),
  ]);

  results.forEach((r, i) => {
    const which = i === 0 ? "notification interne" : "accusé prospect";
    if (r.status === "rejected") {
      console.error(`Erreur envoi email (${which}) :`, r.reason);
    } else {
      console.log(`Email envoyé ✓ (${which})`);
    }
  });
}
