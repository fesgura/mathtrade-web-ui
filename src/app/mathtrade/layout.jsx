/* eslint-disable @next/next/no-img-element */
import Sidebar from "@/components/sidebar";
import TabBar from "@/components/sidebar/mobile/TabBar";
import Footer from "@/components/footer";
import PageContextProvider from "@/context/page";
import ModalPreviewer from "@/components/previewer/modal";
import ModalPreviewerWantGroup from "@/components/previewerWantGroup/modal";
import ChatBoxButton from "@/components/chatbox";
import AdvCompromise from "@/components/header/advCompromise";
import AdvSelfExcluded from "@/components/header/advSelfExcluded";
import AdvContribution from "@/components/header/advContribution";
import Script from "next/script";
import dynamic from "next/dynamic";
import EarlyPayPopup from "@/components/earlyPayPopup";
// import Image from "next/image";
// import mapImg from "@/img/mapa.webp";

const PrivateEnvironmentNoSSR = dynamic(
  () => import("@/environments/private"),
  {
    ssr: false,
  }
);

// const Bg = () => {
//   return (
//     <svg
//       viewBox="0 0 1920 1000"
//       xmlns="http://www.w3.org/2000/svg"
//       //className="object-cover w-full h-full"
//     >
//       <filter id="noiseFilter">
//         <feTurbulence
//           type="fractalNoise"
//           baseFrequency="0.7"
//           numOctaves="1"
//           stitchTiles="stitch"
//         />
//       </filter>

//       <rect width="100%" height="100%" filter="url(#noiseFilter)" />
//     </svg>
//   );
// };

export default function MathTradeLayout({ children }) {
  return (
    <>
      <Script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1" />
      <PrivateEnvironmentNoSSR>
        {/* <div className="fixed top-0 left-0 z-0 w-screen h-screen overflow-hidden ">
          <img
            src={mapImg.src}
            width={mapImg.width}
            height={mapImg.height}
            alt="map"
            className="object-cover w-full h-full"
          />
          <Bg />
        </div> */}
        <PageContextProvider>
          <div className="lg:flex">
            <Sidebar />
            <TabBar />
            <div className="relative w-full min-h-screen pb-24 lg:pb-20 lg:min-w-0 lg:flex-1">
              <a id="a-top" />
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
          <ChatBoxButton />
        </PageContextProvider>
      </PrivateEnvironmentNoSSR>
    </>
  );
}
