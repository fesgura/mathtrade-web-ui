import classNames from "classnames";
import BtnCircle from "components/btnCircle";
import Icon from "components/icon";

const WantButton = ({
  loading,
  isOwner,
  wantGroupId,
  onClick,
  min,
  canEditWants,
  isItemInOtherGroup,
}) => {
  return isOwner || (!canEditWants && !wantGroupId) ? null : canEditWants ? (
    <BtnCircle
      className={classNames({
        "btn-in-want-list": wantGroupId,
        "btn-i-want-it": !wantGroupId,
        "btn-i-want-it-in-other": isItemInOtherGroup,
      })}
      onClick={onClick}
      label={
        wantGroupId
          ? "wantEditor.btn.InMyWantList"
          : isItemInOtherGroup
          ? "wantEditor.IsItemInOther.help"
          : "wantEditor.btn.IwantIt"
      }
      min={min}
    >
      <Icon
        type={loading ? "loading" : wantGroupId ? "inmywantlist" : "iwantit"}
      />
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
