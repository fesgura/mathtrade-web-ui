import Icon from "@/components/icon";
import { getI18Ntext } from "@/i18n";
import clsx from "clsx";
import useNotification from "./useNotification";

const Notification = ({ data }) => {
  const { readed, toggleReaded, body, created, linkText } =
    useNotification(data);

  return (
    <div className="border-b border-gray-300">
      <div className="text-xs flex items-start gap-3 p-2">
        <div
          className={clsx("cursor-pointer", {
            "text-gray-300": readed,
            "text-primary": !readed,
          })}
          data-tooltip={getI18Ntext(
            `notifications.${readed ? "MarkAsNotRead" : "MarkAsRead"}`
          )}
          data-placement="right"
          onClick={toggleReaded}
        >
          <Icon type="circle" />
        </div>
        <div
          className={clsx({
            "opacity-70": readed,
          })}
        >
          <div className="cursor-pointer" onClick={toggleReaded}>
            <p className="text-[10px] font-bold mb-1">{`${created} hs.`}</p>
            <p className="text-gray-600 mb-2">{body}</p>
          </div>

          <div className="">
            <div className="underline text-primary font-bold">{linkText}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
