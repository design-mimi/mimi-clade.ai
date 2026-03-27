import React from "react";

interface BetaBadgeProps {
  label?: string;
  className?: string;
}

export default function BetaBadge({ label = "베타", className = "" }: BetaBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-0.5 rounded-md text-xs font-semibold tracking-wide select-none ${className}`}
      style={{
        backgroundColor: "rgba(110, 231, 83, 0.12)",
        color: "#3d9e1f",
        border: "1px solid rgba(110, 231, 83, 0.35)",
        fontSize: "11px",
        fontFamily: "SUIT, -apple-system, sans-serif",
        letterSpacing: "0.02em",
        lineHeight: "16px",
      }}
    >
      {label}
    </span>
  );
}
