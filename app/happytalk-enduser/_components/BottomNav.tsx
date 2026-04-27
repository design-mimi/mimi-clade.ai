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

const TAB_WIDTH = 64;
const TAB_GAP = 6;

export function BottomNav({ active, onChange }: Props) {
  const activeIndex = TABS.findIndex((t) => t.id === active);
  const inkLeft = 8 + activeIndex * (TAB_WIDTH + TAB_GAP);

  return (
    <div
      className="absolute left-1/2 bottom-[11px] -translate-x-1/2 z-20 flex items-center py-[6px] px-[8px] gap-[6px] rounded-full border ht-blur-backdrop"
      style={{
        background: "rgba(245, 245, 245, 0.8)",
        borderColor: "var(--ht-border-default)",
        boxShadow: "var(--ht-shadow-nav)",
      }}
    >
      {/* Ink indicator */}
      <div
        className="absolute top-[6px] bottom-[6px] rounded-[100px] z-[1]"
        style={{
          width: TAB_WIDTH,
          left: inkLeft,
          background: "#ffffff",
          border: "1px solid var(--ht-border-default)",
          boxShadow:
            "0 1px 2px 0 rgba(0, 0, 0, 0.10), 0 0 0 0.5px rgba(0, 0, 0, 0.04)",
          transition: "left 350ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {TABS.map(({ id, label, outline, fill }) => {
        const isActive = active === id;
        const Icon = isActive ? fill : outline;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className="ht-pressable relative flex flex-col items-center justify-center w-[64px] py-[6px] rounded-[100px] z-10"
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
