"use client";

import Image from "next/image";
import { useState } from "react";
import { EnduserFrame, type ActiveScreen } from "./_components/EnduserFrame";
import { VariantSelector } from "./_components/VariantSelector";
import { LauncherVariantSelector } from "./_components/LauncherVariantSelector";
import { AdminToggleSelector } from "./_components/AdminToggleSelector";
import { Launcher } from "./_components/Launcher";
import type {
  HomeBoxType,
  HomeVariant,
  LauncherForm,
  LauncherStyle,
  LauncherVariant,
  ResponseStatus,
} from "./_components/types";

export default function HappytalkEnduserPage() {
  const [variant, setVariant] = useState<HomeVariant>("none");
  // 어드민 토글 — 홈 카드 모듈 조합. 시안 (Figma 27314:1562 / 27343:1126) 기준.
  const [boxType, setBoxType] = useState<HomeBoxType>("ai-agent");
  const [showNotice, setShowNotice] = useState(false);
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>("ai");
  // Always start fresh on pencil — new visitors see the signature drawing
  // motion first. Selector still toggles within the session, but page reload
  // returns to pencil (no localStorage persistence).
  const [launcherVariant, setLauncherVariant] = useState<LauncherVariant>("pencil");
  // Launcher button skin (Figma 27158:30782). Light = current default white
  // button. Same no-persistence policy as variant.
  const [launcherStyle, setLauncherStyle] = useState<LauncherStyle>("light");
  // Form sprite (Figma 24229:34897). null = motion 모드 (기본). 1~14 = sprite 모드.
  // 색상은 launcherStyle (skin) 을 자동으로 따라감 (form 14 AI 제외).
  const [launcherForm, setLauncherForm] = useState<LauncherForm | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>("home");

  // VariantSelector is a dev affordance — only useful while the user is
  // actually looking at the home screen (widget open + home tab + no chat
  // overlay covering it).
  const showVariantSelector = panelOpen && activeScreen === "home";

  return (
    <div className="relative min-h-screen w-full sm:overflow-hidden bg-[#eeeeee]">
      {/* Mobile-only background — flows in document so the page scrolls
          through the full shop screenshot (750×2404). All overlays remain
          fixed-positioned so they stay anchored while the bg scrolls. */}
      <div className="sm:hidden">
        <Image
          src="/kindersalmonshop.com_Mobile.png"
          alt="킨더살몬 쇼핑몰"
          width={750}
          height={2404}
          priority
          sizes="100vw"
          className="block w-full h-auto"
        />
      </div>
      {/* Web (≥640px) background — pinned to viewport (widget demo mode). */}
      <div className="absolute inset-0 hidden sm:block">
        <Image
          src="/kindersalmonshop.png"
          alt="킨더살몬 쇼핑몰"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>

      {/* Desktop (sm+): bottom-left stack. LauncherVariantSelector only while
          the launcher icon is showing (panel closed) — once the panel opens
          the launcher becomes an X close button and the variant picker has
          nothing to preview. VariantSelector + AdminToggleSelector take its
          place when the home screen is the active surface. */}
      <div className="hidden sm:flex fixed bottom-6 left-6 z-50 flex-col gap-4">
        {!panelOpen && (
          <LauncherVariantSelector
            value={launcherVariant}
            onChange={setLauncherVariant}
            styleValue={launcherStyle}
            onStyleChange={setLauncherStyle}
            formValue={launcherForm}
            onFormChange={setLauncherForm}
            embedded
          />
        )}
        {showVariantSelector && (
          <>
            <VariantSelector value={variant} onChange={setVariant} embedded />
            <AdminToggleSelector
              boxType={boxType}
              onBoxTypeChange={setBoxType}
              showNotice={showNotice}
              onShowNoticeChange={setShowNotice}
              responseStatus={responseStatus}
              onResponseStatusChange={setResponseStatus}
              embedded
            />
          </>
        )}
      </div>

      {/* Mobile: LauncherVariantSelector at bottom-LEFT — only when launcher is visible (= panel closed). */}
      {!panelOpen && (
        <div className="sm:hidden">
          <LauncherVariantSelector
            value={launcherVariant}
            onChange={setLauncherVariant}
            styleValue={launcherStyle}
            onStyleChange={setLauncherStyle}
            formValue={launcherForm}
            onFormChange={setLauncherForm}
          />
        </div>
      )}

      {/* Mobile: VariantSelector + AdminToggleSelector at bottom-RIGHT — only when panel open + home. */}
      {showVariantSelector && (
        <div className="sm:hidden">
          <VariantSelector value={variant} onChange={setVariant} />
          <AdminToggleSelector
            boxType={boxType}
            onBoxTypeChange={setBoxType}
            showNotice={showNotice}
            onShowNoticeChange={setShowNotice}
            responseStatus={responseStatus}
            onResponseStatusChange={setResponseStatus}
          />
        </div>
      )}

      {panelOpen && (
        <div className="fixed z-40 inset-0 sm:inset-auto sm:right-8 sm:bottom-[112px]">
          <EnduserFrame
            variant={variant}
            boxType={boxType}
            showNotice={showNotice}
            responseStatus={responseStatus}
            initialOpenChat
            onClose={() => setPanelOpen(false)}
            onActiveScreenChange={setActiveScreen}
          />
        </div>
      )}
      {/* 시안 데모용 버블 FAB (Figma 27386:1600) — launcher 위 두 frosted-glass
         버블. pointer-events-none 으로 클릭 비활성, panel 닫혀 있을 때만 노출. */}
      {!panelOpen && <BubbleFabPreview />}

      <div
        className={`fixed right-4 bottom-4 sm:right-8 sm:bottom-8 z-50 ${
          panelOpen ? "hidden sm:block" : ""
        }`}
      >
        <Launcher
          variant={launcherVariant}
          style={launcherStyle}
          form={launcherForm}
          closeMode={panelOpen}
          onClick={() => setPanelOpen((v) => !v)}
        />
      </div>
    </div>
  );
}

function BubbleFabPreview() {
  const labels = ["AI 에이전트 알아보기", "새로운 기능을 알아보세요"];
  const bubbleStyle = {
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.06) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.12) 100%)",
    border: "1px solid rgba(255, 255, 255, 0.35)",
    boxShadow: "0 8px 20px 0 rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  } as const;
  return (
    <div
      aria-hidden
      className="fixed right-4 bottom-[92px] sm:right-8 sm:bottom-[96px] z-50 pointer-events-none flex flex-col items-end gap-[8px]"
    >
      {labels.map((label) => (
        <div
          key={label}
          className="px-[14px] py-[10px] rounded-[16px] text-[16px] leading-6 font-semibold tracking-[-0.25px] text-black text-right whitespace-nowrap"
          style={bubbleStyle}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
