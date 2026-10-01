import { useContext } from "react";
import { PageContext } from "@/context/page";
import I18N from "@/i18n";
import Calendar from "@/components/calendar";
import WhatIsMT from "@/components/whatIsMT";
import EditionCard from "./editionCard";
import EditionStats from "./editionStats";
import Referral from "@/components/referral";

const HomeContent = () => {
  /* PAGE CONTEXT **********************************************/
  const { mathtrade } = useContext(PageContext);
  /* end PAGE CONTEXT */

  const hasEdition = mathtrade && Object.keys(mathtrade).length > 0;

  return (
    <div className="md:px-8 px-3 pt-8 pb-5">
      {hasEdition ? (
        <>
          <EditionCard />
          {/* Numbers and calendar side by side, both stacked. */}
          <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-6 mb-6">
            <section className="bg-white p-5 rounded-xl shadow-lg">
              <h2 className="font-bold text-xl mb-4">
                <I18N id="home.stats.title" />
              </h2>
              <EditionStats />
            </section>
            <section className="bg-white p-5 rounded-xl shadow-lg">
              <h2 className="font-bold text-xl mb-4">
                <I18N id="timeline.header" />
              </h2>
              <Calendar />
            </section>
          </div>
        </>
      ) : null}
      <div className="mb-8 bg-white p-5 rounded-xl shadow-lg">
        <WhatIsMT />
      </div>
      {/* At the bottom; a floating button scrolls down to it. */}
      {hasEdition ? <Referral floatingButton /> : null}
    </div>
  );
};

export default HomeContent;
