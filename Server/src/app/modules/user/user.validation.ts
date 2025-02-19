import { z } from "zod";

export const userValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  profileImage: z.string().nullable().optional(),
  role: z.enum(["customer", "admin"]).default("customer"),
  isBlocked: z.boolean().default(false).optional(),
  phone: z.string().nullable().optional(),
  zipCode: z.number().nullable().optional(),
  address: z.string().nullable().optional(),
});
