"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

type FormState = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialData: FormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialData);
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  function validate(): boolean {
    const newErrors: Partial<FormData> = {};

    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setState("loading");

    // TODO: Replace with real API call (e.g. POST /api/contact or WP REST)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate success (replace with actual fetch + error handling)
    setState("success");
    setForm(initialData);
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl bg-slate-900 border border-green-500/30 p-8 flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
          <FontAwesomeIcon icon={faCircleCheck} className="text-green-400 w-7 h-7" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-semibold text-slate-100">
            Message Sent!
          </h3>
          <p className="mt-1 text-slate-400 text-sm">
            Thanks for reaching out. We&apos;ll get back to you within 24 hours.
          </p>
        </div>
        <button
          onClick={() => setState("idle")}
          className="mt-2 px-5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-sm hover:bg-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl bg-slate-900 border border-slate-800 p-6 md:p-8 space-y-5"
    >
      {state === "error" && (
        <div className="flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
          <FontAwesomeIcon icon={faTriangleExclamation} className="w-4 h-4 flex-shrink-0" />
          Something went wrong. Please try again.
        </div>
      )}

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Full Name"
          name="name"
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        <Field
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
      </div>

      {/* Phone + Subject */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Phone (Optional)"
          name="phone"
          type="tel"
          placeholder="01XXXXXXXXX"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="subject"
            className="text-xs text-slate-400 font-medium uppercase tracking-wider"
          >
            Subject <span className="text-[#f06a38]">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className={`w-full rounded-xl bg-slate-800 border px-4 py-3 text-sm text-slate-200 outline-none transition-colors focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/40 ${
              errors.subject ? "border-red-500/60" : "border-slate-700"
            }`}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          >
            <option value="" disabled>
              Select a subject
            </option>
            <option value="Order Issue">Order Issue</option>
            <option value="Return & Refund">Return &amp; Refund</option>
            <option value="Product Inquiry">Product Inquiry</option>
            <option value="Delivery Status">Delivery Status</option>
            <option value="Payment Problem">Payment Problem</option>
            <option value="Other">Other</option>
          </select>
          {errors.subject && (
            <p id="subject-error" className="text-xs text-red-400 mt-0.5">
              {errors.subject}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="message"
          className="text-xs text-slate-400 font-medium uppercase tracking-wider"
        >
          Message <span className="text-[#f06a38]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Describe your issue or question..."
          value={form.message}
          onChange={handleChange}
          className={`w-full rounded-xl bg-slate-800 border px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none resize-none transition-colors focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/40 ${
            errors.message ? "border-red-500/60" : "border-slate-700"
          }`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-red-400 mt-0.5">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full flex items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #f06a38, #fb923c)",
          boxShadow: state === "loading" ? "none" : "0 4px 14px rgba(240,106,56,0.35)",
        }}
      >
        {state === "loading" ? (
          <>
            <Spinner />
            Sending…
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}

/* ── Reusable input field ───────────────────────────────────── */
interface FieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

function Field({ label, name, type, placeholder, value, onChange, error, required }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-xs text-slate-400 font-medium uppercase tracking-wider"
      >
        {label}
        {required && <span className="text-[#f06a38] ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl bg-slate-800 border px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition-colors focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/40 ${
          error ? "border-red-500/60" : "border-slate-700"
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="text-xs text-red-400 mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Button spinner ─────────────────────────────────────────── */
function Spinner() {
  return (
    <svg
      className="w-4 h-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
