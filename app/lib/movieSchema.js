import { z } from "zod";

const optionalNumber = (schema) =>
  z.preprocess((value) => {
    if (value === "" || value === null || Number.isNaN(value)) {
      return undefined;
    }

    return Number(value);
  }, schema.optional());

export const movieSchema = z.object({
  title: z.string().trim().min(2, "Nazev musi mit alespon 2 znaky."),
  director: z.string().trim().min(2, "Reziser musi mit alespon 2 znaky."),
  year: optionalNumber(
    z
      .number({ invalid_type_error: "Rok musi byt cislo." })
      .int("Rok musi byt cele cislo.")
      .min(1888, "Rok musi byt alespon 1888.")
      .max(new Date().getFullYear() + 2, "Rok je prilis daleko v budoucnosti.")
  ),
  genre: z.string().trim().max(40, "Zanr je prilis dlouhy.").optional(),
  rating: optionalNumber(
    z
      .number({ invalid_type_error: "Hodnoceni musi byt cislo." })
      .min(0, "Hodnoceni musi byt alespon 0.")
      .max(10, "Hodnoceni muze byt maximalne 10.")
  ),
});
