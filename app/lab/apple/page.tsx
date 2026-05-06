"use client";

/* /lab/apple — design-system demo per happytalk-enduser/Apple.md.
   Cinematic black/white rhythm, SF Pro stack, Apple Blue (#0071e3) as the
   only chromatic accent, 980px pill CTAs, glass nav. Independent of V2. */

import { useState } from "react";

const FONT_DISPLAY =
  "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif";
const FONT_TEXT =
  "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif";

const APPLE_BLUE = "#0071e3";
const LINK_BLUE_LIGHT = "#0066cc";
const LINK_BLUE_DARK = "#2997ff";
const NEAR_BLACK = "#1d1d1f";
const LIGHT_GRAY = "#f5f5f7";

const NAV_LINKS = [
  "Store",
  "Mac",
  "iPad",
  "iPhone",
  "Watch",
  "AirPods",
  "TV & Home",
  "Entertainment",
  "Accessories",
  "Support",
];

export default function AppleLab() {
  const [panelOpen, setPanelOpen] = useState(true);
  return (
    <div style={{ background: "#000", color: "#fff", fontFamily: FONT_TEXT }}>
      <GlassNav />
      <HeroDark />
      <HeroLight />
      <ProductGrid />
      <FooterStrip />
      {panelOpen && <SupportPanel />}
      <SupportLauncher open={panelOpen} onClick={() => setPanelOpen((o) => !o)} />
    </div>
  );
}

/* ─────────── Support widget (Apple-skinned happytalk) ─────────── */

function SupportLauncher({ open, onClick }: { open: boolean; onClick: () => void }) {
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
        borderRadius: 16,
        background: APPLE_BLUE,
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "rgba(0, 0, 0, 0.22) 3px 5px 30px 0px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        transition: "transform 200ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {open ? (
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 5l14 14M19 5L5 19" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" />
        </svg>
      ) : (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M20 12c0 4.4-3.6 8-8 8a8 8 0 01-7-4l-1 4 4-1c1.2.8 2.5 1 4 1 4.4 0 8-3.6 8-8z"
            stroke="#fff"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

function SupportPanel() {
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
        background: LIGHT_GRAY,
        color: NEAR_BLACK,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow:
          "rgba(0, 0, 0, 0.22) 3px 5px 30px 0px, rgba(0,0,0,0.08) 0 1px 2px",
        display: "flex",
        flexDirection: "column",
        zIndex: 90,
        fontFamily: FONT_TEXT,
      }}
    >
      <PanelBody />
      <PanelNav />
    </div>
  );
}

