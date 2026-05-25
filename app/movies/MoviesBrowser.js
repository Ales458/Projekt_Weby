"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { hasSupabaseConfig, supabase } from "../lib/supabase";
import styles from "./movies.module.css";

export default function MoviesBrowser() {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      if (!hasSupabaseConfig) {
        setIsLoading(false);
        setError("Dopln NEXT_PUBLIC_SUPABASE_URL a NEXT_PUBLIC_SUPABASE_ANON_KEY do .env.local.");
        return;
      }

      const { data, error: loadError } = await supabase
        .from("movies")
        .select("*")
        .order("created_at", { ascending: false });

      setIsLoading(false);

      if (loadError) {
        setError(loadError.message);
        return;
      }

      setMovies(data || []);
    };

    loadMovies();
  }, []);

  const genres = useMemo(() => {
    return [...new Set(movies.map((movie) => movie.genre).filter(Boolean))].sort();
  }, [movies]);

  const visibleMovies = genre === "all" ? movies : movies.filter((movie) => movie.genre === genre);

  return (
    <>
      <section className={styles.heading}>
        <div>
          <h1>Filmy</h1>
          <p>Seznam filmu ulozenych v Supabase databazi. Vyber zanr pro rychle filtrovani.</p>
        </div>
        <Link className="button" href="/movies/new">
          Pridat film
        </Link>
      </section>

      {isLoading ? <p className="status">Nacitam filmy...</p> : null}
      {error ? <p className="error">{error}</p> : null}

      {!isLoading && !error ? (
        <>
          <label className={styles.filter}>
            <span>Filtrovat podle zanru</span>
            <select value={genre} onChange={(event) => setGenre(event.target.value)}>
              <option value="all">Vsechny zanry</option>
              {genres.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          {visibleMovies.length === 0 ? (
            <p className="status">Zatim tu nejsou zadne filmy.</p>
          ) : (
            <div className={styles.grid}>
              {visibleMovies.map((movie) => (
                <article className={styles.card} key={movie.id}>
                  <h2>{movie.title}</h2>
                  <p className={styles.meta}>
                    {movie.director}
                    {movie.year ? `, ${movie.year}` : ""}
                  </p>
                  <p className={styles.meta}>
                    {movie.genre || "Bez zanru"} | Hodnoceni: {movie.rating ?? "nezadano"}
                  </p>
                  <div className={styles.actions}>
                    <Link className="ghost-button" href={`/movies/${movie.id}`}>
                      Detail
                    </Link>
                    <Link className="ghost-button" href={`/movies/${movie.id}/edit`}>
                      Upravit
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      ) : null}
    </>
  );
}
