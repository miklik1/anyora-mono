import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  emailVerified: z.date().nullable(),
});

export type UserType = z.infer<typeof UserSchema>;
