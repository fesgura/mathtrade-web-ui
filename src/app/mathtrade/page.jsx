"use client";
import I18N from "@/i18n";
import SectionCommon from "@/components/sections/common";
import PageHeader from "@/components/pageHeader";

import { useContext, useEffect } from "react";
import { PageContext } from "@/context/page";
import HomeContent from "./homeContent";

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
        /* noHideDescription
        description={
          <>
            
          </>
        } */
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
