"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { SVGProps } from "react";
import {
  RESPONSE_STATUSES,
  type HomeBoxType,
  type HomeVariant,
  type ResponseStatus,
} from "./types";
import {
  AiSparkleIcon,
  HappytalkLogo,
  KakaoChannelIcon,
  NaverTalkIcon,
  PhoneCircleIcon,
  SendPlaneIcon,
} from "./Icons";

type Props = {
  variant: HomeVariant;
  boxType: HomeBoxType;
  showNotice: boolean;
  responseStatus: ResponseStatus;
  onOpenChat?: () => void;
  onOpenNotice?: () => void;
};

const HERO_IMAGE = "/hero.jpg";

const NOTICE_BODY =
  "풍요로운 한가위 보내세요. 🌕 연휴 기간 동안 배송 및 고객센터 운영이 일시 중단됩니다. 아래 일정 참고 부탁드립니다.";
const AI_GREETING =
  "안녕하세요, 킨더살몬이에요. 무엇을 도와드릴까요? AI에게 질문하고 빠른 답변을 받아 보세요.";
const INQUIRY_GREETING =
  "안녕하세요, 고객님의 옷장에서 오래도록 남고 싶은 브랜드 킨더살몬이에요. 무엇을 도와드릴까요? 아래 버튼 선택 후 문의 내용을 남겨주시면 빠르게 상담을 도와드리겠습니다.";

// Response-status dot color → mirrors Figma 27313:18962 (AI 라임), 27343:1126
// (빠름 그린, 보통 노랑, 지연 오렌지, 무응답 회색).
const STATUS_DOT_COLOR: Record<ResponseStatus, string> = {
  ai: "#C7F26C",
  fast: "#4FC660",
  normal: "#FACC15",
  slow: "#FB923C",
  offline: "#A1A1AA",
};

// AI 인풋 그라데이션 보더 (Figma 27313:18962 paint2_linear).
// padding-box bg 위에 border-box gradient 를 깔아 transparent 1px 보더가
// 그라데이션을 비추도록 처리.
const AI_INPUT_BG = "var(--ht-bg-subtle)";
const AI_INPUT_GRADIENT_BORDER = {
  background: `linear-gradient(${AI_INPUT_BG}, ${AI_INPUT_BG}) padding-box, linear-gradient(135deg, rgba(255, 241, 0, 0.6) 0%, rgba(97, 224, 151, 0.6) 50%, rgba(77, 178, 255, 0.6) 100%) border-box`,
  border: "1px solid transparent",
} as const;

export function HomeScreen({
  variant,
  boxType,
  showNotice,
  responseStatus,
  onOpenChat,
  onOpenNotice,
}: Props) {
  const isImage = variant === "img-01" || variant === "img-02";
  const isImg02 = variant === "img-02";

  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroOuterRef = useRef<HTMLDivElement>(null);
  const heroDimRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Image hero is 420 tall. img-01 reveals top 180px; img-02 reveals top 360px
  // (panel slides up over the rest).
  const HERO_TOTAL = 420;
  const HERO_VISIBLE = isImg02 ? 360 : 180;

  useEffect(() => {
    if (!isImage) return;
    const scroller = scrollerRef.current;
    const heroImage = heroImageRef.current;
    const heroOuter = heroOuterRef.current;
    const heroDim = heroDimRef.current;
    if (!scroller || !heroImage || !heroOuter || !heroDim) return;

    const SCALE_MIN = 0.8;
    const MAX_STRETCH = HERO_TOTAL;

    let touchStartY = 0;
    let touchPullPx = 0;
    let pulling = false;
    let raf = 0;

    const apply = () => {
      raf = 0;
      const st = scroller.scrollTop;
      if (st > 0) {
        const progress = Math.min(1, st / HERO_VISIBLE);
        const scale = 1 + (SCALE_MIN - 1) * progress;
        heroImage.style.transform = `scale(${scale})`;
        heroDim.style.transform = `scale(${scale})`;
        heroOuter.style.height = HERO_TOTAL + "px";
        return;
      }
      const overscroll = Math.max(-st, touchPullPx);
      const extra = Math.min(MAX_STRETCH, overscroll);
      heroImage.style.transform = "scale(1)";
      heroDim.style.transform = "scale(1)";
      heroOuter.style.height = HERO_TOTAL + extra + "px";
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
  }, [isImage, HERO_VISIBLE]);

  return (
    <div className="relative flex flex-col w-full h-full overflow-hidden">
      <VariantBackground variant={variant} />

      {/* happytalk 워드마크 — BottomNav (64px) 위 46px 위치에 고정. 가장 낮은
         레이어 (z-0) 라 panel 안 컨텐츠가 스크롤로 올라오면 가려진다. */}
      <div className="absolute left-0 right-0 bottom-[110px] flex justify-center pointer-events-none z-0">
        <HappytalkLogo width={343} height={12} />
      </div>

      {isImage && (
        <div
          ref={heroOuterRef}
          className="absolute top-0 left-0 right-0 z-0 overflow-hidden sm:rounded-t-[24px]"
          style={{ height: HERO_TOTAL }}
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
            className="absolute inset-0 pointer-events-none mix-blend-multiply"
            style={{
              opacity: 0.24,
              transformOrigin: "center bottom",
              willChange: "transform",
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0) 27.92%, rgba(0, 0, 0, 0.8) 100%)",
            }}
          />
        </div>
      )}

      <div
        ref={scrollerRef}
        className="relative flex-1 min-h-0 overflow-y-auto z-10"
      >
        {isImage && <div style={{ height: HERO_VISIBLE }} />}

        <div
          className={`flex flex-col gap-[14px] px-[16px] pt-[16px] pb-[100px] ${
            isImage ? "rounded-t-[24px] bg-[#F5F5F5]" : ""
          }`}
        >
          <BrandHeader />
          <ChatLandingCard
            boxType={boxType}
            responseStatus={responseStatus}
            onOpenChat={onOpenChat}
          />
          {showNotice && (
            <NoticeCard text={NOTICE_BODY} onClick={onOpenNotice} />
          )}
          <ChannelRow />
        </div>
      </div>
    </div>
  );
}

