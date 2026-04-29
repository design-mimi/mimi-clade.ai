// Chat card type system (based on Figma node 25535:5189)
//
// 4 card variants extracted from Figma:
//   - img-01    (256 × 392, square-ish image, 3 buttons vertical)
//   - img-02    (256 × 464, tall image, 3 buttons vertical)
//   - img-wide  (328 × 422, wider card, 2 CTAs side-by-side + coupon below)
//   - carousel  (784 × 392, horizontal scroll of img-01 cards)

export type ChatTopic =
  | "default"
  | "brand"
  | "product"
  | "delivery"
  | "order";

type CouponRow = { title: string; desc: string };

export type CardImg01 = {
  type: "img-01";
  image: string;
  body: string;
  primary: string;
  coupon: CouponRow;
  secondary: string;
};

export type CardImg02 = {
  type: "img-02";
  image: string;
  body: string;
  primary: string;
  coupon: CouponRow;
  secondary: string;
};

export type CardImgWide = {
  type: "img-wide";
  image: string;
  body: string;
  primaryA: string;
  primaryB: string;
  coupon: CouponRow;
};

export type CardCarousel = {
  type: "carousel";
  items: CardImg01[];
};

export type ChatCardData = CardImg01 | CardImg02 | CardImgWide | CardCarousel;

const BRAND_BODY =
  "안녕하세요, 살몬빛으로 봄을 짓는 킨더살몬입니다 🌸\n고객센터 운영 시간 : 평일 오전 09시~ 6시 (점심시간 12시~1시, 공휴일 휴무)";

// Intro greeting agent message — shared between ChatScreen rendering and
// EnduserFrame's "새 상담방 생성 즉시 리스트에 추가" preview default.
export const INTRO_BODY =
  "안녕하세요, 킨더살몬입니다 🌸 무엇을 도와드릴까요? 운영 시간은 평일 오전 09시~ 6시 (점심시간 12시~1시, 공휴일 휴무)입니다.";

const COUPON: CouponRow = { title: "킨더 멤버 환영 쿠폰", desc: "15% 할인쿠폰 받기" };

const IMAGE_BRAND = "/kindersalmon.png";

// Topic-specific card fixtures.
// For brand inquiry chat, we show the standard brand intro card.
// Other topics use variant cards for visual variety.
export const CARDS_BY_TOPIC: Record<ChatTopic, ChatCardData[]> = {
  default: [
    {
      type: "img-01",
      image: IMAGE_BRAND,
      body: BRAND_BODY,
      primary: "26 S/S 신상 보러가기",
      coupon: COUPON,
      secondary: "킨더 뉴스레터 구독",
    },
  ],
  brand: [
    {
      type: "img-01",
      image: IMAGE_BRAND,
      body: BRAND_BODY,
      primary: "26 S/S 신상 보러가기",
      coupon: COUPON,
      secondary: "킨더 뉴스레터 구독",
    },
  ],
  product: [
    {
      type: "img-02",
      image: IMAGE_BRAND,
      body: BRAND_BODY,
      primary: "26 S/S 신상 보러가기",
      coupon: COUPON,
      secondary: "사이즈 가이드 보기",
    },
  ],
  delivery: [
    {
      type: "img-wide",
      image: IMAGE_BRAND,
      body: BRAND_BODY,
      primaryA: "배송 정책 보기",
      primaryB: "도착 예정 안내",
      coupon: COUPON,
    },
  ],
  order: [
    {
      type: "img-01",
      image: IMAGE_BRAND,
      body: BRAND_BODY,
      primary: "주문 내역 확인",
      coupon: COUPON,
      secondary: "교환/반품 안내",
    },
  ],
};
