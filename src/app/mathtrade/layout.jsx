import Header from "@/components/header";
import Footer from "@/components/footer";
import PageContextProvider from "@/context/page";
//import PrivateEnvironment from "@/environments/private";
import ModalPreviewer from "@/components/previewer/modal";
import ModalPreviewerWantGroup from "@/components/previewerWantGroup/modal";
import ChatBoxButton from "@/components/chatbox";
import Script from "next/script";
import dynamic from "next/dynamic";
import Wrapper from "@/components/wrapper";
import EarlyPayPopup from "@/components/earlyPayPopup";

const PrivateEnvironmentNoSSR = dynamic(
  () => import("@/environments/private"),
  {
    ssr: false,
  }
);

export default function MathTradeLayout({ children }) {
  return (
    <>
      <Script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1" />
      <PrivateEnvironmentNoSSR>
        <PageContextProvider>
          <Header />
          <div className="relative w-full min-h-screen pt-11 pb-16">
            <a id="a-top" />
            <main className="relative py-main">{children}</main>
            <Footer />
          </div>
          <ModalPreviewerWantGroup />
          <ModalPreviewer />
          <EarlyPayPopup />
          <ChatBoxButton />
        </PageContextProvider>
      </PrivateEnvironmentNoSSR>
    </>
  );
}
