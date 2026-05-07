# 해피톡 Enduser 디자인 규칙 — V2

> 본 문서는 **현재 main 브랜치(V2) 코드 기준**의 운영 스펙입니다.
> - 배포 URL: `ux-mimi.vercel.app/happytalk-enduser` (수동 `vercel deploy --prod --yes`)
> - 1차 시안 동결본은 [`DESIGN_RULES.v1.md`](./DESIGN_RULES.v1.md) 참고
> - Figma file: `fsAYYE5LmDVbSLnx53loNg` (해피톡)
>
> 코드와 어긋나는 항목은 **코드를 신뢰**하고 본 문서를 갱신하는 것이 원칙.

---

## 0. 인프라 / 배포 구조

| 항목 | V2 (운영) | V1 (동결 아카이브) |
|---|---|---|
| Git 브랜치 | `main` | `v1-archive` |
| Vercel 프로젝트 | `ux-mimi` | `happytalk-enduser-v1` |
| 배포 URL | `ux-mimi.vercel.app/happytalk-enduser` | `happytalk-enduser-v1.vercel.app/happytalk-enduser` |
| Production Branch | `main` | `v1-archive` |
| 배포 방식 | 수동 `vercel deploy --prod --yes` | 한 번 배포 후 동결, v1-archive 변경 시에만 자동 빌드 |

V2 main에 푸시해도 V1 프로젝트는 다른 브랜치를 추적하므로 영향 없음 = **100% 격리**.

V1과 V2가 같은 repo를 공유하긴 하지만 Vercel 빌드는 완전히 분리되어, V2 측 의존성·`tailwind`·`app/layout.tsx`·`/public/*` 변경은 V1 빌드에 들어가지 않음.

---

## 1. 폰트 (Typography)

- **Font family:** `SUIT Variable` → `SUIT` → 시스템 폴백 (`-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR"`)
- **Letter-spacing:** `-0.25px` (모든 텍스트 공통, `--ht-tracking-normal`)

| Token | Size | Line-height | Weight | 용도 |
|---|---|---|---|---|
| `2xl/SemiBold` | 24 | 32 | 600 | 브랜드명 (홈) |
| `lg/SemiBold` | 18 | 28 | 600 | 페이지 헤더 (메시지 / 설정) |
| `md/SemiBold` | 16 | 24 | 600 | 강조 본문, Primary CTA |
| `md/Normal` | 16 | 24 | 400 | 설정 리스트 레이블 |
| `sm/SemiBold` | 14 | 20 | 600 | 메시지 행 status, 카드 타이틀 |
| `sm/Medium` | 14 | 20 | 500 | 칩, 운영시간 버튼, 설정 행 |
| `sm/Normal` | 14 | 20 | 400 | 본문, 메시지 텍스트 |
| `xs/Medium` | 12 | 16 | 500 | 배지 텍스트 |
| `xs/Normal` | 12 | 16 | 400 | 타임스탬프, 보조 캡션 |
| (커스텀) | 11 | 16 | 400 | BottomNav 레이블 |

### 글자 크기 모드 (Setting → 텍스트 크기)

`small` / `large` 토글. EnduserFrame이 `<style>` 태그를 동적으로 주입해 `#ht-enduser-root` 하위 `text-[Npx]` 클래스를 일괄 부스팅. 모바일은 작게 모드도 가독성을 위해 +1px 부스팅이 들어가 있음.

| 모드 | 모바일 (`<sm`) | 웹 (`≥sm`) |
|---|---|---|
| `small` (기본 web) | 14→15, 15→16, 16→17, 18→19 | 코드 정의 그대로 |
| `large` | 14→17, 15→18, 16→19, 18→21, 24→26 | 14→16, 15→17, 16→18, 18→20, 24→26 + tracking 0.01em |

`leading-*` 클래스도 동일 모드별 매핑으로 보정 (주입된 inline style이 Tailwind를 `!important`로 덮음).

모바일은 첫 마운트 시 `large`로 자동 부팅 (`window.matchMedia("(min-width: 640px)")` 미일치 → `large`).

---

## 2. 컬러 (`--ht-*` 토큰)

`globals.css`의 `:root`에 선언. 컴포넌트는 `style={{ color: "var(--ht-text-default)" }}` 또는 인라인 hex 둘 다 사용 (구조적 변경은 토큰 우선).

### Text
| 토큰 | 값 | 용도 |
|---|---|---|
| `--ht-text-default` | `#111115` | 기본 본문 |
| `--ht-text-subtle` | `#4E4E55` | 부가 정보, 배지 텍스트, 운영시간 버튼 |
| `--ht-text-muted` | `#6F6F77` | 인풋 placeholder, 비활성 탭 |
| `--ht-text-hint` | `rgba(39,39,42,0.3)` | 인풋 힌트 |
| `--ht-text-inverted` | `#FFFFFF` | 다크 배경 위 텍스트 |

