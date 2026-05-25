"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MovieForm from "../../../components/MovieForm";
import { hasSupabaseConfig, supabase } from "../../../lib/supabase";

export default function EditMovieClient({ id }) {
  const router = useRouter();
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

  const handleSubmit = async (values) => {
    setError("");

    const payload = {
      ...values,
      genre: values.genre || null,
      year: values.year ?? null,
      rating: values.rating ?? null,
    };

    const { error: updateError } = await supabase.from("movies").update(payload).eq("id", id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    router.push(`/movies/${id}`);
    router.refresh();
  };

  if (isLoading) {
    return <p className="status">Nacitam film...</p>;
  }

  if (!movie && error) {
    return <p className="error">{error}</p>;
  }

  return (
    <MovieForm
      defaultValues={movie}
      submitLabel="Ulozit zmeny"
      onSubmit={handleSubmit}
      error={error}
    />
  );
}
