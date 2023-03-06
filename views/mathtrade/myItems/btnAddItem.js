import { Button } from "reactstrap";
import LinkInternal from "components/link-internal";
import I18N from "i18n";

const BtnAddItems = ({ groupIdSelected, setModalAddOpen, canEditList }) => {
  return groupIdSelected < 0 ? (
    <div className="text-center pt-1 pb-3">
      {canEditList ? (
        <>
          <Button
            color="primary"
            className="mb-2"
            size="lg"
            onClick={() => {
              setModalAddOpen(true);
            }}
          >
            <I18N id="btn.AddToMathTrade" />
          </Button>
          <div className="small">
            <i>
              (
              <LinkInternal path="myCollection">
                <I18N id="title.MyCollection" />
              </LinkInternal>
              )
            </i>
          </div>
        </>
      ) : (
        <div className="muted">
          <I18N id="myItems.cantEditList" />
        </div>
      )}
    </div>
  ) : null;
};

export default BtnAddItems;
