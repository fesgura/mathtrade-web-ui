import InnerButton from "@/components/button/inner-button";
import ButtonAlert from "@/components/buttonAlert";
import ElementXL from "@/components/element/xl";
import Icon from "@/components/icon";
import { LoadingBox } from "@/components/loading";
import I18N from "@/i18n";
import useElementView from "./useElementView";

const ElementMyView = ({ element, toggleEditingMode, isEditable }) => {
  const { loading, onDelete } = useElementView(element);

  return (
    <div className="relative">
      <ElementXL element={element} />
      {isEditable ? (
        <>
          <div className="flex gap-2 items-center pt-5 pb-5">
            <div className="flex-grow md:ml-52 md:pl-6">
              <button
                className=" bg-primary text-white font-bold text-lg px-6 py-3 rounded-full hover:bg-sky-800  transition-colors"
                onClick={toggleEditingMode}
              >
                <InnerButton>
                  <Icon type="edit" />
                  <I18N id="element.Edit" />
                </InnerButton>
              </button>
            </div>

            <ButtonAlert
              className="border border-danger text-danger font-bold text-xs px-2 py-1 rounded-full hover:bg-danger hover:text-white transition-colors"
              title="Delete.Element"
              onClick={onDelete}
            >
              <InnerButton>
                <Icon type="trash" />
                <I18N id="btn.Delete" />
              </InnerButton>
            </ButtonAlert>
          </div>
          <LoadingBox loading={loading} />
        </>
      ) : null}
    </div>
  );
};

export default ElementMyView;
