"use client";

export function ChatSkeleton() {
  return (
    <div
      className="relative flex flex-col w-full h-full overflow-hidden bg-white"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(214, 255, 192, 0.4) 0%, rgba(255, 246, 206, 0.2) 40%, rgba(250, 250, 250, 0.1) 70%)",
      }}
    >
      {/* Back button */}
      <div className="absolute top-[9px] left-[9px] z-20">
        <div className="ht-skeleton w-[44px] h-[44px] rounded-full" />
      </div>

      <div className="flex-1 flex flex-col gap-[10px] pt-[16px] px-[16px] pb-[140px]">
        {/* Date badge */}
        <div className="flex justify-center w-full">
          <div className="ht-skeleton w-[140px] h-[28px] rounded-full" />
        </div>

        {/* Card */}
        <div className="ht-skeleton w-[256px] h-[320px] rounded-[16px]" />

        {/* Agent bubble */}
        <div className="flex flex-col gap-[6px] w-full">
          <div className="ht-skeleton w-[80px] h-[16px] rounded-[4px]" />
          <div className="ht-skeleton w-[260px] h-[40px] rounded-[8px]" />
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-[4px] justify-end self-end">
          <div className="ht-skeleton w-[80px] h-[36px] rounded-full" />
          <div className="ht-skeleton w-[120px] h-[36px] rounded-full" />
          <div className="ht-skeleton w-[90px] h-[36px] rounded-full" />
        </div>
      </div>

      {/* Input bar */}
      <div className="absolute left-[16px] right-[16px] bottom-[16px]">
        <div className="ht-skeleton w-full h-[50px] rounded-[16px]" />
      </div>
    </div>
  );
}
