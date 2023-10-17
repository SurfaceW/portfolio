import React from "react";

import "@/styles/main.css"

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div className="pt-8 block">
      {children}
    </div>
  );
}
