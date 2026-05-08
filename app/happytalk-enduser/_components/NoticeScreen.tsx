"use client";

import Image from "next/image";
import { PaperPlaneIconSm } from "./Icons";

type Props = {
  onBack: () => void;
  onOpenChat?: () => void;
};

const NOTICE_BODY =
  "풍요로운 한가위 보내세요. 🌕 연휴 기간 동안 배송 및 고객센터 운영이 일시 중단됩니다. 아래 일정 참고 부탁드립니다.";

const NOTICE_IMAGE = "/hero.jpg";

export function NoticeScreen({ onBack, onOpenChat }: Props) {
  return (
    <div className="relative flex flex-col w-full h-full overflow-hidden bg-white">
      <header
        className="flex items-center h-[56px] px-[20px] py-[12px] border-b shrink-0"
        style={{ borderColor: "var(--ht-border-separator)" }}
      >
        <button
          type="button"
          onClick={onBack}
          aria-label="뒤로"
          className="ht-pressable inline-flex items-center gap-[4px] -ml-[4px] px-[4px] py-[4px] rounded-[6px] text-[18px] leading-7 font-semibold tracking-[-0.25px]"
          style={{ color: "var(--ht-text-default)" }}
        >
          <ChevronLeftIcon
            width={20}
            height={20}
            style={{ color: "var(--ht-icon-default)" }}
          />
          알림
        </button>
      </header>

      <div className="flex-1 min-h-0 overflow-y-auto px-[20px] pt-[16px] pb-[120px]">
        <div className="flex flex-col gap-[20px] w-full">
          <p
            className="text-[14px] tracking-[-0.25px]"
            style={{ color: "var(--ht-text-default)", lineHeight: "23px" }}
          >
            {NOTICE_BODY}
          </p>
          <div
            className="relative w-full rounded-[6px] overflow-hidden"
            style={{ aspectRatio: "1000 / 1363" }}
          >
            <Image
              src={NOTICE_IMAGE}
              alt="알림 이미지"
              fill
              className="object-cover"
              sizes="375px"
            />
          </div>
        </div>
      </div>

      {/* Floating 문의하기 + send CTA */}
      <div className="absolute left-0 right-0 bottom-[24px] flex justify-center pointer-events-none">
        <button
          type="button"
          onClick={onOpenChat}
          className="ht-cta-button pointer-events-auto inline-flex items-center gap-[4px] rounded-[16px] px-[24px] py-[12px] text-[16px] leading-6 font-semibold tracking-[-0.25px] text-white"
          style={{
            background: "var(--ht-bg-inverted)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "var(--ht-shadow-modal-lg)",
          }}
        >
          문의하기
          <PaperPlaneIconSm
            width={20}
            height={20}
            style={{ color: "var(--ht-icon-white)" }}
          />
        </button>
      </div>
    </div>
  );
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M12 4.5 6.5 10 12 15.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
