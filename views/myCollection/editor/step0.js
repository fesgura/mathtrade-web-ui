import Icon from "components/icon";
import I18N from "i18n";
import { Button } from "reactstrap";

const ElementCreateStep0 = ({
  setStep,
  setType,
  setElementToEdit,
  onClose,
}) => {
  return (
    <div className="element-create_step-1">
      <div className="element-create-options_title">
        <Icon type="plus" className="me-1" />
        <I18N id="element.editor.add" />:
      </div>
      <div className="element-create-options_row_cont">
        <div className="element-create-options_row">
          <div
            className="element-create-options_col"
            onClick={() => {
              setType(0);
              setStep(1);
            }}
          >
            <Icon type="bgg" />{" "}
            <div className="element-create-options_text">
              <I18N id="element.editor.add.gameOrExpansion" />
            </div>
          </div>
          <div
            className="element-create-options_col"
            onClick={() => {
              setType(1);
              setStep(1);
              setElementToEdit();
            }}
          >
            <Icon type="puzzle-piece" />{" "}
            <div className="element-create-options_text">
              <I18N id="element.editor.add.Another" />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center pt-3">
        <Button
          color="link"
          tag="a"
          className="me-2 mb-sm-0 mb-2"
          outline
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <I18N id="btn.Cancel" />
        </Button>
      </div>
    </div>
  );
};

export default ElementCreateStep0;
