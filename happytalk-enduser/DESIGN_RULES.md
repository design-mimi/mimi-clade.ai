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

## 8. Home 화면 — Figma 27215:1733

`HomeScreen.tsx`. `variant: HomeVariant` prop 으로 6종 분기.

### 8.1 구조 (variant 공통)

```
[Brand area]                                  px-20, pt-28, pb-20, gap-16
├─ Group 1 (gap-12)
│   ├─ 브랜드명 (24px SemiBold)
│   ├─ 설명 (15px opacity-80)         ← default-compact는 숨김
│   └─ StatusRow                       ← V1에서는 CTA 아래였음
└─ Group 2 (gap-8)
    ├─ PrimaryCTA (`문의하기`)
    └─ ChannelRow (`다른 문의하기`)    ← V1에서는 QnA 섹션이었음

[QnA area]                                    px-20, pb-12, gap-20
├─ 공지 SectionGroup
│   └─ NoticeCard
└─ 자주 묻는 질문 SectionGroup
    ├─ SearchInput
    └─ FaqCard (max-h-280, overflow-y-auto)

[푸터]
└─ HappytalkLogo (62×12, opacity 65, pt-20)

[하단 여백]
└─ pb-100 (BottomNav 위 여백 확보)
```

### 8.2 StatusRow

좌측: 운영시간 토글 버튼. 우측: 두 배지.

| 요소 | 스타일 | 거동 |
|---|---|---|
| 운영시간 버튼 | `9-18시 운영 중 ⌄`, 14px medium subtle, ghost (`px-8 py-4 rounded-6`) + chevron 16 muted | 클릭 시 `open` 토글 — 200ms rotate, 펼침 시 평일/토/일 운영시간 3행 노출 |
| 화이트 배지 | `22명 대기 · 5분 예상`, 12px medium subtle, white bg + 10% border, rounded-full, py-4 px-8, backdrop-blur 2px | **모바일(`<sm`)에서는 `hidden`** (시안 노출용 임시 정책, 4값 동시 노출 배치 문제는 보류) |
| 그린 배지 | `상담 원활 · 2명`, 12px medium `#33803F`, `rgba(102,220,126,0.1)` bg + 10% border, rounded-full, py-4 px-8 | 항상 노출 |

### 8.3 PrimaryCTA — `문의하기`

| 속성 | 값 |
|---|---|
| 너비/높이 | full / `48px` |
| 라운드 | `16px` |
| 배경 | `#18181B` |
| Border | `1px rgba(255,255,255,0.2)` |
| Shadow | `0 1px 2px 0 rgba(0,0,0,0.08)` + inset `0 -1px 0 0 rgba(0,0,0,0.08)` |
| Label | `md/SemiBold` white |
| 클래스 | `ht-cta-button` (hover scale 1.02 + shadow 강화 + icon wobble 600ms) |
| onClick | `openChat(true)` — fresh new chat, 활동 마킹 후 INTRO_BODY로 메시지 행 등재 |

### 8.4 ChannelRow — `다른 문의하기`

| 속성 | 값 |
|---|---|
| 컨테이너 | full, `rounded-16`, bg `rgba(245,245,245,0.88)`, border default, px-16 py-8 |
| Label | 14px regular subtle |
| 우측 아이콘 그룹 | NaverTalk / KakaoChannel / Phone (각 `36×36 rounded-12 ht-pressable`) |

### 8.5 QnA — 자주 묻는 질문

- **데이터셋**: `FAQS` 56 항목 / 8 카테고리 (배송 8 / 상품 10 / 교환·반품 8 / 주문 6 / 결제 5 / 회원·포인트 6 / 이벤트 4 / 매장 4 / 기타 5) — kindersalmon 테마
- **검색 전**: 처음 2 항목 표시
- **검색 입력 후**: question 또는 category 부분일치 (대소문자 무시)
- **컨테이너**: `max-h-280 overflow-y-auto` — 결과가 길어도 페이지 스크롤은 그대로, 컨테이너 내부에서 스크롤
- **빈 결과**: "검색 결과가 없습니다." (subtle)

### 8.6 6 Variant

| id | 배경 | hero 영역 | 비고 |
|---|---|---|---|
| `default` | white | — | 기본 |
| `default-compact` | white | — | 설명 텍스트 숨김 |
| `gradient-line` | 선형 `#FEFFCB → #F3FFEE → #FAFAFA` (180°) | — | |
| `gradient-oval` | 방사형 ellipse 200% 100% from top | — | |
| `brand-image` | white | hero 260px (스크롤 shrink scale → 0.8 / pull-down stretch up to 2x) | rounded-t-20 콘텐츠가 위로 슬라이드 |
| `brand-image-tall` | white | hero 430px | brandName "KINDERSALMON" |

스크롤 인터랙션 (brand-image\* 만):
- 다운스크롤 → 히어로 이미지/딤 동시 scale 1 → 0.8 (`requestAnimationFrame`)
- 오버스크롤 (negative scrollTop / touch pull) → 히어로 영역 height 가 down으로 늘어남 (max +260)
- 터치 종료 시 cubic ease 280ms로 복귀

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

- **StatusRow 4값 동시 노출 배치** — 현재 모바일에서는 화이트 배지(대기/예상)를 숨기는 임시 정책. 설정값이 모두 노출될 때의 정돈된 레이아웃은 차후 정리.
- **백엔드 연동** — 프로필 저장, 대화 영구화는 메모리 레벨만 구현. 새로고침 시 휘발.
- **CEO 1차 보고 후속 피드백** — 문의하기 / 다른 문의하기 위계 정리, 상담 원활 배지를 브랜드명 영역으로 이동(부분 적용), 하단 플로팅 외 고정형 메뉴 옵션, 채팅 기본 아이콘 메타포 재고 → 이슈 트래킹은 별도.
