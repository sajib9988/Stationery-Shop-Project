import { z } from "zod";

export const productValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    category: z.string(),
    price: z.number().min(1),
    inStock: z.boolean(),
    image: z.string().optional(),
    model: z.string().optional(),
  }),
});
