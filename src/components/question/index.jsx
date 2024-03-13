import clsx from "clsx";
import Icon from "../icon";
import { getI18Ntext } from "@/i18n";

const Question = ({
  placement = "top",
  text = "text",
  noTranslate,
  className,
}) => {
  return (
    <div
      className={clsx("inline-block text-primary cursor-help", className)}
      data-placement={placement}
      data-tooltip={noTranslate ? text : getI18Ntext(text)}
    >
      <Icon type="help" />
    </div>
  );
};

export default Question;
