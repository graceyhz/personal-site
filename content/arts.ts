import { z } from "zod";

/* §6.4 arts entries. Two lists because the media are structurally different:
   visual is a static grid + lightbox, performing is video with context. */

const base = {
  title: z.string().min(1),
  medium: z.string().min(1),
  year: z.number().int(),
  alt: z.string().min(8, "alt must describe the piece, not say 'artwork'"),
  note: z.string().optional(),
};

export const visualSchema = z.object({
  ...base,
  /* path under /public, e.g. "/arts/koi.jpg". Width/height are read from the file. */
  src: z.string().startsWith("/arts/"),
});

export const performingSchema = z.object({
  ...base,
  youtubeId: z.string().regex(/^[\w-]{11}$/, "11-character YouTube video id"),
  role: z.string().optional(),
  /* Which section it goes in: pieces I choreographed, or ones I danced in */
  kind: z.enum(["choreography", "danced"]),
  year: z.number().int().optional(),
});

/* Stage photos for the performing section. Same shape as a visual piece,
   but the year is optional since many photos arrive without one. */
export const photoSchema = visualSchema.extend({
  year: z.number().int().optional(),
});

export type VisualEntry = z.infer<typeof visualSchema>;
export type PerformingEntry = z.infer<typeof performingSchema>;
export type PhotoEntry = z.infer<typeof photoSchema>;

/* Newest first. Replace the placeholders with real work. */
export const visual: VisualEntry[] = [
  {
    title: "Placeholder one",
    medium: "Digital, Procreate",
    year: 2026,
    src: "/arts/placeholder-1.png",
    alt: "Placeholder: a flat warm beige portrait-orientation rectangle.",
  },
  {
    title: "Placeholder two",
    medium: "Ink on paper",
    year: 2025,
    src: "/arts/placeholder-2.png",
    alt: "Placeholder: a flat taupe landscape-orientation rectangle.",
    note: "Notes go here, one or two sentences of context.",
  },
  {
    title: "Placeholder three",
    medium: "Digital, Procreate",
    year: 2025,
    src: "/arts/placeholder-3.png",
    alt: "Placeholder: a flat sand-colored square.",
  },
];

export const performing: PerformingEntry[] = [
  {
    title: "Reverie",
    medium: "Contemporary, Pan-Asian Dance Troupe",
    kind: "choreography",
    role: "Co-choreographer with Ashley Wang & Iris Ou",
    youtubeId: "jGbS6N25lus",
    alt: "Three dancers in dark costumes linked arm to arm, leaning back in an arc under magenta stage light.",
  },
  {
    title: "A Glimpse",
    medium: "Weimao, Pan-Asian Dance Troupe",
    kind: "danced",
    role: "Dancer · choreography by Cherrie Yee & Natalie Yee",
    youtubeId: "yzwTGCxCMIs",
    alt: "Dancers in white with veiled hats holding small lanterns, posed in a group against an orange-to-violet backdrop.",
  },
  {
    title: "From Stone She Was Born",
    medium: "Feather, Pan-Asian Dance Troupe",
    kind: "danced",
    role: "Dancer · choreography by Ellie Feng & Rebecca Wang",
    youtubeId: "k2hQjiW3AJI",
    alt: "A dancer in flowing pale costume rises at center while a ring of dancers on the floor around her sweep long ribbons under pink light.",
  },
];

/* Titles are working titles: replace with the piece names, and add `year`. */
export const performingPhotos: PhotoEntry[] = [
  {
    title: "sleeping beauty - 2025",
    medium: "Ballet",
    src: "/arts/dance-ballet-grand-jete-duo.jpg",
    alt: "Two ballerinas, one in a pink tutu and one in an orange tutu, leaping side by side in a grand jeté before a painted window backdrop.",
  },
  {
    title: "大鱼 - 2025",
    medium: "Chinese classical dance",
    src: "/arts/dance-chinese-classical-big-fish.jpg",
    alt: "A dancer in a blue top and long white-to-teal skirt arching back with both arms reaching up, one leg extended behind, before red Chinese knot decorations on a dark curtain.",
  },
  {
    title: "a glimpse - 2026",
    medium: "Pan-Asian Dance Troupe",
    src: "/arts/dance-chinese-classical-veil.jpg",
    alt: "A dancer alone in a pool of warm light on a dark stage, arms outstretched, her head hidden under a wide brimmed hat draped with a pale green veil.",
  },
  {
    title: "a glimpse - 2026",
    medium: "Pan-Asian Dance Troupe",
    src: "/arts/dance-chinese-classical-silk.jpg",
    alt: "A dancer in flowing white turning across the stage, one arm sweeping a length of white silk overhead, against an orange-to-violet lit backdrop.",
  },
  {
    title: "reverie - 2026",
    medium: "Pan-Asian Dance Troupe",
    src: "/arts/dance-contemporary-trio.jpg",
    alt: "Three dancers in black intertwined low to the floor under deep blue light, one with a leg extended high toward the ceiling.",
  },
  {
    title: "sleeping beauty - 2025",
    medium: "Ballet",
    src: "/arts/dance-ballet-sleeping-beauty.jpg",
    alt: "A ballerina in a pink tutu kneeling in a lunge with one arm raised, in front of a line of dancers in lilac tutus.",
  },
  {
    title: "山鬼 - 2022",
    medium: "Chinese Classical Dance",
    src: "/arts/dance-chinese-classical-red.jpg",
    alt: "A smiling dancer outdoors in a red dress with streaming blue and pink ribbons, one hand extended, against a blurred colorful background.",
  },
  {
    title: "the nutcracker - 2023",
    medium: "Ballet",
    src: "/arts/dance-ballet-character-split.jpg",
    alt: "A dancer in a pink beaded costume sitting in a full split on stage, arms curved overhead, before a painted palace backdrop.",
  },
];
