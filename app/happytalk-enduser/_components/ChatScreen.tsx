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
import { CARDS_BY_TOPIC, INTRO_BODY, type ChatTopic } from "./chatCards";
import { PaperPlaneIcon, ReturnArrowIcon } from "./Icons";

type Props = {
  onBack: () => void;
  topic?: ChatTopic;
  isNew?: boolean;
  // Hydrate the chat from a saved transcript when resuming an existing room.
  // null/undefined → seed with intro greeting + INTRO_CHIPS (fresh room).
  initialTranscript?: TranscriptItem[] | null;
  // Fires whenever the user takes an action (chip / card CTA / send).
  // Argument is a flat-text preview of the latest message after the action
  // resolves — used as the body of the message list row when chat closes.
  onUserActivity?: (latestPreview: string) => void;
  // Fires on every transcript change so the parent can persist the running
  // session and reload it on re-entry.
  onTranscriptUpdate?: (transcript: TranscriptItem[]) => void;
};

// Flat-text fallback for non-string agent bodies (e.g. shipping body uses JSX
// with bullet list).
const SHIPPING_PREVIEW =
  "배송비 정책을 안내해 드릴게요. 50,000원 미만 주문은 배송비 3,000원, 50,000원 이상이면 무료배송이에요.";

function previewOfBody(body: ReactNode): string {
  return typeof body === "string" ? body : SHIPPING_PREVIEW;
}

export type AgentItem = {
  id: string;
  kind: "agent";
  body: ReactNode;
  chips?: string[];
  meta: { name: string; time: string };
};

export type UserItem = {
  id: string;
  kind: "user";
  text: string;
};

export type TranscriptItem = AgentItem | UserItem;

// Intro chips follow UX_writing.md §11.1 — user-language phrasing
// (사용자가 실제로 말하는 표현) instead of internal category nouns.
const INTRO_CHIPS = [
  "상품이 궁금해요",
  "주문을 취소하고 싶어요",
  "포인트가 궁금해요",
  "배송이 궁금해요",
  "다른 문의가 있어요",
];

const SHIPPING_CHIPS = ["배송 정책 자세히 보기", "도착 예정일 확인"];

const FADE_MS = 200;

const SHIPPING_BODY: ReactNode = (
  <>
    배송비 정책을 안내해 드릴게요.
    <ul className="list-disc ps-[21px] mt-[2px]">
      <li>50,000원 미만 주문 배송비: 3,000원</li>
      <li>50,000원 이상 주문 배송비: 무료배송</li>
    </ul>
  </>
);

