import InnerButton from "@/components/button/inner-button";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import ButtonAlert from "@/components/buttonAlert";
import useRemoveElement from "./useRemoveElement";
import { LoadingBox } from "@/components/loading";

const RemoveElement = ({ editingMode }) => {
  const { canRemoveElement, removeElement, loading } = useRemoveElement();

  return !editingMode && canRemoveElement ? (
    <>
      <div className="flex justify-end pt-2">
        <ButtonAlert
          className="text-danger font-bold text-xs hover:text-red-900 transition-colors"
          title="removeElementFromItem.title"
          onClick={removeElement}
        >
          <InnerButton>
            <Icon type="trash" />
            <I18N id="removeElementFromItem.btn" />
          </InnerButton>
        </ButtonAlert>
      </div>
      <LoadingBox loading={loading} min />
    </>
  ) : null;
};

export default RemoveElement;
