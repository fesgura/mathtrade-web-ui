import Icon from "@/components/icon";
import { useMemo } from "react";
import clsx from "clsx";
import I18N from "@/i18n";

const Th = ({
  header,
  noTranslateHeader,
  value,
  order,
  setOrder,
  isSortable,
  className,
}) => {
  const dir = useMemo(() => {
    return isSortable ? (order?.indexOf("-") === 0 ? -1 : 1) : 1;
  }, [isSortable, order]);

  return (
    <th className={clsx("text-left p-2", className)}>
      <div
        className={clsx("flex items-center gap-2", {
          "cursor-pointer": isSortable,
        })}
        onClick={
          isSortable
            ? () => {
                if (order.indexOf(value) >= 0) {
                  if (dir > 0) {
                    setOrder("-" + value);
                  } else {
                    setOrder(value);
                  }
                } else {
                  setOrder(value);
                }
              }
            : null
        }
      >
        <div>
          {typeof header === "string" ? (
            noTranslateHeader ? (
              header
            ) : (
              <I18N id={header} />
            )
          ) : (
            header
          )}
        </div>
        <div
          className={clsx("text-xl leading-none", {
            "opacity-20": order?.indexOf(value) < 0,
          })}
        >
          {isSortable ? (
            <Icon type={`chevron-${dir < 0 ? "up" : "down"}`} />
          ) : null}
        </div>
      </div>
    </th>
  );
};

export default Th;
