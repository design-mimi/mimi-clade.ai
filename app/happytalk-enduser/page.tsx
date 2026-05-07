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
            onClose={() => setPanelOpen(false)}
            onActiveScreenChange={setActiveScreen}
          />
        </div>
      )}
      <div
        className={`fixed right-4 bottom-4 sm:right-8 sm:bottom-8 z-50 ${
          panelOpen ? "hidden sm:block" : ""
        }`}
      >
        <Launcher
          variant={launcherVariant}
          style={launcherStyle}
          closeMode={panelOpen}
          onClick={() => setPanelOpen((v) => !v)}
        />
      </div>
    </div>
  );
}
