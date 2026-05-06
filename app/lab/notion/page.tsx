"use client";

/* /lab/notion — design-system demo per design-md-library/notion.md.
   Tinted neutral surfaces (`#fafaf9` / `#f6f5f4`), Notion Sans (Inter
   fallback) at 16px / 1.55 body, signature purple primary `#5645d4`
   on a deep navy hero band, pastel-tinted feature cards. The lab
   choice answers the "상담 과정에서 부담을 낮춤" criterion. */

import { useState } from "react";

const FONT =
  "'Notion Sans', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const PRIMARY = "#5645d4";
const PRIMARY_PRESSED = "#4534b3";
const NAVY = "#0a1530";
const NAVY_DEEP = "#070f24";
const CANVAS = "#ffffff";
const SURFACE = "#f6f5f4";
const SURFACE_SOFT = "#fafaf9";
const HAIRLINE = "#e5e3df";
const INK = "#1a1a1a";
const CHARCOAL = "#37352f";
const SLATE = "#5d5b54";
const STEEL = "#787671";
const STONE = "#a4a097";

const TINT_PEACH = "#ffe8d4";
const TINT_ROSE = "#fde0ec";
const TINT_MINT = "#d9f3e1";
const TINT_LAVENDER = "#e6e0f5";
const TINT_SKY = "#dcecfa";
const TINT_YELLOW = "#fef7d6";

const NAV_LINKS = ["Product", "AI", "Solutions", "Resources", "Pricing"];

const FEATURES = [
  { tint: TINT_PEACH, eyebrow: "Notes", title: "Build a brain", body: "Capture thoughts, meeting notes, and references in one place." },
  { tint: TINT_LAVENDER, eyebrow: "Docs", title: "Share with anyone", body: "Beautiful docs that read like a story, not a spec." },
  { tint: TINT_MINT, eyebrow: "Projects", title: "Plan together", body: "Tasks, timelines, sprints — all in your team's workspace." },
];

type PanelVariant = "default" | "compact" | "gradient" | "image";
const PANEL_VARIANTS: { id: PanelVariant; label: string }[] = [
  { id: "default", label: "기본형" },
  { id: "compact", label: "간단형" },
  { id: "gradient", label: "그라디언트형" },
  { id: "image", label: "이미지형" },
];

