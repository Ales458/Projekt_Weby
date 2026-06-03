import Link from "next/link";

export default function Header() {
  return (
    <header className="topbar">
      <Link className="brand" href="/">
        Knihovna filmů
      </Link>
      <nav className="nav" aria-label="Hlavní navigace">
        <Link className="ghost-button" href="/movies">
          Filmy
        </Link>
        <Link className="button" href="/movies/new">
          Přidat film
        </Link>
      </nav>
    </header>
  );
}
