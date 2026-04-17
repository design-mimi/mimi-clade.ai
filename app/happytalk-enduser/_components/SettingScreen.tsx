"use client";

import { useState } from "react";
import type { SVGProps } from "react";
import { ChevronRightIcon } from "./Icons";

import type { TextSize } from "./EnduserFrame";

type Props = {
  textSize: TextSize;
  onTextSizeChange: (v: TextSize) => void;
};

export function SettingScreen({ textSize, onTextSizeChange }: Props) {
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [notification, setNotification] = useState(true);

  return (
    <div className="relative flex flex-col w-full h-full bg-white">
      <Header />
      <div className="flex-1 flex flex-col px-[20px] py-[16px] gap-[20px]">
        <LinkRow icon={<InfoIcon width={16} height={16} />} label="개인 정보" />
        <LinkRow icon={<KoreaFlagIcon width={16} height={16} />} label="한국어" />
        <ToggleRow
          icon={<TranslateIcon width={16} height={16} />}
          label="언어 자동 번역"
          active={autoTranslate}
          onToggle={() => setAutoTranslate((v) => !v)}
        />
        <ToggleRow
          icon={<VolumeIcon width={16} height={16} />}
          label="알림"
          active={notification}
          onToggle={() => setNotification((v) => !v)}
        />
        <TextSizeRow value={textSize} onChange={onTextSizeChange} />
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
      <div className="flex items-center gap-[6px]">
        <TextIcon width={16} height={16} style={{ color: "var(--ht-icon-default)" }} />
        <span
          className="text-[16px] leading-6"
          style={{ color: "var(--ht-text-default)" }}
        >
          텍스트 크기
        </span>
      </div>
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

function LinkRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button type="button" className="ht-pressable flex items-center gap-[6px] w-fit min-h-[32px]">
      <span style={{ color: "var(--ht-icon-default)" }}>{icon}</span>
      <span
        className="text-[16px] leading-6"
        style={{ color: "var(--ht-text-default)" }}
      >
        {label}
      </span>
      <ChevronRightIcon
        width={16}
        height={16}
        style={{ color: "var(--ht-icon-default)" }}
      />
    </button>
  );
}

function ToggleRow({
  icon,
  label,
  active,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between w-full min-h-[32px]">
      <div className="flex items-center gap-[6px]">
        <span style={{ color: "var(--ht-icon-default)" }}>{icon}</span>
        <span
          className="text-[16px] leading-6"
          style={{ color: "var(--ht-text-default)" }}
        >
          {label}
        </span>
      </div>
      <Switch active={active} onToggle={onToggle} />
    </div>
  );
}

function Switch({
  active,
  onToggle,
}: {
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      onClick={onToggle}
      className="relative w-[32px] h-[20px] rounded-full"
      style={{
        background: active ? "var(--ht-green-accent)" : "#e9e9ec",
        transition: "background-color 180ms ease-in-out",
      }}
    >
      <span
        className="absolute top-[3px] left-[3px] w-[14px] h-[14px] rounded-full bg-white"
        style={{
          transform: active ? "translateX(12px)" : "translateX(0)",
          transition: "transform 180ms ease-in-out",
          boxShadow:
            "0 1px 2px -1px rgba(0, 0, 0, 0.08), 0 1px 3px 0 rgba(0, 0, 0, 0.08)",
        }}
      />
    </button>
  );
}

function InfoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="1 5 14 14" fill="currentColor" fillRule="evenodd" clipRule="evenodd" {...props}>
      <path d="M8.00065 18.6666C4.31875 18.6666 1.33398 15.6818 1.33398 11.9999C1.33398 8.31802 4.31875 5.33325 8.00065 5.33325C11.6825 5.33325 14.6673 8.31802 14.6673 11.9999C14.6673 15.6818 11.6825 18.6666 8.00065 18.6666ZM8.00065 17.3333C10.9462 17.3333 13.334 14.9455 13.334 11.9999C13.334 9.0544 10.9462 6.66659 8.00065 6.66659C5.05513 6.66659 2.66732 9.0544 2.66732 11.9999C2.66732 14.9455 5.05513 17.3333 8.00065 17.3333ZM7.33398 8.66659H8.66732V9.99992H7.33398V8.66659ZM7.33398 11.3333H8.66732V15.3333H7.33398V11.3333Z" />
    </svg>
  );
}

function KoreaFlagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 48 16 16" fill="none" {...props}>
      <path d="M8 64C12.4183 64 16 60.4183 16 56C16 51.5817 12.4183 48 8 48C3.58172 48 0 51.5817 0 56C0 60.4183 3.58172 64 8 64Z" fill="#F0F0F0" />
      <path d="M10.7826 56C10.7826 56.6957 9.53678 58.4348 8 58.4348C6.46322 58.4348 5.21741 56.6957 5.21741 56C5.21741 54.4632 6.46322 53.2174 8 53.2174C9.53678 53.2174 10.7826 54.4632 10.7826 56Z" fill="#D80027" />
      <path d="M10.7826 56C10.7826 57.5368 9.53678 58.7826 8 58.7826C6.46322 58.7826 5.21741 57.5368 5.21741 56" fill="#0052B4" />
      <g fill="#000">
        <path d="M10.9492 58.4596L11.6869 57.7219L12.1788 58.2137L11.441 58.9515L10.9492 58.4596Z" />
        <path d="M9.71929 59.6892L10.457 58.9515L10.9489 59.4433L10.2111 60.1811L9.71929 59.6892Z" />
        <path d="M12.4248 59.935L13.1625 59.1973L13.6544 59.6891L12.9166 60.4269L12.4248 59.935Z" />
        <path d="M11.1949 61.1648L11.9326 60.4271L12.4245 60.9189L11.6867 61.6566L11.1949 61.1648Z" />
        <path d="M11.687 59.1974L12.4247 58.4597L12.9165 58.9515L12.1788 59.6892L11.687 59.1974Z" />
        <path d="M10.4574 60.427L11.1951 59.6892L11.6869 60.1811L10.9492 60.9188L10.4574 60.427Z" />
        <path d="M12.428 53.5417L10.4608 51.5744L10.9526 51.0826L12.9199 53.0499L12.428 53.5417Z" />
        <path d="M10.4604 53.0501L9.72265 52.3124L10.2145 51.8206L10.9522 52.5583L10.4604 53.0501Z" />
        <path d="M11.69 54.28L10.9522 53.5422L11.444 53.0504L12.1818 53.7882L11.69 54.28Z" />
        <path d="M11.9357 51.5744L11.198 50.8366L11.6898 50.3448L12.4275 51.0825L11.9357 51.5744Z" />
        <path d="M13.1659 52.8044L12.4282 52.0667L12.92 51.5748L13.6578 52.3126L13.1659 52.8044Z" />
        <path d="M2.83608 59.196L4.80337 61.1633L4.31154 61.6551L2.34425 59.6878L2.83608 59.196Z" />
        <path d="M4.80327 59.6874L5.541 60.4252L5.04919 60.917L4.31146 60.1792L4.80327 59.6874Z" />
        <path d="M3.5736 58.4581L4.31133 59.1958L3.8195 59.6877L3.08177 58.9499L3.5736 58.4581Z" />
        <path d="M4.31142 57.7202L6.27872 59.6875L5.78689 60.1793L3.81959 58.212L4.31142 57.7202Z" />
        <path d="M4.80316 50.8351L2.83587 52.8024L2.34404 52.3106L4.31133 50.3433L4.80316 50.8351Z" />
        <path d="M5.5409 51.5728L3.57361 53.5401L3.08178 53.0482L5.04907 51.0809L5.5409 51.5728Z" />
        <path d="M6.27933 52.3109L4.31204 54.2782L3.82023 53.7864L5.78752 51.8191L6.27933 52.3109Z" />
      </g>
    </svg>
  );
}

function TranslateIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="1 93 15 15" fill="currentColor" {...props}>
      <path d="M12.334 98.6666L15.2673 106H13.8307L13.03 104H10.3033L9.50398 106H8.06798L11.0007 98.6666H12.334ZM6.66732 93.3333V94.6666H10.6673V95.9999L9.35545 96.0003C8.82898 97.5774 7.99985 99.0037 6.94165 100.201C7.42358 100.63 7.94532 101.012 8.49898 101.339L7.99858 102.59C7.28312 102.185 6.61361 101.702 6.00039 101.15C4.81 102.221 3.40674 103.037 1.86659 103.516L1.50903 102.229C2.82632 101.813 4.03094 101.116 5.06093 100.201C4.30916 99.352 3.67314 98.3865 3.17893 97.3334L4.67188 97.3335C5.04744 98.0258 5.49384 98.6688 6.00043 99.2513C6.81952 98.31 7.48098 97.2107 7.94032 96.0006L1.33398 95.9999V94.6666H5.33398V93.3333H6.66732ZM11.6673 100.59L10.836 102.667H12.4973L11.6673 100.59Z" />
    </svg>
  );
}

function TextIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M3 3.5H13V5.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M8 3.5V14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M6 14H10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function VolumeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="2 138 14 14" fill="currentColor" {...props}>
      <path d="M8.66602 140.814L6.40123 142.667H3.99935V145.333H6.40123L8.66602 147.186V140.814ZM5.92528 146.667H3.33268C2.9645 146.667 2.66602 146.368 2.66602 146V142C2.66602 141.632 2.9645 141.333 3.33268 141.333H5.92528L9.45495 138.445C9.59742 138.329 9.80742 138.35 9.92402 138.492C9.97275 138.552 9.99935 138.627 9.99935 138.703V149.297C9.99935 149.481 9.85008 149.63 9.66602 149.63C9.58908 149.63 9.51448 149.603 9.45495 149.555L5.92528 146.667ZM12.5747 147.061L11.6267 146.113C12.2588 145.625 12.666 144.86 12.666 144C12.666 143.047 12.1655 142.21 11.4129 141.738L12.3719 140.779C13.3591 141.508 13.9993 142.679 13.9993 144C13.9993 145.228 13.4459 146.327 12.5747 147.061Z" />
    </svg>
  );
}
