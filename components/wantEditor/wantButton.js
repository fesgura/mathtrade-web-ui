import BtnCircle from "components/btnCircle";
import Icon from "components/icon";

const WantButton = ({
  objectToWant,
  type,
  isOwner,
  wantGroup,
  onClick,
  min,
}) => {
  return isOwner ? null : (
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
  );
};
export default WantButton;
