"use client";

import { useState } from "react";
import {
  familyDocument,
  familyMembers,
  formatPersonWithAge,
  uiText,
} from "@/lib/app-data";
import { CopyIcon } from "./icons/copy-icon";
import { IconRefresh } from "./icons/refresh-icon";

const allFamilyMembers = [
  ...familyMembers.representatives,
  ...familyMembers.children,
];

export const FamilyCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex w-[369px] flex-col items-center font-sans">
      <div className="h-[290px] w-full [perspective:1200px]">
        <div
          className={`relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          <div className="absolute inset-0 flex h-[286px] w-full overflow-hidden rounded-[11px] bg-[#E4F6F6] text-left [backface-visibility:hidden]">
            <div className="flex w-full flex-col">
              <div className="flex h-[40px] items-center justify-center bg-[#CFEBEC]">
                <span className="font-serif text-[12px] font-bold uppercase leading-none text-[#6c9696]">
                  {familyDocument.title}
                </span>
              </div>

              <div className="flex h-[238px] flex-col bg-[#E4F6F6] px-[19px] pb-[18px] pt-[25px]">
                <div className="mb-[14px] flex items-start gap-[9px] text-[#2D8C88]">
                  <span className="text-[18px] font-semibold leading-[24px] tracking-[0.01em]">
                    {familyDocument.number}
                  </span>
                  <CopyIcon className="mt-[1px] size-[19px] shrink-0" />
                </div>

                <div className="mb-[14px] flex flex-col items-start gap-0.5">
                  <span className="text-[11px] font-medium leading-[14px] text-[#50606B]">
                    {familyDocument.statusLabel}
                  </span>
                  <span className="text-[11.5px] font-semibold uppercase leading-[14px] tracking-[0.01em] text-[#26333A]">
                    {familyDocument.status.toUpperCase()}
                  </span>
                </div>

                <div className="mb-[14px] flex flex-col items-start gap-0.5">
                  <span className="text-[11px] font-medium leading-[14px] text-[#50606B]">
                    {familyDocument.establishedDateLabel}
                  </span>
                  <span className="text-[11.5px] font-semibold leading-[14px] tracking-[0.01em] text-[#26333A]">
                    {familyDocument.establishedDate}
                  </span>
                </div>

                <div className="mb-[12px] flex flex-col items-start gap-0.5">
                  <span className="text-[11px] font-medium leading-[14px] text-[#50606B]">
                    {familyDocument.authorityLabel}
                  </span>
                  <span className="max-w-[297px] text-[11.5px] font-semibold uppercase leading-[16px] tracking-[0.01em] text-[#26333A]">
                    {familyDocument.authority.toUpperCase()}
                  </span>
                </div>

                <a
                  href="/details"
                  className="text-[13px] font-bold leading-[17px] text-[#1A8FE3]"
                >
                  {uiText.documentDetails}
                </a>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex h-[286px] w-full overflow-hidden rounded-[11px] bg-[#E4F6F6] text-left [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="flex w-full flex-col">
              <div className="flex h-[40px] items-center justify-center bg-[#CFEBEC]">
                <span className="font-serif text-[12px] font-bold uppercase leading-none text-[#88BBBB]">
                  {familyDocument.title}
                </span>
              </div>

              <div className="flex h-[238px] flex-col bg-[#E4F6F6] px-[25px] pt-[42px]">
                <div className="w-full overflow-hidden rounded-[4px] border border-[#D5E7E9] text-[#62707B]">
                  <div className="flex h-[23px] items-center border-b border-[#D5E7E9] px-[24px] text-[11px] font-bold leading-[14px]">
                    {uiText.fullNameAndAge}
                  </div>

                  {allFamilyMembers.map((member) => (
                    <div
                      key={member.name}
                      className="flex h-[23px] items-center border-b border-[#D5E7E9] px-[24px] text-[11px] font-semibold uppercase leading-[14px] last:border-b-0"
                    >
                      {formatPersonWithAge(member)}
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
        className="mt-[21px] flex items-center gap-[9px] text-[12px] font-bold leading-[14px] text-[#168BE5]"
      >
        <IconRefresh />
        {uiText.flipCard}
      </button>
    </div>
  );
};
