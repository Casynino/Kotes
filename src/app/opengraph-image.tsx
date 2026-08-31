import { ImageResponse } from "next/og";

import { company } from "@/content/company";

/**
 * Default social sharing card, generated at build time.
 * Individual pages override the image via `buildMetadata({ image })`.
 */
export const alt = `${company.legalName} — ICT infrastructure and systems integration in Tanzania`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #071426 0%, #0d304c 55%, #0c6ba9 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 999,
              background: "linear-gradient(135deg, #52bcfd, #0c6ba9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            K
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" }}>
              {company.legalName}
            </div>
            <div style={{ fontSize: 19, color: "#8bd4ff", marginTop: 4 }}>
              ICT Infrastructure &amp; Integration
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em" }}>
            Infrastructure that keeps
          </div>
          <div
            style={{
              fontSize: 66,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#8bd4ff",
            }}
          >
            Tanzania connected
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "28px", fontSize: 22, color: "#bbe4ff" }}>
          <div style={{ display: "flex" }}>Since 1995</div>
          <div style={{ display: "flex", color: "#405878" }}>|</div>
          <div style={{ display: "flex" }}>Fibre · Networks · Integration · Managed support</div>
        </div>
      </div>
    ),
    size,
  );
}
