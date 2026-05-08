"use client";

import {
  LAUNCHER_FORM_POS,
  type LauncherForm,
  type LauncherStyle,
} from "./types";

// skin 별 sprite 파일. form 1~13 의 outer rect 색상이 skin 에 따라 swap.
// AI (form 14) 는 자체 그라데이션이라 skin 무관 — ai.svg 단일 사용.
const SKIN_TO_SPRITE: Record<LauncherStyle, string> = {
  dark: "/launcher-forms/dark.svg",
  light: "/launcher-forms/light.svg",
  glass: "/launcher-forms/glass.svg",
  "brand-blue": "/launcher-forms/brand-blue.svg",
  "brand-yellow": "/launcher-forms/brand-yellow.svg",
};

// sprite 전체 크기 (9+4 그리드, 748×200).
const SPRITE_W = 748;
const SPRITE_H = 200;
// 각 form outer rect 사이즈 (rounded squircle 68×68).
const RECT = 68;

type Props = {
  form: LauncherForm;
  skin?: LauncherStyle;
  size?: number;
  className?: string;
};

// 14 form sprite 에서 한 form 만 뽑아 size×size 로 렌더. sprite 좌표:
//   - 전체 748×200 (9+4 그리드), form 외곽 박스는 (x, y) ~ (x+68, y+68) — 68×68
// outer rect 만 size×size 가득 차도록 매핑 (drop-shadow 영역은 viewport 밖으로
// 밀려나 잘림). 운영 launcher 60×60 wrapper 안에 rounded-rect 가 가득 차는 게
// motion 모드와 시각적으로 일관되도록.
export function LauncherForm({
  form,
  skin = "dark",
  size = 56,
  className,
}: Props) {
  // form 14 (AI) 는 자체 SVG (ai.svg, 92×92) — outer rect (12, 8) ~ (80, 76).
  // skin 무관 (그라데이션 디자인 그대로).
  if (form === 14) {
    const scale = size / RECT;
    return (
      <span
        aria-hidden
        className={className}
        style={{
          display: "inline-block",
          width: size,
          height: size,
          backgroundImage: `url('/launcher-forms/ai.svg')`,
          backgroundPosition: `-${12 * scale}px -${8 * scale}px`,
          backgroundSize: `${92 * scale}px ${92 * scale}px`,
          backgroundRepeat: "no-repeat",
        }}
      />
    );
  }

  const { x, y } = LAUNCHER_FORM_POS[form];
  const url = SKIN_TO_SPRITE[skin];
  // outer rect 68×68 → size×size 매핑. sprite 전체는 (size/68) 비율로 스케일.
  const scale = size / RECT;
  return (
    <span
      aria-hidden
      className={className}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundImage: `url('${url}')`,
        backgroundPosition: `-${x * scale}px -${y * scale}px`,
        backgroundSize: `${SPRITE_W * scale}px ${SPRITE_H * scale}px`,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
