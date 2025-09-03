"use client";
import React from "react";

type HeaderProps = {
  onSave?: () => void;
  onLoad?: () => void;
  onPdf?: () => void;
};

export default function Header({ onSave, onLoad, onPdf }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-10 h-[64px] w-full bg-white border-b border-[#E5E7EB] flex items-center"
      data-component="Header"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 bg-[#E5E7EB]"
            aria-label="Logo placeholder"
          />
          <span className="text-[18px] leading-6 text-[#111827]">Resume Builder</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-3 rounded-lg bg-[#2563EB] text-white text-sm hover:opacity-95"
            onClick={onSave}
            aria-label="저장"
          >
            저장
          </button>
          <button
            className="px-4 py-3 rounded-lg bg-[#2563EB] text-white text-sm hover:opacity-95"
            onClick={onLoad}
            aria-label="불러오기"
          >
            불러오기
          </button>
          <button
            className="px-4 py-3 rounded-lg bg-[#2563EB] text-white text-sm hover:opacity-95"
            onClick={onPdf}
            aria-label="PDF 내보내기"
          >
            PDF
          </button>
        </div>
      </div>
    </header>
  );
}


