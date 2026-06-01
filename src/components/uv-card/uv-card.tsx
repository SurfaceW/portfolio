"use client";

import { Zenitho } from "uvcanvas";

import "./uv-card.css";

export const UVCardEDots: React.FC<{
  height?: number;
}> = ({ height = 200 }) => {
  return (
    <div
      className="uv-card relative w-full overflow-hidden rounded-2xl cursor-pointer"
      style={{ height }}
      onClick={() => window.open("https://dots.e-studio.ai/", "_blank")}
    >
      <div className="absolute inset-0 opacity-30 hover:opacity-40 transition-opacity">
        <Zenitho />
      </div>
      <div className="absolute inset-0 p-6 flex flex-col justify-center opacity-80 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-3 mb-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://dots.e-studio.ai/_next/image?url=%2Fdots-icon.png&w=256&q=75"
            alt="eDots app icon"
            width={44}
            height={44}
            className="rounded-xl shadow-md ring-1 ring-white/20 flex-shrink-0"
          />
          <div>
            <h2 className="font-bold text-white leading-tight">eDots</h2>
            <p className="text-xs text-white/60 font-medium">Available on iPhone, iPad &amp; Mac</p>
          </div>
        </div>
        <p className="text-sm text-white/80 leading-snug mt-1">
          From quick capture to shared collections — eDots is organized around the way dots move through your life.
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white/90 bg-white/15 hover:bg-white/25 transition-colors rounded-full px-3 py-1 w-fit">
          Try eDots →
        </span>
      </div>
    </div>
  );
}
