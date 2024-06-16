import { useContext } from "react";
import { PageContext } from "@/context/page";
import I18N from "@/i18n";
import { linksToHelp } from "@/config/linksToHelp";
import Container from "@/components/container";
import Timeline from "./timeline";
import Videohelp from "./videohelp";
import Status from "./status";
import Glossary from "./glossary";
import Iconshelp from "./iconshelp";
import { instructPDFurl } from "@/config/rulebook";
import Pills from "./pills";
import Referral from "@/components/referral";

const baseURL = process.env.BASE_URL;

const HomeContent = () => {
  /* PAGE CONTEXT **********************************************/
  const { mathtrade } = useContext(PageContext);
  /* end PAGE CONTEXT */

  return (
    <Container>
      {mathtrade ? (
        <>
          <div className="rich-text text-center">
            <p className="max-w-5xl mx-auto m-0">
              <I18N
                id="home.lead2"
                values={[
                  linksToHelp.video,
                  linksToHelp.telegram,
                  baseURL + instructPDFurl,
                ]}
              />
            </p>
          </div>
          <Pills />
          <Referral />
          <Timeline />
        </>
      ) : null}
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
    </Container>
  );
};

export default HomeContent;
