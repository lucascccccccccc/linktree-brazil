import { z } from 'zod';

export const UserRegisterSchema = z.object({
    name: z.string().min(1).max(100),
    username: z.string().min(1).max(50),
    email: z.string().email(),
    description: z.string().optional(),
    photo: z.string().optional(),
    password: z.string().min(3).max(100),
});

export const UserLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(100),
});

export type UserInput = z.infer<typeof UserRegisterSchema>;
