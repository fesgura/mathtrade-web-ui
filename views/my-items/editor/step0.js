import Icon from "components/icon";

const ElementCreateStep0 = ({ setStep }) => {
  return (
    <div className="element-create_step-1">
      <div className="element-create-options_title">
        <Icon type="plus" className="me-1" />
        Agregar:
      </div>
      <div className="element-create-options_row_cont">
        <div className="element-create-options_row">
          <div
            className="element-create-options_col"
            onClick={() => {
              setStep(1);
            }}
          >
            <Icon type="bgg" />{" "}
            <div className="element-create-options_text">
              Juego <span>o</span> expansión
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

export default ElementCreateStep0;