function VariantBackground({ variant }: { variant: HomeVariant }) {
  // Single base color for all non-gradient variants — the panel above sits on
  // #F5F5F5, so img-* / none share the same backdrop.
  if (variant === "gra-onecolor") {
    return (
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, #E2F5FF 0%, #F5F5F5 64%)",
        }}
      />
    );
  }
  if (variant === "gra-linear") {
    return (
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #FEFFCB 0%, #F3FFEE 16%, #F5F5F5 50%)",
        }}
      />
    );
  }
  if (variant === "gra-radial") {
    return (
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 200% 100% at 50% 0%, #FEFFCB 0%, #F3FFEE 24%, #F5F5F5 64%)",
        }}
      />
    );
  }
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ background: "#F5F5F5" }}
    />
  );
}

function BrandHeader() {
  return (
    <div className="flex flex-col gap-[6px] w-full">
      <h1
        className="text-[24px] leading-8 font-semibold tracking-[-0.25px] whitespace-nowrap overflow-hidden"
        style={{ color: "var(--ht-text-default)" }}
      >
        킨더살몬
      </h1>
      <OperatingHoursToggle />
    </div>
  );
}

function OperatingHoursToggle() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-[4px] w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="ht-pressable inline-flex items-center gap-[4px] px-[2px] py-[2px] -ml-[2px] rounded-[6px] text-[14px] leading-5 font-medium tracking-[-0.25px] self-start"
        style={{ color: "var(--ht-text-subtle)" }}
      >
        9-18시 운영 중
        <ChevronDownIcon
          width={16}
          height={16}
          style={{
            color: "var(--ht-icon-muted)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 200ms ease-out",
          }}
        />
      </button>
      {open && (
        <div
          className="px-[8px] flex flex-col gap-[2px] text-[14px] leading-5 font-medium tracking-[-0.25px]"
          style={{ color: "var(--ht-text-subtle)" }}
        >
          <span>평일 9-18시 운영</span>
          <span>토요일 10-17시 운영</span>
          <span>일요일 10-17시 운영</span>
        </div>
      )}
    </div>
  );
}

