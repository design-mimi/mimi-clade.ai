"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { EnduserFrame, type ActiveScreen } from "./_components/EnduserFrame";
import { VariantSelector } from "./_components/VariantSelector";
import { LauncherVariantSelector } from "./_components/LauncherVariantSelector";
import { Launcher } from "./_components/Launcher";
import type { HomeVariant, LauncherVariant } from "./_components/types";

const LAUNCHER_VARIANT_KEY = "ht-launcher-variant";

function isLauncherVariant(value: string | null): value is LauncherVariant {
  return value === "pencil" || value === "infinity" || value === "heart";
}

export default function HappytalkEnduserPage() {
  const [variant, setVariant] = useState<HomeVariant>("default");
  const [launcherVariant, setLauncherVariant] = useState<LauncherVariant>("pencil");
  const [panelOpen, setPanelOpen] = useState(true);
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>("home");

  // Restore launcher variant from localStorage on mount.
  useEffect(() => {
    const saved = window.localStorage.getItem(LAUNCHER_VARIANT_KEY);
    if (isLauncherVariant(saved)) setLauncherVariant(saved);
  }, []);

  // Persist launcher variant.
  useEffect(() => {
    window.localStorage.setItem(LAUNCHER_VARIANT_KEY, launcherVariant);
  }, [launcherVariant]);

  // VariantSelector is a dev affordance — only useful while the user is
  // actually looking at the home screen (widget open + home tab + no chat
  // overlay covering it).
  const showVariantSelector = panelOpen && activeScreen === "home";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#eeeeee]">
      {/* Mobile-only background */}
      <div className="absolute inset-0 sm:hidden">
        <Image
          src="/kindersalmonshop.com_Mobile.png"
          alt="킨더살몬 쇼핑몰"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>
      {/* Web (≥640px) background */}
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

      {/* Desktop (sm+): bottom-left stack — LauncherVariantSelector on top, VariantSelector below */}
      <div className="hidden sm:flex fixed bottom-6 left-6 z-50 flex-col gap-4">
        <LauncherVariantSelector
          value={launcherVariant}
          onChange={setLauncherVariant}
          embedded
        />
        {showVariantSelector && (
          <VariantSelector value={variant} onChange={setVariant} embedded />
        )}
      </div>

      {/* Mobile: LauncherVariantSelector at bottom-LEFT — only when launcher is visible (= panel closed). */}
      {!panelOpen && (
        <div className="sm:hidden">
          <LauncherVariantSelector
            value={launcherVariant}
            onChange={setLauncherVariant}
          />
        </div>
      )}

      {/* Mobile: existing VariantSelector at bottom-RIGHT — only when panel open + home. */}
      {showVariantSelector && (
        <div className="sm:hidden">
          <VariantSelector value={variant} onChange={setVariant} />
        </div>
      )}

      {panelOpen && (
        <div className="fixed z-40 inset-0 sm:inset-auto sm:right-8 sm:bottom-[112px]">
          <EnduserFrame
            variant={variant}
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
          closeMode={panelOpen}
          onClick={() => setPanelOpen((v) => !v)}
        />
      </div>
    </div>
  );
}
