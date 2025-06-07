"use client";
import GraphViewer from "@/components/interactiveGraph/graphViewer";
import PageHeader from "@/components/pageHeader";
import SectionCommon from "@/components/sections/common";
import I18N from "@/i18n";

export default function InteractiveGraphPage() {
  return (
    <>
      <PageHeader
        title="title.chains"
        name="chains"
        bgImg="11"
        description={
          <p>
            <I18N id="chains.text1" />
          </p>
        }
      />
      <SectionCommon>
        <div className="min-h-96 relative p-5">
          <GraphViewer />
        </div>
      </SectionCommon>
    </>
  );
}
