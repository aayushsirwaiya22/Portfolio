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
    "group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border px-6 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const variants = {
    primary: "border-accent bg-accent text-accentInk hover:opacity-90",
    secondary: "border-edge text-ink hover:border-accent",
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      {arrow && (
        <span className="transition-transform group-hover:translate-x-1">→</span>
      )}
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
