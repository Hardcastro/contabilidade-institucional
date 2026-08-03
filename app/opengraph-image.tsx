import { ImageResponse } from "next/og";
import { siteConfig } from "@/site.config";

/**
 * Root-level Open Graph card. Next.js picks this file up by convention and
 * injects og:image and twitter:image into every route below it, so a link
 * pasted into WhatsApp or LinkedIn shows the promise instead of a bare URL.
 *
 * Drawn rather than photographed, to stay inside the signature: light canvas,
 * clay tile, emerald ink. No external asset, so nothing can 404 later.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(140deg, #ffffff 0%, #f3faf7 55%, #e9f6f0 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 600,
            color: "#065f46",
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          Contabilidade em {siteConfig.city}/{siteConfig.state}
        </div>

        <div style={{ display: "flex", alignItems: "center", marginTop: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 96,
              height: 96,
              borderRadius: 26,
              background: "#10b981",
              color: "#022c22",
              fontSize: 56,
              fontWeight: 600,
              marginRight: 28,
            }}
          >
            M
          </div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 600, color: "#0f172a" }}>
            {siteConfig.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 40,
            lineHeight: 1.25,
            color: "#134e4a",
            maxWidth: 940,
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>
    ),
    size,
  );
}
