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
    email: z.string().email("Invalid email").optional(), 
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    profileImage: z.string().optional(),
    zipCode: z.number().int().min(1000, "Zip code must be at least 4 digits").optional(),
  }),
});


export default updateProfileZodSchema;


const updatePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "Old password is required" }),
    newPassword: z.string({ required_error: "New password is required" }),
  }),
});



export const AuthValidation = {
  loginZodSchema,
  registerZodSchema,
  updateProfileZodSchema,
  updatePasswordZodSchema,
}; 