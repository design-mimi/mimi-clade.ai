"use client";

import { useState, useEffect, useRef } from "react";
import { HomeScreen } from "./HomeScreen";
import { MessageScreen } from "./MessageScreen";
import { SettingScreen } from "./SettingScreen";
import { ChatScreen, type TranscriptItem } from "./ChatScreen";
import { ChatSkeleton } from "./ChatSkeleton";
import { BottomNav } from "./BottomNav";
import type { ConversationSummary, HomeVariant, NavTab } from "./types";
import type { SettingView } from "./SettingScreen";
import { INTRO_BODY } from "./chatCards";

export type ActiveScreen = NavTab | "chat";

type Props = {
  variant: HomeVariant;
  onClose?: () => void;
  onActiveScreenChange?: (screen: ActiveScreen) => void;
};

const TRANSITION_MS = 180;
const SKELETON_MS = 300;

function formatTodayKR(): string {
  const d = new Date();
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export type TextSize = "small" | "large";

export function EnduserFrame({
  variant,
  onClose,
  onActiveScreenChange,
}: Props) {
  const [tab, setTab] = useState<NavTab>("home");
  const [prevTab, setPrevTab] = useState<NavTab | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatClosing, setChatClosing] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatIsNew, setChatIsNew] = useState(false);
  const [settingView, setSettingView] = useState<SettingView>("main");
  const [endChatConfirm, setEndChatConfirm] = useState(false);
  const [deleteAllConfirm, setDeleteAllConfirm] = useState(false);
  const [textSize, setTextSize] = useState<TextSize>(() =>
    typeof window !== "undefined" &&
    !window.matchMedia("(min-width: 640px)").matches
      ? "large"
      : "small",
  );
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const chatHadActivityRef = useRef(false);
  const lastChatPreviewRef = useRef("");
  // null = brand new chat (create row on close); string = resuming an existing
  // row (update that row in-place on close instead of duplicating).
  const activeConversationIdRef = useRef<string | null>(null);
  // Saved transcripts keyed by conversation id, so re-entering a room loads
  // the actual previous chat instead of any hardcoded prefilled fallback.
  const transcriptsRef = useRef<Map<string, TranscriptItem[]>>(new Map());
  // Latest transcript snapshot from the open ChatScreen, captured each time
  // ChatScreen reports a change. Persisted under the room id at closeChat.
  const pendingTranscriptRef = useRef<TranscriptItem[] | null>(null);
  // Initial transcript handed to ChatScreen when resuming a room — null for
  // a fresh new chat (ChatScreen seeds default intro).
  const [activeInitialTranscript, setActiveInitialTranscript] = useState<
    TranscriptItem[] | null
  >(null);

  const openChat = (isNew = false, conversationId: string | null = null) => {
    // Creating a fresh chat room (via 문의하기) counts as activity on its own,
    // so the room appears in the message list even if the user closes
    // immediately. Initial preview = intro greeting; later interactions
    // overwrite it through onUserActivity.
    chatHadActivityRef.current = isNew;
    lastChatPreviewRef.current = isNew ? INTRO_BODY : "";
    activeConversationIdRef.current = conversationId;
    pendingTranscriptRef.current = null;
    // Resuming a room → hydrate from saved transcript. Fresh chat → null
    // (ChatScreen will seed the intro itself).
    setActiveInitialTranscript(
      !isNew && conversationId
        ? transcriptsRef.current.get(conversationId) ?? null
        : null,
    );
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
    onActiveScreenChange?.(chatOpen ? "chat" : tab);
  }, [tab, chatOpen, onActiveScreenChange]);

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
        }
      `;
    }
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [textSize]);

  const closeChat = () => {
    // Persist this session as a new conversation row only if the user
    // actually interacted (chip / card CTA / send). Idle open-then-close
    // doesn't add a row.
    if (chatHadActivityRef.current && lastChatPreviewRef.current) {
      const now = Date.now();
      const newBody = lastChatPreviewRef.current;
      const existingId = activeConversationIdRef.current;
      const targetId = existingId ?? `conv-${now}`;
      // Persist transcript before mutating list so re-entry sees fresh state.
      if (pendingTranscriptRef.current) {
        transcriptsRef.current.set(targetId, pendingTranscriptRef.current);
      }
      setConversations((prev) => {
        if (existingId) {
          const idx = prev.findIndex((c) => c.id === existingId);
          if (idx !== -1) {
            const updated: ConversationSummary = {
              ...prev[idx],
              status: formatTodayKR(),
              createdAt: now,
              body: newBody,
            };
            return [updated, ...prev.slice(0, idx), ...prev.slice(idx + 1)];
          }
        }
        return [
          {
            id: targetId,
            status: formatTodayKR(),
            createdAt: now,
            body: newBody,
          },
          ...prev,
        ];
      });
      chatHadActivityRef.current = false;
      lastChatPreviewRef.current = "";
      activeConversationIdRef.current = null;
      pendingTranscriptRef.current = null;
    }
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
    if (t === "message")
      return (
        <MessageScreen
          conversations={conversations}
          onStartNewChat={() => openChat(true)}
          onOpenHistory={(conversationId) => openChat(false, conversationId)}
          onRequestDeleteAll={() => setDeleteAllConfirm(true)}
        />
      );
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
          onClick={() => {
            // While chat is open, X asks for confirmation to end the
            // consultation. Otherwise it closes the entire widget.
            if (chatOpen) {
              setEndChatConfirm(true);
            } else {
              onClose();
            }
          }}
          aria-label="닫기"
          className="sm:hidden absolute top-[10px] right-[14px] z-[55] flex items-center justify-center"
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
          {chatLoading ? (
            <ChatSkeleton />
          ) : (
            <ChatScreen
              onBack={closeChat}
              isNew={chatIsNew}
              initialTranscript={activeInitialTranscript}
              onUserActivity={(latestPreview) => {
                chatHadActivityRef.current = true;
                lastChatPreviewRef.current = latestPreview;
              }}
              onTranscriptUpdate={(transcript) => {
                pendingTranscriptRef.current = transcript;
              }}
            />
          )}
        </div>
      )}

      {/* End-chat confirmation modal */}
      {endChatConfirm && (
        <ConfirmModal
          title="상담을 종료할까요?"
          confirmLabel="상담 종료하기"
          onCancel={() => setEndChatConfirm(false)}
          onConfirm={() => {
            setEndChatConfirm(false);
            closeChat();
          }}
        />
      )}

      {/* Delete-all-conversations confirmation modal */}
      {deleteAllConfirm && (
        <ConfirmModal
          title="전체 메시지를 삭제할까요?"
          confirmLabel="전체 삭제하기"
          onCancel={() => setDeleteAllConfirm(false)}
          onConfirm={() => {
            setConversations([]);
            setDeleteAllConfirm(false);
          }}
        />
      )}
    </div>
  );
}

function ConfirmModal({
  title,
  cancelLabel = "취소",
  confirmLabel = "확인",
  onCancel,
  onConfirm,
}: {
  title: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center px-[24px]">
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0, 0, 0, 0.4)" }}
        onClick={onCancel}
      />
      <div
        className="relative bg-white rounded-[16px] w-full max-w-[360px] flex flex-col overflow-hidden"
        style={{ boxShadow: "var(--ht-shadow-modal-lg)" }}
      >
        {/* Header */}
        <div
          className="flex flex-col items-start justify-center min-h-[60px] p-[24px] border-b"
          style={{ borderColor: "var(--ht-border-default)" }}
        >
          <p
            className="text-[16px] leading-6 font-semibold tracking-[-0.25px]"
            style={{ color: "var(--ht-text-default)" }}
          >
            {title}
          </p>
        </div>
        {/* Footer — right-aligned actions */}
        <div className="flex items-center justify-end gap-[8px] min-h-[60px] p-[16px]">
          <button
            type="button"
            onClick={onCancel}
            className="ht-pressable px-[14px] py-[8px] rounded-full text-[14px] leading-5 font-medium tracking-[-0.25px]"
            style={{
              background: "rgba(39, 39, 42, 0.06)",
              color: "var(--ht-text-default)",
              appearance: "none",
              WebkitAppearance: "none",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="ht-pressable px-[14px] py-[8px] rounded-full text-[14px] leading-5 font-medium tracking-[-0.25px] text-white"
            style={{
              background: "var(--ht-bg-inverted)",
              appearance: "none",
              WebkitAppearance: "none",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
