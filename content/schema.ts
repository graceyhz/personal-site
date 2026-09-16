import { z } from "zod";

/* §6.1 project entry. `slug` comes from the filename, not the file. */
export const projectMetaSchema = z.object({
  title: z.string().min(1),
  category: z.enum(["research", "project", "work"]),
  blurb: z.string().min(1).max(140),
  period: z.string().min(1),
  org: z.string().optional(),
  stack: z.array(z.string().min(1)).min(1),
  outcome: z.string().min(1),
  links: z
    .object({
      repo: z.string().url().optional(),
      paper: z.string().url().optional(),
      demo: z.string().url().optional(),
      poster: z.string().url().optional(),
      writeup: z.string().url().optional(),
    })
    .optional(),
  cover: z
    .object({
      src: z.string().min(1),
      alt: z.string().min(1),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
    })
    .optional(),
  featured: z.boolean().optional(),
});

export type ProjectMeta = z.infer<typeof projectMetaSchema>;
export type Project = ProjectMeta & { slug: string };
export type Category = ProjectMeta["category"];

/* §6.3 publication */
export const publicationSchema = z.object({
  authors: z.string().min(1),
  title: z.string().min(1),
  venue: z.string().min(1),
  year: z.number().int(),
  doi: z.string().url(),
  pdf: z.string().url().optional(),
});

export type Publication = z.infer<typeof publicationSchema>;
