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
