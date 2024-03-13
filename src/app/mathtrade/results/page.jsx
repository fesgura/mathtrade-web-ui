"use client";
import PageHeader from "@/components/pageHeader";
import I18N from "@/i18n";
import { ResultsContextProvider } from "@/context/results";
import ResultsUI from "./ui";
import { useContext, useEffect } from "react";
import { PageContext } from "@/context/page";
import Container from "@/components/container";

export default function Results() {
  /* PAGE CONTEXT **********************************************/
  const { setPageType, canI } = useContext(PageContext);

  useEffect(() => {
    setPageType("results");
  }, [setPageType]);
  /* end PAGE CONTEXT */

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
    </>
  );
}
