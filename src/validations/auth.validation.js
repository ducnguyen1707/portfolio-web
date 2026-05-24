// Zod is used to validate and enforce data structure (e.g., request body),
// ensuring inputs are correct before processing to prevent bugs and invalid data.
import { z } from 'zod';
export const signUpSchema = z.object({
  name: z.string().min(2).max(255).trim(),
  email: z.string().email().max(255).toLowerCase().trim(),
  password: z.string().min(8).max(20).optional(), 
  role: z.enum(['user', 'admin']).default('user'),
})

export const signInSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8).max(20),
});
