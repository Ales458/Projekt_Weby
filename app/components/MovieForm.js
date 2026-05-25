"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { movieSchema } from "../lib/movieSchema";
import styles from "./MovieForm.module.css";

const emptyValues = {
  title: "",
  director: "",
  year: "",
  genre: "",
  rating: "",
};

export default function MovieForm({ defaultValues, submitLabel, onSubmit, error }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      ...emptyValues,
      ...defaultValues,
      year: defaultValues?.year ?? "",
      rating: defaultValues?.rating ?? "",
    },
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {error ? <p className="error">{error}</p> : null}

      <label className={styles.field}>
        <span>Nazev filmu</span>
        <input {...register("title")} placeholder="Interstellar" />
        {errors.title ? <small>{errors.title.message}</small> : null}
      </label>

      <label className={styles.field}>
        <span>Reziser</span>
        <input {...register("director")} placeholder="Christopher Nolan" />
        {errors.director ? <small>{errors.director.message}</small> : null}
      </label>

      <div className={styles.row}>
        <label className={styles.field}>
          <span>Rok</span>
          <input {...register("year")} inputMode="numeric" placeholder="2014" />
          {errors.year ? <small>{errors.year.message}</small> : null}
        </label>

        <label className={styles.field}>
          <span>Hodnoceni</span>
          <input {...register("rating")} inputMode="decimal" placeholder="9" />
          {errors.rating ? <small>{errors.rating.message}</small> : null}
        </label>
      </div>

      <label className={styles.field}>
        <span>Zanr</span>
        <input {...register("genre")} placeholder="Sci-fi" />
        {errors.genre ? <small>{errors.genre.message}</small> : null}
      </label>

      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Ukladam..." : submitLabel}
      </button>
    </form>
  );
}