// Bot reply lookup keyed by user-visible label (chip / card CTA / coupon).
// Unrecognized labels fall through to a generic ack response.
const RESPONSES: Record<string, { body: ReactNode; chips?: string[] }> = {
  // ── INTRO chips (5) ──
  "상품이 궁금해요": {
    body: "어떤 점이 궁금하신가요? 자주 찾는 항목을 모아 두었어요.",
    chips: ["사이즈 가이드", "이번 주 신상", "재입고 알림"],
  },
  "주문을 취소하고 싶어요": {
    body: "주문 후 1시간 이내에는 마이페이지에서 바로 취소할 수 있어요. 그 이후에는 상담사가 도와드려요.",
    chips: ["주문 내역 보기", "상담사에게 연결하기"],
  },
  "포인트가 궁금해요": {
    body: "구매 금액의 1%가 자동 적립돼요. 멤버 등급에 따라 추가 적립이 가능하고, 이벤트 응모 시 보너스 포인트도 받을 수 있어요.",
    chips: ["내 포인트 확인", "등급 혜택 보기"],
  },
  "배송이 궁금해요": {
    body: SHIPPING_BODY,
    chips: SHIPPING_CHIPS,
  },
  "다른 문의가 있어요": {
    body: "어떤 도움이 필요한지 편하게 남겨 주세요. 운영 시간 내 상담사가 빠르게 답변드릴게요.",
    chips: ["상담사에게 연결하기", "공지사항 보기"],
  },

  // ── Sub-chips ──
  "사이즈 가이드": {
    body: "킨더살몬은 자체 핏 차트로 운영돼요. 상의 S~XL, 하의 24~30 사이즈가 있어요. 자세한 측정 가이드를 보내 드릴까요?",
  },
  "이번 주 신상": {
    body: "이번 주 신상은 살몬 컬러 프린지 블라우스와 린넨 와이드 팬츠예요. 카탈로그 링크를 보내 드릴게요.",
  },
  "재입고 알림": {
    body: "관심 상품을 마이페이지에서 등록해 두면 재입고 즉시 알려 드려요. 알림 페이지로 이동할까요?",
  },
  "주문 내역 보기": {
    body: "마이페이지 > 주문 내역에서 확인할 수 있어요. 최근 1년 내 주문이 표시돼요.",
  },
  "상담사에게 연결하기": {
    body: "상담사 연결 요청이 접수됐어요. 평일 운영 시간 내 빠르게 답변드릴게요 🌸",
  },
  "내 포인트 확인": {
    body: "마이페이지 > 멤버십에서 적립 내역과 사용 가능한 포인트를 확인할 수 있어요.",
  },
  "등급 혜택 보기": {
    body: "킨더 멤버십은 살몬 / 로즈 / 블룸 3단계로 운영돼요. 등급에 따라 적립률과 무료배송 기준이 달라져요.",
  },
  "배송 정책 자세히 보기": {
    body: "평일 오전 11시 이전 결제 건은 당일 출고돼요. 자세한 정책 페이지를 안내해 드릴까요?",
  },
  "도착 예정일 확인": {
    body: "지역에 따라 결제 후 1~3일 이내에 도착해요. 도서산간 지역은 하루 더 걸릴 수 있어요.",
  },
  "공지사항 보기": {
    body: "킨더살몬 공식 공지 페이지를 안내해 드릴게요. 시즌 이벤트와 입고 일정을 확인할 수 있어요.",
  },

  // ── Card CTA labels ──
  "26 S/S 신상 보러가기": {
    body: "이번 시즌은 살몬 톤을 메인으로 한 린넨·면 혼방 라인이 중심이에요. 카탈로그 링크를 보내 드릴까요?",
    chips: ["카탈로그 받기", "베스트 보기"],
  },
  "킨더 뉴스레터 구독": {
    body: "뉴스레터 구독이 완료됐어요. 매주 화요일에 살몬 픽이 도착할 거예요 🌸",
  },
  "15% 할인쿠폰 받기": {
    body: "15% 쿠폰이 적립됐어요. 마이페이지 > 쿠폰함에서 확인할 수 있어요.",
  },
  "사이즈 가이드 보기": {
    body: "킨더살몬 핏 가이드 페이지를 안내해 드릴게요. 모델 착용 사이즈와 측정 팁이 정리돼 있어요.",
  },
  "배송 정책 보기": {
    body: "배송 정책을 안내해 드릴게요. 50,000원 이상이면 무료배송, 미만이면 3,000원이에요.",
  },
  "도착 예정 안내": {
    body: "결제 후 1~3일 이내에 도착해요. 송장은 출고 즉시 문자로 안내해 드릴게요.",
  },
  "주문 내역 확인": {
    body: "마이페이지 > 주문 내역에서 확인할 수 있어요. 최근 1년 내 주문이 표시돼요.",
  },
  "교환/반품 안내": {
    body: "수령 후 7일 이내 교환·반품할 수 있어요. 단순 변심일 때는 왕복 배송비가 발생할 수 있어요.",
  },
  "카탈로그 받기": {
    body: "이메일로 카탈로그 PDF를 보내 드릴게요. 주문하신 이메일로 5분 안에 도착할 거예요.",
  },
  "베스트 보기": {
    body: "이번 주 베스트는 살몬 프린지 블라우스, 린넨 와이드 팬츠, 부클레 카디건이에요.",
  },
};

function getResponse(label: string): { body: ReactNode; chips?: string[] } {
  return (
    RESPONSES[label] ?? {
      body: "요청을 확인하고 있어요. 잠시만 기다려 주세요.",
    }
  );
}

