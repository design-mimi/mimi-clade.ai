# 해피톡 Enduser 디자인 규칙 — V1 (동결)

> **이 문서는 1차 시안 시점의 동결 스냅샷입니다.**
> - 운영용 최신 스펙은 [`DESIGN_RULES.md`](./DESIGN_RULES.md)(V2) 참고.
> - 배포 URL: `happytalk-enduser-v1.vercel.app/happytalk-enduser` (별도 Vercel 프로젝트, `v1-archive` 브랜치 추적).
> - V2 작업이 V1을 건드리지 않도록 의도적으로 분리되어 있으니, 이 문서는 **수정하지 않습니다**.

---

피그마 확정 디자인에서 추출한 디자인 토큰 및 컴포넌트 규칙.
구현 시 이 문서를 기준으로 spacing/radius/color/typography를 토큰화한다.

Figma file: `fsAYYE5LmDVbSLnx53loNg` (해피톡)

---

## 1. 폰트 (Typography)

- **Font family:** `SUIT` (body + headline 공통)
- **Letter-spacing:** `-0.25px` (모든 텍스트 공통)

| Token | Size | Line-height | Weight | 용도 |
|---|---|---|---|---|
| `2xl/SemiBold` | 24 | 32 | 600 | 메인 헤드라인 (브랜드명 큰 버전) |
| `lg/SemiBold` | 18 | 28 | 600 | 페이지 헤더 ("설정", "메시지") |
| `md/SemiBold` | 16 | 24 | 600 | 강조 본문, 주요 버튼 |
| `md/Normal` | 16 | 24 | 400 | 설정 리스트 레이블 |
| `sm/SemiBold` | 14 | 20 | 600 | 발신자 이름, 카드 타이틀 |
| `sm/Medium` | 14 | 20 | 500 | 버튼 레이블, 칩 레이블 |
| `sm/Normal` | 14 | 20 | 400 | 본문, 메시지 텍스트 |
| `xs/Medium` | 12 | 16 | 500 | 배지 텍스트 |
| `xs/Normal` | 12 | 16 | 400 | 타임스탬프, 보조 텍스트 |
| (커스텀) | 11 | 16 | 400 | 하단 탭바 레이블 |

---

## 2. 컬러 (Color)

### Text
- `text/default` `#111115` — 기본
- `text/subtle` `#4e4e55` — 부가 정보, 타임스탬프
- `text/muted` `#6f6f77` — 인풋 placeholder, 비활성 탭
- `text/hint` `#27272a4d` — 힌트
- `text/inverted-default` `#ffffff` — 다크 배경 위

### Background
- `bg/default` `bg/card` `bg/input` `#ffffff`
- `bg/subtle` `#fafafa`
- `bg/muted` `#f4f4f5` — FAQ 카드
- `bg/inverted` `#18181b` — CTA 버튼, 발신 메시지 버블
- `bg/badge/default` `#ffffff`
- `bg/badge/green` `#66dc7e1a` — 상태 배지 ("상담 원활")

### Border
- `border/default` `#27272a1a` (10% alpha) — 기본
- `border/darker` `#27272a26` (15% alpha) — 강조
- `border/inverted` `#ffffff33` — 다크 배경 위

### Accent (Green)
- `bg/basic/green-accent` `bg/switch/active` `#4fc660` — 스위치 ON, 강조

### Icon
- `icon/default` `#111115`
- `icon/default-subtle` `#4e4e55`
- `icon/default-muted` `#6f6f77`
- `icon/default-disabled` `#27272a40`
- `icon/white-default` `#ffffff`

---

## 3. 간격 (Spacing)

스케일: **2, 4, 6, 8, 10, 12, 14, 16, 20** (모두 px)

주요 적용:
- 아이콘-레이블 갭: **6px**
- 인풋/버튼 내부 좌우 패딩: **12px**
- 카드/섹션 외곽 패딩: **16px**
- 리스트 아이템 간 간격: **20px**
- 설정 리스트 좌우 패딩: **20px**
- 헤더 좌우 패딩: **16px**, 상하: **12px**

