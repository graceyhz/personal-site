import { publicationSchema, type Publication } from "./schema";

const raw = [
  {
    authors: "Peng, Q., Zhao, G., Ye, X.",
    title:
      "Assessing the impact of maintenance condition on multifamily rents: an integrated approach of machine learning and hedonic modelling",
    venue: "Journal of Housing and the Built Environment",
    year: 2025,
    doi: "https://doi.org/10.1007/s10901-025-10202-4",
  },
  {
    authors: "Ye, X., Zhao, G., Peng, Q., et al.",
    title: "Global trends in housing research over the past three decades",
    venue: "Computational Urban Science",
    year: 2024,
    doi: "https://doi.org/10.1007/s43762-024-00129-x",
  },
];

export const publications: Publication[] = raw.map((p) =>
  publicationSchema.parse(p),
);
