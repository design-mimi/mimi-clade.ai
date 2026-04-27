"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { SVGProps } from "react";
import type { HomeVariant } from "./types";
import {
  SearchIcon,
  NaverTalkIcon,
  KakaoChannelIcon,
  PhoneCircleIcon,
  HappytalkLogo,
} from "./Icons";

type Props = { variant: HomeVariant; onOpenChat?: () => void };

const HERO_IMAGE = "/hero.jpg";

export function HomeScreen({ variant, onOpenChat }: Props) {
  const isBrandImage = variant === "brand-image" || variant === "brand-image-tall";
  const isTallHero = variant === "brand-image-tall";
  const showDescription = variant !== "default-compact";
  const brandName = isTallHero ? "KINDERSALMON" : "킨더살몬";
  const brandAreaPt = 28;

  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroOuterRef = useRef<HTMLDivElement>(null);
  const heroDimRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isBrandImage) return;
    const scroller = scrollerRef.current;
    const heroImage = heroImageRef.current;
    const heroOuter = heroOuterRef.current;
    const heroDim = heroDimRef.current;
    if (!scroller || !heroImage || !heroOuter || !heroDim) return;

    const HERO_HEIGHT = isTallHero ? 430 : 260;
    const SCALE_MIN = 0.8;
    const MAX_STRETCH = HERO_HEIGHT; // pull-down can up to double the hero

    let touchStartY = 0;
    let touchPullPx = 0;
    let pulling = false;
    let raf = 0;

    const apply = () => {
      raf = 0;
      const st = scroller.scrollTop;
      // Down-scroll → shrink image (centered scale); dim follows with same scale anchored to bottom
      if (st > 0) {
        const progress = Math.min(1, st / HERO_HEIGHT);
        const scale = 1 + (SCALE_MIN - 1) * progress;
        heroImage.style.transform = `scale(${scale})`;
        heroDim.style.transform = `scale(${scale})`;
        heroOuter.style.height = HERO_HEIGHT + "px";
        return;
      }
      // Overscroll (negative scrollTop or active touch pull) → grow hero downward
      const overscroll = Math.max(-st, touchPullPx);
      const extra = Math.min(MAX_STRETCH, overscroll);
      heroImage.style.transform = "scale(1)";
      heroDim.style.transform = "scale(1)";
      heroOuter.style.height = HERO_HEIGHT + extra + "px";
    };

    const queue = () => {
      if (raf) return;
      raf = requestAnimationFrame(apply);
    };

    const onTouchStart = (e: TouchEvent) => {
      pulling = scroller.scrollTop <= 0;
      touchStartY = e.touches[0].clientY;
      touchPullPx = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!pulling) return;
      if (scroller.scrollTop > 0) {
        pulling = false;
        touchPullPx = 0;
        queue();
        return;
      }
      const dy = e.touches[0].clientY - touchStartY;
      touchPullPx = Math.max(0, dy);
      queue();
    };
    const onTouchEnd = () => {
      if (!pulling) return;
      pulling = false;
      const start = touchPullPx;
      if (start <= 0) {
        touchPullPx = 0;
        queue();
        return;
      }
      const startTime = performance.now();
      const duration = 280;
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (now: number) => {
        const t = Math.min(1, (now - startTime) / duration);
        touchPullPx = start * (1 - ease(t));
        apply();
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    scroller.addEventListener("scroll", queue, { passive: true });
    scroller.addEventListener("touchstart", onTouchStart, { passive: true });
    scroller.addEventListener("touchmove", onTouchMove, { passive: true });
    scroller.addEventListener("touchend", onTouchEnd, { passive: true });
    scroller.addEventListener("touchcancel", onTouchEnd, { passive: true });
    apply();
    return () => {
      scroller.removeEventListener("scroll", queue);
      scroller.removeEventListener("touchstart", onTouchStart);
      scroller.removeEventListener("touchmove", onTouchMove);
      scroller.removeEventListener("touchend", onTouchEnd);
      scroller.removeEventListener("touchcancel", onTouchEnd);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isBrandImage, isTallHero]);

  return (
    <div className="relative flex flex-col w-full h-full overflow-hidden">
      <VariantBackground variant={variant} />

      {/* Fixed hero image + dim — pinned to viewport, white panel slides over */}
      {isBrandImage && (
        <div
          ref={heroOuterRef}
          className="absolute top-0 left-0 right-0 z-0 overflow-hidden sm:rounded-t-[24px]"
          style={{ height: isTallHero ? 430 : 260 }}
        >
          <div
            ref={heroImageRef}
            className="absolute"
            style={{
              inset: "-12.5%",
              transformOrigin: "center center",
              willChange: "transform",
            }}
          >
            <Image
              src={HERO_IMAGE}
              alt="브랜드 이미지"
              fill
              className="object-cover object-[50%_20%]"
              sizes="500px"
            />
          </div>
          <div
            ref={heroDimRef}
            aria-hidden
            className="absolute left-0 right-0 bottom-0 pointer-events-none"
            style={{
              height: 184,
              transformOrigin: "center bottom",
              willChange: "transform",
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 27.92%, rgba(0, 0, 0, 0.2) 100%)",
            }}
          />
        </div>
      )}

      <div ref={scrollerRef} className="relative flex-1 min-h-0 overflow-y-auto z-10">
        {/* Spacer pushes white panel below the hero */}
        {isBrandImage && <div style={{ height: isTallHero ? 410 : 240 }} />}

        <div className={`pb-[100px] ${isBrandImage ? "rounded-t-[20px] bg-white" : ""}`}>
          {/* Brand area */}
          <div
            className="flex flex-col gap-[16px] px-[20px] pb-[20px]"
            style={{ paddingTop: brandAreaPt }}
          >
            <h1
              className="text-[24px] leading-8 font-semibold tracking-[-0.25px] whitespace-nowrap overflow-hidden"
              style={{ color: "var(--ht-text-default)" }}
            >
              {brandName}
            </h1>
            {showDescription && (
              <p
                className="text-[15px] leading-5 tracking-[-0.25px] opacity-80 w-full"
                style={{ color: "#121212" }}
              >
                차별화된 감각과 세심한 디테일, 편안함을 원칙으로 하는 여성복 브랜드
              </p>
            )}
            <div className="flex flex-col gap-[10px]">
              <PrimaryCTA onClick={onOpenChat} />
              <StatusRow />
            </div>
          </div>

          {/* QnA area */}
          <div className="flex flex-col gap-[20px] px-[20px] pb-[12px]">
            <ChannelRow />
            <SectionGroup title="공지">
              <NoticeCard text="2026 추석 명절 배송 일정 안내드립니다." />
            </SectionGroup>
            <SectionGroup title="자주 묻는 질문">
              <SearchInput />
              <FaqCard />
            </SectionGroup>
          </div>

          <div className="flex items-center justify-center pt-[20px] opacity-65">
            <HappytalkLogo width={62} height={12} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PrimaryCTA({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ht-cta-button w-full h-[48px] flex items-center justify-center rounded-[16px] text-[16px] font-semibold leading-6 tracking-[-0.25px] text-white"
      style={{
        background: "#18181B",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow:
          "0 1px 2px 0 rgba(0, 0, 0, 0.08), inset 0 -1px 0 0 rgba(0, 0, 0, 0.08)",
      }}
    >
      문의하기
    </button>
  );
}

function StatusRow() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-[4px]">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="ht-pressable flex items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] text-[14px] leading-5 font-medium tracking-[-0.25px]"
          style={{ color: "#4E4E55" }}
        >
          운영 시간
          <ChevronDownIcon
            width={16}
            height={16}
            style={{
              color: "#6F6F77",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 200ms ease-out",
            }}
          />
        </button>
        <span
          className="inline-flex items-center justify-center rounded-full border min-h-[24px] py-[4px] px-[8px] text-[12px] leading-4 font-medium tracking-[-0.25px]"
          style={{
            background: "rgba(102, 220, 126, 0.10)",
            borderColor: "rgba(39, 39, 42, 0.10)",
            color: "#4fc660",
          }}
        >
          상담 원활
        </span>
      </div>
      {open && (
        <span
          className="px-[8px] text-[14px] leading-5 font-medium tracking-[-0.25px]"
          style={{ color: "#4E4E55" }}
        >
          평일 10:00~17:00
        </span>
      )}
    </div>
  );
}

