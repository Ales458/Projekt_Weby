import Header from "../components/Header";
import MoviesBrowser from "./MoviesBrowser";

export default function MoviesPage() {
  return (
    <main className="page-shell">
      <Header />
      <MoviesBrowser />
    </main>
  );
}
