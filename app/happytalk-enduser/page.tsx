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

      <div className="fixed right-8 bottom-8 z-40 flex flex-col items-end gap-[20px]">
        {panelOpen && <EnduserFrame variant={variant} />}
        <Launcher onClick={() => setPanelOpen((v) => !v)} />
      </div>
    </div>
  );
}
