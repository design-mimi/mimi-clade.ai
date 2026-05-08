"use client";

import "./launcher.css";
import { LauncherForm } from "./LauncherForm";
import type {
  LauncherForm as LauncherFormId,
  LauncherStyle,
  LauncherVariant,
} from "./types";

type Props = {
  variant: LauncherVariant;
  style?: LauncherStyle;
  closeMode?: boolean;
  onClick?: () => void;
  // 형태 sprite 모드 — 지정 시 motion 무시하고 sprite 렌더 (skin 색상은 유지).
  form?: LauncherFormId | null;
  // 셀렉터 안 작은 미리보기에서 size 줄여서 사용 (default 60).
  size?: number;
};

const STYLE_CLASS: Record<LauncherStyle, string> = {
  "brand-blue": "ht-launcher-style-brand-blue",
  "brand-yellow": "ht-launcher-style-brand-yellow",
  light: "ht-launcher-style-light",
  glass: "ht-launcher-style-glass",
  dark: "ht-launcher-style-dark",
};

export function Launcher({
  variant,
  style: launcherStyle = "light",
  closeMode = false,
  onClick,
  form,
  size = 56,
}: Props) {
  // 운영 56×56 / rounded ≈ 19 비율 (selector mini preview 도 동일 비율).
  const factor = size / 56;
  const radius = Math.round(19 * factor);

  // form sprite 모드 (closeMode 가 아닐 때만) — wrapper bg/border 없이 sprite 자체로 렌더.
  if (form && !closeMode) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="상담 열기"
        className="ht-launcher flex items-center justify-center relative bg-transparent"
        style={{ width: size, height: size }}
      >
        <LauncherForm form={form} skin={launcherStyle} size={size} />
      </button>
    );
  }

  const variantClass = closeMode
    ? ""
    : variant === "pencil"
    ? "ht-launcher-pencil"
    : variant === "infinity"
    ? "ht-launcher-infinity"
    : "ht-launcher-heart";

  const styleClass = STYLE_CLASS[launcherStyle];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={closeMode ? "상담 닫기" : "상담 열기"}
      className={`ht-launcher ${styleClass} ${variantClass} flex items-center justify-center relative overflow-hidden`}
      style={{ width: size, height: size, borderRadius: radius }}
    >
      {closeMode && (
        <svg
          className="ht-launcher-close"
          width={24 * factor}
          height={24 * factor}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5 5L19 19M19 5L5 19"
            stroke="#231916"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </svg>
      )}
      {!closeMode && variant === "pencil" && (
        <svg
          width={26 * factor}
          height={44 * factor}
          viewBox="0 -2 39 65"
          fill="none"
          style={{ overflow: "visible" }}
        >
          <path
            className="body"
            pathLength={100}
            d="M31.18 1.25C31.18 1.25 -2.6 28.99 6.88 15.45C16.36 1.91 28.26 10.04 19.62 26.33C13.99 36.95 1.25 44.23 1.25 44.23C1.25 44.23 14.88 43.99 16.95 49.55"
          />
          <path
            className="mouth"
            pathLength={100}
            d="M11.6201 56.95C11.6201 56.95 24.0601 65.25 35.3201 48.65"
          />
          <path
            className="brow"
            pathLength={100}
            d="M26.1396 24.53C26.1396 24.53 31.8996 28.37 37.0996 20.69"
          />
        </svg>
      )}
      {!closeMode && variant === "infinity" && (
        <svg
          width={38 * factor}
          height={32 * factor}
          viewBox="0 0 45 38"
          fill="none"
          style={{ overflow: "visible" }}
        >
          <path
            className="stroke-path"
            pathLength={100}
            d="M40.5263 34.4977C26.3535 36.8422 12.05 31.522 3.59816 20.39C-2.90328 11.3111 5.04317 2.93863 15.8497 9.25795C27.7981 16.245 23.4641 25.9211 18.9562 22.7832C12.2672 17.9123 28.1595 -6.47756 40.0787 3.71539C47.7795 11.0909 41.2198 29.9182 9.81085 36.529"
          />
        </svg>
      )}
      {!closeMode && variant === "heart" && (
        <svg
          width={38 * factor}
          height={34 * factor}
          viewBox="0 0 45 40"
          fill="none"
          style={{ overflow: "visible" }}
        >
          <path className="p1" pathLength={100} d="M31.9678 12.0836C31.9678 12.0836 37.1995 14.3759 38.8408 15.3056C43.1729 17.7821 43.0625 12.9492 41.0582 11.8271" />
          <path className="p2" pathLength={100} d="M38.3271 19.3451C42.32 21.6533 41.9728 16.8444 39.6607 15.7144" />
          <path className="p3" pathLength={100} d="M38.4617 19.5853C38.4617 19.5853 32.1095 25.0834 19.6575 24.0495C-9.20762 21.6611 2.38421 1.67219 20.5887 1.26343C34.5557 0.950856 39.8978 6.18452 41.3419 7.45887C42.3204 8.32447 43.5592 9.72706 43.2357 11.0014C42.9595 12.0754 42.3519 12.9169 40.2214 11.2499C36.4495 8.30042 33.159 7.77145 33.159 7.77145" />
          <path className="p4" pathLength={100} d="M12.5716 27.4077C12.5716 27.4077 7.33987 25.1155 5.69855 24.1857C1.36641 21.7092 1.47688 26.5421 3.48119 27.6642" />
          <path className="p5" pathLength={100} d="M6.21174 20.1463C2.21892 17.8381 2.56612 22.6469 4.87817 23.777" />
          <path className="p6" pathLength={100} d="M6.07749 19.9057C6.07749 19.9057 12.4297 14.4076 24.8816 15.4415C53.7547 17.8379 42.155 37.8268 23.9505 38.2356C9.98351 38.5481 4.64133 33.3145 3.19728 32.0401C2.21881 31.1745 0.979924 29.7719 1.30345 28.4976C1.57964 27.4236 2.18724 26.582 4.3178 28.2491C8.08968 31.1986 11.3802 31.7275 11.3802 31.7275" />
        </svg>
      )}
    </button>
  );
}
