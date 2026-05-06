"use client";

/* /lab/intercom — design-system demo per happytalk-enduser/Intercom.md.
   Warm cream canvas (#faf9f6) with off-black ink, Saans (system fallback)
   with extreme negative tracking + 1.00 line-height, Fin Orange (#ff5600)
   as the singular vibrant accent, 4px sharp button radius, scale(1.1)
   hover. Independent of V2. */

import { useState } from "react";

const FONT_SAANS =
  "'Saans', 'Saans Fallback', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const FONT_MONO =
  "'SaansMono', 'SaansMono Fallback', ui-monospace, 'SF Mono', Menlo, Consolas, monospace";

const OFF_BLACK = "#111111";
const CREAM = "#faf9f6";
const OAT = "#dedbd6";
const FIN = "#ff5600";
const MUTED = "#7b7b78";

const NAV = ["Product", "Pricing", "Customers", "Resources", "Company"];

const FEATURES = [
  {
    label: "Resolve",
    title: "Fin AI Agent",
    body:
      "Resolve up to 50% of your support volume instantly with the world's leading AI agent. Built on the deepest understanding of your business.",
    accent: "#ff5600",
  },
  {
    label: "Ship",
    title: "Helpdesk",
    body:
      "Built for an AI-first world. Powerful, modern, and so easy your team will actually love it. Delight your customers with faster, more personal answers.",
    accent: "#65b5ff",
  },
  {
    label: "Optimize",
    title: "Insights",
    body:
      "See every metric that matters. Track AI performance, customer satisfaction, and team productivity in one report-ready dashboard.",
    accent: "#0bdf50",
  },
];

const STATS = [
  { value: "50%", label: "Resolution Rate" },
  { value: "33s", label: "Avg. Response Time" },
  { value: "4.6", label: "CSAT Score" },
  { value: "120+", label: "Languages" },
];

type PanelVariant = "default" | "compact" | "gradient" | "image";
const PANEL_VARIANTS: { id: PanelVariant; label: string }[] = [
  { id: "default", label: "기본형" },
  { id: "compact", label: "간단형" },
  { id: "gradient", label: "그라디언트형" },
  { id: "image", label: "이미지형" },
];

export default function IntercomLab() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [variant, setVariant] = useState<PanelVariant>("default");
  return (
    <div
      style={{
        background: CREAM,
        color: OFF_BLACK,
        fontFamily: FONT_SAANS,
        minHeight: "100vh",
      }}
    >
      <Nav />
      <Hero />
      <StatsBar />
      <FeatureRow />
      <CTA />
      <Footer />
      {panelOpen && <SupportPanel variant={variant} />}
      <SupportLauncher open={panelOpen} onClick={() => setPanelOpen((o) => !o)} />
      {panelOpen && <VariantSelector value={variant} onChange={setVariant} />}
    </div>
  );
}

