"use client";

type MessageItem = {
  status: string;
  time: string;
  body: string;
};

const MESSAGES: MessageItem[] = [
  {
    status: "상담 종료",
    time: "1시간 전",
    body: "안녕하세요. ⚽🏀 고객센터 운영 시간은 평일 오전 09시~ 6시(점심시간 12시~1시, 공휴일 휴무)입니다.",
  },
  {
    status: "상담 종료",
    time: "5시간 전",
    body: "안녕하세요. ⚽🏀 고객센터 운영 시간은 평일 오전 09시~ 6시(점심시간 12시~1시, 공휴일 휴무)입니다.",
  },
  {
    status: "상담 대기 후 종료",
    time: "하루 전",
    body: "안녕하세요. 미야옹 고객님. 상품문의 답변드립니다. 해당 상품은 현재 품절로 확인되었습니다. 비슷한 상품을 안내드릴까요?",
  },
  {
    status: "고객 종료",
    time: "일주일 전",
    body: "안녕하세요. 미야옹 고객님. 상품문의 답변드립니다. 해당 상품은 현재 품절로 확인되었습니다. 비슷한 상품을 안내드릴까요?",
  },
  {
    status: "상담 종료",
    time: "2025.03.21",
    body: "안녕하세요. 미야옹 고객님. 상품문의 답변드립니다. 해당 상품은 현재 품절로 확인되었습니다. 비슷한 상품을 안내드릴까요?",
  },
];

type Props = {
  onOpenChat?: () => void;
};

export function MessageScreen({ onOpenChat }: Props) {
  return (
    <div className="relative flex flex-col w-full h-full bg-white">
      <Header />
      <div className="flex-1 flex flex-col px-[8px] pt-[16px] pb-[16px] gap-[8px] overflow-y-auto">
        {MESSAGES.map((msg, i) => (
          <div
            key={i}
            className="ht-reveal w-full"
            style={{ animationDelay: `${Math.min(i, 4) * 60}ms` }}
          >
            <MessageRow {...msg} onClick={onOpenChat} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Header() {
  return (
    <div
      className="flex items-center justify-between w-full h-[56px] pl-[20px] pr-[56px] sm:pr-[20px] py-[12px] bg-white border-b"
      style={{ borderColor: "var(--ht-border-separator)" }}
    >
      <h1
        className="text-[18px] leading-7 font-semibold"
        style={{ color: "var(--ht-text-default)" }}
      >
        메시지
      </h1>
      <button
        type="button"
        className="ht-pressable px-[8px] py-[4px] rounded-[6px] text-[14px] leading-5 font-medium tracking-[-0.25px]"
        style={{ color: "var(--ht-text-subtle)" }}
      >
        내역 삭제
      </button>
    </div>
  );
}

function MessageRow({
  status,
  time,
  body,
  onClick,
}: MessageItem & { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ht-card-press flex flex-col gap-[4px] w-full text-left rounded-[12px] px-[12px] py-[6px]"
    >
      <div className="flex items-center gap-[8px]">
        <span
          className="text-[14px] leading-5 font-semibold"
          style={{ color: "var(--ht-text-default)" }}
        >
          {status}
        </span>
        <span
          className="text-[12px] leading-4"
          style={{ color: "var(--ht-text-subtle)" }}
        >
          {time}
        </span>
      </div>
      <p
        className="text-[14px] leading-[1.6] w-full"
        style={{ color: "var(--ht-text-default)" }}
      >
        {body}
      </p>
    </button>
  );
}

