"use client";
import I18N from "@/i18n";
import SectionCommon from "@/components/sections/common";
import PageHeader from "@/components/pageHeader";
import { linksToHelp } from "@/config/linksToHelp";
import { useContext, useEffect } from "react";
import { PageContext } from "@/context/page";
import HomeContent from "./homeContent";
import { instructPDFurl } from "@/config/rulebook";

const baseURL = process.env.BASE_URL;

export default function HomePage() {
  /* PAGE CONTEXT **********************************************/
  const { setPageType } = useContext(PageContext);

  useEffect(() => {
    setPageType("home");
  }, [setPageType]);
  /* end PAGE CONTEXT */

  return (
    <>
      <PageHeader
        title="home.lead"
        name="home"
        description={
          <p>
            <I18N
              id="home.lead2"
              values={[
                linksToHelp.video,
                linksToHelp.telegram,
                baseURL + instructPDFurl,
              ]}
            />
          </p>
        }
      />
      <SectionCommon
        // loading={loading}
        title="title.Home"
        description={
          <>
            <p>
              <I18N id="home.lead" />
            </p>
            <p>
              <I18N id="home.lead2" />
            </p>
          </>
        }
      >
        <HomeContent />
      </SectionCommon>
    </>
  );
}
