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
      className="w-[60px] h-[60px] rounded-[20px] bg-white flex items-center justify-center border border-black/10"
      style={{ boxShadow: "var(--ht-shadow-lg)" }}
    >
      <svg viewBox="0 0 32 32" width={32} height={32}>
        <path
          d="M16 4C9.4 4 4 8.9 4 15c0 3.9 2.4 7.3 6 9.3L9 29l5.3-3.4c.5.1 1.1.1 1.7.1 6.6 0 12-4.9 12-11S22.6 4 16 4z"
          fill="#111115"
        />
        <circle cx="11" cy="15" r="1.6" fill="#fff" />
        <circle cx="16" cy="15" r="1.6" fill="#fff" />
        <circle cx="21" cy="15" r="1.6" fill="#fff" />
      </svg>
    </button>
  );
}
