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

// 형태별 런처 아이콘 (Figma 24229:34897). dark / light 두 SVG sprite
// (public/launcher-forms/{dark,light}.svg) 안의 13 형태를 viewBox 슬라이스로
// 추출. 1~13 form id 와 sprite 안 outer rect x 좌표 매핑.
export type LauncherForm =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14;

export const LAUNCHER_FORMS: { id: LauncherForm; label: string }[] = [
  { id: 1, label: "라운드 페이스" },
  { id: 2, label: "카카오 페이스" },
  { id: 3, label: "물음표" },
  { id: 4, label: "말줄임표" },
  { id: 5, label: "활짝 웃음" },
  { id: 6, label: "미소" },
  { id: 7, label: "두 눈" },
  { id: 8, label: "두 눈 + 입" },
  { id: 9, label: "윙크" },
  { id: 10, label: "라이트닝" },
  { id: 11, label: "스파클" },
  { id: 12, label: "허그 페이스" },
  { id: 13, label: "하트" },
  { id: 14, label: "AI" },
];

// sprite (748×200, 9+4 grid) 안 각 form outer rect 의 (x, y) 좌표.
// form 1~9 는 윗줄 (y=8), 10~13 은 아랫줄 (y=116).
export const LAUNCHER_FORM_POS: Record<
  LauncherForm,
  { x: number; y: number }
> = {
  1: { x: 12, y: 8 },
  2: { x: 94, y: 8 },
  3: { x: 176, y: 8 },
  4: { x: 258, y: 8 },
  5: { x: 340, y: 8 },
  6: { x: 422, y: 8 },
  7: { x: 504, y: 8 },
  8: { x: 586, y: 8 },
  9: { x: 668, y: 8 },
  10: { x: 12, y: 116 },
  11: { x: 94, y: 116 },
  12: { x: 176, y: 116 },
  13: { x: 258, y: 116 },
  // form 14 (AI) 는 별도 ai.svg 사용 — sentinel.
  14: { x: -1, y: -1 },
};
