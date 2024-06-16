import Header from "@/components/header";
import Footer from "@/components/footer";
//import { PageContextProvider } from "@/context/page";
import ModalPreviewer from "@/components/previewer/modal";
import ModalPreviewerWantGroup from "@/components/previewerWantGroup/modal";
import ChatBoxButton from "@/components/chatbox";
import Script from "next/script";
import dynamic from "next/dynamic";

const PageContextProviderNoSSR = dynamic(() => import("@/context/page"), {
  ssr: false,
});

export default function MathTradeLayout({ children }) {
  return (
    <>
      <Script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1" />
      <PageContextProviderNoSSR>
        <Header />
        <div className="relative w-full min-h-screen pt-11 pb-11">
          <a id="a-top" />
          <main className="relative pb-4">{children}</main>
          <Footer />
        </div>
        <ModalPreviewerWantGroup />
        <ModalPreviewer />
        <ChatBoxButton />
      </PageContextProviderNoSSR>
    </>
  );
}
