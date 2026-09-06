import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#060608",
          color: "#e0b44a",
          fontSize: 17,
          fontWeight: 600,
          letterSpacing: -0.5,
          borderRadius: 7,
        }}
      >
        JG
      </div>
    ),
    size,
  );
}