/* Intercom-skinned variant selector — warm cream surface with the
   spec's oat border and 8px radius. Title is a Mono uppercase eyebrow
   per Intercom's editorial labeling. Active option is the spec's
   off-black 4px sharp button. */
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
        padding: "16px 14px",
        background: CREAM,
        border: `1px solid ${OAT}`,
        borderRadius: 8,
        fontFamily: FONT_SAANS,
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontFamily: FONT_MONO,
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: MUTED,
          margin: "0 0 10px",
          paddingLeft: 4,
        }}
      >
        Home Variant
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {PANEL_VARIANTS.map((v) => {
          const active = value === v.id;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onChange(v.id)}
              style={{
                fontFamily: FONT_SAANS,
                fontSize: 14,
                fontWeight: 400,
                padding: "8px 12px",
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
                background: active ? OFF_BLACK : "transparent",
                color: active ? "#fff" : OFF_BLACK,
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

/* ─────────── Support widget (Intercom-skinned happytalk) ─────────── */

function SupportLauncher({ open, onClick }: { open: boolean; onClick: () => void }) {
  // V2 launcher "light" skin: white fill, 6% black border, soft 2-layer drop
  // shadow, 20px radius. Icon ink swaps to dark; the Intercom mark inverts
  // (off-black rect + Fin Orange disc) so it reads against the white
  // surface. Hover/active scale follows Intercom's spec.
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
        borderRadius: 20,
        background: "#ffffff",
        color: OFF_BLACK,
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow:
          "0 1px 3px 0 rgba(0,0,0,0.04), 0 4px 12px 0 rgba(0,0,0,0.08)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: 100,
        transition: "transform 200ms cubic-bezier(0.22,1,0.36,1)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    >
      {open ? (
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 5l14 14M19 5L5 19" stroke={OFF_BLACK} strokeWidth={2} strokeLinecap="round" />
        </svg>
      ) : (
        <svg width={26} height={26} viewBox="0 0 28 28" fill="none" aria-hidden>
          <rect x="3" y="3" width="22" height="22" rx="3" fill={OFF_BLACK} />
          <circle cx="14" cy="14" r="4" fill={FIN} />
        </svg>
      )}
    </button>
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
        background: CREAM,
        color: OFF_BLACK,
        borderRadius: 8,
        overflow: "hidden",
        border: `1px solid ${OAT}`,
        boxShadow: "0 24px 48px -12px rgba(0,0,0,0.18)",
        display: "flex",
        flexDirection: "column",
        zIndex: 90,
        fontFamily: FONT_SAANS,
      }}
    >
      <PanelBody variant={variant} />
      <PanelNav />
    </div>
  );
}

/* Variant rendering — Intercom's editorial restraint shapes each
   variant:
   - default: standard cream brand area
   - compact: same chrome, description hidden
   - gradient: cream → warm sand vertical gradient on the brand area
   - image: a warm dark abstract block above the brand area, mirroring
     Intercom's report-color tile language. */
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
            background: OFF_BLACK,
            borderBottom: `1px solid ${OAT}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
          aria-hidden
        >
          <span
            style={{
              width: 56,
              height: 56,
              borderRadius: 4,
              background: FIN,
            }}
          />
          <span
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              fontSize: 11,
              fontFamily: FONT_MONO,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Hero Image
          </span>
        </div>
      )}
      {/* Brand area */}
      <div
        style={{
          padding: "32px 24px 20px",
          background: isGradient
            ? "linear-gradient(180deg, #d3cec6 0%, #faf9f6 80%)"
            : "transparent",
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontFamily: FONT_MONO,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: FIN,
            margin: "0 0 12px",
          }}
        >
          Customer Service
        </p>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: "-0.96px",
            margin: "0 0 16px",
          }}
        >
          브랜드명
        </h2>
        {showDescription && (
          <p
            style={{
              fontSize: 14,
              fontWeight: 300,
              lineHeight: 1.4,
              color: OFF_BLACK,
              opacity: 0.75,
              margin: "0 0 20px",
            }}
          >
            여기에 브랜드 한 줄 소개가 들어갑니다.
          </p>
        )}
        <PanelStatusRow />
      </div>

      <div
        style={{
          padding: "0 24px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <PanelCta />
        <PanelChannelRow />
      </div>

      <div
        style={{
          padding: "0 24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <SectionGroup label="Notice">
          <div
            style={{
              background: "#fff",
              border: `1px solid ${OAT}`,
              borderRadius: 8,
              padding: "16px",
              fontSize: 14,
              lineHeight: 1.4,
              color: OFF_BLACK,
            }}
          >
            2026 추석 명절 배송 일정 안내드립니다.
          </div>
        </SectionGroup>
        <SectionGroup label="FAQ">
          <PanelSearch />
          <div
            style={{
              background: "#fff",
              border: `1px solid ${OAT}`,
              borderRadius: 8,
              padding: "16px",
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
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span
        style={{
          fontSize: 13,
          fontWeight: 400,
          color: OFF_BLACK,
          opacity: 0.85,
        }}
      >
        9–18시 운영 중
      </span>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "4px 10px",
          borderRadius: 4,
          background: "#e8f5ec",
          fontSize: 11,
          fontFamily: FONT_MONO,
          fontWeight: 500,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#0a5920",
        }}
      >
        <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: "#0bdf50" }} />
        Online · 2
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
        height: 48,
        borderRadius: 4,
        background: OFF_BLACK,
        color: "#fff",
        border: "none",
        fontFamily: FONT_SAANS,
        fontSize: 16,
        fontWeight: 400,
        cursor: "pointer",
        transition: "transform 200ms cubic-bezier(0.22,1,0.36,1)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      문의하기
    </button>
  );
}

function PanelChannelRow() {
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${OAT}`,
        borderRadius: 4,
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 400, color: OFF_BLACK }}>다른 문의하기</span>
      <div style={{ display: "flex", gap: 6 }}>
        <ChannelDot label="네이버" bg="#03c75a" />
        <ChannelDot label="카카오" bg="#fee500" fg="#181600" />
        <ChannelDot label="전화" bg="#fff" border={`1px solid ${OAT}`} fg={OFF_BLACK} />
      </div>
    </div>
  );
}