export default function NotionLab() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [variant, setVariant] = useState<PanelVariant>("default");
  return (
    <div style={{ background: CANVAS, color: INK, fontFamily: FONT, minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <FeatureRow />
      <Footer />
      {panelOpen && <SupportPanel variant={variant} />}
      <SupportLauncher open={panelOpen} onClick={() => setPanelOpen((o) => !o)} />
      {panelOpen && <VariantSelector value={variant} onChange={setVariant} />}
    </div>
  );
}

function Nav() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: CANVAS,
        borderBottom: `1px solid ${HAIRLINE}`,
        padding: "16px 32px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <Logo />
          <ul
            style={{
              display: "flex",
              gap: 24,
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {NAV_LINKS.map((l) => (
              <li
                key={l}
                style={{ fontSize: 14, fontWeight: 500, color: CHARCOAL, cursor: "pointer" }}
              >
                {l}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: CHARCOAL,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "8px 12px",
              fontFamily: FONT,
            }}
          >
            Log in
          </button>
          <PurplePill label="Get Notion free" />
        </div>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span
        style={{
          width: 24,
          height: 24,
          borderRadius: 4,
          background: INK,
          color: CANVAS,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        N
      </span>
      <span style={{ fontSize: 18, fontWeight: 600, color: INK }}>Notion</span>
    </div>
  );
}

function Hero() {
  return (
    <section
      style={{
        background: NAVY,
        color: CANVAS,
        padding: "96px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* sticky-note dots — Notion's signature decorative scatter */}
      <span aria-hidden style={dotStyle(40, 80, "#dd5b00", 12)} />
      <span aria-hidden style={dotStyle("auto", 60, "#7b3ff2", 10)} />
      <span aria-hidden style={dotStyle(80, "auto", "#1aae39", 14)} />
      <span aria-hidden style={dotStyle("auto", "auto", "#ff64c8", 8)} />
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "clamp(40px, 7vw, 80px)",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-2px",
            margin: "0 0 24px",
            color: CANVAS,
          }}
        >
          The happier workspace.
        </h1>
        <p
          style={{
            fontSize: 18,
            fontWeight: 400,
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.8)",
            margin: "0 auto 40px",
            maxWidth: 600,
          }}
        >
          Write, plan, share — all in one place. The connected workspace where teams build, faster.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <PurplePill label="Get Notion free" />
          <button
            type="button"
            style={{
              padding: "12px 20px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              color: CANVAS,
              fontSize: 14,
              fontWeight: 500,
              fontFamily: FONT,
              cursor: "pointer",
            }}
          >
            Request a demo
          </button>
        </div>
      </div>
    </section>
  );
}

function dotStyle(
  top: number | "auto",
  left: number | "auto",
  color: string,
  size: number,
): React.CSSProperties {
  return {
    position: "absolute",
    top: top === "auto" ? "auto" : top,
    bottom: top === "auto" ? 60 : "auto",
    left: left === "auto" ? "auto" : left,
    right: left === "auto" ? 80 : "auto",
    width: size,
    height: size,
    borderRadius: "50%",
    background: color,
    opacity: 0.85,
  };
}

function FeatureRow() {
  return (
    <section style={{ background: CANVAS, padding: "96px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.5px",
            margin: "0 0 48px",
            color: INK,
            textAlign: "center",
          }}
        >
          Built to keep teams on the same page.
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {FEATURES.map((f) => (
            <article
              key={f.title}
              style={{
                background: f.tint,
                borderRadius: 12,
                padding: 32,
                minHeight: 280,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: SLATE,
                  margin: "0 0 12px",
                }}
              >
                {f.eyebrow}
              </p>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  lineHeight: 1.3,
                  margin: "0 0 12px",
                  color: INK,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: CHARCOAL,
                  margin: 0,
                  flex: 1,
                }}
              >
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: NAVY_DEEP,
        color: STONE,
        padding: "48px 32px",
        fontSize: 13,
        textAlign: "center",
        lineHeight: 1.4,
      }}
    >
      © 2026 Lab Demo · Privacy · Terms · Cookies · Contact
    </footer>
  );
}

function PurplePill({ label }: { label: string }) {
  return (
    <button
      type="button"
      style={{
        padding: "12px 20px",
        borderRadius: 8,
        border: "none",
        background: PRIMARY,
        color: CANVAS,
        fontSize: 14,
        fontWeight: 500,
        fontFamily: FONT,
        cursor: "pointer",
        transition: "background 200ms ease-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = PRIMARY_PRESSED)}
      onMouseLeave={(e) => (e.currentTarget.style.background = PRIMARY)}
    >
      {label}
    </button>
  );
}

/* ─────────── Support widget (Notion-skinned happytalk) ─────────── */

function SupportLauncher({ open, onClick }: { open: boolean; onClick: () => void }) {
  // Notion-skinned launcher: primary purple #5645d4 fill, 8px radius
  // (Notion's md scale), subtle hairline + soft shadow.
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "상담 닫기" : "상담 열기"}
      style={{
        position: "fixed",
        right: 32,
        bottom: 32,
        width: 60,
        height: 60,
        borderRadius: 8,
        background: PRIMARY,
        color: CANVAS,
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 1px 2px rgba(15,15,15,0.1), 0 4px 12px rgba(15,15,15,0.08)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        transition: "transform 200ms ease-out, background 200ms ease-out",
        fontFamily: FONT,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = PRIMARY_PRESSED;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = PRIMARY;
      }}
    >
      {open ? (
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 5l14 14M19 5L5 19" stroke={CANVAS} strokeWidth={2.2} strokeLinecap="round" />
        </svg>
      ) : (
        <span style={{ fontSize: 22, fontWeight: 700 }}>?</span>
      )}
    </button>
  );
}

function VariantSelector({
  value,
  onChange,
}: {
  value: PanelVariant;
  onChange: (v: PanelVariant) => void;
}) {
  return (
    <aside
      style={{
        position: "fixed",
        left: 24,
        bottom: 24,
        zIndex: 95,
        width: 200,
        padding: "14px 12px",
        background: SURFACE_SOFT,
        border: `1px solid ${HAIRLINE}`,
        borderRadius: 8,
        fontFamily: FONT,
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: STEEL,
          margin: "0 0 10px",
          paddingLeft: 4,
        }}
      >
        홈 배리언트
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {PANEL_VARIANTS.map((v) => {
          const active = value === v.id;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onChange(v.id)}
              style={{
                fontFamily: FONT,
                fontSize: 14,
                fontWeight: 500,
                padding: "8px 12px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                background: active ? PRIMARY : "transparent",
                color: active ? CANVAS : CHARCOAL,
                textAlign: "left",
                transition: "background 200ms ease-out, color 200ms ease-out",
              }}
            >
              {v.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function SupportPanel({ variant }: { variant: PanelVariant }) {
  return (
    <div
      style={{
        position: "fixed",
        right: 32,
        bottom: 112,
        width: 375,
        maxWidth: "calc(100vw - 32px)",
        height: 640,
        maxHeight: "calc(100vh - 144px)",
        background: CANVAS,
        color: INK,
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${HAIRLINE}`,
        boxShadow:
          "0 1px 2px rgba(15,15,15,0.1), 0 8px 24px rgba(15,15,15,0.08)",
        display: "flex",
        flexDirection: "column",
        zIndex: 90,
        fontFamily: FONT,
      }}
    >
      <PanelBody variant={variant} />
      <PanelNav />
    </div>
  );
}

/* Variant rendering — Notion's pastel-tinted card vocabulary applied:
   - default: clean canvas
   - compact: same chrome, description hidden
   - gradient: tinted lavender → canvas brand area (echoing Notion's
     pastel feature cards)
   - image: a peach-tinted hero block above the brand area, mirroring
     Notion's brand-illustration scatter aesthetic. */
function PanelBody({ variant }: { variant: PanelVariant }) {
  const showHero = variant === "image";
  const showDescription = variant !== "compact";
  const isGradient = variant === "gradient";
  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
      {showHero && (
        <div
          style={{
            height: 160,
            background: TINT_PEACH,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
          aria-hidden
        >
          <span style={{ fontSize: 56 }}>📒</span>
          <span aria-hidden style={{ position: "absolute", top: 16, left: 20, width: 8, height: 8, borderRadius: "50%", background: "#7b3ff2" }} />
          <span aria-hidden style={{ position: "absolute", bottom: 18, right: 24, width: 10, height: 10, borderRadius: "50%", background: "#1aae39" }} />
          <span aria-hidden style={{ position: "absolute", top: 30, right: 60, width: 6, height: 6, borderRadius: "50%", background: "#ff64c8" }} />
        </div>
      )}
      <div
        style={{
          padding: "32px 24px 20px",
          background: isGradient
            ? "linear-gradient(180deg, " + TINT_LAVENDER + " 0%, " + CANVAS + " 100%)"
            : "transparent",
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: STEEL,
            margin: "0 0 12px",
          }}
        >
          Customer Support
        </p>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 600,
            lineHeight: 1.25,
            letterSpacing: "-0.5px",
            margin: "0 0 12px",
            color: INK,
          }}
        >
          브랜드명
        </h2>
        {showDescription && (
          <p
            style={{
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.5,
              color: CHARCOAL,
              margin: "0 0 20px",
            }}
          >
            여기에 브랜드 한 줄 소개가 들어갑니다.
          </p>
        )}
        <PanelStatusRow />
      </div>

      <div style={{ padding: "0 24px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        <PanelCta />
        <PanelChannelRow />
      </div>

      <div style={{ padding: "0 24px 16px", display: "flex", flexDirection: "column", gap: 20 }}>
        <SectionGroup label="Notice">
          <div
            style={{
              background: SURFACE_SOFT,
              border: `1px solid ${HAIRLINE}`,
              borderRadius: 8,
              padding: "14px 16px",
              fontSize: 14,
              lineHeight: 1.5,
              color: INK,
            }}
          >
            2026 추석 명절 배송 일정 안내드립니다.
          </div>
        </SectionGroup>
        <SectionGroup label="FAQ">
          <PanelSearch />
          <div
            style={{
              background: SURFACE_SOFT,
              border: `1px solid ${HAIRLINE}`,
              borderRadius: 8,
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              maxHeight: 240,
              overflowY: "auto",
            }}
          >
            <FaqItem category="배송" question="당일배송은 무엇인가요?" />
            <FaqItem category="상품" question="상품 품절인 경우 재입고는 언제 알 수 있나요?" />
          </div>
        </SectionGroup>
      </div>
    </div>
  );
}

function PanelStatusRow() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
      <span style={{ fontSize: 14, fontWeight: 500, color: CHARCOAL }}>9–18시 운영 중</span>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "4px 10px",
          borderRadius: 6,
          background: TINT_MINT,
          fontSize: 12,
          fontWeight: 500,
          color: "#0f5e22",
        }}
      >
        <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: "#1aae39" }} />
        상담 원활 · 2명
      </span>
    </div>
  );
}

function PanelCta() {
  return (
    <button
      type="button"
      style={{
        width: "100%",
        height: 44,
        borderRadius: 8,
        background: PRIMARY,
        color: CANVAS,
        border: "none",
        fontFamily: FONT,
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
        transition: "background 200ms ease-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = PRIMARY_PRESSED)}
      onMouseLeave={(e) => (e.currentTarget.style.background = PRIMARY)}
    >
      문의하기
    </button>
  );
}

function PanelChannelRow() {
  return (
    <div
      style={{
        background: SURFACE_SOFT,
        border: `1px solid ${HAIRLINE}`,
        borderRadius: 8,
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 400, color: CHARCOAL }}>다른 문의하기</span>
      <div style={{ display: "flex", gap: 6 }}>
        <ChannelDot label="네이버" bg="#03c75a" />
        <ChannelDot label="카카오" bg="#fee500" fg="#181600" />
        <ChannelDot label="전화" bg={CANVAS} fg={CHARCOAL} border={`1px solid ${HAIRLINE}`} />
      </div>
    </div>
  );
}

function ChannelDot({
  label,
  bg,
  fg = CANVAS,
  border = "none",
}: {
  label: string;
  bg: string;
  fg?: string;
  border?: string;
}) {
  return (
    <span
      aria-label={label}
      style={{
        width: 28,
        height: 28,
        borderRadius: 6,
        background: bg,
        color: fg,
        border,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      {label[0]}
    </span>
  );
}

function SectionGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: STEEL,
          margin: 0,
        }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

function PanelSearch() {
  return (
    <div
      style={{
        background: CANVAS,
        border: `1px solid ${HAIRLINE}`,
        borderRadius: 8,
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="7" cy="7" r="5" stroke={STEEL} strokeWidth="1.6" />
        <path d="M11 11l3 3" stroke={STEEL} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        placeholder="Search FAQ"
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          fontSize: 14,
          fontFamily: FONT,
          color: INK,
        }}
      />
    </div>
  );
}

function FaqItem({ category, question }: { category: string; question: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: STEEL,
        }}
      >
        {category}
      </span>
      <span style={{ fontSize: 14, fontWeight: 400, color: INK }}>{question}</span>
    </div>
  );
}

function PanelNav() {
  const tabs = [
    { id: "home", label: "홈" },
    { id: "message", label: "메시지" },
    { id: "setting", label: "설정" },
  ];
  const [active, setActive] = useState("home");
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 56,
        background: CANVAS,
        borderTop: `1px solid ${HAIRLINE}`,
        display: "flex",
        alignItems: "stretch",
      }}
    >
      {tabs.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontFamily: FONT,
              fontSize: 14,
              fontWeight: isActive ? 600 : 500,
              color: isActive ? INK : STEEL,
              transition: "color 220ms ease-out, font-weight 220ms ease-out",
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
