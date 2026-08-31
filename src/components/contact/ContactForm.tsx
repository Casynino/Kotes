"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { ArrowRight, Icon } from "@/components/ui/Icon";
import { company } from "@/content/company";
import { serviceOptions } from "@/content/services";
import { budgetRanges, contactFormSchema, toFieldErrors, type FieldErrors } from "@/lib/validation";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  serviceOfInterest: "",
  subject: "",
  message: "",
  budgetRange: "",
  consent: false,
};

export function ContactForm() {
  const searchParams = useSearchParams();
  const formId = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string>("");
  const [reference, setReference] = useState<string>("");
  const statusRef = useRef<HTMLDivElement>(null);
  // Used server-side to reject instant (bot) submissions.
  const startedAt = useRef<number>(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Deep link support: /contact?service=Fibre%20Optic... preselects the service.
  useEffect(() => {
    const service = searchParams.get("service");
    if (service && serviceOptions.includes(service)) {
      setValues((current) => ({ ...current, serviceOfInterest: service }));
    }
  }, [searchParams]);

  const update = (field: keyof typeof EMPTY, value: string | boolean) => {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear the field error as soon as the visitor starts correcting it.
    setErrors((current) => {
      if (!current[field as keyof FieldErrors]) return current;
      const next = { ...current };
      delete next[field as keyof FieldErrors];
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    // Client-side validation first, using the same schema as the server.
    const parsed = contactFormSchema.safeParse({ ...values, website: "" });
    if (!parsed.success) {
      const fieldErrors = toFieldErrors(parsed.error);
      setErrors(fieldErrors);
      setStatus("error");
      setFeedback("Please check the highlighted fields and try again.");
      // Move focus to the first field with a problem.
      const firstKey = Object.keys(fieldErrors)[0];
      if (firstKey) document.getElementById(`${formId}-${firstKey}`)?.focus();
      return;
    }

    setStatus("submitting");
    setErrors({});
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: "", startedAt: startedAt.current }),
      });

      const result = (await response.json()) as {
        ok: boolean;
        message: string;
        errors?: FieldErrors;
        reference?: string;
      };

      if (!response.ok || !result.ok) {
        setStatus("error");
        setErrors(result.errors ?? {});
        setFeedback(result.message || "Something went wrong. Please try again.");
        statusRef.current?.focus();
        return;
      }

      setStatus("success");
      setFeedback(result.message);
      setReference(result.reference ?? "");
      setValues(EMPTY);
      startedAt.current = Date.now();
      statusRef.current?.focus();
    } catch {
      setStatus("error");
      setFeedback(
        `We could not reach the server. Please check your connection, or email us at ${company.email}.`,
      );
      statusRef.current?.focus();
    }
  };

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-panel bg-surface p-8 text-center shadow-card ring-1 ring-border-subtle sm:p-12"
      >
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200">
          <Icon name="check" className="h-8 w-8" strokeWidth={2} />
        </span>
        <h2 className="text-h2 mt-6">Message received</h2>
        <p className="text-lead mx-auto mt-4 max-w-lg text-ink-600">{feedback}</p>
        {reference ? (
          <p className="mt-4 text-sm text-ink-500">
            Your reference: <span className="font-semibold text-ink-800">{reference}</span>
          </p>
        ) : null}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            variant="secondary"
            onClick={() => {
              setStatus("idle");
              setFeedback("");
              setReference("");
            }}
          >
            Send another message
          </Button>
          <a
            href={`tel:${company.primaryPhoneE164}`}
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            Or call {company.phones[0]}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-panel bg-surface p-6 shadow-card ring-1 ring-border-subtle sm:p-8 lg:p-10"
    >
      <h2 className="text-h2">Send us an enquiry</h2>
      <p className="mt-3 text-ink-600">
        Fill in the form and we will respond within one business day. Fields marked with an asterisk
        are required.
      </p>

      {/* Error banner */}
      {status === "error" && feedback ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-800 ring-1 ring-inset ring-red-200"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5m0 3h.01" />
          </svg>
          <p>{feedback}</p>
        </div>
      ) : null}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-fullName`}
          label="Full name"
          required
          error={errors.fullName}
          autoComplete="name"
          value={values.fullName}
          onChange={(v) => update("fullName", v)}
        />
        <Field
          id={`${formId}-companyName`}
          label="Company / organisation"
          error={errors.companyName}
          autoComplete="organization"
          value={values.companyName}
          onChange={(v) => update("companyName", v)}
        />
        <Field
          id={`${formId}-email`}
          label="Email address"
          type="email"
          required
          inputMode="email"
          error={errors.email}
          autoComplete="email"
          value={values.email}
          onChange={(v) => update("email", v)}
        />
        <Field
          id={`${formId}-phone`}
          label="Phone number"
          type="tel"
          required
          inputMode="tel"
          placeholder="+255 756 529 083"
          error={errors.phone}
          autoComplete="tel"
          value={values.phone}
          onChange={(v) => update("phone", v)}
        />

        <SelectField
          id={`${formId}-serviceOfInterest`}
          label="Service of interest"
          required
          error={errors.serviceOfInterest}
          value={values.serviceOfInterest}
          onChange={(v) => update("serviceOfInterest", v)}
          placeholder="Select a service"
          options={serviceOptions}
        />
        <SelectField
          id={`${formId}-budgetRange`}
          label="Budget range"
          hint="Optional"
          error={errors.budgetRange}
          value={values.budgetRange}
          onChange={(v) => update("budgetRange", v)}
          placeholder="Prefer not to say"
          options={[...budgetRanges]}
        />

        <div className="sm:col-span-2">
          <Field
            id={`${formId}-subject`}
            label="Subject"
            required
            error={errors.subject}
            value={values.subject}
            onChange={(v) => update("subject", v)}
          />
        </div>

        <div className="sm:col-span-2">
          <TextareaField
            id={`${formId}-message`}
            label="Message"
            required
            rows={6}
            error={errors.message}
            placeholder="Tell us about the sites, the scope, the timeline — as much or as little as you have."
            value={values.message}
            onChange={(v) => update("message", v)}
            maxLength={5000}
          />
        </div>
      </div>

      {/* Honeypot — off-screen, not hidden with display:none so bots still see
          it, and excluded from the tab order and the accessibility tree. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`${formId}-website`}>Leave this field empty</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {/* Consent */}
      <div className="mt-7">
        <div className="flex items-start gap-3">
          <input
            id={`${formId}-consent`}
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${formId}-consent-error` : undefined}
            className={cn(
              "mt-0.5 h-5 w-5 shrink-0 rounded border-2 accent-brand-600",
              errors.consent ? "border-red-500" : "border-ink-300",
            )}
          />
          <label htmlFor={`${formId}-consent`} className="text-sm leading-relaxed text-ink-600">
            I consent to {company.legalName} storing and processing the details above in order to
            respond to my enquiry, as described in the{" "}
            <a
              href="/privacy"
              className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800"
            >
              privacy policy
            </a>
            . <span className="text-red-600">*</span>
          </label>
        </div>
        {errors.consent ? (
          <p id={`${formId}-consent-error`} className="mt-2 text-sm text-red-700">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Spinner />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight />
            </>
          )}
        </Button>
        <p className="text-sm text-ink-500">
          Or email{" "}
          <a
            href={`mailto:${company.email}`}
            className="font-semibold text-brand-700 hover:text-brand-800"
          >
            {company.email}
          </a>
        </p>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ fields */

