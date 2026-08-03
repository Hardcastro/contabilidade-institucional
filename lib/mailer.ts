import { Resend } from "resend";
import { businessTypeOptions, revenueRangeOptions, siteConfig } from "@/site.config";
import type { ContactFormValues } from "./validation";

export type MailResult = {
  simulated: boolean;
};

/**
 * No delivery route is configured. Thrown instead of silently reporting
 * success, so the form never tells a visitor their message went out when
 * nothing left the building.
 */
export class MailNotConfiguredError extends Error {
  constructor() {
    super("RESEND_API_KEY não configurada — não há como entregar a mensagem.");
    this.name = "MailNotConfiguredError";
  }
}

/** The provider was reached and refused the message. */
export class MailDeliveryError extends Error {
  constructor(detail: string) {
    super(`Resend recusou o envio: ${detail}`);
    this.name = "MailDeliveryError";
  }
}

function labelFor(options: readonly { value: string; label: string }[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(values: Omit<ContactFormValues, "company">) {
  const rows: [string, string][] = [
    ["Nome", values.name],
    ["E-mail", values.email],
    ["Telefone", values.phone],
    ["Tipo de empresa", labelFor(businessTypeOptions, values.businessType)],
    ["Faturamento aproximado", labelFor(revenueRangeOptions, values.revenueRange)],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;color:#64748b;font-size:14px;">${escapeHtml(label)}</td><td style="padding:8px 12px;font-size:14px;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;">
      <h1 style="font-size:18px;color:#065f46;">Novo contato pelo site — ${escapeHtml(siteConfig.name)}</h1>
      <table style="border-collapse:collapse;width:100%;">${rowsHtml}</table>
      <p style="font-size:14px;color:#0f172a;margin-top:16px;"><strong>Mensagem</strong></p>
      <p style="font-size:14px;color:#0f172a;white-space:pre-wrap;">${escapeHtml(values.message)}</p>
    </div>
  `;
}

/**
 * Sends the contact-form email through Resend. The client is created here,
 * inside the function, on purpose: instantiating it at module scope would
 * make `npm run build` fail whenever RESEND_API_KEY isn't set, and this
 * project is meant to build and run cloned with zero secrets configured.
 *
 * Simulation is allowed, but never by accident. Without a key the send is
 * only faked outside production, or when CONTACT_SIMULATE is set on purpose
 * (which is what lets a clone run the whole flow with no secrets). Anywhere
 * else, a missing key throws — a contact form that reports success without
 * delivering is worse than one that is honestly broken, because the visitor
 * walks away believing they were heard.
 */
export async function sendContactEmail(values: Omit<ContactFormValues, "company">): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? siteConfig.contact.email;
  const simulationAllowed =
    process.env.CONTACT_SIMULATE === "1" || process.env.NODE_ENV !== "production";

  if (!apiKey) {
    if (!simulationAllowed) {
      console.error("[mailer] RESEND_API_KEY ausente em produção — envio recusado.", { to });
      throw new MailNotConfiguredError();
    }

    console.log("[mailer] RESEND_API_KEY não configurada — simulando envio.", {
      to,
      ...values,
    });
    return { simulated: true };
  }

  const resend = new Resend(apiKey);

  // The SDK resolves with { data, error } instead of rejecting on an API
  // error, so an unchecked await would swallow a refused send exactly the
  // same way a missing key used to.
  const { error } = await resend.emails.send({
    from: `${siteConfig.name} <onboarding@resend.dev>`,
    to,
    replyTo: values.email,
    subject: `Novo contato pelo site — ${values.name}`,
    html: buildEmailHtml(values),
  });

  if (error) {
    console.error("[mailer] Resend recusou o envio.", { to, error });
    throw new MailDeliveryError(error.message);
  }

  return { simulated: false };
}
