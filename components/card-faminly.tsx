"use client";

import { useState } from "react";
import Link from "next/link";
import { CopyIcon } from "./copi-icon";
import { IconRefresh } from "./refresh-icon";

const familyMembers = [
  "ШЕВЧУК КАРИНА АРМАИСОВНА, 48 лет",
  "ШЕВЧУК СЕРГЕЙ АЛЕКСЕЕВИЧ, 46 лет",
  "ШЕВЧУК СОФЬЯ СЕРГЕЕВНА, 21 год",
  "ШЕВЧУК МАРГАРИТА СЕРГЕЕВНА, 19 лет",
  "ШЕВЧУК РОМАН СЕРГЕЕВИЧ, 12 лет",
];

export const FamilyCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex w-[369px] flex-col items-center font-sans">
      <div className="h-[278px] w-full [perspective:1200px]">
        <div
          className={`relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          <div className="absolute inset-0 flex h-[278px] w-full overflow-hidden rounded-[11px] bg-[#E4F6F6] text-left [backface-visibility:hidden]">
            <div className="flex w-full flex-col">
              <div className="flex h-[40px] items-center justify-center bg-[#CFEBEC]">
                <span className="font-serif text-[12px] font-bold uppercase leading-none text-[#88BBBB]">
                  УДОСТОВЕРЕНИЕ МНОГОДЕТНОЙ СЕМЬИ
                </span>
              </div>

              <div className="flex h-[238px] flex-col bg-[#E4F6F6] px-[19px] pb-[18px] pt-[25px]">
                <div className="mb-[14px] flex items-start gap-[9px] text-[#2D8C88]">
                  <span className="text-[19px] font-bold leading-[24px] tracking-[0.01em]">
                    104000003205937
                  </span>
                  <CopyIcon className="mt-[1px] size-[19px] shrink-0" />
                </div>

                <div className="mb-[14px] flex flex-col items-start">
                  <span className="text-[11px] font-medium leading-[14px] text-[#50606B]">
                    Статус многодетной семьи
                  </span>
                  <span className="text-[12px] font-semibold uppercase leading-[14px] tracking-[0.01em] text-[#26333A]">
                    УСТАНОВЛЕН
                  </span>
                </div>

                <div className="mb-[14px] flex flex-col items-start">
                  <span className="text-[11px] font-medium leading-[14px] text-[#50606B]">
                    Дата установления статуса
                  </span>
                  <span className="text-[12px] font-semibold leading-[14px] tracking-[0.01em] text-[#26333A]">
                    29.05.2024
                  </span>
                </div>

                <div className="mb-[12px] flex flex-col items-start">
                  <span className="text-[11px] font-medium leading-[14px] text-[#50606B]">
                    Орган, установивший статус
                  </span>
                  <span className="max-w-[297px] text-[12px] font-semibold uppercase leading-[14px] tracking-[0.01em] text-[#26333A]">
                    АДМИНИСТРАЦИЯ ФРУНЗЕНСКОГО РАЙОНА САНКТ-ПЕТЕРБУРГА
                  </span>
                </div>

                <Link
                  href="/details"
                  className="text-[13px] font-bold leading-[17px] text-[#1A8FE3]"
                >
                  детали документа
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex h-[278px] w-full overflow-hidden rounded-[11px] bg-[#E4F6F6] text-left [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="flex w-full flex-col">
              <div className="flex h-[40px] items-center justify-center bg-[#CFEBEC]">
                <span className="font-serif text-[12px] font-bold uppercase leading-none text-[#88BBBB]">
                  УДОСТОВЕРЕНИЕ МНОГОДЕТНОЙ СЕМЬИ
                </span>
              </div>

              <div className="flex h-[238px] flex-col bg-[#E4F6F6] px-[25px] pt-[52px]">
                <div className="w-full overflow-hidden rounded-[4px] border border-[#D5E7E9] text-[#495762]">
                  <div className="flex h-[23px] items-center border-b border-[#D5E7E9] px-[24px] text-[11px] font-semibold leading-[14px]">
                    ФИО и возраст
                  </div>

                  {familyMembers.map((member) => (
                    <div
                      key={member}
                      className="flex h-[23px] items-center border-b border-[#D5E7E9] px-[24px] text-[11px] font-semibold uppercase leading-[14px] last:border-b-0"
                    >
                      {member}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsFlipped((value) => !value)}
        className="mt-[21px] flex items-center gap-[9px] text-[11px] font-bold leading-[14px] text-[#168BE5]"
      >
        <IconRefresh />
        Перевернуть
      </button>
    </div>
  );
};
