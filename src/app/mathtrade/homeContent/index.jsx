import { useContext, lazy } from "react";
import { PageContext } from "@/context/page";
import I18N from "@/i18n";
//import { linksToHelp } from "@/config/linksToHelp";
import Timeline from "./timeline";
import Videohelp from "./videohelp";
import Status from "./status";
import Glossary from "./glossary";
import Iconshelp from "./iconshelp";
//import { instructPDFurl } from "@/config/rulebook";
import Pills from "./pills";
import Referral from "@/components/referral";
import CountdownMathtrade from "./coundown";
//import ReferralInvite from "./referralInvite";
import Dynamic from "@/components/dynamic";
// import AllMessage from "@/components/allMessage";

//const baseURL = process.env.BASE_URL;

//const PaymentInfo = lazy(() => import("@/components/results/paymentInfo"));
const UserQR = lazy(() => import("@/components/userQr"));

const HomeContent = () => {
  /* PAGE CONTEXT **********************************************/
  const { mathtrade } = useContext(PageContext);
  /* end PAGE CONTEXT */

  return (
    <div className="px-8 pt-8 pb-5">
      {/* <div className="border-b border-gray-400 py-5 mb-5">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold py-5">
            Sanciones
          </h2>
          <p className="text-balance mb-3">Finalizó el decimoquinto Math Trade, una vez más con la tranquilidad de una <strong>tarea cumplida</strong> y la felicidad que el MT reparte ya en las casas de cada jugón y jugona.</p>
          <p className="text-balance mb-3">Ya están disponibles las <strong>sanciones</strong> a quienes tuvieron algún <strong>incumplimiento de las reglas del Math Trade</strong>.<br/>Podés consultarlas aquí:</p>


          
          <p className="text-balance">
            <a className="text-primary underline hover:text-sky-800 px-6 py-2 font-bold" href="https://api.mathtrade.com.ar/media/cierre_sanciones_MT.pdf" target="_blank" rel="noreferrer">
            Sanciones (PDF)</a>
          </p>
        </div>
      </div> */}
      {/* <AllMessage /> */}
      {
        mathtrade && Object.keys(mathtrade).length > 0 ? (
          <>
            {/* <div className="mb-5">
              <Dynamic>
                <PaymentInfo />
              </Dynamic>
            </div> */}
            <Dynamic>
              <UserQR />
            </Dynamic>
            <div className="mb-8">
              <Referral />
            </div>
            <Pills />
            <Timeline />
          </>
        ) : null
        // (
        //   <CountdownMathtrade />
        // )
      }
      <Videohelp />
      <h2 className="text-center font-bold text-2xl py-5">
        <I18N id="quickhelp.title" />
      </h2>
      <div className="mb-4 bg-white p-5 rounded-xl shadow-lg">
        <Glossary />
      </div>
      <div className="lg:flex gap-4">
        <div className="mb-4 bg-white p-5 rounded-xl shadow-lg lg:w-2/3">
          <Status />
        </div>
        <div className="mb-4 bg-white p-5 rounded-xl shadow-lg lg:w-1/3">
          <Iconshelp />
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
