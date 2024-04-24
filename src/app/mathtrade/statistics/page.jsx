"use client";
import SectionCommon from "@/components/sections/common";
import Container from "@/components/container";
import PageHeader from "@/components/pageHeader";
import useStats from "./useStats";
import ErrorAlert from "@/components/errorAlert";
import StatsUI from "./ui";
//import I18N from "@/i18n";

export default function Statistics() {
  const { data, loading, error } = useStats();
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
      <SectionCommon loading={loading}>
        <Container>
          <ErrorAlert error={error} />
          {data ? <StatsUI data={data} /> : null}
        </Container>
      </SectionCommon>
    </>
  );
}
