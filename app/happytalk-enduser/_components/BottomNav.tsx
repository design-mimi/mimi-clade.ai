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

// Figma 27215:3512 — full-width bottom bar pinned to the frame edge.
// No more sliding white pill: the active tab is signalled purely by the
// filled icon variant + text-default ink, inactive tabs use the outline
// glyph + text-subtle.
export function BottomNav({ active, onChange }: Props) {
  return (
    <div
      className="absolute left-0 right-0 bottom-0 z-20 flex items-center h-[64px] py-[6px] border-t"
      style={{
        background: "rgba(255, 255, 255, 0.88)",
        borderColor: "var(--ht-border-default)",
        boxShadow: "var(--ht-shadow-nav)",
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
      }}
    >
      <div className="flex flex-1 items-center gap-[6px] px-[8px] min-w-0 self-stretch">
        {TABS.map(({ id, label, outline, fill }) => {
          const isActive = active === id;
          const Icon = isActive ? fill : outline;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-current={isActive ? "page" : undefined}
              className="ht-pressable flex flex-col flex-1 min-w-0 self-stretch items-center justify-center py-[6px] rounded-[100px]"
              style={{ background: "transparent" }}
            >
              <Icon
                width={20}
                height={20}
                style={{
                  color: isActive ? "var(--ht-icon-default)" : "var(--ht-icon-subtle)",
                  transition: "color 220ms ease-out",
                }}
              />
              <span
                className="mt-[1px] text-[11px] leading-4 tracking-[-0.25px]"
                style={{
                  color: isActive ? "var(--ht-text-default)" : "var(--ht-text-subtle)",
                  transition: "color 220ms ease-out",
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
