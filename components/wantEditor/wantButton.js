import BtnCircle from "components/btnCircle";
import Icon from "components/icon";

const WantButton = ({
  objectToWant,
  type,
  isOwner,
  wantGroup,
  onClick,
  min,
  canEditWants,
}) => {
  return isOwner || (!canEditWants && !wantGroup) ? null : canEditWants ? (
    <BtnCircle
      className={wantGroup ? "btn-in-want-list" : "btn-i-want-it"}
      onClick={onClick}
      label={
        wantGroup ? "wantEditor.btn.InMyWantList" : "wantEditor.btn.IwantIt"
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
