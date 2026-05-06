"use client";

/* /lab — design-system experiment hub.
   Each route applies a different design vocabulary (Apple / Airbnb /
   Intercom) sourced from the corresponding md spec under
   `happytalk-enduser/*.md`. These pages are intentionally independent of
   the V2 (`/happytalk-enduser`) and V1 (`v1-archive` branch) code paths
   — no shared components, no shared tokens. Local-only experiments. */

import Link from "next/link";

const ENTRIES = [
  {
    href: "/lab/apple",
    name: "Apple",
    tagline: "Cinematic black/white rhythm · SF Pro · 980px pill CTAs",
    bg: "#000000",
    fg: "#ffffff",
    accent: "#0071e3",
  },
  {
    href: "/lab/airbnb",
    name: "Airbnb",
    tagline: "Pure white canvas · Cereal VF · Rausch Red · 3-layer shadows",
    bg: "#ffffff",
    fg: "#222222",
    accent: "#ff385c",
  },
  {
    href: "/lab/intercom",
    name: "Intercom",
    tagline: "Warm cream · Saans w/ -2.4px tracking · Fin Orange · 4px sharp",
    bg: "#faf9f6",
    fg: "#111111",
    accent: "#ff5600",
  },
];

export default function LabIndex() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0b0c",
        color: "#ffffff",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
        padding: "64px 24px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <header style={{ marginBottom: 48 }}>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: 12,
            }}
          >
            Design System Lab
          </p>
          <h1
            style={{
              fontSize: 48,
              fontWeight: 600,
              lineHeight: 1.07,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            세 가지 디자인 언어, 같은 캔버스.
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.47,
              color: "rgba(255,255,255,0.6)",
              marginTop: 16,
              maxWidth: 600,
            }}
          >
            각 카드는 해당 brand의 시각 시스템을 적용한 데모 화면으로 이동합니다. V1·V2와는 별도의 트랙입니다.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {ENTRIES.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              style={{
                display: "block",
                background: e.bg,
                color: e.fg,
                padding: "32px 28px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.08)",
                textDecoration: "none",
                minHeight: 220,
                position: "relative",
                overflow: "hidden",
                transition: "transform 220ms cubic-bezier(0.22,1,0.36,1), box-shadow 220ms",
              }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: e.accent,
                }}
              />
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  opacity: 0.5,
                  margin: 0,
                }}
              >
                Visit
              </p>
              <h2
                style={{
                  fontSize: 36,
                  fontWeight: 600,
                  lineHeight: 1.07,
                  letterSpacing: "-0.01em",
                  margin: "12px 0 16px",
                }}
              >
                {e.name}
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.5, opacity: 0.7, margin: 0 }}>
                {e.tagline}
              </p>
              <p
                style={{
                  fontSize: 14,
                  marginTop: 28,
                  color: e.accent,
                  fontWeight: 500,
                }}
              >
                Open →
              </p>
            </Link>
          ))}
        </div>

        <footer style={{ marginTop: 64, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
          source specs: happytalk-enduser/Apple.md · Airbnb.md · Intercom.md
        </footer>
      </div>
    </div>
  );
}
