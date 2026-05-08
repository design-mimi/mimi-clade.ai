"use client";

import { useEffect, useState } from "react";
import { Launcher } from "./Launcher";
import { LauncherForm } from "./LauncherForm";
import {
  LAUNCHER_FORMS,
  LAUNCHER_STYLES,
  LAUNCHER_VARIANTS,
  type LauncherForm as LauncherFormId,
  type LauncherStyle,
  type LauncherVariant,
} from "./types";

// 모든 토글 (motion / skin / form) 미리보기 셀의 통일 size.
const PREVIEW_SIZE = 40;

type Props = {
  value: LauncherVariant;
  onChange: (v: LauncherVariant) => void;
  styleValue: LauncherStyle;
  onStyleChange: (s: LauncherStyle) => void;
  formValue: LauncherFormId | null;
  onFormChange: (f: LauncherFormId | null) => void;
  embedded?: boolean;
};

export function LauncherVariantSelector({
  value,
  onChange,
  styleValue,
  onStyleChange,
  formValue,
  onFormChange,
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
      <div className="flex items-center justify-between gap-[12px] px-1 pb-1">
        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">
          홈버튼 배리언트
        </span>
        {!embedded && isMobile && (
          <button
            type="button"
            onClick={() => setExpanded(false)}
            aria-label="홈버튼 배리언트 닫기"
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
        )}
      </div>
      {/* 모든 launcher 옵션 — motion 3종 + form 14종 — 한 그리드. motion
         셀 클릭 시 form 자동 null (motion 모드), form 셀 클릭 시 sprite 모드.
         색상은 "버튼 타입" (skin) 선택값을 form sprite 에 그대로 적용. */}
      <div className="grid grid-cols-5 gap-[6px]">
        {LAUNCHER_VARIANTS.map(({ id, label }) => (
          <PreviewCell
            key={`motion-${id}`}
            active={formValue === null && id === value}
            onClick={() => {
              onChange(id);
              onFormChange(null);
            }}
            title={label}
          >
            <Launcher
              variant={id}
              style={styleValue}
              size={PREVIEW_SIZE}
            />
          </PreviewCell>
        ))}
        {LAUNCHER_FORMS.map(({ id, label }) => (
          <PreviewCell
            key={`form-${id}`}
            active={id === formValue}
            onClick={() => onFormChange(id)}
            title={label}
          >
            <LauncherForm form={id} skin={styleValue} size={PREVIEW_SIZE} />
          </PreviewCell>
        ))}
      </div>

      <div className="mt-1 mb-1 border-t border-zinc-200/70" />
      <div className="px-1 pb-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">
        버튼 타입
      </div>
      <div className="grid grid-cols-5 gap-[6px]">
        {LAUNCHER_STYLES.map(({ id, label }) => (
          <PreviewCell
            key={id}
            active={id === styleValue}
            onClick={() => onStyleChange(id)}
            title={label}
          >
            <Launcher variant={value} style={id} size={PREVIEW_SIZE} />
          </PreviewCell>
        ))}
      </div>
    </div>
  );

  if (embedded) return panel;

  if (!isMobile) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        {panel}
      </div>
    );
  }

  // Mobile collapsed: small pill at bottom-LEFT.
  const activeLabel =
    LAUNCHER_VARIANTS.find((v) => v.id === value)?.label ?? "배리언트";

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        aria-label="홈버튼 배리언트 열기"
        className="fixed bottom-4 left-4 z-50 px-3 py-2 rounded-full bg-white/90 backdrop-blur-md border border-black/10 text-[12px] font-medium text-zinc-700"
        style={{ boxShadow: "var(--ht-shadow-lg)" }}
      >
        {activeLabel}
      </button>
    );
  }

  // Mobile expanded: full panel at bottom-LEFT.
  return (
    <div className="fixed bottom-4 left-4 z-50">
      {panel}
    </div>
  );
}

// 모든 토글 셀 통일 — PREVIEW_SIZE × PREVIEW_SIZE 안에 미리보기 + active ring.
// 클릭 영역은 미리보기 외곽 padding 까지 포함해 셀 = preview + 6px padding.
function PreviewCell({
  active,
  onClick,
  title,
  children,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      aria-pressed={active}
      className={`flex items-center justify-center rounded-[10px] transition-colors ${
        active
          ? "ring-2 ring-zinc-900 bg-white"
          : "bg-zinc-50 hover:bg-zinc-100"
      }`}
      style={{
        width: PREVIEW_SIZE + 6,
        height: PREVIEW_SIZE + 6,
        // pointer 통과 막기 위해 inner Launcher 의 button 클릭 무력화.
        position: "relative",
      }}
    >
      <div
        aria-hidden
        style={{ pointerEvents: "none", display: "inline-flex" }}
      >
        {children}
      </div>
    </button>
  );
}
