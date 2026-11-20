// Shared browser-window chrome. Wraps project previews so every case file
// reads as the same tool rather than a mixed bag of boxes.
export default function BrowserFrame({ url, children, className = "", bodyClassName = "" }) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border border-edge bg-surface shadow-[0_24px_60px_-34px_var(--shadow)] transition-[border-color,box-shadow] duration-200 group-hover:border-accentText group-hover:shadow-[0_30px_68px_-30px_var(--shadow)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-edge bg-surfaceLight px-3 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </span>
        {url && (
          <span className="truncate rounded-md bg-surface px-2 py-0.5 font-mono text-[11px] tracking-wide text-muted">
            {url}
          </span>
        )}
      </div>
      <div className={`relative flex-1 bg-surfaceSunken ${bodyClassName}`}>{children}</div>
    </div>
  );
}