### Background
| 토큰 | 값 | 용도 |
|---|---|---|
| `--ht-bg-default` | `#FFFFFF` | 화면 / 카드 / 입력 |
| `--ht-bg-card` | `#FFFFFF` | 명시적 카드 배경 |
| `--ht-bg-input` | `#FFFFFF` | 입력창 |
| `--ht-bg-subtle` | `#FAFAFA` | 카드 내 보조 영역, ChatCard 버튼 |
| `--ht-bg-muted` | `#F4F4F5` | FAQ 카드 |
| `--ht-bg-inverted` | `#18181B` | Primary CTA, 발신 버블 |
| `--ht-bg-badge-default` | `#FFFFFF` | 화이트 상태 배지 |
| `--ht-bg-badge-green` | `rgba(102,220,126,0.1)` | 그린 상태 배지 |

### Border
| 토큰 | 값 | 용도 |
|---|---|---|
| `--ht-border-default` | `rgba(39,39,42,0.1)` (10%) | 기본 |
| `--ht-border-darker` | `rgba(39,39,42,0.15)` (15%) | 강조 |
| `--ht-border-inverted` | `rgba(255,255,255,0.2)` | 다크 배경 위 |
| `--ht-border-separator` | `rgba(0,0,0,0.08)` | 헤더 구분선 |
| `--ht-border-card` | `rgba(0,0,0,0.12)` | 카드 strong border |

### Accent
| 토큰 | 값 | 용도 |
|---|---|---|
| `--ht-green-accent` | `#4FC660` | 스위치 ON 등 강조 |
| (인라인) | `#33803F` | 그린 배지 텍스트 (`상담 원활 · 2명`) |

### Icon
| 토큰 | 값 |
|---|---|
| `--ht-icon-default` | `#111115` |
| `--ht-icon-subtle` | `#4E4E55` |
| `--ht-icon-muted` | `#6F6F77` |
| `--ht-icon-disabled` | `rgba(39,39,42,0.25)` |
| `--ht-icon-white` | `#FFFFFF` |

### Shadow
| 토큰 | 값 |
|---|---|
| `--ht-shadow-card` | `0 1px 2px 0 rgba(0,0,0,0.05)` + inset `0 -1px 0 0 rgba(0,0,0,0.1)` |
| `--ht-shadow-nav` | `0 3px 3px 0 rgba(0,0,0,0.12)` |
| `--ht-shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` + `0 4px 6px -4px rgba(0,0,0,0.1)` |
| `--ht-shadow-modal-sm` | 1px ring + 4단 누적 (12/6/3/1px) |
| `--ht-shadow-modal-lg` | 1px ring + 5단 누적 (16/12/6/3/1px) |
| `--ht-shadow-2xl` | `0 25px 50px -12px rgba(0,0,0,0.25)` (위젯 외곽) |

---

## 3. 간격 (Spacing)

스케일: **2, 4, 6, 8, 10, 12, 14, 16, 20** (px)

| 영역 | 값 |
|---|---|
| 아이콘-레이블 갭 | 4–6px |
| 인풋/버튼 내부 좌우 패딩 | 8–12px |
| 카드 내부 패딩 | 10–12px |
| 화면 좌우 패딩 | 20px |
| 헤더 패딩 (메시지/설정) | 좌우 20px / 상하 12px (h-56) |
| 브랜드 area | px-20, pt-28, pb-20 |
| 리스트 행 간 gap | 20px (메시지 / FAQ) |
| 그룹 gap | 4 / 8 / 12 / 16 / 20 / 24px |

---

## 4. 라운드 (Border Radius)

| Token | 값 | 용도 |
|---|---|---|
| `sm` | 6 | 작은 ghost 버튼 (`9-18시 운영 중`) |
| `md` | 8 | 인풋, segmented control |
| `lg` | 12 | 메시지 행, 메시지 버블, ChatCard 셸 |
| `xl` | 16 | Card / Primary CTA / NoticeCard / FAQ 컨테이너 |
| (커스텀) | 20 | 런처 버튼, 브랜드 이미지형 컨텐츠 상단 |
| (커스텀) | 24 | sm+ 위젯 프레임 |
| `100px` | 100 | BottomNav 탭 hit area |
| `full` | 9999 | 배지, 모달 액션 버튼 |

---

## 5. 프레임 / 화면 규칙 (`EnduserFrame.tsx`)

| 뷰포트 | 크기 | 라운드 | 외곽 |
|---|---|---|---|
| `<sm` (모바일) | `100vw × 100svh` | 0 | shadow 없음 (풀스크린) |
| `≥sm` (웹) | `375 × 640` | `24px` | `--ht-shadow-2xl` |

- 외곽 border 오버레이: `inset 0 0 0 1px rgba(0,0,0,0.1)` (z-50, pointer-events-none) — 항상 위에 잔류
- 모바일 닫기 X: `top-10 right-14`, 28×28 rounded-6, bg `rgba(39,39,42,0.06)` ink `#4E4E55`
  - 채팅 열려 있을 때 클릭 → "상담을 종료하시겠습니까?" 모달
  - 그 외 → 위젯 닫기 (`onClose`)
  - **숨김 조건**: 설정 → 개인정보 하위뷰일 때 (back 버튼이 대체)

