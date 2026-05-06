"use client";

import Image from "next/image";
import type { SVGProps } from "react";
import type { ConversationSummary } from "./types";

type Props = {
  // Conversation history rows. Empty list → empty state (Figma 27158:30643).
  // Populated rows follow Figma 26991:17957 layout.
  conversations: ConversationSummary[];
  // Empty-state "문의하기" — fresh brand inquiry, mirrors HomeScreen CTA.
  onStartNewChat?: () => void;
  // Row click — resume an existing conversation. Argument is the row id so
  // the parent can target updates back to the same row instead of creating a
  // duplicate when the user adds new activity.
  onOpenHistory?: (conversationId: string) => void;
  // Header "전체 삭제" — opens confirm modal owned by EnduserFrame.
  onRequestDeleteAll?: () => void;
};

export function MessageScreen({
  conversations,
  onStartNewChat,
  onOpenHistory,
  onRequestDeleteAll,
}: Props) {
  const isEmpty = conversations.length === 0;
  return (
    <div className="relative flex flex-col w-full h-full bg-white">
      <Header showDelete={!isEmpty} onDelete={onRequestDeleteAll} />
      {isEmpty ? (
        <EmptyContent />
      ) : (
        <div className="flex-1 flex flex-col px-[20px] pt-[16px] pb-[160px] gap-[20px] overflow-y-auto">
          {conversations.map((c, i) => (
            <div
              key={c.id}
              className="ht-reveal w-full"
              style={{ animationDelay: `${Math.min(i, 4) * 60}ms` }}
            >
              <MessageRow
                status={c.status}
                createdAt={c.createdAt}
                body={c.body}
                onClick={() => onOpenHistory?.(c.id)}
              />
            </div>
          ))}
        </div>
      )}
      {/* InquireButton floats above list/nav. Wrapper is full-width centered
          and pointer-events-none so wheel/touch scroll passes through to the
          list below; the button itself opts back into pointer events. */}
      <div className="absolute left-0 right-0 bottom-[100px] z-10 flex justify-center pointer-events-none">
        <InquireButton onClick={onStartNewChat} />
      </div>
    </div>
  );
}

function Header({
  showDelete,
  onDelete,
}: {
  showDelete: boolean;
  onDelete?: () => void;
}) {
  return (
    <div
      className="flex items-center justify-between w-full h-[56px] pl-[20px] pr-[56px] sm:pr-[20px] py-[12px] bg-white border-b overflow-hidden"
      style={{ borderColor: "var(--ht-border-separator)" }}
    >
      <h1
        className="text-[18px] leading-7 font-semibold tracking-[-0.25px]"
        style={{ color: "var(--ht-text-default)" }}
      >
        메시지
      </h1>
      {showDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="ht-pressable px-[8px] py-[4px] rounded-[6px] text-[14px] leading-5 font-medium tracking-[-0.25px]"
          style={{ color: "var(--ht-text-muted)" }}
        >
          전체 삭제
        </button>
      )}
    </div>
  );
}

function EmptyContent() {
  // pb-[148px] reserves the floating 문의하기 button + nav area so vertical
  // centering happens in the visible content area (matches Figma 27158:30643
  // intent), instead of the full screen height which would push the icon/text
  // toward the bottom on tall devices and overlap with the button on short ones.
  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full px-[20px] pb-[148px] gap-[20px]">
      <Image
        src="/blum-empty.svg"
        alt=""
        width={39}
        height={61}
        priority
        className="block"
      />
      <p
        className="text-[14px] leading-[23px] text-center tracking-[-0.25px]"
        style={{ color: "var(--ht-text-subtle)" }}
      >
        첫 대화를 시작해 보세요.
      </p>
    </div>
  );
}

function InquireButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ht-cta-button pointer-events-auto inline-flex items-center justify-center gap-[4px] rounded-[16px] px-[24px] py-[12px] border text-white"
      style={{
        background: "var(--ht-bg-inverted)",
        borderColor: "rgba(255, 255, 255, 0.2)",
        boxShadow: "var(--ht-shadow-modal-lg)",
      }}
    >
      <span
        className="font-semibold tracking-[-0.25px]"
        style={{ fontSize: 16, lineHeight: "24px" }}
      >
        문의하기
      </span>
      <SendIcon className="ht-cta-icon" width={16} height={16} />
    </button>
  );
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function formatRelativeTime(createdAt: number): string {
  const diff = Date.now() - createdAt;
  if (diff >= ONE_DAY_MS) return ""; // hidden after 24h per design rule
  const min = Math.floor(diff / 60000);
  if (min < 1) return "방금 전";
  if (min < 60) return `${min}분 전`;
  const hr = Math.floor(min / 60);
  return `${hr}시간 전`;
}

function MessageRow({
  status,
  createdAt,
  body,
  onClick,
}: {
  status: string;
  createdAt: number;
  body: string;
  onClick?: () => void;
}) {
  const timeLabel = formatRelativeTime(createdAt);
  return (
    <button
      type="button"
      onClick={onClick}
      className="ht-card-press flex flex-col gap-[4px] w-full text-left rounded-[12px]"
    >
      <div className="flex items-center justify-between gap-[8px] w-full">
        <span
          className="text-[14px] leading-5 font-semibold tracking-[-0.25px]"
          style={{ color: "var(--ht-text-default)" }}
        >
          {status}
        </span>
        {timeLabel && (
          <span
            className="text-[12px] leading-4 shrink-0 tracking-[-0.25px]"
            style={{ color: "var(--ht-text-subtle)" }}
          >
            {timeLabel}
          </span>
        )}
      </div>
      <p
        className="text-[14px] w-full line-clamp-2 tracking-[-0.25px]"
        style={{ color: "var(--ht-text-default)", lineHeight: "23px" }}
      >
        {body}
      </p>
    </button>
  );
}

function SendIcon(props: SVGProps<SVGSVGElement>) {
  // Path source: Figma 27158:30705 (문의하기 button lead-icon).
  // Original coords are anchored to the parent button viewBox; viewBox here
  // crops to the icon area so it renders cleanly at any width/height.
  return (
    <svg viewBox="102 17 16 16" fill="none" {...props}>
      <path
        d="M103.298 23.21C102.949 23.0939 102.946 22.9066 103.305 22.7871L116.029 18.5458C116.381 18.4283 116.583 18.6255 116.484 18.9711L112.849 31.6952C112.748 32.0475 112.545 32.0598 112.396 31.7248L110 26.3331L114 20.9998L108.667 24.9998L103.298 23.21Z"
        fill="currentColor"
      />
    </svg>
  );
}
