import { useId } from "react";
import { UncontrolledTooltip } from "reactstrap";
import Icon from "components/icon";
import I18N from "i18n";

const twoPointsReg = new RegExp(":", "g");

const EditBtn = ({ onEdit }) => {
  const id = useId("edit").replace(twoPointsReg, "");

  return (
    <div className="min-menu ps-2">
      <div className="min-menu-btn" id={`edit-q-${id}`} onClick={onEdit}>
        <Icon type="pencil" />
      </div>
      <UncontrolledTooltip target={`edit-q-${id}`}>
        <I18N id="element.Edit" />
      </UncontrolledTooltip>
    </div>
  );
};

export default EditBtn;
