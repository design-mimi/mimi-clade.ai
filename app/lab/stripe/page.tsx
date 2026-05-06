"use client";

/* /lab/stripe — design-system demo per design-md-library/stripe.md.
   sohne-var (SF Pro Display fallback) at weight 300 for display sizes,
   `"ss01"` stylistic set globally, signature Stripe purple `#533afd`,
   deep navy `#061b31` headings, blue-tinted multi-layer shadows,
   conservative 4–8px radii. The lab choice answers the "결제/환불/계정
   문의처럼 민감한 상황에 적합 — 신뢰감 + 정교한 폼/검증 UI" criterion. */

import { useState } from "react";

const FONT =
  "'sohne-var', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const FONT_FEATURES = '"ss01"';

const STRIPE_PURPLE = "#533afd";
const STRIPE_PURPLE_HOVER = "#4434d4";
const STRIPE_PURPLE_LIGHT = "#b9b9f9";
const HEADING = "#061b31";
const LABEL = "#273951";
const BODY = "#64748d";
const BORDER_DEFAULT = "#e5edf5";
const BRAND_DARK = "#1c1e54";
const SUCCESS = "#15be53";
const SUCCESS_TEXT = "#108c3d";
const RUBY = "#ea2261";
const MAGENTA = "#f96bee";
const CANVAS = "#ffffff";

const SHADOW_CARD =
  "rgba(50,50,93,0.25) 0px 30px 45px -30px, rgba(0,0,0,0.1) 0px 18px 36px -18px";
const SHADOW_AMBIENT = "rgba(23,23,23,0.08) 0px 15px 35px 0px";

const NAV_LINKS = ["Products", "Solutions", "Developers", "Resources", "Pricing"];

const FEATURES = [
  {
    eyebrow: "Payments",
    title: "Online payments",
    body: "Accept payments online, in person, and around the world with a payments solution built for any business.",
  },
  {
    eyebrow: "Billing",
    title: "Subscriptions & invoicing",
    body: "Capture recurring revenue and invoice customers from a unified subscription engine.",
  },
  {
    eyebrow: "Connect",
    title: "Multiparty payments",
    body: "Build a global payments platform with embedded financial services.",
  },
];

type PanelVariant = "default" | "compact" | "gradient" | "image";
const PANEL_VARIANTS: { id: PanelVariant; label: string }[] = [
  { id: "default", label: "기본형" },
  { id: "compact", label: "간단형" },
  { id: "gradient", label: "그라디언트형" },
  { id: "image", label: "이미지형" },
];

export default function StripeLab() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [variant, setVariant] = useState<PanelVariant>("default");
  return (
    <div
      style={{
        background: CANVAS,
        color: HEADING,
        fontFamily: FONT,
        fontFeatureSettings: FONT_FEATURES,
        minHeight: "100vh",
      }}
    >
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
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid ${BORDER_DEFAULT}`,
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
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: HEADING,
                  cursor: "pointer",
                  fontFeatureSettings: FONT_FEATURES,
                }}
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
              color: HEADING,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "8px 12px",
              fontFamily: FONT,
              fontFeatureSettings: FONT_FEATURES,
            }}
          >
            Sign in
          </button>
          <PurpleButton label="Start now →" />
        </div>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <span
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: STRIPE_PURPLE,
          letterSpacing: "-0.5px",
          fontStyle: "italic",
          fontFamily: FONT,
        }}
      >
        stripe
      </span>
    </div>
  );
}

function Hero() {
  return (
    <section
      style={{
        padding: "120px 32px 96px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ruby→magenta gradient decoration — Stripe's signature accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -100,
          right: -80,
          width: 460,
          height: 460,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${MAGENTA} 0%, ${RUBY} 60%, transparent 80%)`,
          filter: "blur(80px)",
          opacity: 0.45,
        }}
      />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <p
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: STRIPE_PURPLE,
            margin: "0 0 16px",
            fontFeatureSettings: FONT_FEATURES,
          }}
        >
          Financial infrastructure to grow your revenue
        </p>
        <h1
          style={{
            fontSize: "clamp(40px, 7vw, 56px)",
            fontWeight: 300,
            lineHeight: 1.03,
            letterSpacing: "-1.4px",
            margin: "0 0 24px",
            color: HEADING,
            maxWidth: 800,
            fontFeatureSettings: FONT_FEATURES,
          }}
        >
          Payments infrastructure for the internet.
        </h1>
        <p
          style={{
            fontSize: 18,
            fontWeight: 300,
            lineHeight: 1.4,
            color: BODY,
            margin: "0 0 40px",
            maxWidth: 620,
            fontFeatureSettings: FONT_FEATURES,
          }}
        >
          Millions of companies of all sizes — from startups to Fortune 500s — use Stripe's
          software and APIs to accept payments, send payouts, and manage their businesses online.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <PurpleButton label="Start now →" />
          <button
            type="button"
            style={{
              padding: "8px 16px",
              borderRadius: 4,
              border: `1px solid ${STRIPE_PURPLE_LIGHT}`,
              background: "transparent",
              color: STRIPE_PURPLE,
              fontSize: 16,
              fontWeight: 400,
              fontFamily: FONT,
              cursor: "pointer",
              fontFeatureSettings: FONT_FEATURES,
            }}
          >
            Contact sales →
          </button>
        </div>
      </div>
    </section>
  );
}

