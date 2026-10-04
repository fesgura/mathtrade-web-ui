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
          <div className="lg:flex">
            <Sidebar />
            <TabBar />
            {/* Mobile: room for the fixed TabBar under the footer (which flows
                after the content there). Desktop: room for the pinned footer. */}
            <div
              data-bug-report-capture=""
              className="relative w-full max-w-full min-w-0 min-h-screen pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-20 lg:flex-1"
            >
              <a id="a-top" />
              <AdvSolidario />
              <AdvContribution />
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