---

## 4. 라운드 (Border Radius)

| Token | 값 | 용도 |
|---|---|---|
| `none` | 0 | — |
| `default` | 1 | — (거의 안 씀) |
| `md` | 8 | 작은 요소 |
| `lg` | 12 | 인풋, 메시지 버블 |
| `xl` / `Card/lg` | 16 | 카드, 입력 컨테이너, **Primary CTA 버튼** |
| `rounded-3xl` | 24 | 칩 버튼, 메인 컨테이너 |
| (커스텀) | 32 | 플로팅 헤더 |
| (커스텀) | 100 | 네비 탭 아이템 |
| `full` | 9999 | 스위치, 아바타, 추천 칩, "다른 문의하기" pill 버튼 |

---

## 5. 섀도우 (Shadow)

- **`shadows/card`** — 기본 카드
  `0 1px 2px 0 #0000000D` + inner `0 -1px 0 0 #0000001A`
- **`components/default`** — 컴포넌트 기본
  `0 1px 2px 0 #0000000D` + inner top `#00000014` + inner border `#27272a26`
- **`drop-shadow/xs`** — 가장 얕은 드롭
  `0 1px 1px 0 #0000000d`
- **`drop-shadow/md`** — 중간 드롭
  `0 3px 3px 0 #0000001f` (네비바 사용)
- **`shadow/lg`** — 2단 드롭
  `0 10px 15px -3px #0000001A` + `0 4px 6px -4px #0000001A` (플로팅 헤더)
- **`shadows/modal-lg`** — 5단 모달
  1/3/6/12/16px 오프셋 누적 + `0 0 0 1px border/default`
- **`shadows/switch-handle`**
  `0 1px 3px 0 #00000014` + `0 1px 2px -1px #00000014`

---

## 6. 프레임/화면 규칙

- **앱 프레임:** 약 **360×780** 기준, 라운드 **16px**, 외곽 border `1px rgba(0,0,0,0.1)`, `shadows/modal-lg` 적용
- **안전 영역:** 좌우 패딩 16px, 하단 네비 플로팅 (bottom 11px, 좌우 중앙)

---

## 7. 카드 규칙

### FAQ/리스트 카드
- 배경: `bg/muted` `#f4f4f5`
- 라운드: **12px**
- 내부 패딩: 12–16px
- 타이틀(카테고리 라벨): `xs/Normal` `text/subtle`
- 본문: `sm/Normal` `text/default`

### 메시지(받은) 카드 — 이미지+텍스트+CTA 복합
- 배경: `#ffffff`
- 라운드: **12px**
- 보더: `1px #e5e5e5`
- 고정 width 256px
- 이미지(상단) → 텍스트(12px 패딩) → 버튼 그룹(하단, 8px 간격)
- 내부 버튼: height 36px, radius 6px, bg `#fafafa`, border `rgba(0,0,0,0.12)`

---

## 8. 말풍선(Bubble) 규칙

### 받은 메시지 (에이전트)
- 이름 + 타임스탬프 (갭 8px) → 본문
- 이름: `sm/SemiBold` `text/default`
- 시간: `xs/Normal` `text/subtle`
- 본문: `sm/Normal` `text/default` (말풍선 없이 플랫)

### 보낸 메시지 (유저)
- 우측 정렬, max-width 300px
- 배경 `bg/inverted` `#18181b`, 텍스트 `text/inverted-default`
- 라운드 `12px 12px 0 12px` (우하단만 각짐)
- 패딩: 상하 6px, 좌우 14px

### 추천 칩 (하단 suggestion)
- 배경 `#ffffff`, border `1px rgba(0,0,0,0.12)`
- 라운드 **24px** (`rounded-3xl`)
- 패딩: 상하 8px, 좌우 12px
- 텍스트: `sm/Medium`

---

## 9. 버튼 규칙

### Primary CTA (문의하기)
- 배경 `bg/inverted` `#18181b`, 텍스트 white
- 풀 width, height **48px**, 라운드 **16px** (xl)
- border `1px rgba(255,255,255,0.2)` (border/inverted)
- shadow `0 1px 2px 0 rgba(0,0,0,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.08)`
- 라벨 `md/SemiBold` + lead-icon (16px send arrow), 갭 4–8px