function ChannelRow() {
  return (
    <div
      className="w-full flex items-center justify-between rounded-[16px] px-[16px] py-[8px] border"
      style={{
        background: "rgba(245, 245, 245, 0.88)",
        borderColor: "rgba(39, 39, 42, 0.1)",
      }}
    >
      <span
        className="text-[14px] leading-5 tracking-[-0.25px]"
        style={{ color: "#4E4E55" }}
      >
        다른 문의하기
      </span>
      <div className="flex items-center gap-[6px]">
        <button
          type="button"
          aria-label="네이버톡톡"
          className="ht-pressable w-[36px] h-[36px] rounded-[12px]"
        >
          <NaverTalkIcon width={36} height={36} />
        </button>
        <button
          type="button"
          aria-label="카카오채널"
          className="ht-pressable w-[36px] h-[36px] rounded-[12px]"
        >
          <KakaoChannelIcon width={36} height={36} />
        </button>
        <button
          type="button"
          aria-label="전화"
          className="ht-pressable w-[36px] h-[36px] rounded-[12px]"
        >
          <PhoneCircleIcon width={36} height={36} />
        </button>
      </div>
    </div>
  );
}

function SearchInput() {
  return (
    <button
      type="button"
      className="flex items-center px-[8px] min-h-[36px] rounded-[8px] gap-[2px] w-full text-left"
    >
      <span className="flex items-center justify-center w-[20px] h-[20px]">
        <SearchIcon
          width={16}
          height={16}
          style={{ color: "#6F6F77" }}
        />
      </span>
      <span
        className="px-[4px] text-[14px] leading-5 tracking-[-0.25px]"
        style={{ color: "rgba(39, 39, 42, 0.3)" }}
      >
        Search
      </span>
    </button>
  );
}

