"use client";

import { Lumiflex, Novatrix, Zenitho } from "uvcanvas";

import "./uv-card.css";

export const UVCardPromptStudio: React.FC<{
  height?: number;
}> = ({ height }) => {
  return (
    <div className="uv-card w-full h-[200px]" onClick={() => {
      window.open("https://github.com/SurfaceW/arno-prompts", "_blank");
    }}>
      <div className={`relative opacity-30 hover:opacity-40`} style={{
        height: height || 200,
      }}>
        <Lumiflex />
      </div>
      <div className={`relative left-0 p-8 cursor-pointer opacity-70 hover:opacity-100 transition-all ease-linear`} style={{
        height: height || 200,
        top: -height || -200,
      }}>
        <h2 className="font-bold">ARNO PROMPTS 🧙🏻‍♂️</h2>
        <p>Arno organize his interesting prompts on Github, have a pick for your need.</p>
      </div>
    </div>
  );
}

export const UVCardElaborationStudio: React.FC<{
  height?: number;
}> = ({ height }) => {
  return (
    <div className="uv-card w-full h-[200px]" onClick={() => {
      window.open("https://e-studio.ai", "_blank");
    }}>
      <div className={`relative opacity-30 hover:opacity-40 w-full`} style={{
        height: height || 200,
      }}>
        <Novatrix />
      </div>
      <div className={`relative left-0 p-8 cursor-pointer opacity-70 hover:opacity-100 transition-all ease-linear`} style={{
        height: height || 200,
        top: -height || -200,
      }}>
        <h2 className="font-bold">ELABORATION STUDIO 🦄</h2>
        <p>Elaborate your ideas and solve your problems with AI in fully boosted context way ~</p>
      </div>
    </div>
  );
}
