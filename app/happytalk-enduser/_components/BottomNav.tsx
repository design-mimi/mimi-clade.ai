"use client";

import type { NavTab } from "./types";
import {
  HomeOutlineIcon,
  HomeFillIcon,
  MessageOutlineIcon,
  MessageFillIcon,
  SettingOutlineIcon,
  SettingFillIcon,
} from "./Icons";

type Props = {
  active: NavTab;
  onChange: (tab: NavTab) => void;
};

type IconComp = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const TABS: { id: NavTab; label: string; outline: IconComp; fill: IconComp }[] = [
  { id: "home", label: "홈", outline: HomeOutlineIcon, fill: HomeFillIcon },
  { id: "message", label: "메시지", outline: MessageOutlineIcon, fill: MessageFillIcon },
  { id: "setting", label: "설정", outline: SettingOutlineIcon, fill: SettingFillIcon },
];

export function BottomNav({ active, onChange }: Props) {
  return (
    <div
      className="absolute left-1/2 bottom-[11px] -translate-x-1/2 z-20 flex items-center py-[6px] px-[8px] gap-[6px] rounded-full border overflow-hidden"
      style={{
        // No backdrop-filter — its render layer was causing iOS WebKit to
        // composite child button backgrounds into the parent's blurred tint,
        // which is exactly why the white active pill kept disappearing on
        // mobile browsers. Slightly higher alpha (0.95) preserves the tone
        // without depending on blur.
        background: "rgba(245, 245, 245, 0.95)",
        borderColor: "var(--ht-border-default)",
        boxShadow: "var(--ht-shadow-nav)",
      }}
    >
      {TABS.map(({ id, label, outline, fill }) => {
        const isActive = active === id;
        const Icon = isActive ? fill : outline;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className="ht-pressable relative flex flex-col items-center justify-center w-[64px] py-[6px] rounded-[100px]"
            style={{
              background: isActive ? "#ffffff" : "transparent",
              border: isActive
                ? "1px solid rgba(39, 39, 42, 0.16)"
                : "1px solid transparent",
              boxShadow: isActive
                ? "0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(0, 0, 0, 0.04)"
                : "none",
              transition:
                "background-color 220ms ease-out, border-color 220ms ease-out, box-shadow 220ms ease-out",
              WebkitTapHighlightColor: "transparent",
              // Force-reset native button rendering on iOS Safari so the
              // explicit background actually paints (Tailwind preflight sets
              // -webkit-appearance: button which can suppress custom bg).
              appearance: "none",
              WebkitAppearance: "none",
            }}
          >
            <Icon
              width={20}
              height={20}
              style={{
                color: isActive ? "var(--ht-icon-default)" : "var(--ht-icon-subtle)",
                transition: "color 200ms ease-out",
              }}
            />
            <span
              className="mt-[1px] text-[11px] leading-4"
              style={{
                color: isActive ? "var(--ht-text-default)" : "var(--ht-text-subtle)",
                transition: "color 200ms ease-out",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
