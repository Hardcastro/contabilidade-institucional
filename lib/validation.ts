import { businessTypeOptions, revenueRangeOptions } from "@/site.config";

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  revenueRange: string;
  message: string;
  company: string; // honeypot — must stay empty
};

export type ContactFormField = keyof Omit<ContactFormValues, "company">;

export type FieldErrors = Partial<Record<ContactFormField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_DIGITS_PATTERN = /^\d{10,11}$/;

const businessTypeValues = businessTypeOptions.map((option) => option.value);
const revenueRangeValues = revenueRangeOptions.map((option) => option.value);

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

/**
 * One rule set, shared by the client (on-blur) and the server (on submit),
 * so the two can never quietly drift apart.
 */
export function validateField(field: ContactFormField, values: Pick<ContactFormValues, ContactFormField>): string | undefined {
  switch (field) {
    case "name": {
      const value = values.name.trim();
      if (!value) return "Diga seu nome.";
      if (value.length < 2) return "O nome parece incompleto.";
      return undefined;
    }
    case "email": {
      const value = values.email.trim();
      if (!value) return "Informe um e-mail.";
      if (!EMAIL_PATTERN.test(value)) return "Esse e-mail não parece válido.";
      return undefined;
    }
    case "phone": {
      const digits = onlyDigits(values.phone);
      if (!digits) return "Informe um telefone.";
      if (!PHONE_DIGITS_PATTERN.test(digits)) return "Telefone incompleto — inclua o DDD.";
      return undefined;
    }
    case "businessType": {
      if (!values.businessType) return "Selecione o tipo de empresa.";
      if (!businessTypeValues.includes(values.businessType as (typeof businessTypeValues)[number])) {
        return "Selecione uma opção da lista.";
      }
      return undefined;
    }
    case "revenueRange": {
      if (!values.revenueRange) return "Selecione a faixa de faturamento.";
      if (!revenueRangeValues.includes(values.revenueRange as (typeof revenueRangeValues)[number])) {
        return "Selecione uma opção da lista.";
      }
      return undefined;
    }
    case "message": {
      const value = values.message.trim();
      if (!value) return "Escreva uma mensagem.";
      if (value.length < 10) return "Conte um pouco mais — pelo menos 10 caracteres.";
      if (value.length > 2000) return "Mensagem longa demais — resuma em até 2000 caracteres.";
      return undefined;
    }
    default:
      return undefined;
  }
}

export const CONTACT_FIELDS: ContactFormField[] = [
  "name",
  "email",
  "phone",
  "businessType",
  "revenueRange",
  "message",
];

export function validateContactForm(values: ContactFormValues): FieldErrors {
  const errors: FieldErrors = {};
  for (const field of CONTACT_FIELDS) {
    const error = validateField(field, values);
    if (error) errors[field] = error;
  }
  return errors;
}

/** Formats digits as a Brazilian mobile/landline number while typing. */
export function formatPhoneNumber(rawValue: string) {
  const digits = onlyDigits(rawValue).slice(0, 11);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}
