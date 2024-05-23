"use client";
import Script from "next/script";
import I18N from "@/i18n";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import SuccessAlert from "@/components/successAlert";
import useResults from "./useResults";
import { colores } from "./useResults";

const Results = () => {
  const { graphRef, loading, error, count, descriptions } = useResults();
  console.log(descriptions);

  return (
    <>
      <Script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-bundle.min.js" />
      <div className="relative">
        <div className="text-center">
          <h3 className="font-bold text-xl mb-5  text-balance">
            <I18N id="votacion.results.title" />
          </h3>
          <div
            className="font-bold text-2xl mb-5 text-primary
          "
          >{`${count} votos`}</div>
          <p className="mb-7">
            <I18N id="votacion.results.description" />
          </p>
        </div>

        <div style={{ height: 400 }} ref={graphRef}></div>
        <div className="pt-8">
          {descriptions.map((d, i) => (
            <div key={i} className="text-sm text-balance mb-8">
              <div className="flex gap-3">
                <div className="">
                  <div
                    className="w-8 h-8"
                    style={{ backgroundColor: colores[i].color }}
                  ></div>
                </div>

                <div className="">
                  <div className="font-bold">{d.question}</div>
                  <div className="text-balance">{d.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ErrorAlert error={error} />
        <LoadingBox loading={loading} />
      </div>
    </>
  );
};

export default Results;
