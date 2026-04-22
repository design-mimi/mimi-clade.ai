"use client";

import type { TextSize } from "./EnduserFrame";

type Props = {
  textSize: TextSize;
  onTextSizeChange: (v: TextSize) => void;
};

export function SettingScreen({ textSize, onTextSizeChange }: Props) {
  return (
    <div className="relative flex flex-col w-full h-full bg-white">
      <Header />
      <div className="flex-1 flex flex-col px-[20px] py-[16px] gap-[20px]">
        <ProfileSection />
        <TextSizeRow value={textSize} onChange={onTextSizeChange} />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div
      className="flex items-center w-full px-[16px] py-[12px] bg-white border-b"
      style={{ borderColor: "var(--ht-border-separator)" }}
    >
      <h1
        className="text-[18px] leading-7 font-semibold"
        style={{ color: "var(--ht-text-default)" }}
      >
        설정
      </h1>
    </div>
  );
}

function ProfileSection() {
  return (
    <section className="flex flex-col gap-[8px]">
      <div className="flex items-center justify-between">
        <span
          className="text-[16px] leading-6"
          style={{ color: "var(--ht-text-default)" }}
        >
          개인 정보
        </span>
        <button
          type="button"
          className="ht-pressable text-[14px] leading-5"
          style={{ color: "var(--ht-text-subtle)" }}
        >
          수정
        </button>
      </div>
      <div
        className="flex flex-col gap-[10px] p-[12px] rounded-[12px] border"
        style={{
          background: "var(--ht-bg-subtle)",
          borderColor: "var(--ht-border-default)",
        }}
      >
        <ProfileField label="이름" value="레이디가가" />
        <ProfileField label="전화 번호" value="010-0000-0000" />
        <ProfileField label="주소" value="서울시 중구 순화동" />
      </div>
    </section>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-[4px]">
      <span
        className="text-[14px] leading-5"
        style={{ color: "var(--ht-text-default)" }}
      >
        {label}
      </span>
      <div
        className="px-[12px] py-[8px] rounded-[8px] bg-white border text-[14px] leading-5"
        style={{
          borderColor: "var(--ht-border-default)",
          color: "var(--ht-text-default)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function TextSizeRow({
  value,
  onChange,
}: {
  value: TextSize;
  onChange: (v: TextSize) => void;
}) {
  return (
    <div className="flex items-center justify-between w-full min-h-[32px]">
      <span
        className="text-[16px] leading-6"
        style={{ color: "var(--ht-text-default)" }}
      >
        텍스트 크기
      </span>
      <SegmentedControl
        value={value}
        onChange={onChange}
        options={[
          { value: "small", label: "작게" },
          { value: "large", label: "크게" },
        ]}
      />
    </div>
  );
}

function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div
      className="flex items-center gap-[2px] p-[2px] rounded-[8px]"
      style={{ background: "rgba(39, 39, 42, 0.06)" }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className="relative px-[10px] py-[6px] rounded-[6px] text-[14px] leading-5 font-medium cursor-pointer"
            style={{
              transition:
                "background-color 180ms ease-out, color 180ms ease-out, transform 120ms ease-out, box-shadow 180ms ease-out",
              ...(active
                ? {
                    background: "#ffffff",
                    color: "var(--ht-text-default)",
                    border: "1px solid var(--ht-border-darker)",
                    boxShadow:
                      "0 1px 2px 0 rgba(0, 0, 0, 0.08), inset 0 -1px 0 0 rgba(0, 0, 0, 0.08)",
                  }
                : {
                    background: "transparent",
                    color: "var(--ht-text-muted)",
                    border: "1px solid transparent",
                  }),
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
