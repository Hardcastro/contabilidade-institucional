import { Resend } from "resend";
import { businessTypeOptions, revenueRangeOptions, siteConfig } from "@/site.config";
import type { ContactFormValues } from "./validation";

export type MailResult = {
  simulated: boolean;
};

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
 */
export async function sendContactEmail(values: Omit<ContactFormValues, "company">): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? siteConfig.contact.email;

  if (!apiKey) {
    console.log("[mailer] RESEND_API_KEY não configurada — simulando envio.", {
      to,
      ...values,
    });
    return { simulated: true };
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: `${siteConfig.name} <onboarding@resend.dev>`,
    to,
    replyTo: values.email,
    subject: `Novo contato pelo site — ${values.name}`,
    html: buildEmailHtml(values),
  });

  return { simulated: false };
}
