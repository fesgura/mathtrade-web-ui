import classNames from "classnames";
import { Button } from "reactstrap";
import Icon from "components/icon";

const ElementCreateStep0 = ({ item, setStep }) => {
  return (
    <div
      className={classNames("element-create_step-0", {
        "for-combo": item?.elements?.length > 1,
      })}
    >
      <Button
        color="add-min"
        size="sm"
        //outline
        onClick={() => {
          setStep(1);
        }}
      >
        <Icon type="plus" className="me-1" />
        <b>Agregar</b>{" "}
        {item?.elements?.length === 1 ? (
          <em>
            (para crear un <b>combo</b>)
          </em>
        ) : (
          <b>al combo</b>
        )}
      </Button>
    </div>
  );
};
export default ElementCreateStep0;
