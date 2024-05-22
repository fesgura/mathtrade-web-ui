"use client";
import Script from "next/script";
import I18N from "@/i18n";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import SuccessAlert from "@/components/successAlert";
import useResults from "./useResults";

const Results = () => {
  const { graphRef, loading, error } = useResults();

  return (
    <>
      <Script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-bundle.min.js" />
      <div className="relative">
        <div className="text-center">
          <h3 className="font-bold text-xl mb-5  text-balance">
            <I18N id="votacion.results.title" />
          </h3>
          <p className="mb-7">
            <I18N id="votacion.results.description" />
          </p>
        </div>

        <div style={{ height: 400 }} ref={graphRef}></div>
        <ErrorAlert error={error} />
        <LoadingBox loading={loading} />
      </div>
    </>
  );
};

export default Results;
