"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  ("standalone" in window.navigator && window.navigator.standalone === true);

export const InstallPrompt = () => {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isStandalone()) {
      return;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setIsVisible(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
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
    setIsVisible(false);
  };

  if (!isVisible || !installPrompt) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-[16px] z-50 flex justify-center px-[16px]">
      <div className="flex w-full max-w-[360px] items-center gap-[12px] rounded-[16px] bg-[#292A33] px-[14px] py-[12px] text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold leading-[18px]">
            Установить приложение
          </p>
          <p className="mt-[2px] text-[12px] leading-[16px] text-[#9AA4B8]">
            Будет доступно быстрее и сможет открываться offline
          </p>
        </div>

        <button
          type="button"
          onClick={handleInstall}
          className="shrink-0 rounded-[10px] bg-[#168BF2] px-[12px] py-[8px] text-[13px] font-semibold leading-[16px]"
        >
          Установить
        </button>

        <button
          type="button"
          aria-label="Скрыть установку приложения"
          onClick={() => setIsVisible(false)}
          className="shrink-0 text-[20px] leading-none text-[#9AA4B8]"
        >
          ×
        </button>
      </div>
    </div>
  );
};
