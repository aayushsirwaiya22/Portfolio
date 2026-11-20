// Renders as a real <a> when `href` is given (anchor scroll / mailto /
// external links) or a real <button> otherwise. `arrow` adds the small
// "→" that nudges right on hover, matching the reference design.
export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "secondary",
  arrow = false,
  className = "",
  ...rest
}) {
  const base =
    "group u-lift inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border px-6 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentText";
  const variants = {
    primary:
      "border-accent bg-accent text-accentInk shadow-[0_10px_24px_-18px_var(--shadow)] hover:shadow-[0_18px_36px_-16px_var(--accent-glow)]",
    secondary:
      "border-edge bg-transparent text-ink hover:border-accentText hover:bg-accentWash hover:text-accentText",
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      {arrow && <span className="u-arrow">→</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {content}
    </button>
  );
}
