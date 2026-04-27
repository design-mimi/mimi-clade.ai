"use client";

import { useEffect, useRef, type SVGProps } from "react";
import { ChatCard } from "./ChatCard";
import { CARDS_BY_TOPIC, type ChatTopic } from "./chatCards";

type Props = {
  onBack: () => void;
  topic?: ChatTopic;
  isNew?: boolean;
};

export function ChatScreen({ onBack, topic = "brand", isNew = false }: Props) {
  const cards = CARDS_BY_TOPIC[topic];
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-white">
      <div
        className="absolute inset-0 flex flex-col gap-[24px] overflow-y-auto pt-[16px] px-[16px] pb-[140px]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 300px at 50% 0%, rgba(214, 255, 192, 0.4) 0%, rgba(255, 246, 206, 0.2) 40%, transparent 100%)",
          backgroundAttachment: "local",
        }}
      >
        <DateBadge label="2026년 4월 27일" />

        {cards.map((card, i) => (
          <ChatCard key={i} data={card} />
        ))}

        <AgentTurn name="킨더살몬" time={isNew ? "방금 전" : "1시간 전"}>
          <AgentBubble body="안녕하세요. 고객센터 운영 시간은 평일 오전 09시~ 6시(점심시간 12시~1시, 공휴일 휴무)입니다." />
          <SuggestionChips
            items={["상품 문의", "주문 취소/변경 문의", "포인트 적립", "배송 문의", "기타 문의"]}
          />
        </AgentTurn>

        {!isNew && (
          <>
            <UserBubble body="옷 주문했는데요. 배송비가 궁금해서요." />

            <AgentTurn name="킨더살몬" time="55분 전">
              <AgentBubble
                body={
                  <>
                    고객님. 배송비 정책을 안내드립니다.
                    <ul className="list-disc ps-[21px] mt-[2px]">
                      <li>50,000원 미만 주문 배송비 : 3,000원</li>
                      <li>50,000원 이상 주문 배송비 : 무료배송</li>
                    </ul>
                  </>
                }
              />
              <SmallChips items={["배송 정책 자세히 보기", "예상 도착일"]} />
            </AgentTurn>
          </>
        )}
        <div ref={bottomRef} />
      </div>

      <TopBlurMask />
      <BackButton onClick={onBack} />
      <InputBar />
    </div>
  );
}

function TopBlurMask() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 right-0 z-10"
      style={{
        height: 40,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0) 100%)",
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)",
      }}
    />
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="뒤로"
      className="ht-pressable ht-blur-backdrop absolute top-[9px] left-[9px] z-20 flex items-center justify-center w-[44px] h-[44px] rounded-[32px] border"
      style={{
        background: "rgba(255, 255, 255, 0.92)",
        borderColor: "var(--ht-border-separator)",
        boxShadow: "var(--ht-shadow-lg)",
      }}
    >
      <ArrowLeftIcon width={20} height={20} style={{ color: "var(--ht-icon-default)" }} />
    </button>
  );
}

function DateBadge({ label }: { label: string }) {
  return (
    <div className="flex justify-center w-full">
      <span
        className="inline-flex items-center justify-center min-h-[24px] py-[4px] px-[8px] rounded-full border text-[12px] leading-4 font-medium tracking-[-0.25px]"
        style={{
          background: "rgba(39, 39, 42, 0.06)",
          borderColor: "rgba(39, 39, 42, 0.10)",
          color: "var(--ht-text-subtle)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function AgentTurn({
  name,
  time,
  children,
}: {
  name: string;
  time: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      {children}
      <span
        className="text-[14px] leading-5"
        style={{ color: "var(--ht-text-subtle)" }}
      >
        {name} • {time}
      </span>
    </div>
  );
}

function AgentBubble({ body }: { body: React.ReactNode }) {
  return (
    <div
      className="text-[14px] leading-5 w-full"
      style={{ color: "var(--ht-text-default)" }}
    >
      {body}
    </div>
  );
}

function UserBubble({ body }: { body: string }) {
  return (
    <div className="flex justify-end w-full">
      <div
        className="max-w-[300px] px-[14px] py-[6px] rounded-[10px] border text-[14px] leading-5 text-white"
        style={{
          background: "var(--ht-bg-inverted)",
          borderColor: "var(--ht-border-default)",
        }}
      >
        {body}
      </div>
    </div>
  );
}

function SuggestionChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-[4px] w-full content-start items-start">
      {items.map((label) => (
        <SecondaryPill key={label} label={label} />
      ))}
    </div>
  );
}

function SmallChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-[4px]">
      {items.map((label) => (
        <SecondaryPill key={label} label={label} />
      ))}
    </div>
  );
}

function SecondaryPill({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="ht-pressable rounded-full px-[12px] py-[6px] border bg-white text-[14px] leading-5 font-medium tracking-[-0.25px]"
      style={{
        borderColor: "rgba(39, 39, 42, 0.15)",
        color: "var(--ht-text-default)",
        boxShadow:
          "0 1px 2px 0 rgba(0, 0, 0, 0.08), inset 0 -1px 0 0 rgba(0, 0, 0, 0.08)",
      }}
    >
      {label}
    </button>
  );
}

function InputBar() {
  return (
    <div
      className="absolute left-[16px] right-[16px] bottom-[16px] flex flex-col gap-[8px] rounded-[16px] border px-[14px] pt-[12px] pb-[10px]"
      style={{
        background: "var(--ht-bg-input)",
        borderColor: "var(--ht-border-default)",
        boxShadow: "var(--ht-shadow-modal-sm)",
      }}
    >
      <span
        className="text-[14px] leading-5 truncate"
        style={{ color: "var(--ht-text-muted)" }}
      >
        메시지를 입력해주세요.
      </span>
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="더보기"
          className="ht-pressable w-[28px] h-[28px] rounded-full border flex items-center justify-center"
          style={{ borderColor: "var(--ht-border-default)", background: "transparent" }}
        >
          <PlusIcon width={28} height={28} style={{ color: "#6F6F77" }} />
        </button>
        <button
          type="button"
          aria-label="전송"
          className="ht-pressable w-[28px] h-[28px] rounded-full flex items-center justify-center"
          style={{ background: "rgba(39, 39, 42, 0.25)" }}
        >
          <SendArrowIcon width={28} height={28} style={{ color: "#fff" }} />
        </button>
      </div>
    </div>
  );
}

function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M12.5 4L7 10L12.5 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M13.3327 13.3334V8.66675H14.666V13.3334H19.3327V14.6667H14.666V19.3334H13.3327V14.6667H8.66602V13.3334H13.3327Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SendArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M8 14.6665H12V13.3332H8V7.23031C8 7.04621 8.149 6.89697 8.333 6.89697C8.389 6.89697 8.445 6.91117 8.494 6.93823L20.802 13.7078C20.964 13.7965 21.022 13.9992 20.934 14.1605C20.903 14.2159 20.858 14.2615 20.802 14.292L8.494 21.0615C8.333 21.1503 8.13 21.0914 8.041 20.9301C8.014 20.8809 8 20.8257 8 20.7695V14.6665Z"
        fill="currentColor"
      />
    </svg>
  );
}