function FeatureRow() {
  return (
    <section style={{ background: CANVAS, padding: "96px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "-0.64px",
            margin: "0 0 48px",
            color: HEADING,
            maxWidth: 600,
            fontFeatureSettings: FONT_FEATURES,
          }}
        >
          A complete payments platform, engineered for growth.
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
                background: CANVAS,
                border: `1px solid ${BORDER_DEFAULT}`,
                borderRadius: 8,
                padding: 28,
                minHeight: 240,
                display: "flex",
                flexDirection: "column",
                boxShadow: SHADOW_AMBIENT,
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: STRIPE_PURPLE,
                  margin: "0 0 12px",
                  fontFeatureSettings: FONT_FEATURES,
                }}
              >
                {f.eyebrow}
              </p>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: "-0.22px",
                  margin: "0 0 12px",
                  color: HEADING,
                  fontFeatureSettings: FONT_FEATURES,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 300,
                  lineHeight: 1.4,
                  color: BODY,
                  margin: 0,
                  flex: 1,
                  fontFeatureSettings: FONT_FEATURES,
                }}
              >
                {f.body}
              </p>
              <a
                href="#"
                style={{
                  marginTop: 16,
                  fontSize: 14,
                  fontWeight: 400,
                  color: STRIPE_PURPLE,
                  textDecoration: "none",
                  fontFeatureSettings: FONT_FEATURES,
                }}
              >
                Learn more →
              </a>
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
        background: BRAND_DARK,
        color: "#a8b1c0",
        padding: "48px 32px",
        fontSize: 13,
        textAlign: "center",
        lineHeight: 1.4,
        fontFeatureSettings: FONT_FEATURES,
      }}
    >
      © 2026 Lab Demo · Privacy · Terms · Cookie settings
    </footer>
  );
}

function PurpleButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      style={{
        padding: "8px 16px",
        borderRadius: 4,
        border: "none",
        background: STRIPE_PURPLE,
        color: CANVAS,
        fontSize: 16,
        fontWeight: 400,
        fontFamily: FONT,
        fontFeatureSettings: FONT_FEATURES,
        cursor: "pointer",
        transition: "background 200ms ease-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = STRIPE_PURPLE_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.background = STRIPE_PURPLE)}
    >
      {label}
    </button>
  );
}

/* ─────────── Support widget (Stripe-skinned happytalk) ─────────── */

