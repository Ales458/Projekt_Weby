import Link from "next/link";

export default function Header() {
  return (
    <header className="topbar">
      <Link className="brand" href="/">
        Knihovna filmu
      </Link>
      <nav className="nav" aria-label="Hlavni navigace">
        <Link className="ghost-button" href="/movies">
          Filmy
        </Link>
        <Link className="button" href="/movies/new">
          Pridat film
        </Link>
      </nav>
    </header>
  );
}
