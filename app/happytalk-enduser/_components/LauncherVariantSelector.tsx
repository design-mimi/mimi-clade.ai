"use client";

import { useEffect, useState } from "react";
import { LAUNCHER_VARIANTS, type LauncherVariant } from "./types";

type Props = {
  value: LauncherVariant;
  onChange: (v: LauncherVariant) => void;
  embedded?: boolean;
};

export function LauncherVariantSelector({ value, onChange, embedded = false }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
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
      {LAUNCHER_VARIANTS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
            id === value
              ? "bg-zinc-900 text-white"
              : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
          }`}
        >
          {label}
        </button>
      ))}
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
