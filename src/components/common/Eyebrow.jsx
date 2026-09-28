// Small monospace "01 — Label" tag used above every section heading.
// `number` is optional so it also works for one-off labels.
export default function Eyebrow({ number, children }) {
  return (
    <span className="mb-4 block font-mono text-xs uppercase tracking-[0.14em] text-accent">
      {number ? `${number} — ` : ""}
      {children}
    </span>
  );
}
