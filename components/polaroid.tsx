import type { ReactNode } from "react";

/* Sketchbook framing for art and photos: a white polaroid border, a strip of
   washi tape, and a slight tilt that straightens when its parent `.group`
   is hovered or focused. Styles cycle by index so neighbours differ.
   Spans, not divs, so it can sit inside a <button>. */

const tilts = ["-rotate-1", "rotate-[1.2deg]", "-rotate-[0.6deg]", "rotate-[0.8deg]"];

const tapes = [
  "left-[38%] rotate-[3deg] bg-[#bfd3e8]",
  "left-[18%] -rotate-[4deg] bg-[#d3d1ef]",
  "left-[58%] rotate-[2deg] bg-[#c4ddd9]",
];

export function Tape({ index = 0 }: { index?: number }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute -top-3 z-10 h-6 w-20 opacity-85 ${tapes[index % tapes.length]}`}
    />
  );
}

export function Polaroid({
  index,
  caption,
  children,
}: {
  index: number;
  caption: ReactNode;
  children: ReactNode;
}) {
  return (
    <span
      className={`relative block bg-frame p-2.5 shadow-[0_2px_8px_rgba(27,37,51,0.16)] transition-transform duration-200 ease-out-soft group-hover:-translate-y-1 group-hover:rotate-0 group-focus-visible:rotate-0 ${tilts[index % tilts.length]}`}
    >
      <Tape index={index} />
      {children}
      <span className="block px-1 pt-2.5 pb-1 text-left font-hand text-xl leading-tight text-pen">
        {caption}
      </span>
    </span>
  );
}
