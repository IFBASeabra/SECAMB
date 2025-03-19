import { z } from "zod";

export const processFormSchema = z.object({
  name: z.string().trim(),

  description: z
    .string()
    .min(1, "A descrição precisar ter no mínimo 50 caracteres")
    .trim(),

  protocol: z.string(),
  type: z.string(),
});
