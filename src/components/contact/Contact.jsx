import { useRef, useState } from "react";
import { site } from "../../data/site.js";
import { socialLinks } from "../../data/socialLinks.js";
import Container from "../common/Container.jsx";
import SectionTitle from "../common/SectionTitle.jsx";
import Button from "../common/Button.jsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.js";
import { createFadeUpAnimation } from "../../animations/fadeUp.js";

const initialErrors = { name: "", email: "", message: "" };

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
  const contentRef = useRef(null);
  useScrollAnimation(contentRef, createFadeUpAnimation);

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

  return (
    <section id="contact" className="py-20 sm:py-28">
      <Container>
        <SectionTitle number="07" eyebrow="Contact" title="Have a project in mind?" />
        <p className="mt-2 max-w-md text-lg text-muted">Let's build something meaningful.</p>

        <div ref={contentRef} className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            {[
              { label: site.email, href: `mailto:${site.email}` },
              { label: site.phone, href: site.phoneHref },
              ...socialLinks,
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex min-h-14 items-center justify-between border-b border-edge text-lg text-ink transition-colors hover:text-accent"
              >
                {link.label}
                <span>↗</span>
              </a>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate className="grid gap-3.5">
            <label className="grid gap-1.5 text-sm text-muted">
              Name
              <input
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={handleChange}
                className="min-h-12 rounded-xl border border-edge bg-surface p-3.5 text-ink focus:border-accent focus:outline-none"
              />
              <span className="min-h-[1em] text-xs text-red-400">{errors.name}</span>
            </label>

            <label className="grid gap-1.5 text-sm text-muted">
              Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                className="min-h-12 rounded-xl border border-edge bg-surface p-3.5 text-ink focus:border-accent focus:outline-none"
              />
              <span className="min-h-[1em] text-xs text-red-400">{errors.email}</span>
            </label>

            <label className="grid gap-1.5 text-sm text-muted">
              Message
              <textarea
                name="message"
                rows={5}
                value={values.message}
                onChange={handleChange}
                className="min-h-[140px] resize-y rounded-xl border border-edge bg-surface p-3.5 text-ink focus:border-accent focus:outline-none"
              />
              <span className="min-h-[1em] text-xs text-red-400">{errors.message}</span>
            </label>

            <Button
              type="submit"
              variant="primary"
              arrow
              className="w-fit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </Button>
            <p className="text-xs text-muted">
              {note}{" "}
              {status === "error" && (
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(
                    `Portfolio enquiry from ${values.name || "website visitor"}`
                  )}`}
                  className="underline hover:text-accent"
                >
                  Open in email app instead
                </a>
              )}
            </p>
            
          </form>
        </div>
      </Container>
    </section>
  );
}
