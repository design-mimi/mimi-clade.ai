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
  "안녕하세요, 세상의 모든 스포츠 데카트론 코리아입니다. ⚽🏀\n고객센터 운영 시간 : 평일 오전 09시~ 6시 (점심시간 12시~1시, 공휴일 휴무)";

const COUPON: CouponRow = { title: "클리어런스 할인 쿠폰", desc: "15% 할인쿠폰 받기" };

const IMAGE_BRAND = "/kindersalmon.png";

// Topic-specific card fixtures.
// For brand inquiry chat, we show a carousel + wide card combination.
// For product/delivery/order topics, show specific variants.
export const CARDS_BY_TOPIC: Record<ChatTopic, ChatCardData[]> = {
  default: [
    {
      type: "img-01",
      image: IMAGE_BRAND,
      body: BRAND_BODY,
      primary: "26 S/S 신제품 보러가기",
      coupon: COUPON,
      secondary: "데카트론 뉴스 구독",
    },
  ],
  brand: [
    {
      type: "img-01",
      image: IMAGE_BRAND,
      body: BRAND_BODY,
      primary: "26 S/S 신제품 보러가기",
      coupon: COUPON,
      secondary: "데카트론 뉴스 구독",
    },
  ],
  product: [
    {
      type: "img-02",
      image: IMAGE_BRAND,
      body: BRAND_BODY,
      primary: "26 S/S 신제품 보러가기",
      coupon: COUPON,
      secondary: "데카트론 뉴스 구독",
    },
  ],
  delivery: [
    {
      type: "img-wide",
      image: IMAGE_BRAND,
      body: BRAND_BODY,
      primaryA: "신제품 보러가기",
      primaryB: "데카트론 뉴스 구독",
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
