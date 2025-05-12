"use client";
import MyWantsUI from "./ui";
import { MyWantsContextProvider } from "@/context/myWants/all";
import { PageContext } from "@/context/page";
import ModalPreviewerItemWant from "@/components/previewerItem/modal";
import PageHeader from "@/components/pageHeader";
import I18N from "@/i18n";
import { useContext } from "react";

export default function MyWants() {
  const { canI } = useContext(PageContext);

  return (
    <>
      <PageHeader
        title="title.MyWants"
        name="myWants"
        description={
          <p>
            <I18N id="Items.page.explanation" />
          </p>
        }
        bgImg="8"
      />
      {canI.offer ? (
        <div className="text-center italic font-bold text-xl text-gray-600 py-4">
          <I18N id="WaitFinishOffer" />
        </div>
      ) : (
        <MyWantsContextProvider>
          <MyWantsUI />
          <ModalPreviewerItemWant />
        </MyWantsContextProvider>
      )}
    </>
  );
}
