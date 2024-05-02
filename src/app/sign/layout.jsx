import "../globals.css";
import "@/styles/index.scss";
import Logo from "@/components/logo";
import PublicEnvironment from "@/environments/public";
//import WhatIsMathTrade from "./what-is-mt";
import SliderSign from "@/components/slider-sign";

export default function SignLayout({ children }) {
  return (
    <main className="lg:grid lg:grid-cols-2 min-h-screen">
      <section className="flex flex-col items-center justify-center">
        <div className="p-4">
          <Logo />
          <article className="relative bg-white rounded-xl shadow-xl px-11 py-7 sm:w-[450px]">
            <PublicEnvironment>{children}</PublicEnvironment>
          </article>
        </div>
      </section>
      <section className="relative bg-purple-900">
        <SliderSign />
        {/* <div className="relative p-4 lg:text-left text-center pb-20 z-50">
          <WhatIsMathTrade />
        </div> */}
      </section>
    </main>
  );
}