function FaqCard() {
  return (
    <div
      className="flex flex-col gap-[10px] rounded-[16px] px-[12px] py-[10px]"
      style={{ background: "#F4F4F5" }}
    >
      <FaqItem category="배송" question="당일배송은 무엇인가요?" />
      <FaqItem
        category="상품"
        question="상품 품절인 경우 재입고는 언제 알 수 있나요?"
      />
    </div>
  );
}

function SectionGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[4px] w-full">
      <span
        className="pl-[12px] text-[12px] leading-4 tracking-[-0.25px] opacity-70"
        style={{ color: "#404040" }}
      >
        {title}
      </span>
      {children}
    </div>
  );
}

function NoticeCard({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-[10px] rounded-[16px] px-[12px] py-[10px] w-full">
      <p
        className="h-[20px] text-[14px] leading-5 tracking-[-0.25px] truncate w-full"
        style={{ color: "var(--ht-text-default)" }}
      >
        {text}
      </p>
    </div>
  );
}

function FaqItem({ category, question }: { category: string; question: string }) {
  return (
    <div className="flex flex-col gap-[4px] justify-center">
      <span
        className="text-[12px] leading-4 font-medium tracking-[-0.25px]"
        style={{ color: "#4E4E55" }}
      >
        {category}
      </span>
      <p
        className="text-[14px] leading-5 tracking-[-0.25px]"
        style={{ color: "#111115" }}
      >
        {question}
      </p>
    </div>
  );
}

function VariantBackground({ variant }: { variant: HomeVariant }) {
  if (variant === "gradient-line") {
    return (
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #FEFFCB 0%, #F3FFEE 20%, #FAFAFA 38%)",
        }}
      />
    );
  }

  if (variant === "gradient-oval") {
    return (
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 200% 100% at 50% 0%, #FEFFCB 0%, #F3FFEE 20%, #FAFAFA 38%)",
        }}
      />
    );
  }

  return null;
}

function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
