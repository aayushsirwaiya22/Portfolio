import { site } from "../../data/site.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-edge py-9">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 text-sm text-muted md:px-10 lg:px-16">
        <span>© {year} {site.name}</span>
        <span>{site.location}</span>
      </div>
    </footer>
  );
}