---

## 6. Launcher (홈 버튼) — Figma 27158:30782

`Launcher.tsx` + `launcher.css`. `EnduserFrame` 외부, 페이지 루트의 `fixed` 자식.

### 배치
| 뷰포트 | 위치 |
|---|---|
| `≥sm` | `right-8 bottom-8` |
| `<sm` | `right-4 bottom-4` |

패널 열림 시:
- 모바일: 숨김 (위젯의 X 버튼이 닫기 역할)
- 웹: 그대로 노출, `closeMode={true}` 로 X 아이콘 렌더 (24px, stroke 2.5)

크기: `60×60`, `rounded-20`, `overflow-hidden`, `position: relative` (글래스 ::before/::after 레이어용)

### 모션 (3 variant)

모든 path: `stroke-linecap: round`, `stroke-linejoin: round`, `vector-effect: non-scaling-stroke` (viewBox 스케일과 무관하게 stroke 굵기 일정). 정지(rest) 상태는 path가 완전히 그려진 stroke-width 2.5 상태.

| Variant | id | 사이클 | 키 단계 |
|---|---|---|---|
| 펜슬 드로잉 | `pencil` | **6.30s** | body 0–14.60% (0.92s) → brow 14.60–29.21% (0.92s) → 호흡 pause 29.21–34.92% (0.36s) → mouth 34.92–46.35% (0.72s) → hold 46.35–100% (3.38s) |
| 인피니티 | `infinity` | 6s | draw 0–33% (~2s) → hold 33–100% (~4s) |
| 하트+커브 | `heart` | 7s | enter 0–14% (scale 0.3 → 1.15 → 0.95 → 1, opacity 0→1, spring overshoot) → hold 14–86% → exit 86–100% (opacity 1→0) |

stroke-dashoffset(`dasharray: 100`)와 `stroke-width: 0 → 2.5` 두 트랙을 동시에 돌려, 시작 순간 `width 0` 으로 점이 안 찍히고 자연스러운 진입을 만든다.

### 트리거 분리 (memory rule: 런처 애니메이션 트리거 규칙)

| 뷰포트 | 거동 |
|---|---|
| 모바일 (`<639.98px`) | **infinite loop** — hover affordance 없는 환경에서 모션이 직접 시선을 끔 |
| 웹 (`≥640px`) | **hover-only** — 정지 상태로 대기, 마우스 진입 시에만 사이클 재생 |
| `prefers-reduced-motion: reduce` | 모든 애니메이션 중지, 정지된 상태로 표시 |

### 버튼 스킨 (5종)

| id | 배경 | border / shadow | ink |
|---|---|---|---|
| `light` | `#FFFFFF` | border 6%, soft 2단 drop | `#231916` (다크) |
| `glass` | (3-layer) | border 35% white, 2단 drop | `#231916` |
| `brand-blue` | `#2563EB` | border 8% white, 4px 4px 0 15% drop | `#FFFFFF` |
| `brand-yellow` | `#FBE152` | 동일 | `#231916` |
| `dark` | 0→30% white inner gradient on `#000` | border 4% black, drop | `#FFFFFF` |

브랜드 블루 / 옐로우는 `::after` 로 `linear-gradient(180deg, transparent, rgba(64,64,64,0.12))` 를 `mix-blend-mode: multiply` 적용해 미세한 깊이감 추가.

**글래스 (Figma 27158:30870 1:1)**:
- 외곽 button: `border + drop shadow` 만
- `::before` (inset 0): `backdrop-filter: blur(10px)` + 두 layer linear-gradient (frosted)
- `::after` (inset 0, z-2): `inset 0 1px 1px 0 rgba(255,255,255,0.25)` (top specular highlight)
- 내부 svg는 `z-1` 로 둬서 `::after` highlight가 위에 오도록

### 부팅 정책 (memory rule)

매 방문은 **펜슬 + 라이트** 로 시작. localStorage 영속화 없음. 같은 세션 내 selector로 변경한 값은 페이지 새로고침 시 리셋.

### 개발 보조 — `LauncherVariantSelector`

패널이 닫혀있을 때만 노출. 모션 3종 + 스킨 5종 두 시트 동시 배치. 데스크탑은 좌하단 고정, 모바일은 좌하단 pill (탭 시 펼침).

---

## 7. BottomNav — Figma 27215:3512

| 속성 | 값 |
|---|---|
| 배치 | `absolute bottom-0 left-0 right-0` (`EnduserFrame` 자식) |
| 높이 | `64px` |
| 패딩 | `py-6` |
| 배경 | `rgba(255,255,255,0.88)` |
| backdrop-filter | `blur(3px)` |
| 상단 구분선 | `border-t var(--ht-border-default)` |
| 그림자 | `--ht-shadow-nav` |

