/* "gz" mark for the browser-tab and home-screen icons (rendered by next/og).
   Hex values mirror the --pen and --paper tokens in globals.css. */
export function Monogram({ size }: { size: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#2340c9",
        color: "#edf3f9",
        borderRadius: size * 0.22,
        fontSize: size * 0.58,
        letterSpacing: -size * 0.04,
        paddingBottom: size * 0.08,
      }}
    >
      gz
    </div>
  );
}
