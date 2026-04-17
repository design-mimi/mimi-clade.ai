"use client";

import Image from "next/image";
import type { HomeVariant } from "./types";
import {
  SearchIcon,
  MessengerIcon,
  NaverTalkIcon,
  KakaoChannelIcon,
  PhoneCircleIcon,
  HappytalkLogo,
} from "./Icons";

type Props = { variant: HomeVariant; onOpenChat?: () => void };

const HERO_IMAGE = "/kindersalmon.png";

export function HomeScreen({ variant, onOpenChat }: Props) {
  const isBrandImage = variant === "brand-image" || variant === "brand-image-tall";
  const isTallHero = variant === "brand-image-tall";
  const showDescription = variant !== "default-compact";
  const brandName = isTallHero ? "KINDERSALMON" : "킨더살몬";

  return (
    <div className="relative flex flex-col w-full h-full overflow-hidden">
      <VariantBackground variant={variant} />
      <StatusBadges />

      {/* Fixed hero image behind scroll */}
      {isBrandImage && (
        <div
          className="absolute top-0 left-0 right-0 z-0 overflow-hidden"
          style={{ height: isTallHero ? 430 : 260 }}
        >
          <Image
            src={HERO_IMAGE}
            alt="브랜드 이미지"
            fill
            className="object-cover object-[50%_20%]"
            sizes="375px"
          />
        </div>
      )}

      <div className="relative flex-1 min-h-0 overflow-y-auto z-10">
        {/* Spacer to push content below the fixed image */}
        {isBrandImage && (
          <div style={{ height: isTallHero ? 410 : 240 }} />
        )}

        <div className={`relative flex flex-col ${isBrandImage ? "bg-white rounded-t-[20px] pb-[100px]" : "pb-[100px]"}`}>
          <div className="flex flex-col gap-[16px] px-[20px] pb-[16px] pt-[20px]">
            <h1
              className="text-[24px] font-semibold leading-8"
              style={{ color: "var(--ht-text-default)" }}
            >
              {brandName}
            </h1>
            {showDescription && (
              <p
                className="text-[14px] leading-5 w-[320px] h-[40px] opacity-80"
                style={{ color: "#121212" }}
              >
                차별화된 감각과 세심한 디테일, 편안함을 원칙으로 하는 여성복 브랜드
              </p>
            )}

            <div className="flex flex-col gap-[8px] w-full">
              <PrimaryCTA onClick={onOpenChat} />
              <ChannelRow />
            </div>
          </div>

          <div className="px-[12px]">
            <QnaCard />
          </div>

          <div className="flex items-center justify-center pt-[14px] opacity-65">
            <HappytalkLogo width={62} height={12} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadges() {
  return (
    <div className="absolute top-[12px] right-[16px] flex gap-[4px] z-20">
      <span
        className="inline-flex items-center rounded-full border px-[4px] py-[2px]"
        style={{
          background: "var(--ht-bg-badge-green)",
          borderColor: "var(--ht-border-default)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        <span
          className="px-[4px] text-[12px] leading-4 font-medium"
          style={{ color: "var(--ht-green-accent)" }}
        >
          상담 원활
        </span>
      </span>
      <span
        className="inline-flex items-center rounded-full border px-[4px] py-[2px]"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          borderColor: "var(--ht-border-default)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        <span
          className="px-[4px] text-[12px] leading-4 font-medium"
          style={{ color: "var(--ht-text-muted)" }}
        >
          9-18시 운영
        </span>
      </span>
    </div>
  );
}

function PrimaryCTA({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ht-pressable relative w-full flex items-center justify-center gap-[2px] py-[12px] pl-[20px] pr-[16px] rounded-[16px] text-white"
      style={{
        background: "var(--ht-bg-inverted)",
        border: "1px solid var(--ht-border-inverted)",
        boxShadow:
          "0 1px 2px 0 rgba(0, 0, 0, 0.05), inset 0 -1px 0 0 rgba(0, 0, 0, 0.08)",
      }}
    >
      <span className="text-[16px] font-semibold leading-6">문의하기</span>
      <MessengerIcon width={20} height={20} style={{ color: "#fff" }} />
    </button>
  );
}

function ChannelRow() {
  return (
    <div
      className="w-full flex items-center justify-between rounded-[16px] px-[16px] py-[8px] border"
      style={{
        background: "rgba(245, 245, 245, 0.88)",
        borderColor: "var(--ht-border-default)",
      }}
    >
      <span
        className="text-[14px] leading-5"
        style={{ color: "var(--ht-text-subtle)" }}
      >
        다른 문의하기
      </span>
      <div className="flex items-center gap-[6px]">
        <button type="button" aria-label="네이버톡톡" className="ht-pressable w-[32px] h-[32px] rounded-[8px]">
          <NaverTalkIcon width={32} height={32} />
        </button>
        <button type="button" aria-label="카카오채널" className="ht-pressable w-[32px] h-[32px] rounded-[8px]">
          <KakaoChannelIcon width={32} height={32} />
        </button>
        <button type="button" aria-label="전화" className="ht-pressable w-[32px] h-[32px] rounded-[8px]">
          <PhoneCircleIcon width={32} height={32} />
        </button>
      </div>
    </div>
  );
}

function QnaCard() {
  return (
    <div
      className="w-full flex flex-col gap-[8px] p-[12px] rounded-[20px]"
    >
      <span
        className="text-[12px] leading-4 opacity-70"
        style={{ color: "#404040" }}
      >
        자주 묻는 질문
      </span>
      <button
        type="button"
        className="min-h-[36px] rounded-[8px] flex items-center gap-[2px] px-[8px] w-full text-left"
      >
        <span className="flex items-center justify-center w-[20px] h-[20px]">
          <SearchIcon width={16} height={16} style={{ color: "var(--ht-text-hint)" }} />
        </span>
        <span
          className="px-[4px] text-[14px] leading-5"
          style={{ color: "var(--ht-text-hint)" }}
        >
          Search
        </span>
      </button>
      <div
        className="flex flex-col gap-[10px] rounded-[16px] px-[12px] py-[10px]"
        style={{ background: "var(--ht-bg-muted)" }}
      >
        <FaqItem category="배송" question="당일배송은 무엇인가요?" />
        <FaqItem category="상품" question="상품 품절인 경우 재입고는 언제 알 수 있나요?" />
      </div>
    </div>
  );
}

function FaqItem({ category, question }: { category: string; question: string }) {
  return (
    <div className="flex flex-col gap-[4px] h-[40px] justify-center">
      <span
        className="text-[12px] leading-4 font-medium"
        style={{ color: "var(--ht-text-subtle)" }}
      >
        {category}
      </span>
      <p
        className="text-[14px] leading-5 h-[20px] overflow-hidden text-ellipsis whitespace-nowrap"
        style={{ color: "var(--ht-text-default)" }}
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
            "radial-gradient(ellipse 200% 50% at 50% 0%, #FEFFCB 0%, #F3FFEE 20%, #FAFAFA 38%)",
        }}
      />
    );
  }

  return null;
}
