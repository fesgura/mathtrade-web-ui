import { useMemo } from "react";
import Pill from "@/components/pill";
import I18N from "@/i18n";

const PillsStats = ({ data }) => {
  const { percentUsers, percentItems } = useMemo(() => {
    if (!data?.users_count || !data?.items_count) {
      return {
        percentUsers: 0,
        percentItems: 0,
      };
    }
    const percentUsers =
      (100 * (data?.users_trading || 0)) / (data?.users_count || 0);
    const percentItems =
      (100 * (data?.item_trades || 0)) / (data?.items_count || 0).toFixed(1);
    return {
      percentUsers,
      percentItems,
    };
  }, [data]);

  return (
    <div className="mx-auto mb-7">
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
            value={data?.item_trades || 0}
            label="stats.pill.item"
            color="item"
            className="bg-sky-500"
            footer={
              <I18N
                id="stats.pill.item.footer"
                values={[data?.items_count || 0, percentItems.toFixed(2)]}
              />
            }
          />
        </div>
        <div className="md:w-1/3 md:mb-0 mb-6">
          {data?.users_trading ? (
            <Pill
              value={data?.users_trading}
              label="results.pill.user.commit"
              className="bg-orange-600"
              footer={
                <I18N
                  id="stats.pill.user.footer"
                  values={[data?.users_count || 0, percentUsers.toFixed(2)]}
                />
              }
            />
          ) : (
            <Pill
              value={data?.users_count || "-"}
              label="results.pill.user"
              className="bg-orange-600"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PillsStats;
