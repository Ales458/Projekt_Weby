import Header from "../../components/Header";
import MovieDetailClient from "./MovieDetailClient";

export default async function MovieDetailPage({ params }) {
  const { id } = await params;

  return (
    <main className="page-shell">
      <Header />
      <MovieDetailClient id={id} />
    </main>
  );
}
