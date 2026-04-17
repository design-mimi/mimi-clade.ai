"use client";

import { HOME_VARIANTS, type HomeVariant } from "./types";

type Props = {
  value: HomeVariant;
  onChange: (v: HomeVariant) => void;
};

export function VariantSelector({ value, onChange }: Props) {
  return (
    <div
      className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-black/10"
      style={{ boxShadow: "var(--ht-shadow-lg)" }}
    >
      <div className="px-1 pb-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">
        홈 배리언트
      </div>
      {HOME_VARIANTS.map(({ id, label }) => {
        const active = id === value;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
              active
                ? "bg-zinc-900 text-white"
                : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
