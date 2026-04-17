"use client";

import { useState, useEffect } from "react";
import { HomeScreen } from "./HomeScreen";
import { MessageScreen } from "./MessageScreen";
import { SettingScreen } from "./SettingScreen";
import { ChatScreen } from "./ChatScreen";
import { ChatSkeleton } from "./ChatSkeleton";
import { BottomNav } from "./BottomNav";
import type { HomeVariant, NavTab } from "./types";

type Props = {
  variant: HomeVariant;
};

const TRANSITION_MS = 180;
const SLIDE_MS = 400;
const SKELETON_MS = 300;

export type TextSize = "small" | "large";

export function EnduserFrame({ variant }: Props) {
  const [tab, setTab] = useState<NavTab>("home");
  const [prevTab, setPrevTab] = useState<NavTab | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatClosing, setChatClosing] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [textSize, setTextSize] = useState<TextSize>("small");

  const openChat = () => {
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
    if (textSize === "large") {
      if (!style) {
        style = document.createElement("style");
        style.id = id;
        document.head.appendChild(style);
      }
      style.textContent = `
        #ht-enduser-root [class*="text-\\[11px\\]"] { font-size: 13px !important; }
        #ht-enduser-root [class*="text-\\[12px\\]"] { font-size: 14px !important; }
        #ht-enduser-root [class*="text-\\[13px\\]"] { font-size: 15px !important; }
        #ht-enduser-root [class*="text-\\[14px\\]"] { font-size: 16px !important; }
        #ht-enduser-root [class*="text-\\[16px\\]"] { font-size: 18px !important; }
        #ht-enduser-root [class*="text-\\[18px\\]"] { font-size: 20px !important; }
        #ht-enduser-root [class*="text-\\[24px\\]"] { font-size: 26px !important; }
      `;
    } else if (style) {
      style.remove();
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
      return <HomeScreen variant={variant} onOpenChat={openChat} />;
    if (t === "message") return <MessageScreen onOpenChat={openChat} />;
    return <SettingScreen textSize={textSize} onTextSizeChange={setTextSize} />;
  };

  const transitioning = prevTab !== null;

  return (
    <div
      id="ht-enduser-root"
      className="ht-root relative flex flex-col w-[375px] h-[640px] overflow-hidden rounded-[24px] bg-white"
      data-smooth-corners=""
      style={{
        boxShadow: "var(--ht-shadow-2xl)",
      }}
    >
      {/* Border overlay — always on top */}
      <div
        className="absolute inset-0 z-50 rounded-[24px] pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.1)",
        }}
      />
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
          {chatLoading ? <ChatSkeleton /> : <ChatScreen onBack={closeChat} />}
        </div>
      )}
    </div>
  );
}
