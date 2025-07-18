import "../globals.css";
import "@/styles/index.scss";
import { LogoBig } from "@/components/logo";
//import WhatIsMathTrade from "./what-is-mt";
import SliderSign from "@/components/slider-sign";
import Link from "next/link";
import { PUBLIC_ROUTES } from "@/config/routes";
import I18N from "@/i18n";

export default function SignLayout({ children }) {
  return (
    <main className="min-h-screen">
      <section className="fixed top-0 left-0 w-full h-full bg-purple-900">
        <SliderSign />
      </section>
      <section className="flex flex-col items-center justify-center relative min-h-screen">
        <div className="p-4">
          <div className="md:h-[130px] h-[60px] relative z-[110]">
            <LogoBig />
          </div>

          <article className="relative bg-white rounded-xl shadow-xl md:px-11 px-4 md:pt-20 pt-12  sm:w-[450px]">
            {children}
            <div className="flex justify-center py-2 bg-gray-200 md:-mx-11 -mx-4 rounded-b-xl mt-6 border-t border-gray-300 text-sm">
              <Link
                href={PUBLIC_ROUTES.MEDIA.path}
                className="text-primary hover:text-blue-900 font-bold underline"
                target="_blank"
                rel="noreferrer"
              >
                <I18N id={PUBLIC_ROUTES.MEDIA.title} />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
