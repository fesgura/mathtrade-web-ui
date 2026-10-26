"use client";
import { useContext, useMemo } from "react";
import { PageContext } from "@/context/page";
import EmptyList from "@/components/emptyList";
import ErrorAlert from "@/components/errorAlert";
import I18N from "@/i18n";
import { LoadingBox } from "@/components/loading";
import useProvisionalResults from "./useProvisionalResults";
import ProvisionalSummary from "./summary";
import ProvisionalExclude from "./exclude";
import useTour from "@/tours/useTour";
import { nextProvisional } from "@/utils/provisionalDates";

const formatAR = (value: string | number) =>
  new Date(value).toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    dateStyle: "short",
    timeStyle: "short",
  });

const ProvisionalResultsUI = () => {
  const { loading, error, runsCount, summary, viewingMember, updatedAt } =
    useProvisionalResults();
  const { mathtrade } = useContext(PageContext);
  // Computed when the edition changes, not on every render.
  const next = useMemo(
    () => nextProvisional(mathtrade, Date.now()),
    [mathtrade]
  );
  // Not when an admin looks at someone else's results.
  useTour("provisional", { ready: !loading && !viewingMember });

  if (loading && !runsCount) {
    return (
      <div className="relative min-h-48">
        <LoadingBox loading />
      </div>
    );
  }

  return (
    <div className="relative">
      {viewingMember ? (
        <p className="mb-4 rounded-lg bg-warning/10 border border-warning/40 px-4 py-2 text-sm text-gray-800">
          <I18N
            id="provisional.viewingMember"
            values={[
              `${viewingMember.first_name} ${viewingMember.last_name} (${viewingMember.username})`,
              viewingMember.self_excluded_at
                ? formatAR(viewingMember.self_excluded_at)
                : "-",
            ]}
          />
        </p>
      ) : null}
      {/* What these are, in plain words. Deliberately says nothing about how
          the runs are built: members must not be able to tell them apart. */}
      <section
        className="mb-6 rounded-xl bg-primary/5 border border-primary/20 p-4"
        data-tour="provisional.intro"
      >
        <h2 className="font-bold text-base mb-2">
          <I18N id="provisional.intro.title" />
        </h2>
        <p className="text-sm text-gray-700 mb-2">
          <I18N id="provisional.intro.what" />
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <I18N id="provisional.intro.final" />
        </p>
        <p className="text-sm text-gray-700">
          <I18N id="provisional.intro.exclude" />
        </p>
      </section>
      {runsCount > 0 && updatedAt ? (
        <p className="text-sm text-gray-600 mb-4">
          <I18N id="provisional.updatedAt" values={[formatAR(updatedAt)]} />
          {next ? (
            <I18N id="provisional.nextRun" values={[formatAR(next)]} />
          ) : null}
        </p>
      ) : null}
      <ErrorAlert error={error} />
      {!runsCount ? (
        <EmptyList visible icon="status-box" message="provisional.none" />
      ) : (
        <>
          <ProvisionalSummary rows={summary} />
          <LoadingBox loading={loading} transparent />
        </>
      )}
      {/* Read-only when an admin looks at someone else's results. */}
      {viewingMember ? null : <ProvisionalExclude />}
    </div>
  );
};

export default ProvisionalResultsUI;
