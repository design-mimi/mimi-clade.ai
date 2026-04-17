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
      className="absolute left-1/2 bottom-[11px] -translate-x-1/2 z-20 flex items-center py-[6px] px-[8px] gap-[6px] rounded-full border ht-blur-backdrop"
      style={{
        background: "rgba(245, 245, 245, 0.8)",
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
            className={`ht-pressable ht-nav-tab relative flex flex-col items-center justify-center w-[64px] py-[6px] rounded-[100px] transition-all duration-150 ${isActive ? "ht-nav-tab-active" : ""}`}
          >
            <Icon
              width={20}
              height={20}
              style={{ color: isActive ? "var(--ht-icon-default)" : "var(--ht-icon-subtle)" }}
            />
            <span
              className="mt-[1px] text-[11px] leading-4"
              style={{ color: isActive ? "var(--ht-text-default)" : "var(--ht-text-subtle)" }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
