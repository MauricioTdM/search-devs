import * as z from "zod";

export const repositorySchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    updated_at: z.iso.datetime().nullable(),
    stargazers_count: z.number(),
    html_url: z.url(),
});

export type Repository = z.infer<typeof repositorySchema>;