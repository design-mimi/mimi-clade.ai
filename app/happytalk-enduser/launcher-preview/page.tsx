"use client";

import { LauncherForm } from "../_components/LauncherForm";
import {
  LAUNCHER_FORMS,
  LAUNCHER_STYLES,
  type LauncherStyle,
} from "../_components/types";

const SIZES = [120, 92, 60, 40, 28];

export default function LauncherFormPreviewPage() {
  return (
    <div className="min-h-screen w-full bg-[#f4f4f5] py-[40px] px-[24px]">
      <header className="mb-[32px] flex flex-col gap-[8px]">
        <h1 className="text-[22px] font-semibold text-[#18181b]">
          Launcher Form Preview — 5 skin × 14 form
        </h1>
        <p className="text-[14px] text-[#52525b]">
          Figma 24229:34897. form 1~13 의 outer rect 색상이 skin 에 따라 swap.
          AI (form 14) 는 자체 그라데이션이라 skin 무관.
        </p>
        <p className="text-[13px] text-[#71717a]">
          홈버튼 셀렉터에서 form 클릭 시 운영 launcher 에 반영. skin 변경 시
          form sprite 색상도 동기화.
        </p>
      </header>

      <div className="flex flex-col gap-[40px]">
        {SIZES.map((size) => (
          <section
            key={size}
            className="flex flex-col gap-[16px] rounded-[16px] bg-white p-[24px] border border-black/5"
          >
            <h2 className="text-[14px] font-semibold text-[#18181b] font-mono">
              size {size}px
            </h2>

            <div className="flex flex-col gap-[12px]">
              {LAUNCHER_STYLES.map(({ id, label }) => (
                <Row key={id} label={label}>
                  {LAUNCHER_FORMS.map(({ id: formId, label: formLabel }) => (
                    <Cell
                      key={`${id}-${formId}`}
                      id={formId}
                      label={formLabel}
                      size={size}
                    >
                      <LauncherForm
                        form={formId}
                        skin={id as LauncherStyle}
                        size={size}
                      />
                    </Cell>
                  ))}
                </Row>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-[16px]">
      <div className="w-[100px] shrink-0 pt-[4px] text-[12px] font-mono text-[#52525b] uppercase tracking-wide">
        {label}
      </div>
      <div className="flex flex-wrap gap-[16px]">{children}</div>
    </div>
  );
}

function Cell({
  id,
  label,
  size,
  children,
}: {
  id: number;
  label: string;
  size: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col items-center gap-[6px]"
      style={{ width: Math.max(size, 80) }}
    >
      {children}
      <span className="text-[10px] font-mono text-[#a1a1aa]">{id}</span>
      <span className="text-[11px] text-[#52525b] text-center leading-tight">
        {label}
      </span>
    </div>
  );
}
