/* eslint-disable @next/next/no-img-element */
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageContextProvider from "@/context/page";
import ModalPreviewer from "@/components/previewer/modal";
import ModalPreviewerWantGroup from "@/components/previewerWantGroup/modal";
import ChatBoxButton from "@/components/chatbox";
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
          <Header />
          <div className="relative w-full min-h-screen pt-11 pb-20">
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
