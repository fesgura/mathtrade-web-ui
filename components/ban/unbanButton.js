import Icon from "components/icon";
import BtnCircle from "components/btnCircle";
import { useApi, MathTradeService } from "api_serv";

const UnBanButton = ({ banData, afterAnyChange }) => {
  ////////////////////////////////////////

  const [deleteElem, , loadingDelete, errorsDelete] = useApi({
    promise: MathTradeService.deleteBan,
    afterLoad: () => {
      afterAnyChange();
    },
  });
  ////////////////////////////////////////
  return (
    <BtnCircle
      className="unban-btn for-circle"
      onClick={() => {
        if (banData?.ban_id) {
          deleteElem({ id: banData.ban_id });
        }
      }}
      label="ban.btn.showAgain"
    >
      <div className="unban-btn-icon">
        <Icon type={loadingDelete ? "loading" : "ban"} />
        {!loadingDelete ? <div className="unban-btn-icon_bar" /> : null}
      </div>
    </BtnCircle>
  );
};

export default UnBanButton;