### 탭 (3개)

| id | label | 아이콘 (active / inactive) |
|---|---|---|
| `home` | 홈 | `HomeFillIcon` / `HomeOutlineIcon` |
| `message` | 메시지 | `MessageFillIcon` / `MessageOutlineIcon` |
| `setting` | 설정 | `SettingFillIcon` / `SettingOutlineIcon` |

각 탭: `flex-1`, `self-stretch`, `py-6`, `rounded-100`, hit area는 가로 균등 분할.

### Active 표현 (V1 → V2 변경점)

V1의 슬라이딩 흰 pill / 좌·우 transition 코드 전부 **삭제**. V2는 색만으로 표현:

| 상태 | 아이콘 컬러 | 텍스트 컬러 |
|---|---|---|
| active | `--ht-icon-default` (`#111115`) | `--ht-text-default` (`#111115`) |
| inactive | `--ht-icon-subtle` (`#4E4E55`) | `--ht-text-subtle` (`#4E4E55`) |

220ms `ease-out` color transition. `aria-current="page"` on active.

채팅이 열려 있을 때는 `BottomNav`를 **렌더하지 않음** (`!chatOpen && <BottomNav />` in `EnduserFrame`).

---

## 8. Home 화면 — Figma 27314:1369 / 27313:18962

`HomeScreen.tsx`. **카드 모듈 컴포지션** (인터콤·채널톡 패턴).
회의 피드백 반영 (2026-05-07): 자잘한 요소·FAQ 미노출, 공지 → 알림 카드, 히어로 = 텍스트 박스 버튼, 채팅 유입 포커스 UX.

### 8.1 구조 (variant 공통)

```
[VariantBackground]                    절대 레이어 (배경 단색/그라데이션)
[Hero image]    img-01 / img-02 only — 420px 높이, dim 24% multiply
[Scroller — flex-1, overflow-y-auto]
  [Spacer]      img-* 만 (img-01 = 180 / img-02 = 360)
  [Panel]       px-16 pt-16 pb-100, gap-14, img-* 는 rounded-t-16 bg #F5F5F5
   ├─ BrandHeader            (브랜드명 24 + 운영시간 토글 fold/spread)
   ├─ ChatLandingCard        (어드민 boxType: ai-agent / inquiry)
   ├─ NoticeCard             (어드민 showNotice=true 일 때만)
   ├─ ChannelRow             (다른 문의하기 + 3 채널 심볼)
   └─ HappytalkLogo          (62×12, opacity 65, pt-20)
```

카드 4종 모두 `bg var(--ht-bg-card)` (white) + `rounded-16`. 자체 그림자 없음 (배경 그라데이션이 카드 면을 살림).

### 8.2 어드민 토글 (직교)

variant 6종은 **배경/이미지** 처리만 결정. 카드 컨텐츠는 어드민 토글 3개로 직교 분리.

| Prop | 값 | 효과 |
|---|---|---|
| `boxType` | `"ai-agent"` / `"inquiry"` | ChatLandingCard 의 inner textbox + action 변형 |
| `showNotice` | `boolean` | NoticeCard 노출 여부 (기존 고객 마이그레이션 호환) |
| `responseStatus` | `"ai"` / `"fast"` / `"normal"` / `"slow"` / `"offline"` | ResponseBadge 도트 색 + 카피 |

`page.tsx` 의 `AdminToggleSelector` 로 데모 시 토글. 실서비스에선 이 3 값을 어드민 콘솔에서 변경.

### 8.3 BrandHeader

```
브랜드명 "킨더살몬"  — 24px SemiBold default, leading-8
운영시간 토글       — 14px Medium subtle, ghost (px-2 py-2 rounded-6)
                     + chevron 16 muted (200ms rotate)
펼침 시 추가 3행    — 평일 9-18시 / 토요일 10-17시 / 일요일 10-17시 (px-8 gap-2)
```

기존 V2의 `StatusRow` 우측 배지 (22명 대기 · 5분 예상, 상담 원활 · 2명) 는 **삭제됨** — 회의 피드백 "자잘한 요소 미노출". 대기 인원·응답 상태는 ChatLandingCard 하단의 ResponseBadge 한 줄로 통합.

### 8.4 ChatLandingCard — Figma 27314:1562

외곽 white 카드 (`rounded-16 px-10 py-8 gap-8`). 안쪽 3 영역:

#### 8.4.1 Inner Textbox Button

`<button>`. 클릭 → `onOpenChat()` (채팅 진입).

