"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function DeleteMovieButton({ id }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm("Opravdu chceš film smazat?");

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setError("");

    const { error: deleteError } = await supabase.from("movies").delete().eq("id", id);

    setIsDeleting(false);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    router.push("/movies");
    router.refresh();
  };

  return (
    <div>
      <button className="danger-button" type="button" onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? "Mažu..." : "Smazat film"}
      </button>
      {error ? <p className="error">{error}</p> : null}
    </div>
  );
}
