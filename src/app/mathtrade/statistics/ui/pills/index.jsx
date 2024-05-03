import { useMemo } from "react";
import Pill from "@/components/pill";
import I18N from "@/i18n";

const PillsStats = ({ data }) => {
  const percent = useMemo(() => {
    return (
      (100 * (data?.user_trading || 0)) /
      (data?.user_count || 0)
    ).toFixed(0);
  }, [data]);

  return (
    <div className="mx-auto mb-7 pt-4">
      <div className="md:flex gap-6">
        <div className="md:w-1/3 md:mb-0 mb-6">
          <Pill
            value={data?.games_count || 0}
            label="results.pill.game"
            className="bg-teal-500"
          />
        </div>

        <div className="md:w-1/3 md:mb-0 mb-6">
          <Pill
            value={data?.items_count || 0}
            label="results.pill.item"
            color="item"
            className="bg-sky-500"
          />
        </div>
        <div className="md:w-1/3 md:mb-0 mb-6">
          <Pill
            value={data?.users_trading}
            label="results.pill.user.commit"
            className="bg-orange-600"
            footer={
              <I18N
                id="stats.pill.user.footer"
                values={[data?.users_count || 0, percent]}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PillsStats;
