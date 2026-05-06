"use client";

/* /lab/airbnb — design-system demo per happytalk-enduser/Airbnb.md.
   Pure white canvas, Rausch Red (#ff385c) accent, 3-layer warm card
   shadows, generous radius (8/14/20/32px), photo-first listings.
   Independent of V2. */

import { useState } from "react";

const FONT =
  "'Airbnb Cereal VF', Circular, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const RAUSCH = "#ff385c";
const NEAR_BLACK = "#222222";
const SECONDARY = "#6a6a6a";
const SURFACE = "#f2f2f2";

const CATEGORIES = [
  { icon: "🏝️", label: "Beachfront" },
  { icon: "🏔️", label: "National parks" },
  { icon: "🛖", label: "Treehouses" },
  { icon: "🛥️", label: "Boats" },
  { icon: "🏰", label: "Castles" },
  { icon: "❄️", label: "Arctic" },
  { icon: "🌵", label: "Desert" },
  { icon: "🏛️", label: "Historical" },
  { icon: "🍷", label: "Vineyards" },
  { icon: "🌋", label: "Off-the-grid" },
  { icon: "🎿", label: "Skiing" },
  { icon: "🎪", label: "Camping" },
];

const LISTINGS = [
  { city: "Sausalito, California", desc: "Stay with Maria", price: "$485", rating: 4.94, date: "Nov 15 – 20", emoji: "🏠" },
  { city: "Aspen, Colorado", desc: "Mountain retreat", price: "$612", rating: 4.88, date: "Dec 3 – 8", emoji: "🏔️" },
  { city: "Joshua Tree, California", desc: "Desert dome", price: "$298", rating: 4.96, date: "Nov 22 – 27", emoji: "🌵" },
  { city: "Big Sur, California", desc: "Cliffside cabin", price: "$540", rating: 4.92, date: "Nov 18 – 22", emoji: "🌊" },
  { city: "Tulum, Mexico", desc: "Jungle treehouse", price: "$215", rating: 4.85, date: "Dec 10 – 15", emoji: "🌴" },
  { city: "Reykjavík, Iceland", desc: "Glass igloo", price: "$390", rating: 4.97, date: "Jan 6 – 11", emoji: "🌌" },
  { city: "Kyoto, Japan", desc: "Traditional ryokan", price: "$278", rating: 4.91, date: "Dec 1 – 6", emoji: "🏯" },
  { city: "Cape Town, South Africa", desc: "Ocean villa", price: "$420", rating: 4.89, date: "Nov 25 – 30", emoji: "🌊" },
];

const SHADOW_CARD =
  "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px 0px, rgba(0,0,0,0.1) 0px 4px 8px 0px";

type PanelVariant = "default" | "compact" | "gradient" | "image";
const PANEL_VARIANTS: { id: PanelVariant; label: string }[] = [
  { id: "default", label: "기본형" },
  { id: "compact", label: "간단형" },
  { id: "gradient", label: "그라디언트형" },
  { id: "image", label: "이미지형" },
];

export default function AirbnbLab() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [variant, setVariant] = useState<PanelVariant>("default");
  return (
    <div style={{ background: "#fff", color: NEAR_BLACK, fontFamily: FONT, minHeight: "100vh" }}>
      <Header />
      <CategoryBar />
      <ListingGrid />
      <Footer />
      {panelOpen && <SupportPanel variant={variant} />}
      <SupportLauncher open={panelOpen} onClick={() => setPanelOpen((o) => !o)} />
      {panelOpen && <VariantSelector value={variant} onChange={setVariant} />}
    </div>
  );
}

