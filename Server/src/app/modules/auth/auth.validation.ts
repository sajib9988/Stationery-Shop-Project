import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

const registerZodSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  }),
});

;

const updateProfileZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
   
  }),
});

const updatePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  registerZodSchema,
  updateProfileZodSchema,
  updatePasswordZodSchema,
}; 