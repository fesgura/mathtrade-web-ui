import { Button, Modal, ModalBody } from "reactstrap";

const MT_ToolGame_GameMT = ({ game, afterAnyChange, wantInfo }) => {
  return (
    <div className="mt_tools">
      <div className="mt_tools-container">
        <Button
          color="primary"
          size="sm"
          onClick={() => {
            //  setModalWantOpen(true);
          }}
        >
          {wantInfo ? (
            <>
              En mi Want List
              <br />
              <span className="small">
                (
                {`por ${wantInfo.length} item${wantInfo.length > 1 ? "s" : ""}`}
                )
              </span>
            </>
          ) : (
            "¡Lo quiero!"
          )}
        </Button>
      </div>
    </div>
  );
};
export default MT_ToolGame_GameMT;
