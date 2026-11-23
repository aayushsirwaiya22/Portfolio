// EmailJS credentials for the contact form.
//
// These are public by design: the service ID, template IDs and public key all
// ship inside the client bundle, because the browser posts to EmailJS directly
// with no backend in between. Hiding them would not make them secret — it
// would only stop the form from working.
//
// The VITE_ environment variables still win when they are present, so a fork
// can point the form at a different EmailJS account without touching this
// file. The fallbacks below are what keep the live site working, because
// `.env` is gitignored and never reaches the host's build.
export const emailJs = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_okm3mxk",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "SopYpain66bZ2tusQ",
  notifyTemplate:
    import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFY || "template_5bymwct",
  autoreplyTemplate:
    import.meta.env.VITE_EMAILJS_TEMPLATE_AUTOREPLY || "template_r3mqphl",
};
