export type HomeVariant =
  | "default"
  | "default-compact"
  | "gradient-line"
  | "gradient-oval"
  | "brand-image"
  | "brand-image-tall";

export const HOME_VARIANTS: { id: HomeVariant; label: string }[] = [
  { id: "default", label: "기본형" },
  { id: "default-compact", label: "기본형 (간단)" },
  { id: "gradient-line", label: "그라데이션 직선형" },
  { id: "gradient-oval", label: "그라데이션 오벌형" },
  { id: "brand-image", label: "브랜드 이미지형" },
  { id: "brand-image-tall", label: "브랜드 이미지형 (크게)" },
];

export type NavTab = "home" | "message" | "setting";

export type ConversationSummary = {
  id: string;
  status: string;
  // ms epoch — list row computes the relative time label from this and hides
  // it once 24h have passed (sub-day rows show "방금 전" / "N시간 전").
  createdAt: number;
  body: string;
};

export type LauncherVariant = "pencil" | "infinity" | "heart";

export const LAUNCHER_VARIANTS: { id: LauncherVariant; label: string }[] = [
  { id: "pencil", label: "펜슬 드로잉" },
  { id: "infinity", label: "인피니티" },
  { id: "heart", label: "하트 + 커브" },
];

// Visual style/skin of the home button — orthogonal to motion (LauncherVariant).
// Sourced from Figma 27158:30782 (Web brand blue / yellow / Light / Glass / Dark).
export type LauncherStyle =
  | "brand-blue"
  | "brand-yellow"
  | "light"
  | "glass"
  | "dark";

export const LAUNCHER_STYLES: { id: LauncherStyle; label: string }[] = [
  { id: "brand-blue", label: "브랜드 (블루)" },
  { id: "brand-yellow", label: "브랜드 (옐로우)" },
  { id: "light", label: "라이트" },
  { id: "glass", label: "글래스" },
  { id: "dark", label: "다크" },
];