### Input-like button (다른 문의하기)
- 배경 `#ffffff`, border `border/default`
- 라운드 **full**
- 우측에 채널 아이콘(카톡/채팅/전화) 그룹 (size 24–28px, 원형)

### Pill button (suggestion, 배송 정책 등)
- 스타일: Secondary / Shape: Pill / Size: lg
- 배경 white, border 있음

### Icon-only button (입력창 내)
- style: Soft / Primary, shape: Pill, size: xs

---

## 10. 입력창 (Input)

- 컨테이너: 하단 플로팅, width 343px, radius 16px (`Card/lg`)
- 배경 `bg/input` `#ffffff`, border `border/default`
- 패딩: 상 10px, 하 12px, 좌우 12px
- `shadows/modal-sm` 적용
- 내부: 아이콘 버튼들 + placeholder (`sm/Normal` `text/muted`) + 전송 아이콘 버튼

---

## 11. 배지 (Badge)

- **상태 배지 ("상담 원활")**: 녹색 `bg/badge/green` `#66dc7e1a`, 라운드 full, `xs/Medium`
- **시간 배지 ("9-18시 운영")**: 배경 `bg/badge/default` `#ffffff`, border 있음, 라운드 full
- **날짜 배지 (채팅)**: Neutral, shape Rounded, size lg, border 있음

---

## 12. 리스트 아이템 (설정/메시지)

### 설정 리스트
- 아이콘(16px) + 레이블(`md/Normal`) + (옵션) chevron(16px) / Switch
- 행간 간격 **20px**

### 메시지 리스트 아이템
- 상단: 상태 레이블(`sm/SemiBold`) + 시간(`xs/Normal` `text/subtle`)
- 하단: 본문(`sm/Normal`) 1–2줄 ellipsis
- 행간 간격 20px, 좌우 패딩 20px

---

## 13. 하단 네비바 (공통)

- 플로팅 pill, `bottom: 11px`, 좌우 중앙
- 배경 `rgba(245,245,245,0.8)` + `backdrop-blur 2px`
- border `border/default`, radius **full(9999px)**
- 섀도우: `drop-shadow/md`
- 탭: 3개 (홈/메시지/설정), 각 width 64px, py 6px, radius 100px
- 아이콘 20px + 레이블 **11px**
- 활성 탭: 흰 배경(`rgba(255,255,255,0.12)` + border), 텍스트 `text/default`
- 비활성 탭: 텍스트 `text/subtle`

---

## 14. 상단 헤더

### 페이지 헤더 (메시지/설정)
- 배경 white, border-bottom `rgba(0,0,0,0.08)`
- 패딩: 좌우 16px, 상하 12px
- 타이틀: `lg/SemiBold`
- 우측 액션 버튼 (옵션): pill 스타일

### 플로팅 뒤로가기 (채팅)
- 좌상단 절대 배치 (top: 9px, left: 9px)
- 배경 `rgba(255,255,255,0.92)` + border, radius 32px
- `shadow/lg` 적용, 아이콘 20px

---

## 15. 홈 배경 변형 (Variant)

| Variant | 배경 |
|---|---|
| `home-default` (Plain) | 순수 white |
| `home-gradient-line` | 대각선 옐로우/라임 그라데이션 |
| `home-gradient-oval` | 상단 라임/연녹 원형 그라데이션 |
| `home-circle` | 미묘한 이리데센트/오로라 글로우 |
| `home-brand-image` | 상단 히어로 이미지 + 카드 오버레이 |

카드/컴포넌트 레이아웃은 variant 간 동일, 배경만 교체.


## Motion System

### 1. Global Motion Rules

- Duration
  - micro interaction: 120–180ms
  - standard transition: 200–280ms
  - complex (scroll/expand): 300–400ms

