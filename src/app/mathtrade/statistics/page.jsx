"use client";
import SectionCommon from "@/components/sections/common";
import Container from "@/components/container";
import PageHeader from "@/components/pageHeader";
import { useContext, useEffect } from "react";
import { PageContext } from "@/context/page";

export default function Statistics() {
  /* PAGE CONTEXT **********************************************/
  const { setPageType } = useContext(PageContext);

  useEffect(() => {
    setPageType("stats");
  }, [setPageType]);
  /* end PAGE CONTEXT */

  return (
    <>
      <PageHeader
        title="title.Stats"
        name="stats"
        /*   description={
          <>
            <p className="text-sm max-w-5xl mx-auto">
              <I18N id="subtitle.Stats" />
            </p>
          </>
        } */
      />
      <SectionCommon
      //loading={loading}
      >
        <Container>Estadísticas (TODO)</Container>
      </SectionCommon>
    </>
  );
}
