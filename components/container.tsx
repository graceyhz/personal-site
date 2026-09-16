import type { ReactNode } from "react";

/* §8.4: 1120px max width, 24px gutters (16px mobile). */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1120px] px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
