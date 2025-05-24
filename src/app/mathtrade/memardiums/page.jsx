"use client";
import PageHeader from "@/components/pageHeader";
import SectionCommon from "@/components/sections/common";
import MemelogyUI from "./ui";
import useFetch from "@/hooks/useFetch";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import I18N from "@/i18n";

export default function ReferralToRegister() {
  const [, data, loading, error] = useFetch({
    endpoint: "MEMARDIUMS",
    initialState: [],
    //afterLoad: afterLoadMyItems,
    autoLoad: true,
  });

  return (
    <>
      <PageHeader title="title.memardiums" name="memardiums" bgImg="9" />
      <SectionCommon>
        <div className="min-h-96 relative p-5">
          <LoadingBox loading={loading} />
          <ErrorAlert error={error} />
          {data?.length > 0 ? <MemelogyUI data={data} /> : null}
          {data?.length === 0 && !loading && !error ? (
            <div className="text-center text-balance text-xl py-4 italic">
              <I18N id="no-memardiums" />
            </div>
          ) : null}
        </div>
      </SectionCommon>
    </>
  );
}
