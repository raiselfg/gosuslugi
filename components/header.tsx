"use client";

import { useRouter } from "next/navigation";
import { LeftArrowIcon } from "./icons/left-arrow-icon";
import { ShareIcon } from "./icons/share-icon";

export const Header = () => {
  const router = useRouter();
  return (
    <header className="w-full bg-black px-[14px] pb-[24px] pt-[32px] font-sans text-white sticky top-0 ">
      <div className="flex h-[31px] items-center">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Назад"
          className="mr-[28px] flex size-[24px] items-center justify-center"
        >
          <LeftArrowIcon />
        </button>

        <p className="flex-1 text-[25px] font-semibold leading-[28px] tracking-[-0.03em] text-[#E8E9EB]">
          Многодетная семья
        </p>

        <button
          type="button"
          aria-label="Меню"
          className="ml-[10px] flex size-[24px] items-center justify-center"
        >
          <ShareIcon />
        </button>
      </div>
    </header>
  );
};