function PanelBody() {
  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
      {/* Brand area */}
      <div style={{ padding: "32px 24px 20px" }}>
        <h2
          style={{
            fontSize: 28,
            fontFamily: FONT_DISPLAY,
            fontWeight: 600,
            lineHeight: 1.07,
            letterSpacing: "-0.196px",
            margin: "0 0 8px",
          }}
        >
          브랜드명
        </h2>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.43,
            letterSpacing: "-0.224px",
            color: "rgba(0,0,0,0.8)",
            margin: "0 0 16px",
          }}
        >
          여기에 브랜드 한 줄 소개가 들어갑니다.
        </p>
        <PanelStatusRow />
      </div>

      {/* CTA group */}
      <div style={{ padding: "0 24px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        <PanelCta />
        <PanelChannelRow />
      </div>

      {/* Notice + FAQ */}
      <div style={{ padding: "0 24px 16px", display: "flex", flexDirection: "column", gap: 24 }}>
        <SectionGroup title="공지">
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: "12px 14px",
              fontSize: 14,
              lineHeight: 1.43,
              letterSpacing: "-0.224px",
              color: NEAR_BLACK,
            }}
          >
            2026 추석 명절 배송 일정 안내드립니다.
          </div>
        </SectionGroup>
        <SectionGroup title="자주 묻는 질문">
          <PanelSearch />
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: "12px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
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
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "-0.224px",
          color: "rgba(0,0,0,0.8)",
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
          borderRadius: 980,
          background: "#e8f5ec",
          border: "1px solid rgba(0,0,0,0.04)",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "-0.12px",
          color: "#1f8a3a",
        }}
      >
        <span
          aria-hidden
          style={{ width: 6, height: 6, borderRadius: "50%", background: "#1f8a3a" }}
        />
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
        height: 48,
        borderRadius: 980,
        background: APPLE_BLUE,
        color: "#fff",
        border: "1px solid transparent",
        fontFamily: FONT_TEXT,
        fontSize: 17,
        fontWeight: 400,
        cursor: "pointer",
        transition: "background 200ms ease-out",
      }}
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
        borderRadius: 8,
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
          letterSpacing: "-0.224px",
          color: "rgba(0,0,0,0.8)",
        }}
      >
        다른 문의하기
      </span>
      <div style={{ display: "flex", gap: 6 }}>
        <ChannelDot label="네이버" bg="#03c75a" />
        <ChannelDot label="카카오" bg="#fee500" fg="#181600" />
        <ChannelDot label="전화" bg="#fff" border="1px solid rgba(0,0,0,0.12)" fg={NEAR_BLACK} />
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
        borderRadius: 8,
        background: bg,
        color: fg,
        border,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "-0.08px",
      }}
    >
      {label[0]}
    </span>
  );
}

function SectionGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <p
        style={{
          fontSize: 12,
          fontWeight: 400,
          letterSpacing: "-0.12px",
          color: "rgba(0,0,0,0.48)",
          margin: 0,
          paddingLeft: 12,
        }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

function PanelSearch() {
  return (
    <div
      style={{
        background: "#fafafc",
        border: "3px solid rgba(0,0,0,0.04)",
        borderRadius: 11,
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <svg width={14} height={14} viewBox="0 0 14 14" fill="none" aria-hidden>
        <circle cx="6" cy="6" r="5" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" />
        <path d="M10 10l3 3" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" strokeLinecap="round" />
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
          fontFamily: FONT_TEXT,
          letterSpacing: "-0.224px",
          color: NEAR_BLACK,
        }}
      />
    </div>
  );
}

function FaqItem({ category, question }: { category: string; question: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "-0.12px",
          color: "rgba(0,0,0,0.48)",
        }}
      >
        {category}
      </span>
      <span
        style={{
          fontSize: 14,
          fontWeight: 400,
          letterSpacing: "-0.224px",
          color: NEAR_BLACK,
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
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderTop: "1px solid rgba(0,0,0,0.08)",
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
              fontFamily: FONT_TEXT,
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              letterSpacing: "-0.224px",
              color: isActive ? NEAR_BLACK : "rgba(0,0,0,0.48)",
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

function GlassNav() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        height: 48,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 980,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 22px",
        }}
      >
        <AppleLogo />
        <ul
          style={{
            display: "flex",
            gap: 32,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {NAV_LINKS.map((l) => (
            <li
              key={l}
              style={{
                fontSize: 12,
                fontFamily: FONT_TEXT,
                fontWeight: 400,
                color: "#fff",
                opacity: 0.88,
                cursor: "pointer",
              }}
            >
              {l}
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <SearchIcon />
          <BagIcon />
        </div>
      </div>
    </nav>
  );
}

function HeroDark() {
  return (
    <section
      style={{
        background: "#000",
        color: "#fff",
        textAlign: "center",
        padding: "80px 22px 80px",
      }}
    >
      <p
        style={{
          fontSize: 21,
          fontFamily: FONT_DISPLAY,
          fontWeight: 600,
          lineHeight: 1.19,
          letterSpacing: "0.231px",
          margin: "0 0 8px",
        }}
      >
        iPhone 17 Pro
      </p>
      <h1
        style={{
          fontSize: 56,
          fontFamily: FONT_DISPLAY,
          fontWeight: 600,
          lineHeight: 1.07,
          letterSpacing: "-0.28px",
          margin: "0 0 16px",
        }}
      >
        Titanium. Tougher.
        <br />
        Lighter. More powerful.
      </h1>
      <p
        style={{
          fontSize: 21,
          fontFamily: FONT_DISPLAY,
          fontWeight: 400,
          lineHeight: 1.19,
          letterSpacing: "0.231px",
          margin: "0 auto 32px",
          maxWidth: 600,
          color: "rgba(255,255,255,0.92)",
        }}
      >
        From <span style={{ fontWeight: 600 }}>$999</span> or $41.62/mo. for 24 mo.
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 56 }}>
        <PillCta variant="filled" label="Buy" onDark />
        <PillLink label="Learn more" onDark />
      </div>
      <div
        aria-hidden
        style={{
          margin: "0 auto",
          width: "min(700px, 90vw)",
          aspectRatio: "16 / 10",
          background:
            "radial-gradient(ellipse at 50% 40%, #2c2c2e 0%, #0a0a0c 70%, #000 100%)",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_DISPLAY,
          fontSize: 14,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        product imagery placeholder
      </div>
    </section>
  );
}

function HeroLight() {
  return (
    <section
      style={{
        background: LIGHT_GRAY,
        color: NEAR_BLACK,
        textAlign: "center",
        padding: "80px 22px",
      }}
    >
      <p
        style={{
          fontSize: 21,
          fontFamily: FONT_DISPLAY,
          fontWeight: 600,
          lineHeight: 1.19,
          letterSpacing: "0.231px",
          margin: "0 0 8px",
        }}
      >
        MacBook Pro
      </p>
      <h2
        style={{
          fontSize: 56,
          fontFamily: FONT_DISPLAY,
          fontWeight: 600,
          lineHeight: 1.07,
          letterSpacing: "-0.28px",
          margin: "0 0 16px",
        }}
      >
        Mind-blowing. Head-turning.
      </h2>
      <p
        style={{
          fontSize: 21,
          fontFamily: FONT_DISPLAY,
          fontWeight: 400,
          lineHeight: 1.19,
          letterSpacing: "0.231px",
          margin: "0 auto 32px",
          maxWidth: 600,
        }}
      >
        Supercharged by M5 Pro and M5 Max.
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        <PillCta variant="filled" label="Buy" />
        <PillLink label="Learn more" />
      </div>
    </section>
  );
}

function ProductGrid() {
  const tiles = [
    { name: "iPad Pro", desc: "Unbelievably thin. Incredibly powerful." },
    { name: "Apple Watch Series 11", desc: "Smartest. Healthiest. Brightest." },
    { name: "AirPods 4", desc: "Iconic. Now supercharged." },
    { name: "Apple Vision Pro", desc: "Welcome to spatial computing." },
  ];
  return (
    <section
      style={{
        background: LIGHT_GRAY,
        padding: "16px 16px 80px",
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {tiles.map((t) => (
          <ProductTile key={t.name} name={t.name} desc={t.desc} />
        ))}
      </div>
    </section>
  );
}

function ProductTile({ name, desc }: { name: string; desc: string }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 8,
        padding: "44px 24px 32px",
        textAlign: "center",
        color: NEAR_BLACK,
        boxShadow: "rgba(0, 0, 0, 0.22) 3px 5px 30px 0px",
        minHeight: 360,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p
        style={{
          fontSize: 28,
          fontFamily: FONT_DISPLAY,
          fontWeight: 400,
          lineHeight: 1.14,
          letterSpacing: "0.196px",
          margin: "0 0 8px",
        }}
      >
        {name}
      </p>
      <p
        style={{
          fontSize: 14,
          fontFamily: FONT_TEXT,
          fontWeight: 400,
          lineHeight: 1.43,
          letterSpacing: "-0.224px",
          color: "rgba(0,0,0,0.8)",
          margin: "0 0 24px",
        }}
      >
        {desc}
      </p>
      <div
        aria-hidden
        style={{
          flex: 1,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.0) 60%)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(0,0,0,0.25)",
          fontSize: 12,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginBottom: 24,
        }}
      >
        product
      </div>
      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        <InlineLink label="Learn more" />
        <InlineLink label="Buy" />
      </div>
    </div>
  );
}

function FooterStrip() {
  return (
    <footer
      style={{
        background: LIGHT_GRAY,
        color: "rgba(0,0,0,0.48)",
        fontSize: 12,
        fontFamily: FONT_TEXT,
        padding: "24px 22px 40px",
        textAlign: "center",
        letterSpacing: "-0.12px",
        lineHeight: 1.33,
      }}
    >
      Copyright © 2026 Lab Demo. All rights reserved · Privacy Policy · Terms of Use ·
      Sales and Refunds · Legal · Site Map
    </footer>
  );
}

function PillCta({
  variant,
  label,
  onDark = false,
}: {
  variant: "filled" | "outline";
  label: string;
  onDark?: boolean;
}) {
  const filled = variant === "filled";
  return (
    <button
      type="button"
      style={{
        padding: "11px 22px",
        borderRadius: 980,
        fontSize: 17,
        fontFamily: FONT_TEXT,
        fontWeight: 400,
        cursor: "pointer",
        background: filled ? APPLE_BLUE : "transparent",
        color: filled ? "#fff" : onDark ? "#fff" : NEAR_BLACK,
        border: filled
          ? "1px solid transparent"
          : `1px solid ${onDark ? "#fff" : NEAR_BLACK}`,
        transition: "background 200ms ease-out, transform 120ms ease-out",
      }}
    >
      {label}
    </button>
  );
}

function PillLink({ label, onDark = false }: { label: string; onDark?: boolean }) {
  const color = onDark ? LINK_BLUE_DARK : LINK_BLUE_LIGHT;
  return (
    <button
      type="button"
      style={{
        padding: "11px 22px",
        borderRadius: 980,
        fontSize: 17,
        fontFamily: FONT_TEXT,
        fontWeight: 400,
        cursor: "pointer",
        background: "transparent",
        color,
        border: `1px solid ${color}`,
        transition: "background 200ms ease-out",
      }}
    >
      {label}
      <span aria-hidden style={{ marginLeft: 4 }}>
        ›
      </span>
    </button>
  );
}

function InlineLink({ label }: { label: string }) {
  return (
    <a
      href="#"
      style={{
        color: LINK_BLUE_LIGHT,
        fontFamily: FONT_TEXT,
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: "-0.224px",
        textDecoration: "none",
      }}
    >
      {label} ›
    </a>
  );
}

function AppleLogo() {
  return (
    <svg
      width={17}
      height={48}
      viewBox="0 0 14 18"
      fill="#fff"
      aria-label="Apple"
      style={{ flexShrink: 0 }}
    >
      <path d="M11.6 9.4c0-2 1.6-2.9 1.7-3-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.3 1 8.3.7 1 1.5 2.1 2.6 2 1 0 1.4-.7 2.7-.7 1.2 0 1.6.7 2.7.7 1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.3-.9-2.3-3.5zM9.8 3.6C10.3 3 10.7 2.1 10.6 1.2c-.8 0-1.7.5-2.3 1.1-.5.5-1 1.4-.8 2.3.9.1 1.7-.5 2.3-1z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="6" r="5" stroke="#fff" strokeWidth="1.2" />
      <path d="M10 10l3 3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width={14} height={16} viewBox="0 0 14 16" fill="none">
      <path
        d="M3 5h8l-.5 9h-7L3 5z"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M5 5V3a2 2 0 014 0v2" stroke="#fff" strokeWidth="1.2" />
    </svg>
  );
}
