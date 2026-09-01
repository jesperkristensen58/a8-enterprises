import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f3f3f4",
          color: "#121214",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: -0.4 }}>
          {site.shortName}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 500,
            letterSpacing: -1.6,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          {site.headline}
        </div>
      </div>
    ),
    { ...size },
  );
}
