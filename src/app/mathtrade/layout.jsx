"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PrivateEnvironment from "@/environments/private";
import { PageContextProvider } from "@/context/page";
import ModalPreviewer from "@/components/previewer/modal";
import ModalPreviewerWantGroup from "@/components/previewerWantGroup/modal";
import Faqs from "@/components/faqs";
import ButtonHelp from "@/components/faqs/button";

export default function MathTradeLayout({ children }) {
  return (
    <PrivateEnvironment>
      <PageContextProvider>
        <Header />
        <div className="relative w-full min-h-screen pt-11 pb-11">
          <a id="a-top" />
          <main className="relative pb-4">{children}</main>
          <Footer />
        </div>
        <ButtonHelp />
        <Faqs />
        <ModalPreviewerWantGroup />
        <ModalPreviewer />
      </PageContextProvider>
    </PrivateEnvironment>
  );
}
