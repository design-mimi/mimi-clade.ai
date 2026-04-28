"use client";

type Props = {
  onClick?: () => void;
};

export function Launcher({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="상담 열기"
      className="ht-launcher w-[60px] h-[60px] rounded-[20px] bg-white flex items-center justify-center border border-black/10"
      style={{ boxShadow: "var(--ht-shadow-lg)" }}
    >
      <svg width={28} height={44} viewBox="0 0 39 61" fill="none">
        {/* face outline (static) */}
        <path
          d="M31.18 1.25C31.18 1.25 -2.6 28.99 6.88 15.45C16.36 1.91 28.26 10.04 19.62 26.33C13.99 36.95 1.25 44.23 1.25 44.23C1.25 44.23 14.88 43.99 16.95 49.55"
          stroke="#231916"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* mouth — lifts on hover */}
        <path
          className="ht-launcher-smile"
          d="M11.6201 56.95C11.6201 56.95 24.0601 65.25 35.3201 48.65"
          stroke="#231916"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* eye — rounds on hover */}
        <path
          className="ht-launcher-eye"
          d="M26.1396 24.53C26.1396 24.53 31.8996 28.37 37.0996 20.69"
          stroke="#231916"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
