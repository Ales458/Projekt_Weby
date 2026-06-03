import { z } from "zod";

const optionalNumber = (schema) =>
  z.preprocess((value) => {
    if (value === "" || value === null || Number.isNaN(value)) {
      return undefined;
    }

    return Number(value);
  }, schema.optional());

export const movieSchema = z.object({
  title: z.string().trim().min(2, "Název musí mít alespoň 2 znaky."),
  director: z.string().trim().min(2, "Režisér musí mít alespoň 2 znaky."),
  year: optionalNumber(
    z
      .number({ invalid_type_error: "Rok musí být číslo." })
      .int("Rok musí být celé číslo.")
      .min(1888, "Rok musí být alespoň 1888.")
      .max(new Date().getFullYear() + 2, "Rok je příliš daleko v budoucnosti.")
  ),
  genre: z.string().trim().max(40, "Žánr je příliš dlouhý.").optional(),
  rating: optionalNumber(
    z
      .number({ invalid_type_error: "Hodnocení musí být číslo." })
      .min(0, "Hodnocení musí být alespoň 0.")
      .max(10, "Hodnocení může být maximálně 10.")
  ),
});
