import InnerButton from "@/components/button/inner-button";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import ElementEditor from "../../elementCollection/editor";
import { noBGGgame } from "@/config/no-bgggame";

const NewElementStep3 = ({ setStep, newBGGinfo }) => {
  return (
    <div>
      <button
        className="text-gray-400 border pr-2 rounded border-transparent hover:text-gray-600 hover:border-gray-300 transition-colors"
        onClick={() => {
          setStep(
            newBGGinfo.element.bgg_id === noBGGgame.element.bgg_id ? 1 : 2
          );
        }}
      >
        <InnerButton>
          <Icon type="chevron-left" />{" "}
          <span className="text-sm">
            <I18N id="Back" />
          </span>
        </InnerButton>
      </button>
      <div className="pt-3">
        <ElementEditor
          element={null}
          newBGGinfo={newBGGinfo}
          toggleEditingMode={() => {
            setStep(0);
          }}
        />
      </div>
    </div>
  );
};

export default NewElementStep3;
