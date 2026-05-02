import { ImageResponse } from "next/og";

export const alt = "Nova Muse";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(165deg, #121913 0%, #182a18 42%, #0f160f 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            left: "50%",
            marginLeft: -420,
            width: 840,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgb(255 224 170 / 0.22) 0%, transparent 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgb(60 94 54 / 0.35) 0%, transparent 70%)",
            transform: "translate(35%, 35%)",
          }}
        />
        <p
          style={{
            margin: 0,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#9daa90",
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          }}
        >
          Notes · ideas · dialogue
        </p>
        <h1
          style={{
            margin: "20px 0 0",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: -2,
            color: "#dde8cf",
            lineHeight: 1.05,
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          }}
        >
          Nova Muse
        </h1>
        <p
          style={{
            margin: "28px 0 0",
            maxWidth: 720,
            fontSize: 32,
            lineHeight: 1.35,
            color: "#bac5ae",
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          }}
        >
          Your thinking partner — not cookie-cutter advice
        </p>
      </div>
    ),
    { ...size }
  );
}