function ChannelDot({
  label,
  bg,
  fg = "#fff",
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
        borderRadius: 4,
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
          fontFamily: FONT_MONO,
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: MUTED,
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
        background: "#fff",
        border: `1px solid ${OAT}`,
        borderRadius: 4,
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="7" cy="7" r="5" stroke={MUTED} strokeWidth="1.6" />
        <path d="M11 11l3 3" stroke={MUTED} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        placeholder="Search"
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          fontSize: 14,
          fontFamily: FONT_SAANS,
          color: OFF_BLACK,
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
          fontFamily: FONT_MONO,
          fontWeight: 500,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: MUTED,
        }}
      >
        {category}
      </span>
      <span style={{ fontSize: 14, fontWeight: 400, color: OFF_BLACK }}>{question}</span>
    </div>
  );
}

function PanelNav() {
  const tabs = [
    { id: "home", label: "Home" },
    { id: "message", label: "Messages" },
    { id: "setting", label: "Settings" },
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
        background: CREAM,
        borderTop: `1px solid ${OAT}`,
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
              fontFamily: FONT_SAANS,
              fontSize: 14,
              fontWeight: isActive ? 500 : 400,
              color: isActive ? OFF_BLACK : MUTED,
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

function Nav() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: CREAM,
        borderBottom: `1px solid ${OAT}`,
        padding: "16px 24px",
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
            {NAV.map((l) => (
              <li
                key={l}
                style={{ fontSize: 16, fontWeight: 400, color: OFF_BLACK, cursor: "pointer" }}
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
              fontWeight: 400,
              color: OFF_BLACK,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "0 14px",
              fontFamily: FONT_SAANS,
            }}
          >
            Sign in
          </button>
          <DarkButton label="Get a demo" />
        </div>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <svg width={28} height={28} viewBox="0 0 28 28" fill={OFF_BLACK} aria-label="Intercom">
        <rect x="2" y="2" width="24" height="24" rx="6" />
        <circle cx="14" cy="14" r="5" fill={CREAM} />
      </svg>
      <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.36px" }}>
        Intercom
      </span>
    </div>
  );
}

function Hero() {
  return (
    <section style={{ padding: "96px 24px 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <MonoLabel label="AI-first customer service" accent={FIN} />
        <h1
          style={{
            fontSize: "clamp(48px, 8.5vw, 96px)",
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            margin: "24px 0 32px",
            maxWidth: 1100,
          }}
        >
          The complete AI-first customer service platform.
        </h1>
        <p
          style={{
            fontSize: 20,
            fontWeight: 400,
            lineHeight: 1.4,
            letterSpacing: "-0.2px",
            color: OFF_BLACK,
            opacity: 0.7,
            maxWidth: 640,
            margin: "0 0 40px",
          }}
        >
          Built around{" "}
          <span style={{ color: FIN, fontWeight: 500 }}>Fin AI Agent</span> —
          delivering the highest quality answers, regardless of channel,
          completely autonomously.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <DarkButton label="Get a demo" />
          <OutlinedButton label="View pricing" />
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section
      style={{
        padding: "32px 24px",
        borderTop: `1px solid ${OAT}`,
        borderBottom: `1px solid ${OAT}`,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 24,
        }}
      >
        {STATS.map((s) => (
          <div key={s.label}>
            <p
              style={{
                fontSize: 54,
                fontWeight: 400,
                lineHeight: 1.0,
                letterSpacing: "-1.6px",
                margin: 0,
              }}
            >
              {s.value}
            </p>
            <p
              style={{
                fontSize: 12,
                fontFamily: FONT_MONO,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: MUTED,
                margin: "8px 0 0",
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureRow() {
  return (
    <section style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <MonoLabel label="The platform" />
        <h2
          style={{
            fontSize: "clamp(36px, 5vw, 54px)",
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: "-1.6px",
            margin: "16px 0 64px",
            maxWidth: 800,
          }}
        >
          Three products. One unified system.
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  label,
  title,
  body,
  accent,
}: {
  label: string;
  title: string;
  body: string;
  accent: string;
}) {
  return (
    <article
      style={{
        background: "#ffffff",
        border: `1px solid ${OAT}`,
        borderRadius: 8,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        minHeight: 320,
      }}
    >
      <span
        aria-hidden
        style={{
          width: 32,
          height: 32,
          borderRadius: 4,
          background: accent,
          marginBottom: 8,
        }}
      />
      <p
        style={{
          fontSize: 12,
          fontFamily: FONT_MONO,
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: MUTED,
          margin: 0,
        }}
      >
        {label}
      </p>
      <h3
        style={{
          fontSize: 32,
          fontWeight: 400,
          lineHeight: 1.0,
          letterSpacing: "-0.96px",
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 16,
          fontWeight: 400,
          lineHeight: 1.5,
          color: OFF_BLACK,
          opacity: 0.75,
          margin: 0,
          flex: 1,
        }}
      >
        {body}
      </p>
      <a
        href="#"
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: OFF_BLACK,
          textDecoration: "none",
          alignSelf: "flex-start",
          paddingBottom: 2,
          borderBottom: `1px solid ${OFF_BLACK}`,
        }}
      >
        Learn more →
      </a>
    </article>
  );
}

function CTA() {
  return (
    <section
      style={{
        padding: "96px 24px",
        borderTop: `1px solid ${OAT}`,
        background: "#ffffff",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: "-2.4px",
            margin: "0 0 24px",
          }}
        >
          See Fin in action.
        </h2>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.5,
            color: MUTED,
            margin: "0 0 40px",
          }}
        >
          Watch how Fin resolves real customer conversations across email, chat, and phone.
        </p>
        <div style={{ display: "inline-flex", gap: 12 }}>
          <DarkButton label="Watch demo" />
          <OutlinedButton label="Talk to sales" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        padding: "48px 24px",
        borderTop: `1px solid ${OAT}`,
        fontSize: 12,
        fontFamily: FONT_MONO,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: MUTED,
        textAlign: "center",
      }}
    >
      © 2026 Lab Demo · Status · Trust · Security · Privacy · Terms
    </footer>
  );
}

function MonoLabel({ label, accent = MUTED }: { label: string; accent?: string }) {
  return (
    <p
      style={{
        fontSize: 12,
        fontFamily: FONT_MONO,
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: accent,
        margin: 0,
      }}
    >
      {label}
    </p>
  );
}

function DarkButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      style={{
        background: OFF_BLACK,
        color: "#ffffff",
        border: "none",
        borderRadius: 4,
        padding: "12px 20px",
        fontSize: 16,
        fontWeight: 400,
        fontFamily: FONT_SAANS,
        cursor: "pointer",
        transition: "transform 200ms cubic-bezier(0.22,1,0.36,1)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    >
      {label}
    </button>
  );
}

function OutlinedButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      style={{
        background: "transparent",
        color: OFF_BLACK,
        border: `1px solid ${OFF_BLACK}`,
        borderRadius: 4,
        padding: "11px 20px",
        fontSize: 16,
        fontWeight: 400,
        fontFamily: FONT_SAANS,
        cursor: "pointer",
        transition: "transform 200ms cubic-bezier(0.22,1,0.36,1), background 200ms",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.background = "rgba(0,0,0,0.04)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.background = "transparent";
      }}
    >
      {label}
    </button>
  );
}
