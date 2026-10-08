import Sidebar from "@/components/sidebar";
import TabBar from "@/components/sidebar/mobile/TabBar";
import Footer from "@/components/footer";
import PageContextProvider from "@/context/page";
import { TourContextProvider } from "@/tours/context";
import ModalPreviewer from "@/components/previewer/modal";
import ModalPreviewerWantGroup from "@/components/previewerWantGroup/modal";
import AdvCompromise from "@/components/header/advCompromise";
import AdvSelfExcluded from "@/components/header/advSelfExcluded";
import AdvContribution from "@/components/header/advContribution";
import AdvContact from "@/components/header/advContact";
import AdvSolidario from "@/components/header/advSolidario";
import PrivateEnvironmentNoSSR from "@/environments/private/no-ssr";
import EarlyPayPopup from "@/components/earlyPayPopup";
import type { ReactNode } from "react";

export default function MathTradeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PrivateEnvironmentNoSSR>
        <PageContextProvider>
        <TourContextProvider>
          {/* Mobile: shell is exactly the viewport; bottom padding reserves the
              fixed TabBar so the content column's scrollport is the band above
              it. Sticky list headers then stick within that middle band.
              Desktop: unchanged row + min-height page column. */}
          <div className="lg:flex max-lg:flex max-lg:flex-col max-lg:h-dvh max-lg:max-h-dvh max-lg:overflow-hidden max-lg:box-border max-lg:pb-[var(--mt-tabbar-h)]">
            <Sidebar />
            <TabBar />
            <div
              data-bug-report-capture=""
              className="relative w-full max-w-full min-w-0 max-lg:flex-1 max-lg:min-h-0 max-lg:overflow-y-auto max-lg:overscroll-y-contain lg:min-h-screen lg:pb-20 lg:flex-1"
            >
              <a id="a-top" />
              <AdvSolidario />
              <AdvContribution />
              <AdvContact />
              <AdvCompromise />
              <AdvSelfExcluded />
              <main className="relative py-main">{children}</main>
              <Footer />
            </div>
          </div>
          <ModalPreviewerWantGroup />
          <ModalPreviewer />
          <EarlyPayPopup />
        </TourContextProvider>
        </PageContextProvider>
      </PrivateEnvironmentNoSSR>
    </>
  );
}
