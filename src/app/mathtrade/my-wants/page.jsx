"use client";
import MyWantsUI from "./ui";
import { MyWantsContextProvider } from "@/context/myWants/all";
import { PageContext } from "@/context/page";
import PageHeader from "@/components/pageHeader";
import I18N from "@/i18n";
import { useContext } from "react";
import Container from "@/components/container";

export default function MyWants() {
  const { canI } = useContext(PageContext);

  return (
    <>
      <PageHeader
        title="title.MyWants"
        name="myWants"
        description={
          <>
            <p className="text-sm max-w-5xl mx-auto">
              <I18N id="Items.page.explanation" />
            </p>
          </>
        }
      />
      {canI.offer ? (
        <Container>
          <div className="text-center italic font-bold text-xl text-gray-600 py-4">
            <I18N id="WaitFinishOffer" />
          </div>
        </Container>
      ) : (
        <MyWantsContextProvider>
          <MyWantsUI />
        </MyWantsContextProvider>
      )}
    </>
  );
}
