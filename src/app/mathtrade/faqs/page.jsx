"use client";
import SectionCommon from "@/components/sections/common";
import Container from "@/components/container";
import PageHeader from "@/components/pageHeader";
import { useContext, useEffect } from "react";
import { PageContext } from "@/context/page";

export default function MyAccount() {
  /* PAGE CONTEXT **********************************************/
  const { setPageType } = useContext(PageContext);

  useEffect(() => {
    setPageType("myAccount");
  }, [setPageType]);
  /* end PAGE CONTEXT */

  return (
    <>
      <PageHeader
        title="title.MyAccount"
        name="myAccount"
        /*  description={
          <>
            <p className="text-sm max-w-5xl mx-auto">
              <I18N id="MyCollection.page.explanation" />
            </p>
          </>
        } */
      />
      <SectionCommon
        //loading={loading}
        //size="md"
        title="title.MyWants"
        /* description={
          <>
            <p className="text-sm max-w-5xl mx-auto">description</p>
          </>
        } */
      >
        <Container>Mi Cuenta(TODO)</Container>
      </SectionCommon>
    </>
  );
}
