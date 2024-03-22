"use client";
import I18N from "@/i18n";
import SectionCommon from "@/components/sections/common";
import Container from "@/components/container";
import PageHeader from "@/components/pageHeader";
import { linksToHelp } from "@/config/linksToHelp";
import { useContext, useEffect } from "react";
import { PageContext } from "@/context/page";

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
        noHideDescription
        description={
          <>
            <p className="text-sm max-w-5xl mx-auto">
              <I18N
                id="home.lead2"
                values={[
                  linksToHelp.video,
                  linksToHelp.bgg,
                  linksToHelp.telegram,
                ]}
              />
            </p>
          </>
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
        <Container>
          <p>Inicio (TODO)</p>
          {/*  <iframe
            width="320"
            height="430"
            allow="microphone;"
            src="https://console.dialogflow.com/api-client/demo/embedded/a642ce57-93e6-4849-8060-8295894f2a98"
          ></iframe> */}
        </Container>
      </SectionCommon>
    </>
  );
}
