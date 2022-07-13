import classNames from "classnames";
import Icon from "components/icon";

const ElementCreateStep1 = ({ item, setStep }) => {
  return (
    <div
      className={classNames("element-create_step-1 fade-in", {
        "for-combo": item?.elements?.length > 1,
      })}
    >
      <div className="element-create-options_title">
        <Icon type="plus" className="me-1" />
        Agregar:
        {item?.elements?.length > 0 ? null : (
          <div className="element-create-options_subtitle">
            (Para crear un combo de varios juegos, empezá agregando algo.)
          </div>
        )}
      </div>
      <div className="element-create-options_row_cont">
        <div className="element-create-options_row">
          <div
            className="element-create-options_col"
            onClick={() => {
              setStep(2);
            }}
          >
            <Icon type="bgg" />{" "}
            <div className="element-create-options_text">
              Juego <span>ó</span> expansión
            </div>
          </div>
          <div className="element-create-options_col disabled">
            <Icon type="book" />{" "}
            <div className="element-create-options_text">Otro</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ElementCreateStep1;
