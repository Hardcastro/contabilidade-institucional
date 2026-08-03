import { NextResponse } from "next/server";
import { MailDeliveryError, MailNotConfiguredError, sendContactEmail } from "@/lib/mailer";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { CONTACT_FIELDS, validateContactForm, type ContactFormValues } from "@/lib/validation";
import { siteConfig } from "@/site.config";

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Muitos envios em pouco tempo. Tente novamente em alguns minutos." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds ?? 600) } },
    );
  }

  let body: Partial<ContactFormValues>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Não foi possível ler o formulário enviado." }, { status: 400 });
  }

  // Honeypot: a real visitor never fills this field, since it's hidden from
  // both sighted users and screen readers. Anything that fills it is a bot.
  if (typeof body.company === "string" && body.company.trim().length > 0) {
    return NextResponse.json({ error: "Envio inválido." }, { status: 400 });
  }

  const values: ContactFormValues = {
    name: body.name ?? "",
    email: body.email ?? "",
    phone: body.phone ?? "",
    businessType: body.businessType ?? "",
    revenueRange: body.revenueRange ?? "",
    message: body.message ?? "",
    company: body.company ?? "",
  };

  // Server revalidates everything from scratch — the client's own
  // validation is a UX convenience, never a source of truth.
  const errors = validateContactForm(values);
  const firstInvalidField = CONTACT_FIELDS.find((field) => errors[field]);

  if (firstInvalidField) {
    return NextResponse.json(
      { error: errors[firstInvalidField], field: firstInvalidField },
      { status: 400 },
    );
  }

  const emailValues: Omit<ContactFormValues, "company"> = {
    name: values.name,
    email: values.email,
    phone: values.phone,
    businessType: values.businessType,
    revenueRange: values.revenueRange,
    message: values.message,
  };
  // A form that answers "enviado" without delivering is the worst possible
  // failure here: the visitor stops waiting for a reply that will never come.
  // Anything that goes wrong past validation is reported as a failure, with a
  // fallback the person can act on immediately.
  try {
    const result = await sendContactEmail(emailValues);
    return NextResponse.json({ ok: true, simulated: result.simulated });
  } catch (error) {
    if (error instanceof MailNotConfiguredError || error instanceof MailDeliveryError) {
      return NextResponse.json(
        {
          error: `Não conseguimos enviar sua mensagem agora. Ligue para ${siteConfig.contact.phone} ou escreva para ${siteConfig.contact.email}.`,
        },
        { status: 502 },
      );
    }

    console.error("[contato] Falha inesperada ao enviar.", error);
    return NextResponse.json(
      {
        error: `Não conseguimos enviar sua mensagem agora. Ligue para ${siteConfig.contact.phone} ou escreva para ${siteConfig.contact.email}.`,
      },
      { status: 500 },
    );
  }
}
