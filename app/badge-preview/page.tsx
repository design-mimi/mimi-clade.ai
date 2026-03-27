import BetaBadge from "@/components/BetaBadge";

export default function BadgePreview() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-64">
        {/* Sidebar Header */}
        <div className="px-4 py-3 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-800" style={{ fontFamily: "SUIT, sans-serif" }}>
            설정
          </span>
        </div>

        {/* Sidebar Menu */}
        <div className="py-2">
          {["일반", "알림", "보안", "계정"].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
              style={{ fontFamily: "SUIT, sans-serif" }}
            >
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Beta Badge at bottom */}
        <div className="px-4 py-3 border-t border-gray-100">
          <BetaBadge />
        </div>
      </div>

      {/* Badge Variants */}
      <div className="ml-12 flex flex-col gap-4">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Badge Variants</p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <BetaBadge />
            <span className="text-xs text-gray-400">기본</span>
          </div>
          <div className="flex items-center gap-3">
            <BetaBadge label="베타" className="opacity-70" />
            <span className="text-xs text-gray-400">흐림</span>
          </div>
        </div>
      </div>
    </div>
  );
}
