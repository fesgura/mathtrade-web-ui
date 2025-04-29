"use client";
import PageHeader from "@/components/pageHeader";
import I18N from "@/i18n";
import { ResultsContextProvider } from "@/context/results";
import ResultsUI from "./ui";
import { useContext, useEffect, useState } from "react";
import { PageContext } from "@/context/page";
import Container from "@/components/container";
import Tabs from "@/components/tabs";
import UserTable from "@/components/results/userTable";

export default function Results() {
  /* PAGE CONTEXT **********************************************/
  const { setPageType, canI } = useContext(PageContext);

  useEffect(() => {
    setPageType("results");
  }, [setPageType]);
  /* end PAGE CONTEXT */

  const [tabView, setTabView] = useState(0);

  return (
    <>
      <PageHeader
        title="title.Results"
        name="results"
        description={
          <>
            <p className="text-sm max-w-5xl mx-auto mb-4">
              <I18N id="results.text1" />
            </p>
            <p className="text-sm max-w-5xl mx-auto">
              <I18N id="results.text2" />
            </p>
          </>
        }
      />
      <Tabs
        list={["results.tab.results", "results.tab.users"]}
        value={tabView}
        onChange={setTabView}
      />
      {tabView === 0 ? (
        <div className="">
          {canI.results ? (
            <ResultsContextProvider>
              <ResultsUI />
            </ResultsContextProvider>
          ) : (
            <Container>
              <p className="text-center text-balance text-2xl py-5">
                <I18N id="results.NotResultsYet.help" />
              </p>
            </Container>
          )}
        </div>
      ) : (
        <Container>
          <UserTable />
        </Container>
      )}
    </>
  );
}