/* Airbnb-skinned variant selector — white card with the three-layer
   warm shadow and 20px radius. Active option is the spec's "Primary
   Dark" pill (#222 fill, white text) with 8px radius. */
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
        background: "#fff",
        borderRadius: 20,
        boxShadow: SHADOW_CARD,
        fontFamily: FONT,
      }}
    >
      <p
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: SECONDARY,
          margin: "0 0 8px",
          paddingLeft: 4,
        }}
      >
        홈 배리언트
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
                fontFamily: FONT,
                fontSize: 14,
                fontWeight: active ? 600 : 500,
                padding: "10px 14px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: active ? NEAR_BLACK : "transparent",
                color: active ? "#fff" : NEAR_BLACK,
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

/* ─────────── Support widget (Airbnb-skinned happytalk) ─────────── */

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
        borderRadius: "50%",
        background: RAUSCH,
        color: "#fff",
        border: "none",
        boxShadow: SHADOW_CARD,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        transition: "transform 220ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {open ? (
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 5l14 14M19 5L5 19" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" />
        </svg>
      ) : (
        <svg width={26} height={26} viewBox="0 0 32 32" fill="#fff" aria-hidden>
          <path d="M16 1c-4 0-7 3-7 7 0 3 2 6 4 9 1 1 2 3 3 4 1-1 2-3 3-4 2-3 4-6 4-9 0-4-3-7-7-7zm0 24c-7 0-13 4-13 8 0 1 0 2 1 3l4-2c2-1 5-2 8-2s6 1 8 2l4 2c1-1 1-2 1-3 0-4-6-8-13-8z" />
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
        background: "#fff",
        color: NEAR_BLACK,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: SHADOW_CARD,
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

/* Variant rendering — Airbnb's photo-first identity drives variant
   interpretation:
   - default: standard white brand area
   - compact: same chrome, description hidden
   - gradient: warm sand vertical gradient on the brand area, echoing
     Airbnb's listing-card photography moods
   - image: full-bleed photo placeholder above the brand area, like a
     listing card's hero. */
function PanelBody({ variant }: { variant: PanelVariant }) {
  const showHero = variant === "image";
  const showDescription = variant !== "compact";
  const isGradient = variant === "gradient";
  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
      {showHero && (
        <div
          style={{
            height: 180,
            background:
              "linear-gradient(135deg, #f3e6d3 0%, #e8d4b8 50%, #d6b88f 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 80,
          }}
          aria-hidden
        >
          🏝️
        </div>
      )}
      {/* Brand area — gradient variant overlays a warm sand fill */}
      <div
        style={{
          padding: "32px 24px 20px",
          background: isGradient
            ? "linear-gradient(180deg, #f3e6d3 0%, #ffffff 100%)"
            : "transparent",
        }}
      >
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: "-0.44px",
            margin: "0 0 12px",
            color: NEAR_BLACK,
          }}
        >
          브랜드명
        </h2>
        {showDescription && (
          <p
            style={{
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.43,
              color: SECONDARY,
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
          gap: 12,
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
        <SectionGroup title="공지">
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "16px 20px",
              fontSize: 14,
              lineHeight: 1.43,
              color: NEAR_BLACK,
              boxShadow: SHADOW_CARD,
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
              borderRadius: 20,
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              maxHeight: 240,
              overflowY: "auto",
              boxShadow: SHADOW_CARD,
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
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: NEAR_BLACK,
          letterSpacing: "-0.18px",
        }}
      >
        9–18시 운영 중
      </span>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 12px",
          borderRadius: 14,
          background: "#fff5e6",
          fontSize: 11,
          fontWeight: 600,
          color: "#a0480a",
        }}
      >
        <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: RAUSCH }} />
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
        borderRadius: 8,
        background: NEAR_BLACK,
        color: "#fff",
        border: "none",
        fontFamily: FONT,
        fontSize: 16,
        fontWeight: 500,
        cursor: "pointer",
        transition: "background 200ms ease-out, transform 120ms ease-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = RAUSCH)}
      onMouseLeave={(e) => (e.currentTarget.style.background = NEAR_BLACK)}
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
        borderRadius: 20,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: SHADOW_CARD,
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 500, color: NEAR_BLACK }}>다른 문의하기</span>
      <div style={{ display: "flex", gap: 8 }}>
        <ChannelDot label="네이버" bg="#03c75a" />
        <ChannelDot label="카카오" bg="#fee500" fg="#181600" />
        <ChannelDot label="전화" bg={SURFACE} fg={NEAR_BLACK} />
      </div>
    </div>
  );
}

