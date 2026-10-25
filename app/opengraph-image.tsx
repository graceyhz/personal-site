import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/* Link-preview card shown when the site is shared (LinkedIn, iMessage, Slack).
   Hex values mirror the palette tokens in globals.css. */
export const alt = `${site.name}: CS student at Penn interested in AI/ML`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dot-grid paper, drawn as circles (the renderer doesn't tile gradient backgrounds)
const GRID = 36;
const dots = Array.from({ length: Math.ceil(size.width / GRID) }, (_, i) =>
  Array.from({ length: Math.ceil(size.height / GRID) }, (_, j) => [
    GRID / 2 + i * GRID,
    GRID / 2 + j * GRID,
  ]),
).flat();

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#edf3f9",
          color: "#1b2533",
        }}
      >
        <svg
          width={size.width}
          height={size.height}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {dots.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={2} fill="#b9c8d5" />
          ))}
        </svg>
        <div style={{ display: "flex", fontSize: 34, color: "#2340c9" }}>
          hi! welcome to my digital sketchbook~
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex", fontSize: 128, letterSpacing: -4, lineHeight: 1 }}>
            {site.name}
          </div>
          <svg width="640" height="28" viewBox="0 0 640 28" style={{ marginTop: 8 }}>
            <path
              d="M6 18 C 120 6, 260 24, 400 12 S 600 8, 634 16"
              fill="none"
              stroke="#2340c9"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div style={{ display: "flex", fontSize: 40, marginTop: 36, color: "#4f5b68" }}>
          CS student at Penn · interested in AI/ML
        </div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 56, color: "#2b5a8c" }}>
          {site.url.replace("https://", "")}
        </div>
      </div>
    ),
    size,
  );
}
