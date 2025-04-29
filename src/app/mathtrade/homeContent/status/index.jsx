import I18N from "@/i18n";
import StatusBadge from "@/components/status-badge";
import { boxStatusList, componentsStatusList } from "@/config/statusTypes";

const Status = () => {
  return (
    <>
      <h3 className="font-bold text-lg mb-5 text-gray-500">
        <I18N id="quickhelp.box.status" />
      </h3>

      <div>
        {boxStatusList.map(({ value }) => {
          return (
            <div className="grid grid-cols-[110px_auto] gap-3 mb-4" key={value}>
              <div className="pt-1">
                <StatusBadge status={value} type="box" block noTooltip />
              </div>

              <div className="ext-balance">
                <I18N id={`statusType.box.desc.${value}`} />
              </div>
            </div>
          );
        })}
      </div>
      <h3 className="font-bold text-lg mb-5 text-gray-500">
        <I18N id="quickhelp.components.status" />
      </h3>

      <div>
        {componentsStatusList.map(({ value }) => {
          return (
            <div className="grid grid-cols-[110px_auto] gap-3 mb-4" key={value}>
              <div className="pt-1">
                <StatusBadge status={value} block noTooltip />
              </div>

              <div className="ext-balance">
                <I18N id={`statusType.components.desc.${value}`} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Status;
