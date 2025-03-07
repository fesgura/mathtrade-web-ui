import InnerButton from "@/components/button/inner-button";
import Icon from "@/components/icon";
import I18N from "@/i18n";

const NewElementStep0 = ({ setStep }) => {
  return (
    <>
      <div className="text-center">
        <button
          className="border border-primary text-primary text-xs px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-colors"
          onClick={() => {
            setStep(1);
          }}
        >
          <InnerButton>
            <Icon type="plus" className="text-xl" />
            <I18N id="btn.MyCollection.addNewItem" />
          </InnerButton>
        </button>
      </div>
    </>
  );
};

export default NewElementStep0;
