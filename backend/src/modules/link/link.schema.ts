import { z } from 'zod';

export const LinkInputSchema = z.object({
    userId: z.string().cuid(),
    title: z.string().min(1).max(100),
    url: z.string().url(),
    description: z.string().optional(),
});