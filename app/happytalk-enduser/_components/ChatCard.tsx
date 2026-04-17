"use client";

import Image from "next/image";
import type { SVGProps } from "react";
import type {
  ChatCardData,
  CardImg01,
  CardImg02,
  CardImgWide,
  CardCarousel,
} from "./chatCards";

export function ChatCard({ data }: { data: ChatCardData }) {
  switch (data.type) {
    case "img-01":
      return <Img01Card {...data} />;
    case "img-02":
      return <Img02Card {...data} />;
    case "img-wide":
      return <ImgWideCard {...data} />;
    case "carousel":
      return <CarouselCard {...data} />;
  }
}

function CardShell({
  children,
  width,
}: {
  children: React.ReactNode;
  width: number;
}) {
  return (
    <div
      className="shrink-0 border bg-white rounded-[12px] flex flex-col"
      style={{ width, borderColor: "#e5e5e5", overflow: "hidden" }}
    >
      {children}
    </div>
  );
}

function HeroImage({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) {
  return (
    <Image
      src={src}
      alt="brand"
      width={width}
      height={height}
      className="w-full object-cover object-[50%_30%]"
      style={{ height }}
    />
  );
}

function Body({ text }: { text: string }) {
  return (
    <div className="p-[12px]">
      <p
        className="text-[14px] leading-5 font-medium whitespace-pre-line"
        style={{ color: "#38373e" }}
      >
        {text}
      </p>
    </div>
  );
}

function CtaButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="ht-pressable w-full h-[36px] rounded-[6px] border text-[14px] leading-5 text-[#333]"
      style={{
        background: "var(--ht-bg-subtle)",
        borderColor: "var(--ht-border-card)",
        boxShadow:
          "0 1px 2px 0 rgba(0, 0, 0, 0.05), inset 0 -1px 0 0 rgba(0, 0, 0, 0.08)",
      }}
    >
      {label}
    </button>
  );
}

function CouponButton({ coupon }: { coupon: { title: string; desc: string } }) {
  return (
    <div
      className="flex items-stretch rounded-[6px] overflow-hidden border"
      style={{ borderColor: "var(--ht-border-card)" }}
    >
      <div
        className="flex-1 flex flex-col justify-center px-[10px] py-[6px]"
        style={{
          background: "var(--ht-bg-subtle)",
          borderRight: "1px solid rgba(0,0,0,0.12)",
        }}
      >
        <span className="text-[14px] leading-5 text-[#333] truncate">
          {coupon.title}
        </span>
        <span className="text-[14px] leading-5 text-[#8a8a8e] truncate">
          {coupon.desc}
        </span>
      </div>
      <div
        className="flex items-center justify-center px-[14px]"
        style={{ background: "var(--ht-bg-subtle)" }}
      >
        <GiftIcon width={20} height={20} style={{ color: "#4e4e55" }} />
      </div>
    </div>
  );
}

function Img01Card({ image, body, primary, coupon, secondary }: CardImg01) {
  return (
    <CardShell width={256}>
      <HeroImage src={image} width={256} height={208} />
      <Body text={body} />
      <div className="flex flex-col gap-[6px] px-[12px] pb-[12px]">
        <CtaButton label={primary} />
        <CouponButton coupon={coupon} />
        <CtaButton label={secondary} />
      </div>
    </CardShell>
  );
}

function Img02Card({ image, body, primary, coupon, secondary }: CardImg02) {
  return (
    <CardShell width={256}>
      <HeroImage src={image} width={256} height={280} />
      <Body text={body} />
      <div className="flex flex-col gap-[6px] px-[12px] pb-[12px]">
        <CtaButton label={primary} />
        <CouponButton coupon={coupon} />
        <CtaButton label={secondary} />
      </div>
    </CardShell>
  );
}

function ImgWideCard({ image, body, primaryA, primaryB, coupon }: CardImgWide) {
  return (
    <CardShell width={328}>
      <HeroImage src={image} width={328} height={220} />
      <Body text={body} />
      <div className="flex flex-col gap-[6px] px-[12px] pb-[12px]">
        <div className="grid grid-cols-2 gap-[6px]">
          <CtaButton label={primaryA} />
          <CtaButton label={primaryB} />
        </div>
        <CouponButton coupon={coupon} />
      </div>
    </CardShell>
  );
}

function CarouselCard({ items }: CardCarousel) {
  return (
    <div className="overflow-x-auto -mx-[16px] px-[16px] pb-[4px]">
      <div className="flex gap-[8px] w-max">
        {items.map((item, i) => (
          <Img01Card key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

function GiftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="2.5" y="7.5" width="15" height="10" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 11.5h15" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10 7.5v10" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M7 7.5C5.5 7.5 5 6 5 5.5s.5-2 2-2 3 3 3 4-1.5.5-3 0zM13 7.5c1.5 0 2-1.5 2-2s-.5-2-2-2-3 3-3 4 1.5.5 3 0z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
