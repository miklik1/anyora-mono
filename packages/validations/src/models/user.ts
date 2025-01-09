import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  createdAt: z.date(),
});

export type UserType = z.infer<typeof UserSchema>;

export const SignupSchema = UserSchema.omit({
  id: true,
  createdAt: true,
});

export type SignupType = z.infer<typeof SignupSchema>;

export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

export type LoginType = z.infer<typeof LoginSchema>;