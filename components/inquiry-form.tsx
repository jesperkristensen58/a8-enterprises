"use client";

import { CaretDown } from "@phosphor-icons/react";
import { useState, type FormEvent } from "react";
import {
  BUDGETS,
  emptyInquiry,
  OWNERSHIP,
  parseInquiry,
  PROJECT_TYPES,
  STAGES,
  TIMELINES,
  type InquiryInput,
} from "@/lib/inquiry";

type Status = "idle" | "submitting" | "success" | "error";

export function InquiryForm() {
  const [fields, setFields] = useState<InquiryInput>(emptyInquiry);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [receivedEmail, setReceivedEmail] = useState("");

  function update<K extends keyof InquiryInput>(key: K, value: InquiryInput[K]) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const parsed = parseInquiry(fields);
    if (!parsed.ok) {
      setErrors(parsed.errors);
      setStatus("error");
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        errors?: Record<string, string>;
      };

      if (response.status === 400 && payload.errors) {
        setErrors(payload.errors);
        setStatus("error");
        return;
      }

      if (!response.ok || !payload.ok) {
        setFormError(payload.error ?? "Could not send. Try again.");
        setStatus("error");
        return;
      }

      setReceivedEmail(fields.email.trim());
      setStatus("success");
    } catch {
      setFormError("Network error. Try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border-t border-line py-8">
        <p className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          Received.
        </p>
        <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-muted">
          We will reply to {receivedEmail}.
        </p>
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="relative mt-12">
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Field
          id="name"
          label="Name"
          value={fields.name}
          error={errors.name}
          autoComplete="name"
          onChange={(value) => update("name", value)}
        />
        <Field
          id="email"
          label="Email"
          type="email"
          value={fields.email}
          error={errors.email}
          autoComplete="email"
          onChange={(value) => update("email", value)}
        />
        <Field
          id="company"
          label="Company"
          value={fields.company}
          error={errors.company}
          autoComplete="organization"
          onChange={(value) => update("company", value)}
        />
        <SelectField
          id="projectType"
          label="Project type"
          value={fields.projectType}
          error={errors.projectType}
          options={PROJECT_TYPES}
          onChange={(value) => update("projectType", value)}
        />
        <SelectField
          id="stage"
          label="Stage"
          value={fields.stage}
          error={errors.stage}
          options={STAGES}
          onChange={(value) => update("stage", value)}
        />
        <SelectField
          id="timeline"
          label="Timeline"
          value={fields.timeline}
          error={errors.timeline}
          options={TIMELINES}
          onChange={(value) => update("timeline", value)}
        />
        <SelectField
          id="budget"
          label="Budget"
          value={fields.budget}
          error={errors.budget}
          options={BUDGETS}
          onChange={(value) => update("budget", value)}
        />
        <SelectField
          id="ownership"
          label="What you need owned"
          value={fields.ownership}
          error={errors.ownership}
          options={OWNERSHIP}
          onChange={(value) => update("ownership", value)}
        />
      </div>

      <div className="mt-8">
        <label htmlFor="brief" className="block text-sm text-foreground">
          Brief
        </label>
        <textarea
          id="brief"
          name="brief"
          rows={7}
          value={fields.brief}
          aria-invalid={Boolean(errors.brief)}
          aria-describedby={errors.brief ? "brief-error" : "brief-hint"}
          onChange={(event) => update("brief", event.target.value)}
          className={`${controlClass} mt-2`}
        />
        <p id="brief-hint" className="mt-2 text-sm text-muted">
          What needs to exist, for whom, and by when.
        </p>
        {errors.brief ? (
          <p id="brief-error" className="mt-2 text-sm text-foreground">
            {errors.brief}
          </p>
        ) : null}
      </div>

      {formError ? (
        <p className="mt-6 text-sm text-foreground" role="alert">
          {formError}
        </p>
      ) : null}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={busy}
          aria-busy={busy}
          className="inline-flex h-11 w-fit items-center bg-foreground px-6 text-[15px] text-background transition-transform duration-150 hover:bg-foreground/90 active:scale-[0.98] disabled:opacity-60"
        >
          {busy ? "Sending" : "Send"}
        </button>
        <p className="max-w-[46ch] text-sm text-muted">
          We read every inquiry. We do not share it.
        </p>
      </div>
    </form>
  );
}

const controlClass =
  "w-full border border-line bg-surface px-3 py-2.5 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted focus:border-foreground";

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-foreground">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={`${controlClass} mt-2`}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-foreground">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  error,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-foreground">
        {label}
      </label>
      <div className="relative mt-2">
        <select
          id={id}
          name={id}
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={`${controlClass} appearance-none pr-10`}
        >
        <option value="">Select</option>
        {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <CaretDown
          size={14}
          weight="bold"
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-foreground"
          aria-hidden
        />
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-foreground">
          {error}
        </p>
      ) : null}
    </div>
  );
}
