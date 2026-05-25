"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteMovieButton from "../../components/DeleteMovieButton";
import { hasSupabaseConfig, supabase } from "../../lib/supabase";
import styles from "../movies.module.css";

export default function MovieDetailClient({ id }) {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovie = async () => {
      if (!hasSupabaseConfig) {
        setIsLoading(false);
        setError("Dopln Supabase konfiguraci do .env.local.");
        return;
      }

      const { data, error: loadError } = await supabase
        .from("movies")
        .select("*")
        .eq("id", id)
        .single();

      setIsLoading(false);

      if (loadError) {
        setError(loadError.message);
        return;
      }

      setMovie(data);
    };

    loadMovie();
  }, [id]);

  if (isLoading) {
    return <p className="status">Nacitam detail filmu...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!movie) {
    return <p className="status">Film nebyl nalezen.</p>;
  }

  return (
    <section className={styles.detail}>
      <h1>{movie.title}</h1>
      <dl>
        <dt>Reziser</dt>
        <dd>{movie.director}</dd>
        <dt>Rok</dt>
        <dd>{movie.year || "Nezadano"}</dd>
        <dt>Zanr</dt>
        <dd>{movie.genre || "Nezadano"}</dd>
        <dt>Hodnoceni</dt>
        <dd>{movie.rating ?? "Nezadano"}</dd>
      </dl>
      <div className={styles.actions}>
        <Link className="ghost-button" href="/movies">
          Zpet na seznam
        </Link>
        <Link className="button" href={`/movies/${movie.id}/edit`}>
          Upravit
        </Link>
        <DeleteMovieButton id={movie.id} />
      </div>
    </section>
  );
}