- Easing
  - 기본: ease-out
  - 강조: cubic-bezier(0.2, 0.8, 0.2, 1)
  - 화면 전환 (진입): cubic-bezier(0.22, 1, 0.36, 1) — Apple spring-like, 탄성 있는 착지
  - 화면 전환 (퇴장): cubic-bezier(0.4, 0, 0.2, 1) — ease-in-out, 부드러운 시작/마무리

- Motion Principle
  - abrupt change 금지 (opacity jump X)
  - transform 기반 사용 (translate, scale 우선)
  - opacity 단독 사용 지양 → 항상 움직임과 결합
  - GPU 가속: translate3d, will-change 사용

- Reduce Motion 대응
  - scale/translate 제거 → opacity만 유지

---

### 2. Screen Transition

#### 탭 전환 (홈 ↔ 메시지 ↔ 설정)
- 방식: cross-fade dissolve (opacity only)
- duration: 180ms
- easing: cubic-bezier(0.2, 0, 0, 1)

#### 채팅 진입 (문의하기 / 메시지 클릭)
- 방식: opacity fade-in
- duration: 400ms
- easing: cubic-bezier(0.22, 1, 0.36, 1)
- 부가 효과:
  - 배경 dim overlay: rgba(0, 0, 0, 0.15) fade-in (동일 duration/easing)
  - 배경 depth: scale(1) → scale(0.97) (동일 duration/easing)
  - 좌측 그림자: -4px 0 16px rgba(0, 0, 0, 0.08)
- 스켈레톤 UI: 진입 후 300ms 동안 shimmer skeleton 표시 후 실제 콘텐츠 전환

#### 채팅 퇴장 (뒤로가기)
- 방식: opacity fade-out
- duration: 350ms
- easing: cubic-bezier(0.4, 0, 0.2, 1)
- 부가 효과:
  - 배경 dim: fade-out (350ms, 동일 easing)
  - 배경 depth: scale(0.97) → scale(1) (350ms, 동일 easing)

#### 스켈레톤 UI
- shimmer gradient: linear-gradient 90deg, rgba(0,0,0,0.08) → 0.14 → 0.08
- animation: 1.4s ease-in-out infinite
- 배경: bg-white + 동일 gradient overlay (투과 방지)

---

### 3. Interaction Motion

#### Button
- press:
  - scale 1 → 0.96
  - duration 80ms
- release:
  - scale 0.96 → 1
  - duration 120ms
  - easing ease-out

#### Card
- hover / focus:
  - scale 1 → 1.02
  - shadow 강화
  - duration 150ms
- press:
  - scale 1 → 0.98

#### Bottom Nav Tab
- hover (비활성):
  - background: rgba(0, 0, 0, 0.04)
  - border-color: rgba(0, 0, 0, 0.06)
  - transition: all 150ms

#### Input Field
- focus:
  - border color transition (150ms)
  - label translateY + scale

#### Toggle / Switch
- thumb 이동:
  - translateX
  - duration 180ms
  - easing ease-in-out

---

### 4. Scroll Motion

#### 기본 스크롤
- scroll-behavior: smooth
- inertia 유지 (native 우선)

#### 요소 등장 (Scroll Reveal)
- opacity: 0 → 100
- translateY: 16px → 0
- duration: 300ms
- easing: ease-out

#### Stagger (리스트)
- delay: 40–80ms per item
- 최대 5개까지만 적용

#### 채팅 진입 시 스크롤
- 최하단 앵커링: scrollIntoView on mount

#### 브랜드 이미지형 홈
- 히어로 이미지: absolute 고정, 컨텐츠가 위로 스크롤하며 덮음
- 컨텐츠 영역: rounded-t-[20px] bg-white

#### Sticky Header
- 스크롤 down: header translateY: 0 → -100%
- 스크롤 up: header translateY: -100% → 0
- duration: 200ms

#### Parallax (선택)
- background slower than content
- 과도한 사용 금지 (1~2곳만)

---

## Screen: 홈

### Motion 적용
- Scroll:
  - 리스트: stagger reveal 적용
  - 카드: translateY + fade

- Interaction:
  - 카드 클릭: scale down 후 상세 진입
  - 버튼: global button motion 사용
