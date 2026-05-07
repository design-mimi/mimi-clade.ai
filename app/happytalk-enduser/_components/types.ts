export type HomeVariant =
  | "none"
  | "gra-onecolor"
  | "gra-linear"
  | "gra-radial"
  | "img-01"
  | "img-02";

export const HOME_VARIANTS: { id: HomeVariant; label: string }[] = [
  { id: "none", label: "기본 (단색 그레이)" },
  { id: "gra-onecolor", label: "단색 (블루)" },
  { id: "gra-linear", label: "그라데이션 선형" },
  { id: "gra-radial", label: "그라데이션 방사형" },
  { id: "img-01", label: "이미지 01" },
  { id: "img-02", label: "이미지 02" },
];

// 어드민이 토글하는 홈 문의 박스 타입 (Figma 27314:1562).
// AI 에이전트 = 인풋 + send / 문의하기 = 검정 CTA 버튼.
export type HomeBoxType = "ai-agent" | "inquiry";

export const HOME_BOX_TYPES: { id: HomeBoxType; label: string }[] = [
  { id: "ai-agent", label: "AI 에이전트" },
  { id: "inquiry", label: "문의하기" },
];

// 응답 상태 배지 (Figma 27343:1126). 5단계.
export type ResponseStatus = "ai" | "fast" | "normal" | "slow" | "offline";

export const RESPONSE_STATUSES: {
  id: ResponseStatus;
  label: string;
  copy: string;
}[] = [
  { id: "ai", label: "AI", copy: "AI가 바로 답해드려요" },
  { id: "fast", label: "빠름", copy: "빠르게 답해드려요" },
  { id: "normal", label: "보통", copy: "문의가 많아 상담 연결까지 시간이 걸려요" },
  { id: "slow", label: "지연", copy: "문의가 많아 상담 연결이 지연될 수 있어요" },
  { id: "offline", label: "무응답", copy: "운영 시간에 문의해 주세요" },
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
