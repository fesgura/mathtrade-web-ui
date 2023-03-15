import classNames from "classnames";
import BtnCircle from "components/btnCircle";
import Icon from "components/icon";

const WantButton = ({
  type,
  isOwner,
  wantGroup,
  onClick,
  min,
  canEditWants,
  isItemInOtherGroup,
}) => {
  return isOwner || (!canEditWants && !wantGroup) ? null : canEditWants ? (
    <BtnCircle
      className={classNames({
        "btn-in-want-list": wantGroup,
        "btn-i-want-it": !wantGroup,
        "btn-i-want-it-in-other": isItemInOtherGroup,
      })}
      onClick={onClick}
      label={
        wantGroup
          ? "wantEditor.btn.InMyWantList"
          : isItemInOtherGroup
          ? "wantEditor.IsItemInOther"
          : "wantEditor.btn.IwantIt"
      }
      min={min}
    >
      <Icon type={wantGroup ? "inmywantlist" : "iwantit"} />
    </BtnCircle>
  ) : (
    <BtnCircle
      className="btn-in-want-list cant-edit"
      label="wantEditor.btn.InMyWantList.canEditWants"
      min={min}
    >
      <Icon type="inmywantlist" />
    </BtnCircle>
  );
};
export default WantButton;