export function ChatScreen({
  onBack,
  topic = "brand",
  isNew = false,
  initialTranscript,
  onUserActivity,
  onTranscriptUpdate,
}: Props) {
  const cards = CARDS_BY_TOPIC[topic];
  const scrollerRef = useRef<HTMLDivElement>(null);

  const initial = useMemo<TranscriptItem[]>(() => {
    if (initialTranscript && initialTranscript.length > 0) return initialTranscript;
    return [
      {
        id: "intro",
        kind: "agent",
        body: INTRO_BODY,
        chips: INTRO_CHIPS,
        meta: { name: "킨더살몬", time: isNew ? "방금 전" : "1시간 전" },
      },
    ];
  }, [initialTranscript, isNew]);

  const [transcript, setTranscript] = useState<TranscriptItem[]>(initial);
  const [fadingChips, setFadingChips] = useState<Set<string>>(new Set());
  const hasAnchoredRef = useRef(false);

  // Notify parent of every transcript change so it can persist across opens.
  // Use a ref to capture the latest callback without retriggering on rerender.
  const transcriptUpdateRef = useRef(onTranscriptUpdate);
  useEffect(() => {
    transcriptUpdateRef.current = onTranscriptUpdate;
  });
  useEffect(() => {
    transcriptUpdateRef.current?.(transcript);
  }, [transcript]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    if (!hasAnchoredRef.current) {
      // First mount: jump to the latest instantly. Re-anchor on the next
      // animation frame and again after 240ms to catch layout shifts from
      // images (ChatCard) loading after the initial paint.
      const jump = () => {
        el.scrollTop = el.scrollHeight;
      };
      jump();
      requestAnimationFrame(jump);
      const t = window.setTimeout(jump, 240);
      hasAnchoredRef.current = true;
      return () => clearTimeout(t);
    }

    // Subsequent updates (chip click, send): smooth follow.
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [transcript]);

  const handleChipClick = (turnId: string, label: string) => {
    if (fadingChips.has(turnId)) return;
    const response = getResponse(label);
    onUserActivity?.(previewOfBody(response.body));
    setFadingChips((prev) => new Set(prev).add(turnId));

    window.setTimeout(() => {
      setTranscript((prev) => {
        const stamp = Date.now();
        const response = getResponse(label);
        const next: TranscriptItem[] = prev.map((item) =>
          item.id === turnId && item.kind === "agent"
            ? { ...item, chips: undefined }
            : item,
        );
        next.push({ id: `user-${stamp}`, kind: "user", text: label });
        next.push({
          id: `agent-${stamp}`,
          kind: "agent",
          body: response.body,
          chips: response.chips,
          meta: { name: "킨더살몬", time: "방금 전" },
        });
        return next;
      });
      setFadingChips((prev) => {
        const next = new Set(prev);
        next.delete(turnId);
        return next;
      });
    }, FADE_MS);
  };

  // Card CTA / coupon click — append user message + agent response without
  // fading anything (cards stay visible; no chip group to dismiss).
  const handleCardAction = (label: string) => {
    const response = getResponse(label);
    onUserActivity?.(previewOfBody(response.body));
    setTranscript((prev) => {
      const stamp = Date.now();
      const response = getResponse(label);
      return [
        ...prev,
        { id: `user-${stamp}`, kind: "user", text: label },
        {
          id: `agent-${stamp}`,
          kind: "agent",
          body: response.body,
          chips: response.chips,
          meta: { name: "킨더살몬", time: "방금 전" },
        },
      ];
    });
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-white">
      <div
        ref={scrollerRef}
        className="absolute inset-0 flex flex-col gap-[24px] overflow-y-auto pt-[28px] px-[20px] pb-[140px]"
      >
        <DateBadge label="2026년 4월 27일" />

        {cards.map((card, i) => (
          <div key={`card-${i}`} className="ht-agent-row">
            <ChatCard data={card} onAction={handleCardAction} />
          </div>
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
      </div>

      <TopBlurMask />
      <BackButton onClick={onBack} />
      <InputBar
        onSend={(text) => {
          // Free-form send has no bot reply, so the latest message is the
          // user text itself.
          onUserActivity?.(text);
          setTranscript((prev) => [
            ...prev,
            { id: `user-${Date.now()}`, kind: "user", text },
          ]);
        }}
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
      aria-label="뒤로 가기"
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
    <div className="ht-reveal ht-agent-row flex flex-col gap-[10px] w-full">
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
        className="max-w-[300px] px-[14px] py-[6px] rounded-[12px] border text-[14px] leading-[1.6] text-white"
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
    // Skip while an IME is mid-composition (Korean syllables, etc.). Otherwise
    // the Enter that confirms the composition also sends, and the in-flight
    // syllable gets re-committed into the now-empty textarea after send.
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="absolute left-[20px] right-[20px] bottom-[16px] flex flex-col gap-[8px] rounded-[16px] border px-[12px] pt-[10px] pb-[12px]"
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
        placeholder="문의 내용을 입력해 주세요"
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
          aria-label="메시지 전송하기"
          className="ht-pressable w-[32px] h-[32px] rounded-full flex items-center justify-center"
          style={{
            background: canSend ? "var(--ht-bg-inverted)" : "rgba(39, 39, 42, 0.25)",
            boxShadow: canSend
              ? "0 1px 2px 0 rgba(0, 0, 0, 0.08), inset 0 -1px 0 0 rgba(0, 0, 0, 0.08)"
              : "0 1px 2px 0 rgba(0, 0, 0, 0.05), inset 0 -1px 0 0 rgba(0, 0, 0, 0.08)",
            transition: "background-color 150ms ease-out",
          }}
        >
          {canSend ? (
            <ReturnArrowIcon
              width={32}
              height={32}
              style={{ color: "#fff" }}
            />
          ) : (
            <PaperPlaneIcon
              width={32}
              height={32}
              style={{ color: "#fff" }}
            />
          )}
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

