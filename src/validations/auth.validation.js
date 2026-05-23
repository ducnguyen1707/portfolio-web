// Zod is used to validate and enforce data structure (e.g., request body),
// ensuring inputs are correct before processing to prevent bugs and invalid data.
import { z } from 'zod';
export const signUpSchema = z.object({
  name: z.string().min(2).max(255).trim(),
  email: z.string().email().max(255).toLowerCase().trim(),
  password: z.string().min(8).max(20).optional(), 
  role: z.enum(['user', 'admin']).default('user'),
  git_link: z.string().url().optional(),
  linked: z.string().url().optional(),
})
.superRefine((data, ctx) => { // 👈 FIX
  // require at least one: password OR social link
  if (!data.password && !data.git_link && !data.linked) {
    ctx.addIssue({
      path: ['password'],
      message: 'Password or social link is required',
      code: z.ZodIssueCode.custom,
    });
  }
});

export const signInSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8).max(20),
});
