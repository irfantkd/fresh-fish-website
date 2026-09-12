import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // The logo file itself (not a URL) — read directly from disk and embed as
  // a data URI, so the real brand logo actually renders inside the
  // generated share-link preview image instead of just text.
  const logoData = await readFile(
    join(
      process.cwd(),
      "public/assets/images/Main_logo_Fresh_fish_Dubai-removebg-preview.png"
    )
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

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
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="Fresh Fish Dubai"
          width={640}
          height={136}
          style={{ objectFit: "contain" }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#5eeeef",
            marginTop: 32,
          }}
        >
          Premium Seafood, Delivered Fresh
        </div>
      </div>
    ),
    { ...size }
  );
}
