"use client";

import { useEffect, useRef } from "react";
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

const TAB_W = 64;
const GAP = 6;
const PAD_X = 8;
const PAD_Y = 6;
const CONTAINER_INNER_W = TABS.length * TAB_W + (TABS.length - 1) * GAP + PAD_X * 2;

export function BottomNav({ active, onChange }: Props) {
  const prevActiveRef = useRef<NavTab>(active);
  const activeIdx = TABS.findIndex((t) => t.id === active);
  const prevIdx = TABS.findIndex((t) => t.id === prevActiveRef.current);
  const movingRight = activeIdx > prevIdx;

  useEffect(() => {
    prevActiveRef.current = active;
  }, [active]);

  const pillLeft = PAD_X + activeIdx * (TAB_W + GAP);
  const pillRight = CONTAINER_INNER_W - pillLeft - TAB_W;

  return (
    <div
      className="absolute left-1/2 bottom-[11px] -translate-x-1/2 z-20 flex items-center rounded-full border overflow-hidden isolate"
      style={{
        padding: `${PAD_Y}px ${PAD_X}px`,
        gap: GAP,
        background: "rgba(245, 245, 245, 0.8)",
        borderColor: "var(--ht-border-default)",
        boxShadow: "var(--ht-shadow-nav)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
    >
      <div
        aria-hidden
        className="absolute pointer-events-none rounded-[100px]"
        style={{
          top: PAD_Y,
          bottom: PAD_Y,
          left: pillLeft,
          right: pillRight,
          background: "#ffffff",
          border: "1px solid var(--ht-border-default)",
          transition: movingRight
            ? "left 250ms cubic-bezier(0.4, 0, 0.2, 1) 45ms, right 250ms cubic-bezier(0.4, 0, 0.2, 1)"
            : "left 250ms cubic-bezier(0.4, 0, 0.2, 1), right 250ms cubic-bezier(0.4, 0, 0.2, 1) 45ms",
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
            className="relative flex flex-col items-center justify-center rounded-[100px]"
            style={{
              width: TAB_W,
              padding: `${PAD_Y}px 0`,
              border: "1px solid transparent",
              background: "transparent",
              zIndex: 1,
            }}
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
  );
}
