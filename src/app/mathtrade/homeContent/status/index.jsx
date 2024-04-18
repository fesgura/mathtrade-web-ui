import I18N from "@/i18n";
import StatusBadge from "@/components/status-badge";
import { statusList } from "@/config/statusTypes";

const Status = () => {
  return (
    <>
      <h3 className="font-bold text-lg mb-5 text-gray-500 underline">
        <I18N id="quickhelp.status" />
      </h3>

      <div>
        {statusList.map(({ value }) => {
          return (
            <div className="grid grid-cols-[110px_auto] gap-3 mb-4" key={value}>
              <div className="pt-1">
                <StatusBadge status={value} block />
              </div>

              <div className="ext-balance">
                <I18N id={`statusType.desc.${value}`} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Status;