function ChannelDot({
  label,
  bg,
  fg = "#fff",
}: {
  label: string;
  bg: string;
  fg?: string;
}) {
  return (
    <span
      aria-label={label}
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: bg,
        color: fg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {label[0]}
    </span>
  );
}

function SectionGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <p style={{ fontSize: 14, fontWeight: 600, color: NEAR_BLACK, margin: 0 }}>{title}</p>
      {children}
    </div>
  );
}

function PanelSearch() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        boxShadow: SHADOW_CARD,
      }}
    >
      <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="7" cy="7" r="5" stroke={NEAR_BLACK} strokeWidth="1.6" />
        <path d="M11 11l3 3" stroke={NEAR_BLACK} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        placeholder="검색"
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          fontSize: 14,
          fontFamily: FONT,
          color: NEAR_BLACK,
        }}
      />
    </div>
  );
}

function FaqItem({ category, question }: { category: string; question: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: SECONDARY }}>{category}</span>
      <span style={{ fontSize: 14, fontWeight: 400, color: NEAR_BLACK }}>{question}</span>
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
        background: "#fff",
        borderTop: "1px solid #ebebeb",
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
              color: isActive ? NEAR_BLACK : SECONDARY,
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

function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#fff",
        borderBottom: "1px solid #ebebeb",
        padding: "20px 40px 16px",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: 24,
        }}
      >
        <AirbnbLogo />
        <SearchBar />
        <UserMenu />
      </div>
    </header>
  );
}

function AirbnbLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, color: RAUSCH }}>
      <svg width={32} height={32} viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 1c-4 0-7 3-7 7 0 3 2 6 4 9 1 1 2 3 3 4 1-1 2-3 3-4 2-3 4-6 4-9 0-4-3-7-7-7zm0 24c-7 0-13 4-13 8 0 1 0 2 1 3l4-2c2-1 5-2 8-2s6 1 8 2l4 2c1-1 1-2 1-3 0-4-6-8-13-8z" />
      </svg>
      <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.44px" }}>airbnb</span>
    </div>
  );
}

