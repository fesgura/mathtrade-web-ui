import InnerButton from "@/components/button/inner-button";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import { useEffect } from "react";
import { noBGGgame } from "@/config/no-bgggame";

const NewElementStep1 = ({ setStep, setnewBGGinfo }) => {
  useEffect(() => {
    setnewBGGinfo(noBGGgame);
  }, [setnewBGGinfo]);

  return (
    <div className="text-center">
      <div className="flex items-stretch justify-center ">
        <button
          className="w-40 px-5 py-2 hover:opacity-60 transition-opacity"
          onClick={() => {
            setStep(2);
          }}
        >
          <div className="text-5xl pb-1 text-primary">
            <Icon type="bgg" />
          </div>
          <div className="text-sm font-bold text-gray-600">
            <I18N id="element.editor.add.gameOrExpansion" />
          </div>
        </button>
        <div className="w-[1px] bg-gray-300" />
        <button
          className="w-40 px-5 py-2 hover:opacity-60 transition-opacity"
          onClick={() => {
            setStep(3);
          }}
        >
          <div className="text-5xl pb-1 text-primary">
            <Icon type="other" />
          </div>
          <div className="text-sm font-bold text-gray-600">
            <I18N id="element.editor.add.Another" />
          </div>
        </button>
      </div>
      <div className="text-center pt-5">
        <button
          className="border border-gray-400 text-gray-400 font-bold px-6 py-2 rounded-full hover:bg-gray-400 hover:text-white transition-colors"
          onClick={() => {
            setStep(0);
          }}
        >
          <InnerButton>
            <I18N id="btn.Cancel" />
          </InnerButton>
        </button>
      </div>
    </div>
  );
};

export default NewElementStep1;
