"use client";

import { useEffect, useState } from "react";
import {
  HOME_BOX_TYPES,
  RESPONSE_STATUSES,
  type HomeBoxType,
  type ResponseStatus,
} from "./types";

type Props = {
  boxType: HomeBoxType;
  onBoxTypeChange: (v: HomeBoxType) => void;
  showNotice: boolean;
  onShowNoticeChange: (v: boolean) => void;
  responseStatus: ResponseStatus;
  onResponseStatusChange: (v: ResponseStatus) => void;
  embedded?: boolean;
};

export function AdminToggleSelector({
  boxType,
  onBoxTypeChange,
  showNotice,
  onShowNoticeChange,
  responseStatus,
  onResponseStatusChange,
  embedded = false,
}: Props) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 639px)").matches,
  );
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (!e.matches) setExpanded(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const panel = (
    <div
      className="flex flex-col gap-2 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-black/10"
      style={{ boxShadow: "var(--ht-shadow-lg)" }}
    >
      <div className="px-1 pb-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">
        어드민 토글
      </div>

      <SectionLabel>박스 타입</SectionLabel>
      {HOME_BOX_TYPES.map(({ id, label }) => (
        <Row
          key={id}
          active={id === boxType}
          onClick={() => onBoxTypeChange(id)}
          label={label}
        />
      ))}

      <SectionLabel>알림</SectionLabel>
      <Row
        active={!showNotice}
        onClick={() => onShowNoticeChange(false)}
        label="미노출"
      />
      <Row
        active={showNotice}
        onClick={() => onShowNoticeChange(true)}
        label="노출"
      />

      <SectionLabel>응답 상태</SectionLabel>
      {RESPONSE_STATUSES.map(({ id, label }) => (
        <Row
          key={id}
          active={id === responseStatus}
          onClick={() => onResponseStatusChange(id)}
          label={label}
        />
      ))}
    </div>
  );

  if (embedded) return panel;

  if (!isMobile) {
    return <div className="fixed bottom-6 left-[200px] z-50">{panel}</div>;
  }

  if (!expanded) {
    const summary = `${boxType === "ai-agent" ? "AI" : "문의"} · ${
      showNotice ? "알림" : "•"
    } · ${RESPONSE_STATUSES.find((s) => s.id === responseStatus)?.label ?? ""}`;
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        aria-label="어드민 토글 열기"
        className="fixed bottom-[60px] right-4 z-50 px-3 py-2 rounded-full bg-white/90 backdrop-blur-md border border-black/10 text-[12px] font-medium text-zinc-700"
        style={{ boxShadow: "var(--ht-shadow-lg)" }}
      >
        {summary}
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-[60px] right-4 z-50 flex flex-col gap-2 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-black/10 max-h-[80vh] overflow-y-auto"
      style={{ boxShadow: "var(--ht-shadow-lg)" }}
    >
      <div className="flex items-center justify-between gap-[12px] px-1 pb-1">
        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">
          어드민 토글
        </span>
        <button
          type="button"
          onClick={() => setExpanded(false)}
          aria-label="어드민 토글 닫기"
          className="ht-pressable w-[18px] h-[18px] flex items-center justify-center text-zinc-400 hover:text-zinc-700"
        >
          <svg viewBox="0 0 12 12" width={10} height={10} fill="none">
            <path
              d="M2 2l8 8M10 2l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <SectionLabel>박스 타입</SectionLabel>
      {HOME_BOX_TYPES.map(({ id, label }) => (
        <Row
          key={id}
          active={id === boxType}
          onClick={() => onBoxTypeChange(id)}
          label={label}
        />
      ))}

      <SectionLabel>알림</SectionLabel>
      <Row
        active={!showNotice}
        onClick={() => onShowNoticeChange(false)}
        label="미노출"
      />
      <Row
        active={showNotice}
        onClick={() => onShowNoticeChange(true)}
        label="노출"
      />

      <SectionLabel>응답 상태</SectionLabel>
      {RESPONSE_STATUSES.map(({ id, label }) => (
        <Row
          key={id}
          active={id === responseStatus}
          onClick={() => onResponseStatusChange(id)}
          label={label}
        />
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-1 pt-2 pb-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wide">
      {children}
    </div>
  );
}

function Row({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
        active
          ? "bg-zinc-900 text-white"
          : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
      }`}
    >
      {label}
    </button>
  );
}
