"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type SVGProps,
} from "react";
import { ChatCard } from "./ChatCard";
import { CARDS_BY_TOPIC, type ChatTopic } from "./chatCards";

type Props = {
  onBack: () => void;
  topic?: ChatTopic;
  isNew?: boolean;
};

type AgentItem = {
  id: string;
  kind: "agent";
  body: ReactNode;
  chips?: string[];
  meta: { name: string; time: string };
};

type UserItem = {
  id: string;
  kind: "user";
  text: string;
};

type TranscriptItem = AgentItem | UserItem;

const INTRO_CHIPS = [
  "상품 문의",
  "주문 취소/변경 문의",
  "포인트 적립",
  "배송 문의",
  "기타 문의",
];

const SHIPPING_CHIPS = ["배송 정책 자세히 보기", "예상 도착일"];

const FADE_MS = 200;

const SHIPPING_BODY: ReactNode = (
  <>
    고객님. 배송비 정책을 안내드립니다.
    <ul className="list-disc ps-[21px] mt-[2px]">
      <li>50,000원 미만 주문 배송비 : 3,000원</li>
      <li>50,000원 이상 주문 배송비 : 무료배송</li>
    </ul>
  </>
);

export function ChatScreen({ onBack, topic = "brand", isNew = false }: Props) {
  const cards = CARDS_BY_TOPIC[topic];
  const bottomRef = useRef<HTMLDivElement>(null);

  const initial = useMemo<TranscriptItem[]>(() => {
    const intro: AgentItem = {
      id: "intro",
      kind: "agent",
      body: "안녕하세요. 고객센터 운영 시간은 평일 오전 09시~ 6시(점심시간 12시~1시, 공휴일 휴무)입니다.",
      chips: INTRO_CHIPS,
      meta: { name: "킨더살몬", time: isNew ? "방금 전" : "1시간 전" },
    };
    if (isNew) return [intro];
    return [
      { ...intro, chips: undefined },
      { id: "user-prefill", kind: "user", text: "배송 문의" },
      {
        id: "shipping",
        kind: "agent",
        body: SHIPPING_BODY,
        chips: SHIPPING_CHIPS,
        meta: { name: "킨더살몬", time: "55분 전" },
      },
    ];
  }, [isNew]);

  const [transcript, setTranscript] = useState<TranscriptItem[]>(initial);
  const [fadingChips, setFadingChips] = useState<Set<string>>(new Set());

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [transcript]);

  const handleChipClick = (turnId: string, label: string) => {
    if (fadingChips.has(turnId)) return;
    setFadingChips((prev) => new Set(prev).add(turnId));

    window.setTimeout(() => {
      setTranscript((prev) => {
        const next: TranscriptItem[] = prev.map((item) =>
          item.id === turnId && item.kind === "agent"
            ? { ...item, chips: undefined }
            : item,
        );
        const stamp = Date.now();
        next.push({ id: `user-${stamp}`, kind: "user", text: label });
        if (label === "배송 문의") {
          next.push({
            id: `shipping-${stamp}`,
            kind: "agent",
            body: SHIPPING_BODY,
            chips: SHIPPING_CHIPS,
            meta: { name: "킨더살몬", time: "방금 전" },
          });
        }
        return next;
      });
      setFadingChips((prev) => {
        const next = new Set(prev);
        next.delete(turnId);
        return next;
      });
    }, FADE_MS);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-white">
      <div className="absolute inset-0 flex flex-col gap-[24px] overflow-y-auto pt-[28px] px-[16px] pb-[140px]">
        <DateBadge label="2026년 4월 27일" />

        {cards.map((card, i) => (
          <ChatCard key={`card-${i}`} data={card} />
        ))}

        {transcript.map((item) =>
          item.kind === "agent" ? (
            <AgentTurn
              key={item.id}
              name={item.meta.name}
              time={item.meta.time}
            >
              <AgentBubble body={item.body} />
              {item.chips && (
                <div
                  className="origin-top w-full"
                  style={{
                    transition: `opacity ${FADE_MS}ms ease-out, transform ${FADE_MS}ms ease-out`,
                    opacity: fadingChips.has(item.id) ? 0 : 1,
                    transform: fadingChips.has(item.id)
                      ? "translateY(-4px) scale(0.98)"
                      : "translateY(0) scale(1)",
                    pointerEvents: fadingChips.has(item.id) ? "none" : "auto",
                  }}
                >
                  <ChipGroup
                    items={item.chips}
                    onSelect={(label) => handleChipClick(item.id, label)}
                  />
                </div>
              )}
            </AgentTurn>
          ) : (
            <UserBubble key={item.id} body={item.text} />
          ),
        )}
        <div ref={bottomRef} />
      </div>

      <TopBlurMask />
      <BackButton onClick={onBack} />
      <InputBar
        onSend={(text) =>
          setTranscript((prev) => [
            ...prev,
            { id: `user-${Date.now()}`, kind: "user", text },
          ])
        }
      />
    </div>
  );
}

