import { ImageResponse } from "next/og";
import { person } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${person.name} — ${person.role}`;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#060608",
          padding: 72,
          color: "#f4f4f7",
          // Satori has no grid, so the field is faked with two linear gradients.
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 10,
              border: "1px solid #2c2c38",
              color: "#e0b44a",
              fontSize: 18,
            }}
          >
            JG
          </div>
          <div style={{ fontSize: 22, color: "#8b8b9a", letterSpacing: 2 }}>
            {person.location.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, lineHeight: 1, letterSpacing: -4 }}>Jay-R</div>
          <div style={{ fontSize: 104, lineHeight: 1.05, letterSpacing: -4, color: "#e0b44a" }}>
            Gabunada
          </div>
          <div style={{ marginTop: 30, fontSize: 30, color: "#c3c3cf", maxWidth: 900 }}>
            {person.role}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#8b8b9a" }}>
          <div style={{ display: "flex" }}>AI systems · Realtime · Browser 3D</div>
          <div style={{ display: "flex", color: "#e0b44a" }}>github.com/goldenjayr</div>
        </div>
      </div>
    ),
    size,
  );
}
