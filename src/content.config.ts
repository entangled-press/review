import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const interviews = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/interviews' }),
  schema: z.object({
    issue: z.number(),
    title: z.string(),
    title_en: z.string().optional(),
    interviewees: z.array(
      z.object({
        name: z.string(),
        name_en: z.string().optional(),
        affiliation: z.string().optional(),
      })
    ),
    interviewers: z.array(z.string()).default([]),
    recorded: z.coerce.date(),
    published: z.coerce.date().nullable().default(null),
    location: z.string().optional(),
    summary: z.string().optional(),
    summary_en: z.string().optional(),
    tags: z.array(z.string()).default([]),
    consent: z.enum(['pending', 'confirmed']).default('pending'),
    status: z.enum(['draft', 'in-review', 'published']).default('draft'),
    doi: z.string().nullable().default(null),
  }),
});

export const collections = { interviews };
