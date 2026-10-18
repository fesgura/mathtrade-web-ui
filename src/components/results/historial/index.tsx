"use client";
import { lazy, useContext, useState } from "react";
import MtResult from "./mt";
import { PageContext } from "@/context/page";
import I18N from "@/i18n";
import Selector from "./selector";
import Tabs from "@/components/tabs";
import Dynamic from "@/components/dynamic";

const GraphViewer = lazy(() =>
  import("@/components/interactiveGraph/graphViewer")
);

const ResultsHistorial = () => {
  const { mathtrade_history } = useContext(PageContext);
  const history = mathtrade_history || [];

  const [mtSelectedId, setMtSelectedId] = useState(history[0]?.id || -1);
  const [screenView, setScreenView] = useState(0);

  return (
    <div>
      {history.length === 0 ? (
        <p className="text-center text-balance text-2xl py-8">
          <I18N id="results.historial.notFound" />
        </p>
      ) : (
        <div>
          <div className="px-3 md:px-8 pt-4">
            <Tabs
              list={["results.tab.results", "results.tab.chains"]}
              value={screenView}
              onChange={setScreenView}
            />
          </div>
          <div className="md:px-8 px-3">
            <Selector
              list={history}
              selected={mtSelectedId}
              onChange={(id) => setMtSelectedId(Number(id))}
            />
          </div>
          {screenView === 0 ? (
            <div className="md:px-8 px-3 pb-8">
              {history.map((mt: { id: number }) => {
                if (mt.id !== mtSelectedId) {
                  return null;
                }
                return <MtResult mt={mt} key={mt.id} />;
              })}
            </div>
          ) : (
            <div className="min-h-96 relative pb-4">
              <Dynamic>
                <GraphViewer mathtradeId={Number(mtSelectedId)} />
              </Dynamic>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultsHistorial;
