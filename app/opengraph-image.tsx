import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/constants/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #06192a 0%, #0d2e45 50%, #14b9c2 150%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#5eeeef",
            marginBottom: 24,
          }}
        >
          Premium Seafood, Delivered Fresh
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700 }}>
          {SITE_CONFIG.name}
        </div>
      </div>
    ),
    { ...size }
  );
}