function SupportLauncher({ open, onClick }: { open: boolean; onClick: () => void }) {
  // Stripe-skinned launcher: 4px sharp radius (signature), Stripe purple
  // fill, blue-tinted multi-layer shadow.
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
        borderRadius: 4,
        background: STRIPE_PURPLE,
        color: CANVAS,
        border: "none",
        boxShadow:
          "rgba(50,50,93,0.25) 0px 30px 45px -30px, rgba(0,0,0,0.1) 0px 18px 36px -18px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        transition: "background 200ms ease-out",
        fontFamily: FONT,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = STRIPE_PURPLE_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.background = STRIPE_PURPLE)}
    >
      {open ? (
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 5l14 14M19 5L5 19" stroke={CANVAS} strokeWidth={2} strokeLinecap="round" />
        </svg>
      ) : (
        <span
          style={{
            fontSize: 28,
            fontWeight: 300,
            lineHeight: 1,
            fontStyle: "italic",
            letterSpacing: "-0.5px",
          }}
        >
          $
        </span>
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
        background: CANVAS,
        border: `1px solid ${BORDER_DEFAULT}`,
        borderRadius: 4,
        boxShadow: SHADOW_AMBIENT,
        fontFamily: FONT,
      }}
    >
      <p
        style={{
          fontSize: 12,
          fontWeight: 400,
          color: BODY,
          margin: "0 0 10px",
          paddingLeft: 4,
          fontFeatureSettings: FONT_FEATURES,
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
                fontWeight: 400,
                padding: "8px 12px",
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
                background: active ? STRIPE_PURPLE : "transparent",
                color: active ? CANVAS : HEADING,
                textAlign: "left",
                transition: "background 200ms ease-out, color 200ms ease-out",
                fontFeatureSettings: FONT_FEATURES,
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
        color: HEADING,
        borderRadius: 8,
        overflow: "hidden",
        border: `1px solid ${BORDER_DEFAULT}`,
        boxShadow: SHADOW_CARD,
        display: "flex",
        flexDirection: "column",
        zIndex: 90,
        fontFamily: FONT,
        fontFeatureSettings: FONT_FEATURES,
      }}
    >
      <PanelBody variant={variant} />
      <PanelNav />
    </div>
  );
}

/* Variant rendering — Stripe's premium-fintech vocabulary applied:
   - default: clean white brand area
   - compact: same chrome, description hidden
   - gradient: brand area inverts to a deep brand-dark fill (Stripe's
     immersive moments use #1c1e54 with white text)
   - image: ruby→magenta radial accent above brand area, mirroring the
     hero gradient signature. */
