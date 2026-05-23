// Zod is used to validate and enforce data structure (e.g., request body),
// ensuring inputs are correct before processing to prevent bugs and invalid data.
import { z } from 'zod';
export const signupSchema = z.object({
    name: z.string().min(2).max(255).trim(),
    email: z.string().email().max(255).toLowerCase().trim(),
    password: z.string().min(8).max(20),
    role: z.enum(['user', 'admin']).default('user'),
    git_link: z.string().url().optional(),
    linked: z.string().url().optional(),
})

superRefine((data, ctx) => {
    // if no links => password is required
    if (!data.password && !data.git_link && !data.linked) {
        ctx.addIssue({
            path: ['password'],
            message: 'Password is required',
            code: z.ZodIssueCode.custom,
        });
    }
});

export const signInSchema = z.object({
    email: z.string().email().toLowerCase().trim(),
    password: z.string().min(8).max(20),
})

