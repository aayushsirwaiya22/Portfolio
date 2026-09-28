// Every section wraps its content in this so max-width and side padding
// stay consistent across the whole site instead of being repeated.
export default function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto max-w-6xl px-6 md:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
