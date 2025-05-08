import Icon from "@/components/icon";
import I18N from "@/i18n";
import useDescription from "./useDescription";
import InnerButton from "@/components/button/inner-button";
import clsx from "clsx";

const PageHeaderDescription = ({ description, name, noHideDescription }) => {
  const { invisible, toggleInvisible } = useDescription(name);

  return invisible ? (
    <button
      className="border border-white/30 text-white rounded-full text-sm pl-5 pr-3 py-1 block relative top-3  mt-4"
      onClick={toggleInvisible}
    >
      <InnerButton>
        <I18N id="ReadMore" />
        <Icon type="arrow-down" />
      </InnerButton>
    </button>
  ) : (
    <div
      className={clsx("relative text-white mt-4 text-xl text-balance", {
        "animate-fadedown": !noHideDescription,
      })}
    >
      {description}

      {!noHideDescription ? (
        <button
          className="bg-gray-800/60 text-white rounded-full text-sm pl-5 pr-3 py-1 block relative top-3 mt-4"
          onClick={toggleInvisible}
        >
          <InnerButton>
            <I18N id="btn.HideThisText" />
            <Icon type="arrow-up" />
          </InnerButton>
        </button>
      ) : null}
    </div>
  );
};
export default PageHeaderDescription;
