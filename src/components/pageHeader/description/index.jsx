import Icon from "@/components/icon";
import I18N from "@/i18n";
import useDescription from "./useDescription";
import InnerButton from "@/components/button/inner-button";
import clsx from "clsx";

const PageHeaderDescription = ({ description, name, noHideDescription }) => {
  const { invisible, toggleInvisible } = useDescription(name);

  return invisible ? (
    <button
      className="text-white pr-4 text-xs mt-3 opacity-50 hover:underline hover:opacity-100 transition-opacity"
      onClick={toggleInvisible}
    >
      <InnerButton>
        <Icon type="arrow-down" /> <I18N id="ReadMore" />
      </InnerButton>
    </button>
  ) : (
    <div
      className={clsx(
        "relative text-white leading-9 description w-fit mx-auto mt-4 ",
        {
          "animate-fadedown border-b border-white/20": !noHideDescription,
        }
      )}
    >
      {description}

      {!noHideDescription ? (
        <button
          className="bg-gray-800 text-white rounded-full text-xs px-5 py-1 block mx-auto relative top-3"
          onClick={toggleInvisible}
        >
          <I18N id="btn.HideThisText" />
        </button>
      ) : null}
    </div>
  );
};
export default PageHeaderDescription;