function PanelBody({ variant }: { variant: PanelVariant }) {
  const showHero = variant === "image";
  const showDescription = variant !== "compact";
  const inverted = variant === "gradient";
  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
      {showHero && (
        <div
          style={{
            height: 160,
            background: BRAND_DARK,
            position: "relative",
            overflow: "hidden",
          }}
          aria-hidden
        >
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -40,
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${MAGENTA} 0%, ${RUBY} 60%, transparent 80%)`,
              filter: "blur(60px)",
              opacity: 0.7,
            }}
          />
          <span
            style={{
              position: "absolute",
              top: 16,
              left: 20,
              fontSize: 12,
              fontWeight: 400,
              color: "rgba(255,255,255,0.6)",
              fontFeatureSettings: FONT_FEATURES,
            }}
          >
            Hero illustration
          </span>
        </div>
      )}
      <div
        style={{
          padding: "32px 24px 20px",
          background: inverted ? BRAND_DARK : "transparent",
          color: inverted ? CANVAS : HEADING,
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 400,
            color: inverted ? "rgba(255,255,255,0.7)" : STRIPE_PURPLE,
            margin: "0 0 12px",
            fontFeatureSettings: FONT_FEATURES,
          }}
        >
          Customer support
        </p>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "-0.64px",
            margin: "0 0 12px",
            color: inverted ? CANVAS : HEADING,
            fontFeatureSettings: FONT_FEATURES,
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
              color: inverted ? "rgba(255,255,255,0.75)" : BODY,
              margin: "0 0 20px",
              fontFeatureSettings: FONT_FEATURES,
            }}
          >
            여기에 브랜드 한 줄 소개가 들어갑니다.
          </p>
        )}
        <PanelStatusRow inverted={inverted} />
      </div>

      <div style={{ padding: "0 24px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        <PanelCta />
        <PanelChannelRow />
      </div>

      <div style={{ padding: "0 24px 16px", display: "flex", flexDirection: "column", gap: 20 }}>
        <SectionGroup label="Notice">
          <div
            style={{
              background: CANVAS,
              border: `1px solid ${BORDER_DEFAULT}`,
              borderRadius: 4,
              padding: "14px 16px",
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.4,
              color: HEADING,
              fontFeatureSettings: FONT_FEATURES,
            }}
          >
            2026 추석 명절 배송 일정 안내드립니다.
          </div>
        </SectionGroup>
        <SectionGroup label="FAQ">
          <PanelSearch />
          <div
            style={{
              background: CANVAS,
              border: `1px solid ${BORDER_DEFAULT}`,
              borderRadius: 4,
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

function PanelStatusRow({ inverted = false }: { inverted?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
      <span
        style={{
          fontSize: 14,
          fontWeight: 400,
          color: inverted ? "rgba(255,255,255,0.85)" : LABEL,
          fontFeatureSettings: FONT_FEATURES,
        }}
      >
        9–18시 운영 중
      </span>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "1px 8px",
          borderRadius: 4,
          background: `rgba(${inverted ? "255,255,255" : "21,190,83"},0.2)`,
          border: inverted
            ? "1px solid rgba(255,255,255,0.3)"
            : `1px solid rgba(21,190,83,0.4)`,
          fontSize: 11,
          fontWeight: 300,
          color: inverted ? CANVAS : SUCCESS_TEXT,
          fontFeatureSettings: FONT_FEATURES,
        }}
      >
        <span
          aria-hidden
          style={{ width: 6, height: 6, borderRadius: "50%", background: SUCCESS }}
        />
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
        height: 44,
        borderRadius: 4,
        background: STRIPE_PURPLE,
        color: CANVAS,
        border: "none",
        fontFamily: FONT,
        fontSize: 16,
        fontWeight: 400,
        cursor: "pointer",
        transition: "background 200ms ease-out",
        fontFeatureSettings: FONT_FEATURES,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = STRIPE_PURPLE_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.background = STRIPE_PURPLE)}
    >
      문의하기 →
    </button>
  );
}

function PanelChannelRow() {
  return (
    <div
      style={{
        background: CANVAS,
        border: `1px solid ${BORDER_DEFAULT}`,
        borderRadius: 4,
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontSize: 14,
          fontWeight: 400,
          color: LABEL,
          fontFeatureSettings: FONT_FEATURES,
        }}
      >
        다른 문의하기
      </span>
      <div style={{ display: "flex", gap: 6 }}>
        <ChannelDot label="네이버" bg="#03c75a" />
        <ChannelDot label="카카오" bg="#fee500" fg="#181600" />
        <ChannelDot label="전화" bg={CANVAS} fg={HEADING} border={`1px solid ${BORDER_DEFAULT}`} />
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
        borderRadius: 4,
        background: bg,
        color: fg,
        border,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 400,
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
          fontSize: 12,
          fontWeight: 400,
          color: BODY,
          margin: 0,
          fontFeatureSettings: FONT_FEATURES,
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
        border: `1px solid ${BORDER_DEFAULT}`,
        borderRadius: 4,
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="7" cy="7" r="5" stroke={BODY} strokeWidth="1.6" />
        <path d="M11 11l3 3" stroke={BODY} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        placeholder="Search docs"
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          fontSize: 14,
          fontWeight: 300,
          fontFamily: FONT,
          color: HEADING,
          fontFeatureSettings: FONT_FEATURES,
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
          fontSize: 12,
          fontWeight: 400,
          color: STRIPE_PURPLE,
          fontFeatureSettings: FONT_FEATURES,
        }}
      >
        {category}
      </span>
      <span
        style={{
          fontSize: 14,
          fontWeight: 300,
          color: HEADING,
          fontFeatureSettings: FONT_FEATURES,
        }}
      >
        {question}
      </span>
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
        borderTop: `1px solid ${BORDER_DEFAULT}`,
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
              fontWeight: isActive ? 400 : 300,
              color: isActive ? HEADING : BODY,
              transition: "color 220ms ease-out, font-weight 220ms ease-out",
              fontFeatureSettings: FONT_FEATURES,
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
