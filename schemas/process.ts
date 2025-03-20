import { z } from "zod";

export const processFormSchema = z.object({


  protocol: z.string(), 
  description: z
    .string()
    .min(1, "A descrição precisar ter no mínimo 50 caracteres")
    .trim(),
  type: z.string(),
  enterprise: z.string(),
});
