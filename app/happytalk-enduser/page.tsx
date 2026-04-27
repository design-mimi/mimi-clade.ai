"use client";

import Image from "next/image";
import { useState } from "react";
import { EnduserFrame } from "./_components/EnduserFrame";
import { VariantSelector } from "./_components/VariantSelector";
import { Launcher } from "./_components/Launcher";
import type { HomeVariant } from "./_components/types";

export default function HappytalkEnduserPage() {
  const [variant, setVariant] = useState<HomeVariant>("default");
  const [panelOpen, setPanelOpen] = useState(true);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#eeeeee]">
      <div className="absolute inset-0">
        <Image
          src="/kindersalmonshop.png"
          alt="킨더살몬 쇼핑몰"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>

      <VariantSelector value={variant} onChange={setVariant} />

      {panelOpen && (
        <div className="fixed z-40 inset-0 sm:inset-auto sm:right-8 sm:bottom-[112px]">
          <EnduserFrame variant={variant} onClose={() => setPanelOpen(false)} />
        </div>
      )}
      <div
        className={`fixed right-4 bottom-4 sm:right-8 sm:bottom-8 z-50 ${
          panelOpen ? "hidden sm:block" : ""
        }`}
      >
        <Launcher onClick={() => setPanelOpen((v) => !v)} />
      </div>
    </div>
  );
}