function SearchBar() {
  return (
    <button
      type="button"
      style={{
        justifySelf: "center",
        display: "flex",
        alignItems: "center",
        gap: 0,
        height: 56,
        background: "#fff",
        border: "1px solid #dddddd",
        borderRadius: 32,
        boxShadow: SHADOW_CARD,
        padding: "0 8px 0 24px",
        cursor: "pointer",
      }}
    >
      <SegmentLabel label="Anywhere" />
      <Divider />
      <SegmentLabel label="Any week" />
      <Divider />
      <SegmentLabel label="Add guests" muted />
      <span
        style={{
          marginLeft: 8,
          background: RAUSCH,
          width: 40,
          height: 40,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <SearchIcon />
      </span>
    </button>
  );
}

function SegmentLabel({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <span
      style={{
        padding: "0 16px",
        fontSize: 14,
        fontWeight: muted ? 400 : 600,
        color: muted ? SECONDARY : NEAR_BLACK,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function Divider() {
  return (
    <span
      aria-hidden
      style={{ width: 1, height: 24, background: "#ebebeb", display: "inline-block" }}
    />
  );
}

function UserMenu() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <a
        href="#"
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: NEAR_BLACK,
          padding: "12px 16px",
          borderRadius: 22,
          textDecoration: "none",
        }}
      >
        Become a Host
      </a>
      <button
        type="button"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: SURFACE,
          border: "1px solid #ebebeb",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label="Globe"
      >
        🌐
      </button>
      <button
        type="button"
        style={{
          height: 42,
          padding: "5px 5px 5px 12px",
          borderRadius: 21,
          background: "#fff",
          border: "1px solid #dddddd",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <MenuIcon />
        <span
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: NEAR_BLACK,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          U
        </span>
      </button>
    </div>
  );
}

function CategoryBar() {
  return (
    <div
      style={{
        background: "#fff",
        padding: "24px 40px 8px",
        borderBottom: "1px solid #ebebeb",
        position: "sticky",
        top: 92,
        zIndex: 40,
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 8,
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {CATEGORIES.map((c, i) => (
          <button
            key={c.label}
            type="button"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              minWidth: 56,
              padding: "8px 12px",
              border: "none",
              background: "transparent",
              borderBottom: i === 0 ? `2px solid ${NEAR_BLACK}` : "2px solid transparent",
              opacity: i === 0 ? 1 : 0.7,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              color: NEAR_BLACK,
              whiteSpace: "nowrap",
              fontFamily: "inherit",
            }}
          >
            <span style={{ fontSize: 22 }}>{c.icon}</span>
            <span>{c.label}</span>
          </button>
        ))}
        <span style={{ flex: 1 }} />
        <button
          type="button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            border: "1px solid #dddddd",
            borderRadius: 12,
            background: "#fff",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          ⚙ Filters
        </button>
      </div>
    </div>
  );
}

function ListingGrid() {
  return (
    <main style={{ padding: "32px 40px 48px" }}>
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "24px 16px",
        }}
      >
        {LISTINGS.map((l) => (
          <ListingCard key={l.city} {...l} />
        ))}
      </div>
    </main>
  );
}

function ListingCard({
  city,
  desc,
  price,
  rating,
  date,
  emoji,
}: {
  city: string;
  desc: string;
  price: string;
  rating: number;
  date: string;
  emoji: string;
}) {
  return (
    <article style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          position: "relative",
          aspectRatio: "1 / 1",
          borderRadius: 12,
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #f3e6d3 0%, #e8d4b8 50%, #d6b88f 100%)",
          boxShadow: SHADOW_CARD,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 96, opacity: 0.85 }}>{emoji}</span>
        <button
          type="button"
          aria-label="Save"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "rgba(0,0,0,0.5)",
            fontSize: 22,
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.4))",
          }}
        >
          ♡
        </button>
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 4,
          }}
          aria-hidden
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: i === 0 ? "#fff" : "rgba(255,255,255,0.6)",
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <p style={{ fontSize: 16, fontWeight: 600, margin: 0, lineHeight: 1.25 }}>{city}</p>
        <p
          style={{
            fontSize: 14,
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: NEAR_BLACK,
          }}
        >
          ★ {rating}
        </p>
      </div>
      <p style={{ fontSize: 14, color: SECONDARY, margin: 0, lineHeight: 1.43 }}>{desc}</p>
      <p style={{ fontSize: 14, color: SECONDARY, margin: 0, lineHeight: 1.43 }}>{date}</p>
      <p style={{ fontSize: 16, margin: "4px 0 0", fontWeight: 500 }}>
        <span style={{ fontWeight: 600 }}>{price}</span>{" "}
        <span style={{ color: SECONDARY, fontWeight: 400 }}>night</span>
      </p>
    </article>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: SURFACE,
        borderTop: "1px solid #ebebeb",
        padding: "32px 40px",
        fontSize: 14,
        color: SECONDARY,
        textAlign: "center",
      }}
    >
      © 2026 Lab Demo · Privacy · Terms · Sitemap · Company details
    </footer>
  );
}

function SearchIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5" stroke="#fff" strokeWidth="2" />
      <path d="M11 11l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2 4h12M2 8h12M2 12h12"
        stroke={NEAR_BLACK}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
