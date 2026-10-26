import I18N from "@/i18n";
import { TradeMaximizerLinks } from "@/config/stats";
import Icon from "@/components/icon";
import useFetch from "@/hooks/useFetch";
import { LoadingBox } from "@/components/loading";
import clsx from "clsx";
import { useState } from "react";
import ErrorAlert from "@/components/errorAlert";

interface Stats {
  wants?: string | null;
  results?: string | null;
  seed?: string | null;
}

const ContentDownload = () => {
  /* FETCH *************************************************/

  const [, data, loading, error] = useFetch({
    endpoint: "GET_MATHTRADE_STATS",
    autoLoad: true,
    // format,
  });
  const stats = data as Stats | null;
  /* end FETCH */
  // No link yet (before the final stage, or no file uploaded): hide the
  // button instead of showing one that does nothing.
  return error ? (
    <ErrorAlert error />
  ) : (
    <div className="pt-4 relative">
      <div className="rich-text">
        <p className="text-balance">
          <I18N
            id="stats.downloads.text1"
            values={[
              TradeMaximizerLinks.source,
              TradeMaximizerLinks.instructions,
            ]}
          />
        </p>
      </div>
      {stats?.wants ? (
        <p className="mb-4">
          <a
            href={stats.wants}
            className="bg-primary block text-white py-2 px-6 text-lg text-center w-fit mx-auto rounded-full hover:opacity-80"
            download
            target="_blank"
          >
            <Icon type="download" className="me-2" />
            <I18N id="stats.downloads.btn.wants" />
          </a>
          {stats.seed ? (
            <span className="block text-center mt-2">
              <I18N id="stats.downloads.seed" values={[stats.seed]} />
            </span>
          ) : null}
        </p>
      ) : null}
      <p className="mb-4 text-balance">
        <I18N id="stats.downloads.text2" />
      </p>
      {stats?.results ? (
        <p className="mb-4">
          <a
            href={stats.results}
            className="bg-primary block text-white py-2 px-6 text-lg text-center w-fit mx-auto rounded-full hover:opacity-80"
            download
            target="_blank"
          >
            <Icon type="download" className="me-2" />
            <I18N id="stats.downloads.btn.results" />
          </a>
        </p>
      ) : null}
      <LoadingBox loading={loading} />
    </div>
  );
};

const Downloads = ({ accordion }: { accordion?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white px-5 py-4 rounded-xl shadow-xl">
      <h3
        className={clsx("font-bold text-lg text-gray-500 text-balance", {
          "cursor-pointer": accordion,
        })}
        onClick={
          accordion
            ? () => {
                setIsOpen((v) => !v);
              }
            : null
        }
      >
        {accordion ? (
          <Icon
            type="chevron-right"
            className={clsx("text-3xl transition-transform", {
              "rotate-90": isOpen,
            })}
          />
        ) : null}
        <I18N id="stats.downloads.title" />
      </h3>
      {!isOpen && accordion ? null : <ContentDownload />}
    </div>
  );
};

export default Downloads;
