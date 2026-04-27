"use client";

const DEVICES = [
  { name: "iPhone SE", width: 375, height: 667 },
  { name: "iPhone 11 / 12 mini", width: 375, height: 812 },
  { name: "iPhone 15 Pro", width: 393, height: 852 },
  { name: "Galaxy S20", width: 360, height: 800 },
  { name: "Pixel 7", width: 412, height: 915 },
  { name: "iPad mini", width: 768, height: 1024 },
  { name: "Desktop (1280×800)", width: 1280, height: 800 },
];

const SRC = "/happytalk-enduser";

export default function PreviewPage() {
  return (
    <div className="min-h-screen w-full bg-[#f4f4f5] py-[40px] px-[24px]">
      <header className="mb-[32px] flex flex-col gap-[8px]">
        <h1 className="text-[22px] font-semibold text-[#18181b]">
          Happytalk Enduser — Device Preview
        </h1>
        <p className="text-[14px] text-[#52525b]">
          각 뷰포트 안에서 미디어 쿼리가 실행되어 실제 기기와 동일한 레이아웃으로
          렌더링됩니다. 상호작용은 iframe 내부에서 직접 가능합니다.
        </p>
        <p className="text-[13px] text-[#71717a]">
          실기기 접속: <span className="font-mono">ux-mimi.vercel.app/happytalk-enduser</span>
        </p>
      </header>

      <div className="flex flex-wrap gap-[32px] items-start">
        {DEVICES.map((d) => (
          <DeviceFrame key={d.name} {...d} />
        ))}
      </div>
    </div>
  );
}

function DeviceFrame({
  name,
  width,
  height,
}: {
  name: string;
  width: number;
  height: number;
}) {
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex items-baseline justify-between gap-[8px]">
        <span className="text-[14px] font-medium text-[#18181b]">{name}</span>
        <span className="text-[12px] text-[#a1a1aa] font-mono">
          {width}×{height}
        </span>
      </div>
      <div
        className="relative bg-black rounded-[28px] p-[10px] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25)]"
        style={{ width: width + 20, height: height + 20 }}
      >
        <iframe
          src={SRC}
          title={name}
          className="w-full h-full rounded-[20px] bg-white border-0"
          style={{ width, height }}
        />
      </div>
    </div>
  );
}
