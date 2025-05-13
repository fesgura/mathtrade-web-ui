"use client";
import SectionCommon from "@/components/sections/common";
import PageHeader from "@/components/pageHeader";
import { useContext, useEffect } from "react";
import { PageContext } from "@/context/page";
import useFaqs from "./useFaqs";
import Faq from "@/components/faq";
import ErrorAlert from "@/components/errorAlert";
import { getI18Ntext } from "@/i18n";

export default function MyAccount() {
  /* PAGE CONTEXT **********************************************/
  const { setPageType } = useContext(PageContext);

  useEffect(() => {
    setPageType("faqs");
  }, [setPageType]);
  /* end PAGE CONTEXT */

  const { keyword, setKeyword, list, loading, error } = useFaqs();

  return (
    <>
      <PageHeader title="title.Faqs" name="faqs" />
      <SectionCommon loading={loading}>
        <div className="py-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-6">
              <input
                type="text"
                placeholder={getI18Ntext("filter.Search")}
                value={keyword}
                onChange={({ target }) => {
                  setKeyword(target.value);
                }}
                className="border border-stroke rounded py-1 px-2 text-sm focus:outline-none w-72"
              />
            </div>
            <ErrorAlert error={error} />
            <div className="">
              {list.map((data, k) => {
                return <Faq key={k} data={data} />;
              })}
            </div>
          </div>
        </div>
      </SectionCommon>
    </>
  );
}