function Label({
  htmlFor,
  children,
  required,
  hint,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline justify-between gap-2">
      <span className="text-sm font-semibold text-ink-800">
        {children}
        {required ? (
          <>
            {" "}
            <span className="text-red-600" aria-hidden="true">
              *
            </span>
            <span className="sr-only">(required)</span>
          </>
        ) : null}
      </span>
      {hint ? <span className="text-xs text-ink-400">{hint}</span> : null}
    </label>
  );
}

const controlClass = (hasError: boolean) =>
  cn(
    "mt-2 block w-full rounded-xl border bg-surface px-4 py-3 text-[0.9375rem] text-ink-900",
    "placeholder:text-ink-400 transition-colors duration-200",
    hasError
      ? "border-red-400 focus-visible:border-red-500 focus-visible:outline-red-500"
      : "border-border-subtle focus-visible:border-brand-500",
  );

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 text-sm text-red-700">
      {children}
    </p>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  hint,
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  hint?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange" | "type">) {
  return (
    <div>
      <Label htmlFor={id} required={required} hint={hint}>
        {label}
      </Label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={controlClass(Boolean(error))}
        {...rest}
      />
      {error ? <ErrorText id={`${id}-error`}>{error}</ErrorText> : null}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  required,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <Label htmlFor={id} required={required} hint={hint}>
        {label}
      </Label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(controlClass(Boolean(error)), value === "" && "text-ink-400")}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <ErrorText id={`${id}-error`}>{error}</ErrorText> : null}
    </div>
  );
}

function TextareaField({
  id,
  label,
  value,
  onChange,
  error,
  required,
  maxLength,
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  maxLength?: number;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "value" | "onChange">) {
  const remaining = maxLength ? maxLength - value.length : null;

  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : `${id}-count`}
        maxLength={maxLength}
        className={cn(controlClass(Boolean(error)), "resize-y")}
        {...rest}
      />
      <div className="mt-2 flex items-baseline justify-between gap-4">
        {error ? (
          <ErrorText id={`${id}-error`}>{error}</ErrorText>
        ) : (
          <p id={`${id}-count`} className="text-xs text-ink-400">
            Minimum 20 characters.
          </p>
        )}
        {remaining !== null && remaining < 500 ? (
          <p className="text-xs text-ink-400 tabular-nums">{remaining} characters left</p>
        ) : null}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 animate-spin">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.25" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
