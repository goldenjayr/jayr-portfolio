"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  // global-error replaces the root layout, so it ships its own html/body.
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100svh",
          display: "grid",
          placeItems: "center",
          background: "#060608",
          color: "#c3c3cf",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          margin: 0,
          padding: 24,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 12, letterSpacing: "0.2em", color: "#e0b44a", textTransform: "uppercase" }}>
            Error
          </p>
          <h1 style={{ margin: "18px 0 0", fontSize: 40, color: "#f4f4f7", fontWeight: 500 }}>
            Something broke.
          </h1>
          <p style={{ marginTop: 14, color: "#8b8b9a" }}>
            That&rsquo;s on me, not you. Try again.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: 32,
              border: 0,
              borderRadius: 12,
              padding: "12px 24px",
              background: "#f4f4f7",
              color: "#060608",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
