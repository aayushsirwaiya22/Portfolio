import { Fragment, useRef, useState } from "react";
import { site } from "../../data/site.js";
import { socialLinks } from "../../data/socialLinks.js";
import Container from "../common/Container.jsx";
import Eyebrow from "../common/Eyebrow.jsx";
import Button from "../common/Button.jsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.js";
import { useLocalTime } from "../../hooks/useLocalTime.js";
import { useMagneticButton } from "../../hooks/useMagneticButton.js";
import { createTextRevealAnimation } from "../../animations/textReveal.js";
import { createFadeUpAnimation } from "../../animations/fadeUp.js";
import { createParallaxAnimation } from "../../animations/parallax.js";

const initialErrors = { name: "", email: "", message: "" };
const MESSAGE_LIMIT = 600;

// Direct channels. Only real, confirmed destinations — nothing invented.
const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    hint: "Best for a brief",
  },
  {
    label: "Phone",
    value: site.phone,
    href: site.phoneHref,
    hint: "Direct line",
  },
  {
    label: "LinkedIn",
    value: "Say hello",
    href: socialLinks[0].href,
    hint: "Profile and updates",
  },
  {
    label: "Resume",
    value: "Download PDF",
    href: site.resume,
    hint: "Full history",
  },
];

// Sends via EmailJS (no backend): template 1 notifies the owner inbox,
// template 2 auto-replies to the visitor. Falls back to a mailto: draft
// if sending fails.
async function sendEmailJsEmail({ serviceId, publicKey, templateId, params }) {
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: params,
    }),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`EmailJS send failed (${response.status}): ${detail}`);
  }
}

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState(initialErrors);
  const [status, setStatus] = useState("idle");
  const [note, setNote] = useState(
    "Fill this in and I'll get back to you — you'll also get a confirmation email."
  );
  const localTime = useLocalTime();

  const headRef = useRef(null);
  const bodyRef = useRef(null);
  const actionsRef = useRef(null);
  const bigWordRef = useRef(null);

  useScrollAnimation(headRef, createTextRevealAnimation);
  useScrollAnimation(bodyRef, createFadeUpAnimation);
  useScrollAnimation(bigWordRef, createParallaxAnimation);
  useMagneticButton(actionsRef, 0.18);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {
      name: values.name.trim() ? "" : "Please enter your name.",
      email: /^\S+@\S+\.\S+$/.test(values.email.trim())
        ? ""
        : "Please enter a valid email.",
      message:
        values.message.trim().length >= 10
          ? ""
          : "Please write at least 10 characters.",
    };
    setErrors(nextErrors);

    const hasError = Object.values(nextErrors).some(Boolean);
    if (hasError || status === "sending") return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const notifyTemplate = import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFY;
    const autoreplyTemplate = import.meta.env.VITE_EMAILJS_TEMPLATE_AUTOREPLY;
    if (!serviceId || !publicKey || !notifyTemplate || !autoreplyTemplate) {
      setStatus("error");
      setNote(
        `Sending is not configured right now. Please write to ${site.email} directly.`
      );
      return;
    }

    setStatus("sending");
    setNote("Sending your message…");

    const params = {
      from_name: values.name.trim(),
      // Auto-reply template uses {{name}} / {{title}} naming.
      name: values.name.trim(),
      title: values.message.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      subject: `Portfolio enquiry from ${values.name.trim()}`,
    };

    try {
      // 1) Notify the owner inbox — this one must succeed.
      await sendEmailJsEmail({
        serviceId,
        publicKey,
        templateId: notifyTemplate,
        params,
      });

      // 2) Auto-reply to the visitor (template To = {{email}}).
      try {
        await sendEmailJsEmail({
          serviceId,
          publicKey,
          templateId: autoreplyTemplate,
          params,
        });
        setStatus("success");
        setNote(
          "Message sent. Check your inbox for a confirmation email — I'll reply soon."
        );
      } catch {
        setStatus("success");
        setNote(
          "Message sent — I'll reply soon. (The confirmation email may not have arrived.)"
        );
      }
      setValues({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("[contact]", err);
      setStatus("error");
      setNote(
        `Couldn't send just now. Please try again or write to ${site.email} directly.`
      );
    }
  }

  const remaining = MESSAGE_LIMIT - values.message.length;

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      {/* Oversized watermark, drifting slowly as the section scrolls past. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          ref={bigWordRef}
          className="outline-word block translate-y-[22%] text-center font-display text-[17vw] font-bold uppercase leading-[0.8] tracking-[-0.04em]"
        >
          Say hello
        </span>
      </div>

      <Container className="relative">
        <div ref={headRef}>
          <Eyebrow number="07">Contact</Eyebrow>
          <h2 className="mt-4 max-w-4xl font-display text-5xl uppercase leading-[0.9] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {["Let's build", "something."].map((word, index) => (
                <Fragment key={word}>
                  <span
                    data-reveal-child
                    className={`inline-block ${
                      index === 1 ? "text-accentText" : ""
                    }`}
                  >
                    {word}
                  </span>
                  {index === 0 ? " " : null}
                </Fragment>
              ),
            )}
          </h2>
        </div>

        <div
          ref={bodyRef}
          className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12"
        >
          {/* ── Left: status panel + channels ─────────────────────────── */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-edge bg-surface">
              <div className="flex items-center gap-3 border-b border-edge bg-surfaceLight px-4 py-3">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                </span>
                <span className="truncate font-mono text-xs text-muted">
                  contact.status
                </span>
                <span className="ml-auto rounded bg-surface px-1.5 py-0.5 font-mono text-[11px] text-muted">
                  LIVE
                </span>
              </div>

              <dl>
                {[
                  { label: "Base", value: "Indore, India" },
                  { label: "Timezone", value: "IST · UTC+5:30" },
                  { label: "Local time", value: `${localTime} IST` },
                ].map((row, index) => (
                  <div
                    key={row.label}
                    className={`flex items-baseline justify-between gap-4 px-5 py-3 ${
                      index > 0 ? "border-t border-edge" : ""
                    }`}
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                      {row.label}
                    </dt>
                    <dd className="font-mono text-sm tabular-nums text-ink">
                      {row.value}
                    </dd>
                  </div>
                ))}
                <div className="flex items-baseline justify-between gap-4 border-t border-edge px-5 py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    Status
                  </dt>
                  <dd className="flex items-center gap-2 font-mono text-sm text-accentText">
                    <span className="h-1.5 w-1.5 rounded-full bg-accentText" aria-hidden="true" />
                    Open to work
                  </dd>
                </div>
              </dl>

              <div className="flex items-center justify-between border-t border-edge bg-surfaceLight px-4 py-2 font-mono text-[11px] text-muted">
                <span>Section // 07</span>
                <span className="flex items-center gap-2 text-accentText">
                  ● Online
                  <span className="caret" aria-hidden="true" />
                </span>
              </div>
            </div>

            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group u-card block h-full rounded-xl border border-edge bg-surface px-4 py-3.5"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                      {channel.label}
                    </span>
                    <span className="mt-1.5 flex items-center justify-between gap-2">
                      <span className="truncate text-sm text-ink">{channel.value}</span>
                      <span className="u-arrow-diag text-accentText" aria-hidden="true">
                        ↗
                      </span>
                    </span>
                    <span className="mt-1 block text-xs text-muted">{channel.hint}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: the work order form ─────────────────────────────── */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="overflow-hidden rounded-2xl border border-edge bg-surface shadow-[0_40px_90px_-60px_var(--shadow)]"
            >
              <div className="flex items-center gap-3 border-b border-edge bg-surfaceLight px-4 py-3">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                </span>
                <span className="truncate font-mono text-xs text-muted">
                  new-inquiry.json
                </span>
                <span className="ml-auto rounded bg-surface px-1.5 py-0.5 font-mono text-[11px] text-muted">
                  FORM
                </span>
              </div>

              <div className="space-y-8 px-6 py-7 sm:px-8 sm:py-9">
                <Field
                  label="Name"
                  error={errors.name}
                  input={
                    <input
                      name="name"
                      autoComplete="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="Who is writing?"
                      className="field-input"
                    />
                  }
                />

                <Field
                  label="Email"
                  error={errors.email}
                  input={
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="field-input"
                    />
                  }
                />

                <Field
                  label="Message"
                  error={errors.message}
                  hint={`${values.message.length} / ${MESSAGE_LIMIT}`}
                  tone={remaining < 100 ? "accent" : ""}
                  input={
                    <textarea
                      name="message"
                      rows={4}
                      maxLength={MESSAGE_LIMIT}
                      value={values.message}
                      onChange={handleChange}
                      placeholder="What are you building?"
                      className="field-input resize-y"
                    />
                  }
                />

                <div ref={actionsRef} className="flex flex-wrap items-center gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    arrow
                    disabled={status === "sending"}
                    data-magnetic
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                  </Button>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {status === "sending"
                      ? "Transmitting"
                      : status === "success"
                        ? "Delivered"
                        : status === "error"
                          ? "Failed"
                          : "Ready"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-start justify-between gap-3 border-t border-edge bg-surfaceLight px-6 py-3 font-mono text-[11px] text-muted sm:px-8">
                <span className="shrink-0">emailjs://send</span>
                <span className="flex items-start gap-2">
                  <span>{note}</span>
                  {status === "error" && (
                    <a
                      href={`mailto:${site.email}?subject=${encodeURIComponent(
                        `Portfolio enquiry from ${values.name || "website visitor"}`
                      )}`}
                      className="u-link u-wipe shrink-0"
                    >
                      Open in email app instead
                    </a>
                  )}
                  <span className="caret mt-[3px]" aria-hidden="true" />
                </span>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

// One form field: a mono label, an underline-only input and an error slot
// that keeps its height so the form never jumps.
function Field({ label, input, error, hint, tone = "" }) {
  return (
    <label className="group block">
      <span className="flex items-baseline justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-200 group-focus-within:text-accentText">
        <span>{label}</span>
        {hint && (
          <span
            className={`tabular-nums ${
              tone === "accent" ? "text-accentText" : ""
            }`}
          >
            {hint}
          </span>
        )}
      </span>
      {input}
      <span className="mt-1.5 block min-h-[1em] text-xs text-danger">{error}</span>
    </label>
  );
}