function ChatLandingCard({
  boxType,
  responseStatus,
  onOpenChat,
}: {
  boxType: HomeBoxType;
  responseStatus: ResponseStatus;
  onOpenChat?: () => void;
}) {
  const isAi = boxType === "ai-agent";
  return (
    <div
      className="flex flex-col gap-[8px] items-start rounded-[16px] px-[10px] py-[8px] w-full"
      style={{ background: "var(--ht-bg-card)" }}
    >
      <button
        type="button"
        onClick={onOpenChat}
        className="ht-card-press flex flex-col items-start justify-center w-full rounded-[16px] overflow-hidden text-left"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.2)",
          padding: isAi ? "8px" : "8px 10px",
          gap: isAi ? "8px" : "6px",
        }}
        aria-label={isAi ? "AI 에이전트 시작" : "문의 시작"}
      >
        <div className="flex items-center gap-[6px] w-full">
          {isAi && <AiSparkleIcon width={24} height={24} />}
          <span
            className="text-[12px] leading-4 font-medium tracking-[-0.25px] opacity-70"
            style={{
              color: isAi
                ? "var(--ht-text-default)"
                : "var(--ht-text-subtle)",
            }}
          >
            {isAi ? "AI 에이전트" : "킨더살몬"}
          </span>
        </div>
        <p
          className={`text-[15px] leading-5 tracking-[-0.25px] opacity-80 ${
            isAi ? "pl-[30px]" : ""
          }`}
          style={{ color: "var(--ht-text-default)" }}
        >
          {isAi ? AI_GREETING : INQUIRY_GREETING}
        </p>
      </button>

      {isAi ? (
        <button
          type="button"
          onClick={onOpenChat}
          className="ht-card-press flex h-[52px] items-center justify-between rounded-[16px] pl-[16px] pr-[8px] py-[10px] w-full overflow-hidden"
          style={AI_INPUT_GRADIENT_BORDER}
          aria-label="AI 에이전트 입력"
        >
          <span
            className="text-[14px] leading-4 tracking-[-0.6px] truncate"
            style={{ color: "var(--ht-text-hint)" }}
          >
            AI 에이전트에게 문의해 보세요.
          </span>
          <span
            className="flex items-center justify-center w-[36px] h-[36px] rounded-[12px] shrink-0 overflow-hidden"
            style={{
              background: "var(--ht-bg-inverted)",
              border: "1px solid var(--ht-border-default)",
            }}
          >
            <SendPlaneIcon
              width={20}
              height={20}
              style={{ color: "var(--ht-icon-white)" }}
            />
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onOpenChat}
          className="ht-cta-button w-full flex items-center justify-center rounded-[16px] px-[16px] py-[14px] text-[16px] font-semibold leading-6 tracking-[-0.25px] text-white"
          style={{
            background: "var(--ht-bg-inverted)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow:
              "0 1px 2px 0 rgba(0, 0, 0, 0.08), inset 0 -1px 0 0 rgba(0, 0, 0, 0.08)",
          }}
        >
          문의하기
        </button>
      )}

      <ResponseBadge status={responseStatus} />
    </div>
  );
}

function ResponseBadge({ status }: { status: ResponseStatus }) {
  const copy =
    RESPONSE_STATUSES.find((s) => s.id === status)?.copy ??
    "AI가 바로 답해드려요";
  return (
    <div className="flex items-center justify-center gap-[4px] rounded-[6px] p-[2px] w-full">
      <span
        className="block w-[8px] h-[8px] rounded-full shrink-0"
        style={{ background: STATUS_DOT_COLOR[status] }}
      />
      <span
        className="text-[12px] leading-4 font-medium tracking-[-0.25px]"
        style={{ color: "var(--ht-text-muted)" }}
      >
        {copy}
      </span>
    </div>
  );
}

function NoticeCard({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col gap-[4px] items-start rounded-[16px] px-[16px] py-[10px] w-full text-left cursor-pointer"
      style={{ background: "var(--ht-bg-card)" }}
      aria-label="알림 자세히 보기"
    >
      <div className="flex items-center gap-[2px]">
        <span
          className="text-[12px] leading-4 tracking-[-0.25px] opacity-70"
          style={{ color: "var(--ht-text-subtle)" }}
        >
          알림
        </span>
        <span
          className="block w-[4px] h-[4px] rounded-[4px]"
          style={{ background: "#FF3D3D" }}
          aria-label="새 알림"
        />
      </div>
      <p
        className="text-[14px] leading-5 tracking-[-0.25px] line-clamp-2 w-full"
        style={{ color: "var(--ht-text-default)" }}
      >
        {text}
      </p>
    </button>
  );
}

function ChannelRow() {
  return (
    <div
      className="flex items-center justify-between rounded-[16px] px-[16px] py-[8px] w-full"
      style={{ background: "var(--ht-bg-card)" }}
    >
      <span
        className="text-[14px] leading-5 tracking-[-0.25px]"
        style={{ color: "var(--ht-text-subtle)" }}
      >
        다른 문의하기
      </span>
      <div className="flex items-center gap-[8px]">
        <button
          type="button"
          aria-label="네이버 톡톡"
          className="ht-pressable w-[36px] h-[36px] rounded-[12px] overflow-hidden"
        >
          <NaverTalkIcon width={36} height={36} />
        </button>
        <button
          type="button"
          aria-label="카카오톡 채널"
          className="ht-pressable w-[36px] h-[36px] rounded-[12px] overflow-hidden"
        >
          <KakaoChannelIcon width={36} height={36} />
        </button>
        <button
          type="button"
          aria-label="전화 상담"
          className="ht-pressable w-[36px] h-[36px] rounded-[12px] overflow-hidden"
        >
          <PhoneCircleIcon width={36} height={36} />
        </button>
      </div>
    </div>
  );
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
