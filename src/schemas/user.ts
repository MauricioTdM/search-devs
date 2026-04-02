import * as z from "zod";

export const userSchema = z.object({ 
    name: z.string().nullable(),
    login: z.string(),
    bio: z.string().nullable(),
    avatar_url: z.url(),
    followers: z.number(),
    following: z.number(),
    company: z.string().nullable(),
    location: z.string().nullable(),
    email: z.string().nullable(),
    blog: z.string().nullable(),
    twitter_username: z.string().nullable(),
});

export type User = z.infer<typeof userSchema>;