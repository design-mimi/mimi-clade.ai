"use client";

import type { SVGProps } from "react";
import type { TextSize } from "./EnduserFrame";

export type SettingView = "main" | "profile";

type Props = {
  textSize: TextSize;
  onTextSizeChange: (v: TextSize) => void;
  view: SettingView;
  onViewChange: (v: SettingView) => void;
};

export function SettingScreen({
  textSize,
  onTextSizeChange,
  view,
  onViewChange,
}: Props) {
  if (view === "profile") {
    return <ProfileView onBack={() => onViewChange("main")} />;
  }

  return (
    <div className="relative flex flex-col w-full h-full bg-white">
      <Header />
      <div className="flex-1 flex flex-col px-[20px] py-[16px] gap-[12px]">
        <ProfileEntry onClick={() => onViewChange("profile")} />
        <TextSizeRow value={textSize} onChange={onTextSizeChange} />
      </div>
    </div>
  );
}

function Header({
  onBack,
}: {
  onBack?: () => void;
}) {
  return (
    <div
      className="flex items-center w-full px-[20px] py-[12px] bg-white border-b"
      style={{ borderColor: "var(--ht-border-separator)" }}
    >
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="ht-pressable -ml-[6px] flex items-center px-[6px] py-[2px] rounded-[6px]"
          style={{ color: "var(--ht-text-default)" }}
        >
          <ChevronLeftIcon width={20} height={20} />
          <h1 className="text-[18px] leading-7 font-semibold tracking-[-0.25px]">
            설정
          </h1>
        </button>
      ) : (
        <h1
          className="text-[18px] leading-7 font-semibold tracking-[-0.25px]"
          style={{ color: "var(--ht-text-default)" }}
        >
          설정
        </h1>
      )}
    </div>
  );
}

function ProfileEntry({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex items-center w-full">
      <button
        type="button"
        onClick={onClick}
        className="ht-pressable flex items-center gap-[2px] px-[12px] py-[8px] rounded-[8px]"
      >
        <span
          className="text-[16px] leading-6 font-medium tracking-[-0.25px]"
          style={{ color: "var(--ht-text-default)" }}
        >
          나의 정보
        </span>
        <ChevronRightIcon
          width={20}
          height={20}
          style={{ color: "var(--ht-text-default)" }}
        />
      </button>
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
    <div className="flex items-center justify-between w-full min-h-[32px] pl-[12px]">
      <span
        className="text-[16px] leading-6 font-medium tracking-[-0.25px]"
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

function ProfileView({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative flex flex-col w-full h-full bg-white">
      <Header onBack={onBack} />
      <div className="flex-1 flex flex-col px-[20px] py-[16px] gap-[12px]">
        <div className="flex flex-col gap-[24px] w-full">
          <ProfileField label="이름" placeholder="이름을 입력해 주세요" />
          <ProfileField label="이메일" placeholder="이메일을 입력해 주세요" />
          <div className="flex justify-end w-full">
            <button
              type="button"
              className="ht-pressable px-[12px] py-[8px] rounded-[8px] text-[16px] leading-6 font-medium tracking-[-0.25px]"
              style={{
                background: "rgba(39, 39, 42, 0.06)",
                color: "var(--ht-text-default)",
              }}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-[8px] w-full">
      <span
        className="text-[14px] leading-5 font-medium tracking-[-0.25px]"
        style={{ color: "var(--ht-text-default)" }}
      >
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-[12px] py-[8px] rounded-[8px] border outline-none text-[14px] leading-5 tracking-[-0.25px] placeholder:text-[var(--ht-text-muted)]"
        style={{
          background: "var(--ht-bg-input)",
          borderColor: "var(--ht-border-darker)",
          color: "var(--ht-text-default)",
        }}
      />
    </div>
  );
}

function ChevronLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M12.5 4L7 10L12.5 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M7.5 4L13 10L7.5 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
