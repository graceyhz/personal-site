import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import {
  performing,
  performingPhotos,
  performingSchema,
  photoSchema,
  visual,
  visualSchema,
  type PerformingEntry,
  type PhotoEntry,
  type VisualEntry,
} from "@/content/arts";

export type VisualPiece = VisualEntry & { width: number; height: number };
export type PhotoPiece = PhotoEntry & { width: number; height: number };

const BUDGET_BYTES = 300 * 1024; // §9.1: any single arts image ≤ 300KB

export function getVisual(): VisualPiece[] {
  return visual.map((entry) => withDimensions(visualSchema.parse(entry)));
}

export function getPerformingPhotos(): PhotoPiece[] {
  return performingPhotos.map((entry) => withDimensions(photoSchema.parse(entry)));
}

/* Reads intrinsic dimensions from disk at build time (FR-16: explicit
   dimensions on every image). A missing file or bad entry throws, which
   fails the build rather than the page. */
function withDimensions<T extends { src: string }>(
  piece: T,
): T & { width: number; height: number } {
  const file = path.join(process.cwd(), "public", piece.src);
  const { width, height } = imageSize(readFileSync(file));
  if (!width || !height) throw new Error(`Could not read dimensions of ${piece.src}`);
  const bytes = statSync(file).size;
  if (bytes > BUDGET_BYTES) {
    console.warn(
      `[arts] ${piece.src} is ${Math.round(bytes / 1024)}KB, over the 300KB budget`,
    );
  }
  return { ...piece, width, height };
}

export function getPerforming(): PerformingEntry[] {
  return performing.map((entry) => performingSchema.parse(entry));
}
