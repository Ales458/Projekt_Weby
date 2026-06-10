"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { hasSupabaseConfig, supabase } from "../lib/supabase";
import styles from "./movies.module.css";

const searchFields = {
  title: "Název",
  director: "Režisér",
  year: "Rok",
  rating: "Hodnocení",
};

export default function MoviesBrowser() {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("all");
  const [searchField, setSearchField] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      if (!hasSupabaseConfig) {
        setIsLoading(false);
        setError("Doplň NEXT_PUBLIC_SUPABASE_URL a NEXT_PUBLIC_SUPABASE_ANON_KEY do .env.local.");
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

  const visibleMovies = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return movies.filter((movie) => {
      const matchesGenre = genre === "all" || movie.genre === genre;
      const searchableValue = movie[searchField];
      const matchesSearch =
        !normalizedSearch ||
        (searchableValue !== null &&
          searchableValue !== undefined &&
          String(searchableValue).toLowerCase().includes(normalizedSearch));

      return matchesGenre && matchesSearch;
    });
  }, [genre, movies, searchField, searchTerm]);

  return (
    <>
      <section className={styles.heading}>
        <div>
          <h1>Filmy</h1>
          <p>Vyber žánr nebo vyhledej film podle konkrétního údaje.</p>
        </div>
      </section>

      {isLoading ? <p className="status">Načítám filmy...</p> : null}
      {error ? <p className="error">{error}</p> : null}

      {!isLoading && !error ? (
        <>
          <div className={styles.filters}>
            <label className={styles.filter}>
              <span>Filtrovat podle žánru</span>
              <select value={genre} onChange={(event) => setGenre(event.target.value)}>
                <option value="all">Všechny žánry</option>
                {genres.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <div className={styles.searchFilters}>
              <label className={styles.filter}>
                <span>Hledat podle</span>
                <select value={searchField} onChange={(event) => setSearchField(event.target.value)}>
                  {Object.entries(searchFields).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.filter}>
                <span>Vyhledávání</span>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder={`Zadej ${searchFields[searchField].toLowerCase()}`}
                />
              </label>
            </div>
          </div>

          {visibleMovies.length === 0 ? (
            <p className="status">
              {movies.length === 0 ? "Zatím tu nejsou žádné filmy." : "Nic neodpovídá vyhledávání."}
            </p>
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
                    {movie.genre || "Bez žánru"} | Hodnocení: {movie.rating ?? "nezadáno"}
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