| boxType | 라벨 | greeting | 스타일 |
|---|---|---|---|
| `ai-agent` | `AiSparkleIcon` 24 + "AI 에이전트" 12 medium 70% default | "안녕하세요, 킨더살몬이에요. 무엇을 도와드릴까요? AI에게 질문하고 빠른 답변을 받아 보세요." 15 default 80% — `pl-30` (sparkle 아이콘 너비만큼 들여쓰기) | bg transparent (외곽 카드 white 가 그대로 비침), p-8, gap-8 |
| `inquiry` | "킨더살몬" 12 medium 70% subtle (아이콘 없음) | "안녕하세요, 고객님의 옷장에서 오래도록 남고 싶은 브랜드 킨더살몬이에요. 무엇을 도와드릴까요? 아래 버튼 선택 후 문의 내용을 남겨주시면 빠르게 상담을 도와드리겠습니다." 15 default 80% | bg `#F4F4F5` (살짝 muted 카드-안-카드), px-10 py-8, gap-6 |

`ht-card-press` (hover 4% / active 6% black ::after, scale 0.98).

#### 8.4.2 Action — Figma 27342:1064 / 27313:18693

`boxType="ai-agent"` → **AI Input** (의사 인풋 + send 버튼)

| 속성 | 값 |
|---|---|
| 컨테이너 | h-52, rounded-16, pl-16 pr-8 py-10, justify-between |
| 배경 | `var(--ht-bg-subtle)` (#FAFAFA) |
| 보더 | `1px solid #FFF100` (브랜드 옐로우 강조) |
| 플레이스홀더 | "AI 에이전트에게 문의해 보세요." 14 hint, tracking -0.6px |
| Send 버튼 | 36×36 rounded-12, bg `var(--ht-bg-inverted)`, 1px default border, `SendPlaneIcon` 20 white |

→ 인풋 클릭 = send 클릭 = 전체 박스 클릭, 모두 `onOpenChat()` (채팅 진입). UX 의도: **타이핑 시도 = 채팅 시작 트리거**, 위젯이 본격 채팅 화면을 열어 거기서 입력.

`boxType="inquiry"` → **검정 CTA 버튼**

| 속성 | 값 |
|---|---|
| 컨테이너 | full, rounded-16, px-16 py-14 |
| 배경 | `var(--ht-bg-inverted)` (#18181B) |
| 보더 / 그림자 | 1px rgba(255,255,255,0.2) + `0 1px 2px rgba(0,0,0,0.08) + inset 0 -1px 0 rgba(0,0,0,0.08)` |
| 라벨 | "문의하기" 16 SemiBold white |
| 클래스 | `ht-cta-button` (hover scale 1.02 + shadow 강화 + icon wobble 600ms) |

#### 8.4.3 ResponseBadge — Figma 27343:1126

5 단계 응답 상태 표기. 8×8 도트 + 12px medium muted 카피.

| status | 도트 | 카피 |
|---|---|---|
| `ai` | `#4FC660` | AI가 바로 답해드려요 |
| `fast` | `#4FC660` | 빠르게 답해드려요 |
| `normal` | `#FACC15` | 문의가 많아 상담 연결까지 시간이 걸려요 |
| `slow` | `#FB923C` | 문의가 많아 상담 연결이 지연될 수 있어요 |
| `offline` | `#A1A1AA` | 운영 시간에 문의해 주세요 |

`ai-agent` 박스의 자연스러운 짝은 `ai` 상태이고 `inquiry` 박스는 운영 상황에 따라 fast/normal/slow/offline 중 하나. 어드민이 직접 매핑.

### 8.5 NoticeCard

기존 V2의 "공지 SectionGroup + NoticeCard" 가 **단일 카드**로 재편. 채널톡의 알림 카드 패턴.

| 속성 | 값 |
|---|---|
| 컨테이너 | rounded-16, px-16 py-10, gap-4, bg white |
| 라벨 | "알림" 12 subtle 70% + 빨간 점 4×4 (`#FF3D3D`, rounded-4) — 새 알림 표시 |
| 본문 | 14 default `line-clamp-2` (예: 추석 명절 배송 일정 안내) |

어드민 `showNotice=false` 면 통째로 숨김. 기본값 `false` (자잘한 요소 미노출 정책). 기존 고객 (V1 시안) 은 `true` 로 마이그레이션해서 호환.

### 8.6 ChannelRow

라벨 `다른 문의하기` (V2의 "다른 채널로 문의하기" → 시안 카피 그대로). bg white, rounded-16, px-16 py-8.

| 채널 | 색 | 비고 |
|---|---|---|
| 네이버 톡톡 | 그라데이션 그린 (`#00d44d → #00e56d`) | 코드는 `NaverTalkIcon` 단색 그린 — 시안과 미세 차이 |
| 카카오톡 채널 | `#FEE500` + 검정 TALK 로고 | `KakaoChannelIcon` |
| 전화 | white + default border | `PhoneCircleIcon` |

각 심볼: 36×36 rounded-12 `ht-pressable` + 1px default border. FAQ / 검색 영역은 통째로 **삭제됨**.

### 8.7 6 Variant — 배경/이미지만 차이

| id | 배경 | hero | 비고 |
|---|---|---|---|
| `none` | `#F5F5F5` 단색 | — | 기본 |
| `gra-onecolor` | linear `#E2F5FF → #F5F5F5 64%` | — | 옅은 블루 |
| `gra-linear` | linear `#FEFFCB → #F3FFEE 16% → #F5F5F5 50%` | — | 연두 → 노랑 |
| `gra-radial` | radial ellipse 200%×100% top, `#FEFFCB → #F3FFEE 24% → #F5F5F5 64%` | — | 위 중앙 발광 |
| `img-01` | `#F5F5F5` (panel) | hero 420px, 카드 영역 top-180 | hero 위 180px 노출 |
| `img-02` | `#F5F5F5` (panel) | hero 420px, 카드 영역 top-360 | hero 거의 전부 노출 |

스크롤 인터랙션 (img-* 만, 기존 V2 로직 유지):
- 다운스크롤 → hero 이미지/딤 동시 scale 1 → 0.8 (`requestAnimationFrame`)
- 오버스크롤 (negative scrollTop / touch pull) → hero height 가 down으로 늘어남 (max +420)
- 터치 종료 시 cubic ease 280ms로 복귀
- panel 은 `rounded-t-16 bg #F5F5F5` 로 hero 위에 슬라이드

---

## 9. Chat 화면 (`ChatScreen.tsx`)

### 9.1 진입 / 퇴장

`EnduserFrame` 가 chat 오버레이로 렌더 (z-30). 슬라이드 인 (`ht-slide-in-right` 400ms) + 배경 dim 15% (`ht-backdrop-dim-in`) + 뒤 스크린 scale 0.97 (`ht-depth-in`). 퇴장 350ms.

진입 직후 300ms 동안 ChatSkeleton (shimmer 1.4s) → 실제 ChatScreen.

### 9.2 인트로 / 응답

- **INTRO_BODY**: BRAND_BODY (`🌸` greeting, kindersalmon 톤)
- **INTRO_CHIPS** 5종: 배송 / 상품 / 교환·반품 / 결제 / 회원·포인트
- **RESPONSES** dict: 27개 chip / card label → body + chips 매핑

### 9.3 카드 4종 — Figma 25535:5189

| type | 폭 | hero 높이 | 액션 구성 |
|---|---|---|---|
| `img-01` | 256 | 208 | primary + coupon + secondary (세로 6px gap) |
| `img-02` | 256 | 280 | 동일 |
| `img-wide` | 328 | 220 | primaryA / primaryB grid-2 + coupon |
| `carousel` | (가변) | — | `Img01Card` 가로 스크롤, gap-8, 좌우 -16 padding |

공통 셸: `border #e5e5e5`, `rounded-12`, white bg, `overflow-hidden`. 본문은 padding 12, 14px medium `#38373E` `whitespace-pre-line`. CtaButton: `h-36 rounded-6`, bg subtle, 1px card border, 카드 shadow. CouponButton: 좌(타이틀 + desc) + 우(20px Gift icon).

### 9.4 버블 그룹화

부모 flex `gap-24px`. 같은 화자 연속 시 `margin-top: -20px` (`globals.css`):
```
.ht-user-row + .ht-user-row,
.ht-agent-row + .ht-agent-row { margin-top: -20px; }
```
→ 다른 화자 24px / 같은 화자 4px 효과.

### 9.5 IME 가드 (memory rule)

InputBar Enter 핸들러에 `e.nativeEvent.isComposing || e.keyCode === 229` 체크 — 한글 조합 중 Enter 무시. 조합 종료 후 Enter 만 send 실행.

### 9.6 Hover overlay

`.ht-card-press::after`: `inset: -4px`, `border-radius: 16px` → 행보다 4px 큰 hit/highlight 영역. hover 4% black, active 6% + scale 0.98.

### 9.7 영구화

- `transcriptsRef: Map<conversationId, TranscriptItem[]>` — 룸 닫힐 때 마지막 transcript 스냅샷 저장
- `pendingTranscriptRef`: ChatScreen에서 변경마다 push되는 latest snapshot
- `activeConversationIdRef`: null = 새 룸 (close 시 prepend) / string = 기존 룸 (close 시 in-place 업데이트)
- 활동(chip / card / send) 발생한 룸만 메시지 리스트에 등재. INTRO 직후 닫으면 미등재.

---

## 10. Message 화면 (`MessageScreen.tsx`)

### 10.1 헤더 (h-56)

`메시지` (lg/SemiBold). 우측 `전체 삭제` 버튼은 `conversations.length > 0` 일 때만. 모바일은 `pr-56` 으로 닫기 X 와 겹치지 않도록 안전 패딩.

### 10.2 빈 상태 (Figma 27158:30643)

`<EmptyContent />` — 중앙 정렬, `pb-148` (floating 버튼 + 네비 영역 예약). `/blum-empty.svg` (39×61) + `첫 대화를 시작해 보세요.` 캡션 (subtle).

### 10.3 리스트 (Figma 26991:17957)

행 컨테이너: `px-20 pt-16 pb-160 gap-20 overflow-y-auto`. 각 행에 `ht-reveal` (300ms ease-out, 60ms 간격 stagger, 최대 5개).

행 (MessageRow):
- `ht-card-press` `rounded-12`
- 상단: status (sm/SemiBold) + timeLabel (xs/Normal subtle, shrink-0)
- 본문: 14px `line-clamp-2` `lineHeight: 23px`

`formatRelativeTime`:
- 1분 미만 → `방금 전`
- 1시간 미만 → `N분 전`
- 24시간 미만 → `N시간 전`
- 24h 이상 → `""` (라벨 숨김)

### 10.4 InquireButton (플로팅)

| 속성 | 값 |
|---|---|
| 컨테이너 | `absolute left-0 right-0 bottom-100`, `pointer-events-none` |
| 버튼 | `inline-flex items-center gap-4 rounded-16 px-24 py-12`, white text, dark bg, modal-lg shadow |
| 라벨 | 16px SemiBold + SendIcon (Figma 27158:30705) |
| 클릭 | `onStartNewChat` → `openChat(true)` |

`pointer-events-none` 래퍼 + `pointer-events-auto` 버튼 패턴으로 wheel/touch 스크롤이 리스트로 통과.

---

## 11. Setting 화면 (`SettingScreen.tsx`)

### 11.1 메인 뷰

`SettingView = "main" | "profile"`. 메인은 헤더 (`설정`) + 본문 (`px-20 py-16 gap-12`).

| 행 | 구성 |
|---|---|
| 개인 정보 | `36px ht-pressable` row — 14px medium default + 우측 chevron (16) → `view = "profile"` |
| 텍스트 크기 | 좌측 라벨 + 우측 SegmentedControl (`작게` / `크게`) — Figma 26991:18012 flat row |

SegmentedControl: bg `rgba(39,39,42,0.06)` rounded-8, 옵션 px-10 py-6 rounded-6. active = white bg + darker border + card-like shadow.

### 11.2 프로필 뷰

헤더: 좌측 chevron-left + `설정` (back to main).

```
이름      input (placeholder, readonly when saved)
이메일    input (placeholder, readonly when saved)
액션 (우정렬, gap-8):
  - saved=false → [저장] (canSave 일 때만 활성)
  - saved=true  → [수정] [정보 삭제]
```

저장 / 정보 삭제는 로컬 state 만, 외부 IO 없음. (실제 백엔드 연동 미구현)

프로필 뷰 진입 중에는 위젯 모바일 X 버튼 숨김 → back 버튼이 닫기 역할.

---

## 12. 모달 (`ConfirmModal` in `EnduserFrame`)

오버레이 모달, `EnduserFrame` 내부에 `absolute inset-0 z-60`. 좌표계 위젯 내부.

| 항목 | 스타일 |
|---|---|
| 백드롭 | `rgba(0,0,0,0.4)` |
| 컨테이너 | `bg white rounded-16 max-w-360 modal-lg shadow` |
| 헤더 | `min-h-60 p-24 border-b`, 16px SemiBold |
| 푸터 | `flex justify-end gap-8 min-h-60 p-16`, 액션 우정렬 |
| Cancel | rounded-full, 6% bg, default ink |
| Confirm | rounded-full, inverted bg, white ink |

사용처:
- **상담 종료** (`endChatConfirm`): chat 열림 + 모바일 X 클릭 시
- **전체 삭제** (`deleteAllConfirm`): 메시지 헤더 `전체 삭제`

---

## 13. Motion 시스템 (`globals.css`)

### 13.1 Duration / Easing

| 카테고리 | 권장 |
|---|---|
| Micro | 120–180ms ease-out |
| Standard | 200–280ms cubic-bezier(0.2, 0.8, 0.2, 1) |
| Complex (in) | 300–400ms cubic-bezier(0.22, 1, 0.36, 1) |
| Complex (out) | 300–400ms cubic-bezier(0.4, 0, 0.2, 1) |

### 13.2 Screen / Slide / Dim / Depth

| 클래스 | 효과 |
|---|---|
| `ht-screen-in` | opacity 0→1, 180ms cubic-bezier(0.2, 0, 0, 1) |
| `ht-screen-out` | opacity 1→0, 180ms |
| `ht-slide-in-right` | translate3d 100% → 0, 400ms cubic spring + `-4 0 16 8%` shadow |
| `ht-slide-out-right` | 역방향, 350ms ease-out |
| `ht-backdrop-dim-in` | 0 → 100% opacity, 400ms (rgba(0,0,0,0.15) base) |
| `ht-backdrop-dim-out` | 350ms |
| `ht-depth-in` | scale 1 → 0.97, 400ms |
| `ht-depth-out` | 0.97 → 1, 350ms |
| `ht-skeleton` | shimmer 1.4s ease-in-out infinite |
| `ht-reveal` | translateY 16 → 0 + opacity 0→1, 300ms ease-out |

### 13.3 Pressable / Card press

| 클래스 | 효과 |
|---|---|
| `ht-pressable` | hover 후 ::after `rgba(0,0,0,0.04)`, active scale 0.96 (80ms) |
| `ht-card-press` | hover 4% / active 6% black ::after, active scale 0.98, ::after `inset: -4px` `border-radius: 16px` |
| `ht-cta-button` | hover scale 1.02 + shadow 강화, hover 시 `.ht-cta-icon` wobble 600ms |
| `ht-launcher` | entrance 500ms cubic spring (rotate 180deg + scale 0→1), hover scale 1.08, active scale 0.92 |

### 13.4 prefers-reduced-motion

- 화면 전환은 fade-only (transform 제거)
- pressable / card-press active scale 무력화
- 런처 모션 정지 (모든 keyframe + transform 무효화)

---

## 14. ht-* 유틸 클래스 인덱스

| 클래스 | 위치 | 역할 |
|---|---|---|
| `ht-root` | `globals.css` | font + tracking 적용 루트 (EnduserFrame 에 부여) |
| `ht-frame` | 위젯 박스 | 반응형 크기 + 외곽 border / shadow |
| `ht-frame-overlay` | 위젯 외곽 ring | 항상 위 |
| `ht-frame-dock` | dock 위치 | sm 이상에서 fixed |
| `ht-screen-in` / `out` | 탭 전환 | cross-fade |
| `ht-slide-in-right` / `out` | 채팅 슬라이드 | 400/350ms |
| `ht-backdrop-dim-in` / `out` | 채팅 dim | 0↔15% |
| `ht-depth-in` / `out` | 뒤 스크린 scale | 0.97 |
| `ht-skeleton` | shimmer | 1.4s |
| `ht-reveal` | 행 등장 | translateY + fade |
| `ht-pressable` | 작은 버튼 | hover dim + active scale |
| `ht-card-press` | 큰 행/카드 | -4px overlay + scale 0.98 |
| `ht-cta-button` | 1차 CTA | hover scale + icon wobble |
| `ht-launcher` | 런처 셸 | entrance + hover |
| `ht-launcher-pencil` / `infinity` / `heart` | 런처 모션 | 위 §6 참고 |
| `ht-launcher-style-*` | 런처 스킨 | 위 §6 참고 |
| `ht-blur-backdrop` | blur 8px | 옵션 유틸 |

---

## 15. 파일 인덱스

```
app/happytalk-enduser/
├─ page.tsx                           ← 페이지 + 런처 selector + 위젯 마운트
├─ preview/page.tsx                   ← 디바이스 프리뷰 (iframe matrix)
└─ _components/
   ├─ EnduserFrame.tsx                ← 위젯 셸, 탭 라우팅, 채팅 오버레이, 모달, 글자 모드
   ├─ HomeScreen.tsx                  ← 홈 6 variant + StatusRow + PrimaryCTA + ChannelRow + FAQ
   ├─ MessageScreen.tsx               ← 대화 리스트 / 빈 상태 / InquireButton
   ├─ SettingScreen.tsx               ← 메인 + 프로필 뷰 + SegmentedControl
   ├─ ChatScreen.tsx                  ← 헤더 / 트랜스크립트 / 칩 / 입력 / IME 가드
   ├─ ChatCard.tsx                    ← img-01 / img-02 / img-wide / carousel
   ├─ ChatSkeleton.tsx                ← shimmer placeholder
   ├─ BottomNav.tsx                   ← 풀-너비 하단 바 (V2)
   ├─ Launcher.tsx                    ← 60×60 버튼 + closeMode + style/variant 디스패치
   ├─ launcher.css                    ← 5 스킨 + 3 모션 keyframes + 트리거 분리
   ├─ LauncherVariantSelector.tsx     ← 개발 보조 (모션 + 스킨 토글)
   ├─ VariantSelector.tsx             ← 홈 6 variant 토글
   ├─ Icons.tsx                       ← Outline / Fill 아이콘 + 채널 아이콘 셋
   ├─ chatCards.ts                    ← INTRO_BODY / 카드 데이터 / RESPONSES
   └─ types.ts                        ← HomeVariant / NavTab / LauncherVariant / LauncherStyle / ConversationSummary
```

`app/globals.css` — `ht-*` 토큰 + 모션 시스템 + 인터랙션 유틸 일체.

---

## 16. 미해결 / 보류

- **백엔드 연동** — 프로필 저장, 대화 영구화는 메모리 레벨만 구현. 새로고침 시 휘발.
- **위젯 진입 = 채팅 직행 옵션** — 회의 피드백 #6 "홈버튼 → 채팅 화면 바로 나타나는 플로우". 현재는 홈 카드 모듈 클릭 시점에 채팅 진입. 위젯 첫 진입 자체를 홈 스킵하는 옵션은 어드민 토글로 별도 추가 검토.
- **다른 문의하기 심볼 색** — 시안의 네이버 톡톡 그라데이션 (`#00d44d → #00e56d`) 은 코드의 `NaverTalkIcon` 단색 그린 (`#00C63B`) 으로 근사. 디테일 매칭은 차후.
