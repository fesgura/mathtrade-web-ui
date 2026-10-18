import type { ReactNode } from "react";
import "../globals.css";
import "@/styles/index.scss";
import { LogoBig } from "@/components/logo";
import WhatIsMathTrade from "./what-is-mt";
import SliderSign from "@/components/slider-sign";

// The global body rule forces a vertical scrollbar on every page. These
// screens should only scroll when the form is actually taller than the window.
const noForcedScroll = "body{overflow-y:auto !important}";

export default function SignLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-dvh">
      <style>{noForcedScroll}</style>
      <section className="fixed top-0 left-0 w-full h-full bg-purple-900">
        <SliderSign />
      </section>
      <section className="flex flex-col items-center justify-center relative min-h-dvh">
        <div className="px-4 py-1">
          <div className="md:h-[130px] h-[60px] relative z-raised">
            <LogoBig />
          </div>

          <article className="relative bg-white rounded-xl shadow-xl md:px-11 px-4 md:pt-12 pt-10 sm:w-[450px]">
            {children}
            <div className="flex justify-center py-1.5 bg-gray-200 md:-mx-11 -mx-4 rounded-b-xl mt-2 border-t border-gray-300">
              <WhatIsMathTrade />
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
