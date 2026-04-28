"use client";

import { useState, useEffect } from "react";
import { HomeScreen } from "./HomeScreen";
import { MessageScreen } from "./MessageScreen";
import { SettingScreen } from "./SettingScreen";
import { ChatScreen } from "./ChatScreen";
import { ChatSkeleton } from "./ChatSkeleton";
import { BottomNav } from "./BottomNav";
import type { HomeVariant, NavTab } from "./types";
import type { SettingView } from "./SettingScreen";

type Props = {
  variant: HomeVariant;
  onClose?: () => void;
};

const TRANSITION_MS = 180;
const SKELETON_MS = 300;

export type TextSize = "small" | "large";

export function EnduserFrame({ variant, onClose }: Props) {
  const [tab, setTab] = useState<NavTab>("home");
  const [prevTab, setPrevTab] = useState<NavTab | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatClosing, setChatClosing] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatIsNew, setChatIsNew] = useState(false);
  const [settingView, setSettingView] = useState<SettingView>("main");
  const [textSize, setTextSize] = useState<TextSize>(() =>
    typeof window !== "undefined" &&
    !window.matchMedia("(min-width: 640px)").matches
      ? "large"
      : "small",
  );

  const openChat = (isNew = false) => {
    setChatIsNew(isNew);
    setChatLoading(true);
    setChatOpen(true);
  };

  useEffect(() => {
    if (chatLoading) {
      const t = window.setTimeout(() => setChatLoading(false), SKELETON_MS);
      return () => clearTimeout(t);
    }
  }, [chatLoading]);

  useEffect(() => {
    const id = "ht-text-size-style";
    let style = document.getElementById(id) as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement("style");
      style.id = id;
      document.head.appendChild(style);
    }
    if (textSize === "small") {
      // Mobile small = +1 on body sizes (15/16/17/19) for closer-distance readability;
      // captions/heading hold to preserve layout. Web small = Figma default (no override).
      style.textContent = `
        @media (max-width: 639.98px) {
          #ht-enduser-root [class*="text-\\[14px\\]"] { font-size: 15px !important; }
          #ht-enduser-root [class*="text-\\[15px\\]"] { font-size: 16px !important; }
          #ht-enduser-root [class*="text-\\[16px\\]"] { font-size: 17px !important; }
          #ht-enduser-root [class*="text-\\[18px\\]"] { font-size: 19px !important; }
          #ht-enduser-root [class~="leading-5"] { line-height: 22px !important; }
          #ht-enduser-root [class~="leading-6"] { line-height: 26px !important; }
          #ht-enduser-root [class~="leading-7"] { line-height: 30px !important; }
        }
      `;
    } else {
      // Large = small-mode boost +2; captions get +2 across both viewports.
      style.textContent = `
        #ht-enduser-root { letter-spacing: 0.01em; }
        @media (min-width: 640px) {
          #ht-enduser-root [class*="text-\\[11px\\]"] { font-size: 13px !important; }
          #ht-enduser-root [class*="text-\\[12px\\]"] { font-size: 14px !important; }
          #ht-enduser-root [class*="text-\\[13px\\]"] { font-size: 15px !important; }
          #ht-enduser-root [class*="text-\\[14px\\]"] { font-size: 16px !important; }
          #ht-enduser-root [class*="text-\\[15px\\]"] { font-size: 17px !important; }
          #ht-enduser-root [class*="text-\\[16px\\]"] { font-size: 18px !important; }
          #ht-enduser-root [class*="text-\\[18px\\]"] { font-size: 20px !important; }
          #ht-enduser-root [class*="text-\\[24px\\]"] { font-size: 26px !important; }
          #ht-enduser-root [class~="leading-4"] { line-height: 20px !important; }
          #ht-enduser-root [class~="leading-5"] { line-height: 24px !important; }
          #ht-enduser-root [class~="leading-6"] { line-height: 28px !important; }
          #ht-enduser-root [class~="leading-7"] { line-height: 32px !important; }
          #ht-enduser-root [class~="leading-8"] { line-height: 36px !important; }
          #ht-enduser-root [class*="leading-\\[18px\\]"] { line-height: 22px !important; }
        }
        @media (max-width: 639.98px) {
          #ht-enduser-root [class*="text-\\[11px\\]"] { font-size: 13px !important; }
          #ht-enduser-root [class*="text-\\[12px\\]"] { font-size: 14px !important; }
          #ht-enduser-root [class*="text-\\[13px\\]"] { font-size: 15px !important; }
          #ht-enduser-root [class*="text-\\[14px\\]"] { font-size: 17px !important; }
          #ht-enduser-root [class*="text-\\[15px\\]"] { font-size: 18px !important; }
          #ht-enduser-root [class*="text-\\[16px\\]"] { font-size: 19px !important; }
          #ht-enduser-root [class*="text-\\[18px\\]"] { font-size: 21px !important; }
          #ht-enduser-root [class*="text-\\[24px\\]"] { font-size: 26px !important; }
          #ht-enduser-root [class~="leading-4"] { line-height: 20px !important; }
          #ht-enduser-root [class~="leading-5"] { line-height: 25px !important; }
          #ht-enduser-root [class~="leading-6"] { line-height: 29px !important; }
          #ht-enduser-root [class~="leading-7"] { line-height: 33px !important; }
          #ht-enduser-root [class~="leading-8"] { line-height: 36px !important; }
          #ht-enduser-root [class*="leading-\\[18px\\]"] { line-height: 23px !important; }
        }
      `;
    }
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [textSize]);

  const closeChat = () => {
    setChatClosing(true);
    window.setTimeout(() => {
      setChatOpen(false);
      setChatClosing(false);
    }, 350);
  };

  const handleTabChange = (next: NavTab) => {
    if (next === tab) return;
    setPrevTab(tab);
    setTab(next);
    window.setTimeout(() => setPrevTab(null), TRANSITION_MS);
  };

  const renderScreen = (t: NavTab) => {
    if (t === "home")
      return <HomeScreen variant={variant} onOpenChat={() => openChat(true)} />;
    if (t === "message") return <MessageScreen onOpenChat={() => openChat(false)} />;
    return (
      <SettingScreen
        textSize={textSize}
        onTextSizeChange={setTextSize}
        view={settingView}
        onViewChange={setSettingView}
      />
    );
  };

  const transitioning = prevTab !== null;

  return (
    <div
      id="ht-enduser-root"
      className="ht-root ht-frame relative flex flex-col overflow-hidden bg-white"
      data-smooth-corners=""
    >
      {/* Border overlay — always on top */}
      <div
        className="ht-frame-overlay absolute inset-0 z-50 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.1)",
        }}
      />

      {/* Mobile-only close button — hidden on setting profile sub-view */}
      {onClose && !(tab === "setting" && settingView === "profile") && (
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="sm:hidden absolute top-[14px] right-[14px] z-[55] flex items-center justify-center"
        >
          <svg width="36" height="36" viewBox="0 0 28 28" fill="none">
            <path
              d="M0 6C0 2.68629 2.68629 0 6 0H22C25.3137 0 28 2.68629 28 6V22C28 25.3137 25.3137 28 22 28H6C2.68629 28 0 25.3137 0 22V6Z"
              fill="#27272A"
              fillOpacity="0.06"
            />
            <path
              d="M13.9995 13.0577L17.2993 9.75781L18.2421 10.7006L14.9423 14.0005L18.2421 17.3003L17.2993 18.2431L13.9995 14.9433L10.6996 18.2431L9.75684 17.3003L13.0567 14.0005L9.75684 10.7006L10.6996 9.75781L13.9995 13.0577Z"
              fill="#4E4E55"
            />
          </svg>
        </button>
      )}
      {/* Tab screens — depth effect when chat is open */}
      <div
        className={`relative flex-1 min-h-0 overflow-hidden ${
          chatOpen ? (chatClosing ? "ht-depth-out" : "ht-depth-in") : ""
        }`}
      >
        {transitioning && prevTab && (
          <div
            key={`out-${prevTab}`}
            className="absolute inset-0 ht-screen-out"
          >
            {renderScreen(prevTab)}
          </div>
        )}
        <div
          key={`in-${tab}`}
          className={`absolute inset-0 ${transitioning ? "ht-screen-in" : ""}`}
        >
          {renderScreen(tab)}
        </div>
      </div>

      {!chatOpen && <BottomNav active={tab} onChange={handleTabChange} />}

      {/* Dim overlay behind chat */}
      {chatOpen && (
        <div
          className={`absolute inset-0 z-20 pointer-events-none ${
            chatClosing ? "ht-backdrop-dim-out" : "ht-backdrop-dim-in"
          }`}
          style={{ background: "rgba(0, 0, 0, 0.15)" }}
        />
      )}

      {/* Chat — slides over everything */}
      {chatOpen && (
        <div
          className={`absolute inset-0 z-30 ${chatClosing ? "ht-slide-out-right" : "ht-slide-in-right"}`}
        >
          {chatLoading ? <ChatSkeleton /> : <ChatScreen onBack={closeChat} isNew={chatIsNew} />}
        </div>
      )}
    </div>
  );
}
