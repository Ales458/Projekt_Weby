"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import MovieForm from "../../components/MovieForm";
import { hasSupabaseConfig, supabase } from "../../lib/supabase";

export default function NewMovieClient() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    if (!hasSupabaseConfig) {
      setError("Dopln Supabase konfiguraci do .env.local.");
      return;
    }

    setError("");

    const payload = {
      ...values,
      genre: values.genre || null,
      year: values.year ?? null,
      rating: values.rating ?? null,
    };

    const { data, error: insertError } = await supabase
      .from("movies")
      .insert(payload)
      .select("id")
      .single();

    if (insertError) {
      setError(insertError.message);
      return;
    }

    router.push(`/movies/${data.id}`);
    router.refresh();
  };

  return <MovieForm submitLabel="Ulozit film" onSubmit={handleSubmit} error={error} />;
}
