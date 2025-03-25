import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import clsx from "clsx";
import useNotification from "./useNotification";

const Notification = ({ data, type, noMembership }) => {
  const {
    unreaded,
    toggleReaded,
    date,
    body,
    messageText,
    values,
    linkFunction,
    linkText,
    loading,
  } = useNotification(data, type, noMembership);

  return (
    <div className="border-b border-gray-300">
      <div
        className={clsx("text-xs flex items-start gap-3 p-2", {
          "opacity-50": loading,
        })}
      >
        <div
          className={clsx("cursor-pointer", {
            "text-gray-300": !unreaded,
            "text-primary": unreaded,
          })}
          data-tooltip={getI18Ntext(
            `notifications.${!unreaded ? "MarkAsNotRead" : "MarkAsRead"}`
          )}
          data-placement="right"
          onClick={toggleReaded}
        >
          <Icon type="circle" />
        </div>
        <div
          className={clsx({
            "opacity-70": !unreaded,
          })}
        >
          <div className="cursor-pointer" onClick={toggleReaded}>
            <p className="text-[10px] font-bold mb-1">{`${date} hs.`}</p>
            <p className="text-gray-600 mb-2">
              <I18N id={messageText} values={values} />
            </p>
            <p className="text-gray-600 mb-2 italic">{body}</p>
          </div>

          {linkFunction ? (
            <div>
              <button
                className="underline text-primary font-bold"
                onClick={linkFunction}
              >
                <I18N id={linkText} />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Notification;
