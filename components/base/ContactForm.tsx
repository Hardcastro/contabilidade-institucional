"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import {
  CONTACT_FIELDS,
  formatPhoneNumber,
  validateContactForm,
  validateField,
  type ContactFormField,
  type ContactFormValues,
  type FieldErrors,
} from "@/lib/validation";
import { ClayButton } from "./primitives";

type SelectOption = {
  value: string;
  label: string;
};

type ContactFormProps = {
  endpoint?: string;
  businessTypeOptions: readonly SelectOption[];
  revenueRangeOptions: readonly SelectOption[];
  privacyNotice: string;
};

type SubmitStatus = "idle" | "sending" | "success" | "error";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  businessType: "",
  revenueRange: "",
  message: "",
  company: "",
};

const inputClasses =
  "w-full rounded-control border border-glass-solid-border bg-bg-solid px-4 py-3 text-body text-text-primary placeholder:text-text-muted focus-visible:border-clay-primary";

const errorId = (field: ContactFormField) => `${field}-error`;

type FieldWrapperProps = {
  field: ContactFormField;
  label: string;
  error?: string;
  children: ReactNode;
};

function FieldWrapper({ field, label, error, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={field} className="text-body-sm font-medium text-text-secondary">
        {label}
      </label>
      {children}
      {error ? (
        <p id={errorId(field)} role="alert" className="text-body-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm({
  endpoint = "/api/contato",
  businessTypeOptions,
  revenueRangeOptions,
  privacyNotice,
}: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const fieldRefs = useRef<Partial<Record<ContactFormField, HTMLElement | null>>>({});

  function registerRef(field: ContactFormField) {
    return (el: HTMLElement | null) => {
      fieldRefs.current[field] = el;
    };
  }

  function handleChange(field: ContactFormField) {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const rawValue = event.target.value;
      const nextValue = field === "phone" ? formatPhoneNumber(rawValue) : rawValue;

      setValues((prev) => ({ ...prev, [field]: nextValue }));

      // Clear an existing error as soon as the field becomes valid again.
      if (errors[field]) {
        const nextError = validateField(field, { ...values, [field]: nextValue });
        setErrors((prev) => ({ ...prev, [field]: nextError }));
      }
    };
  }

  function handleBlur(field: ContactFormField) {
    return () => {
      const error = validateField(field, values);
      setErrors((prev) => ({ ...prev, [field]: error }));
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateContactForm(values);
    const firstInvalidField = CONTACT_FIELDS.find((field) => nextErrors[field]);

    if (firstInvalidField) {
      setErrors(nextErrors);
      setStatus("error");
      setStatusMessage("Revise os campos destacados abaixo.");
      fieldRefs.current[firstInvalidField]?.focus();
      return;
    }

    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        field?: ContactFormField;
      };

      if (!response.ok) {
        if (data.field) {
          setErrors((prev) => ({ ...prev, [data.field as ContactFormField]: data.error }));
          fieldRefs.current[data.field]?.focus();
        }
        setStatus("error");
        setStatusMessage(data.error ?? "Não deu para enviar. Tente novamente em instantes.");
        return;
      }

      setStatus("success");
      setStatusMessage("Mensagem enviada. Respondemos em até 1 dia útil.");
      setValues(initialValues);
      setErrors({});
    } catch {
      setStatus("error");
      setStatusMessage("Não deu para enviar. Verifique a conexão e tente de novo.");
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Honeypot: invisible to sighted users and to screen readers, absent from tab order. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="company">Não preencha este campo</label>
        <input
          type="text"
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(event) => setValues((prev) => ({ ...prev, company: event.target.value }))}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FieldWrapper field="name" label="Nome" error={errors.name}>
          <input
            ref={registerRef("name")}
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId("name") : undefined}
            className={inputClasses}
          />
        </FieldWrapper>

        <FieldWrapper field="email" label="E-mail" error={errors.email}>
          <input
            ref={registerRef("email")}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId("email") : undefined}
            className={inputClasses}
          />
        </FieldWrapper>

        <FieldWrapper field="phone" label="Telefone" error={errors.phone}>
          <input
            ref={registerRef("phone")}
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            placeholder="(11) 91234-5678"
            autoComplete="tel"
            value={values.phone}
            onChange={handleChange("phone")}
            onBlur={handleBlur("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? errorId("phone") : undefined}
            className={inputClasses}
          />
        </FieldWrapper>

        <FieldWrapper field="businessType" label="Tipo de empresa" error={errors.businessType}>
          <select
            ref={registerRef("businessType")}
            id="businessType"
            name="businessType"
            value={values.businessType}
            onChange={handleChange("businessType")}
            onBlur={handleBlur("businessType")}
            aria-invalid={Boolean(errors.businessType)}
            aria-describedby={errors.businessType ? errorId("businessType") : undefined}
            className={inputClasses}
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            {businessTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FieldWrapper>

        <FieldWrapper field="revenueRange" label="Faturamento aproximado" error={errors.revenueRange}>
          <select
            ref={registerRef("revenueRange")}
            id="revenueRange"
            name="revenueRange"
            value={values.revenueRange}
            onChange={handleChange("revenueRange")}
            onBlur={handleBlur("revenueRange")}
            aria-invalid={Boolean(errors.revenueRange)}
            aria-describedby={errors.revenueRange ? errorId("revenueRange") : undefined}
            className={inputClasses}
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            {revenueRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FieldWrapper>
      </div>

      <FieldWrapper field="message" label="Mensagem" error={errors.message}>
        <textarea
          ref={registerRef("message")}
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange("message")}
          onBlur={handleBlur("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? errorId("message") : undefined}
          className={inputClasses}
        />
      </FieldWrapper>

      <div className="flex flex-col gap-3">
        <ClayButton type="submit" disabled={status === "sending"} className="w-fit">
          {status === "sending" ? "Enviando..." : "Enviar mensagem"}
        </ClayButton>
        <p className="text-body-sm text-text-muted">{privacyNotice}</p>
      </div>

      <div aria-live="polite" className="min-h-6 text-body-sm">
        {status === "success" ? <span className="text-clay-primary">{statusMessage}</span> : null}
        {status === "error" ? <span className="text-red-700">{statusMessage}</span> : null}
      </div>
    </form>
  );
}
