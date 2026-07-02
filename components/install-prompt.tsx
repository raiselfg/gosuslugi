"use client";

import { useEffect, useRef, useState } from "react";
import { installPromptText } from "@/lib/app-data";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type PromptMode = "native" | "manual";

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  ("standalone" in window.navigator && window.navigator.standalone === true);

const getManualInstallText = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIos = /iphone|ipad|ipod/.test(userAgent);
  const isAndroid = /android/.test(userAgent);
  const isFirefox = /firefox/.test(userAgent);

  if (isIos) {
    return installPromptText.ios;
  }

  if (isAndroid) {
    return installPromptText.android;
  }

  if (isFirefox) {
    return installPromptText.firefox;
  }

  return installPromptText.default;
};

export const InstallPrompt = () => {
  const fallbackTimerRef = useRef<number | null>(null);
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [mode, setMode] = useState<PromptMode | null>(null);
  const [manualText, setManualText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isStandalone()) {
      return;
    }

    const showManualPrompt = () => {
      setManualText(getManualInstallText());
      setMode((currentMode) => currentMode ?? "manual");
      setIsVisible(true);
    };

    fallbackTimerRef.current = window.setTimeout(showManualPrompt, 1500);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();

      if (fallbackTimerRef.current) {
        window.clearTimeout(fallbackTimerRef.current);
      }

      setInstallPrompt(event as BeforeInstallPromptEvent);
      setMode("native");
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setMode(null);
      setIsVisible(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      if (fallbackTimerRef.current) {
        window.clearTimeout(fallbackTimerRef.current);
      }

      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    await installPrompt.userChoice;

    setInstallPrompt(null);
    setMode(null);
    setIsVisible(false);
  };

  if (!isVisible || !mode) {
    return null;
  }

  const isNativePrompt = mode === "native" && installPrompt;

  return (
    <div className="fixed inset-x-0 bottom-[16px] z-50 flex justify-center px-[16px]">
      <div className="flex w-full max-w-[360px] items-center gap-[12px] rounded-[16px] bg-[#292A33] px-[14px] py-[12px] text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold leading-[18px]">
            {installPromptText.title}
          </p>
          <p className="mt-[2px] text-[12px] leading-[16px] text-[#9AA4B8]">
            {isNativePrompt ? installPromptText.nativeDescription : manualText}
          </p>
        </div>

        {isNativePrompt ? (
          <button
            type="button"
            onClick={handleInstall}
            className="shrink-0 rounded-[10px] bg-[#168BF2] px-[12px] py-[8px] text-[13px] font-semibold leading-[16px]"
          >
            {installPromptText.installButton}
          </button>
        ) : null}

        <button
          type="button"
          aria-label={installPromptText.dismissInstall}
          onClick={() => setIsVisible(false)}
          className="shrink-0 text-[20px] leading-none text-[#9AA4B8]"
        >
          ×
        </button>
      </div>
    </div>
  );
};