function TopBlurMask() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 right-0 z-10 sm:rounded-t-[24px] overflow-hidden"
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
  children: ReactNode;
}) {
  return (
    <div className="ht-reveal flex flex-col gap-[10px] w-full">
      {children}
      <span
        className="text-[12px] leading-4 font-medium tracking-[-0.25px]"
        style={{ color: "var(--ht-text-subtle)" }}
      >
        {name} • {time}
      </span>
    </div>
  );
}

function AgentBubble({ body }: { body: ReactNode }) {
  return (
    <div
      className="text-[14px] leading-[1.6] w-full"
      style={{ color: "var(--ht-text-default)" }}
    >
      {body}
    </div>
  );
}

function UserBubble({ body }: { body: string }) {
  return (
    <div className="ht-reveal ht-user-row flex justify-end w-full">
      <div
        className="max-w-[300px] px-[14px] py-[6px] rounded-[10px] border text-[14px] leading-[1.6] text-white"
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

function ChipGroup({
  items,
  onSelect,
}: {
  items: string[];
  onSelect: (label: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-[4px] w-full content-start items-start">
      {items.map((label) => (
        <SecondaryPill
          key={label}
          label={label}
          onClick={() => onSelect(label)}
        />
      ))}
    </div>
  );
}

function SecondaryPill({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
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

function InputBar({ onSend }: { onSend: (text: string) => void }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const trimmed = value.trim();
  const canSend = trimmed.length > 0;

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 100)}px`;
  }, [value]);

  const handleSend = () => {
    if (!canSend) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="absolute left-[16px] right-[16px] bottom-[16px] flex flex-col gap-[8px] rounded-[16px] border px-[12px] pt-[10px] pb-[12px]"
      style={{
        background: "var(--ht-bg-input)",
        borderColor: "var(--ht-border-default)",
        boxShadow: "var(--ht-shadow-modal-sm)",
      }}
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력해주세요."
        className="resize-none outline-none w-full text-[14px] leading-5 tracking-[-0.25px] bg-transparent placeholder:text-[var(--ht-text-muted)]"
        style={{
          color: "var(--ht-text-default)",
          minHeight: 20,
          maxHeight: 100,
        }}
      />
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="더보기"
          className="ht-pressable w-[32px] h-[32px] rounded-full border flex items-center justify-center"
          style={{ borderColor: "var(--ht-border-default)", background: "transparent" }}
        >
          <PlusIcon width={28} height={28} style={{ color: "#6F6F77" }} />
        </button>
        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          aria-label="전송"
          className="ht-pressable w-[32px] h-[32px] rounded-full flex items-center justify-center"
          style={{
            background: canSend ? "#437dfc" : "rgba(39, 39, 42, 0.25)",
            transition: "background-color 150ms ease-out",
          }}
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
