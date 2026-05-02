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
          background: "linear-gradient(145deg, #121913 0%, #1e3d24 55%, #2a5528 100%)",
          borderRadius: 7,
        }}
      >
        <span
          style={{
            fontSize: 19,
            fontWeight: 700,
            color: "#dde8cf",
            letterSpacing: -0.5,
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          }}
        >
          N
        </span>
      </div>
    ),
    { ...size }
  );
}
