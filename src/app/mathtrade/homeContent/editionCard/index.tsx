"use client";
import { useContext, useMemo } from "react";
import Link from "next/link";
import { PageContext } from "@/context/page";
import { PRIVATE_ROUTES } from "@/config/routes";
import I18N, { getI18Ntext } from "@/i18n";
import { formatMilestoneDate } from "@/utils/dateUtils";
import { msLeftUntil, timeLeftLabel } from "@/utils/timeLeft";

// "viernes 25/09 a las 21:00 hs", for use inside a sentence.
const dateInSentence = (isoDate: string) => {
  const d = formatMilestoneDate(isoDate);
  return d ? `${d.weekday.toLowerCase()} ${d.dayMonth} a las ${d.time} hs` : "";
};

// Where we are and what to do now: replaces the old ticking countdown.
// The time left uses the same helper as the sidebar, so they always agree.
const EditionCard = () => {
  const { mathtrade, membership, canI } = useContext(PageContext);

  const status = useMemo(() => {
    if (!mathtrade?.id) return null;
    const closing = (stageId: string, date: string) => ({
      id: "home.edition.stage",
      values: [
        getI18Ntext(stageId),
        dateInSentence(date),
        timeLeftLabel(msLeftUntil(date)),
      ],
    });
    if (canI?.offer && mathtrade.freeze_geek_date) {
      return closing("menu.stage.offer", mathtrade.freeze_geek_date);
    }
    if (canI?.want && mathtrade.freeze_wants_date) {
      return closing("menu.stage.want", mathtrade.freeze_wants_date);
    }
    if (canI?.results) return { id: "home.edition.results", values: [] };
    if (canI?.provisionalResults) {
      return { id: "home.edition.provisional", values: [] };
    }
    if (mathtrade.start_date && msLeftUntil(mathtrade.start_date) > 0) {
      return {
        id: "home.edition.startsOn",
        values: [
          dateInSentence(mathtrade.start_date),
          timeLeftLabel(msLeftUntil(mathtrade.start_date)),
        ],
      };
    }
    return { id: "home.edition.matching", values: [] };
  }, [mathtrade, canI]);

  const nextStep = useMemo(() => {
    if (!membership) {
      return canI?.sign
        ? { path: PRIVATE_ROUTES.SIGN_TO_MATHTRADE.path, id: "sign" }
        : null;
    }
    if (canI?.offer) return { path: PRIVATE_ROUTES.MY_OFFER.path, id: "offer" };
    if (canI?.want) return { path: PRIVATE_ROUTES.WANTS.path, id: "want" };
    if (canI?.results) return { path: PRIVATE_ROUTES.RESULTS.path, id: "results" };
    if (canI?.provisionalResults) {
      return { path: PRIVATE_ROUTES.PROVISIONAL_RESULTS.path, id: "provisional" };
    }
    return null;
  }, [membership, canI]);

  if (!status) return null;

  return (
    <section className="mb-6 bg-white p-5 rounded-xl shadow-lg">
      <h2 className="font-bold text-2xl mb-2">{mathtrade.name}</h2>
      <p className="text-balance mb-4">
        <I18N id={status.id} values={status.values} />
      </p>
      {nextStep ? (
        <Link
          href={nextStep.path}
          className="inline-block rounded-full bg-primary text-white font-semibold px-5 py-2 hover:opacity-90"
        >
          <I18N id={`home.edition.next.${nextStep.id}`} />
        </Link>
      ) : null}
    </section>
  );
};

export default EditionCard;
