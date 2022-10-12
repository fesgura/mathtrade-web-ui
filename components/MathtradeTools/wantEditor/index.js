import { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useApi, MathTradeService } from "api";
import ErrorAlert from "components/errorAlert";
import { LoadingBox } from "components/loading";
import MyItems from "./my-items";

const WantEditor = ({
  objToWant,
  item,
  game,
  afterAnyChange,
  setModalWantOpen,
  wantInfo,
}) => {
  const [myItemsToOffer, setMyItemsToOffer] = useState([]);
  const [setWant, , loading, errors] = useApi({
    promise: MathTradeService.setWant,
    afterLoad: () => {
      setModalWantOpen(false);
      afterAnyChange();
    },
  });

  useEffect(() => {
    if (wantInfo) {
      setMyItemsToOffer(wantInfo);
    }
  }, [wantInfo]);

  return (
    <div className="relative">
      <h3 className="mb-3 text-center">Agregar a mi Want List:</h3>
      {objToWant}
      <h5 className="mb-1 text-center">Me gustaría cambiarlo por:</h5>
      <p className="muted text-center small italic">
        (Luego podrás cambiar esto todas las veces que quieras.)
      </p>
      <MyItems
        onChangeList={setMyItemsToOffer}
        myItemsToOffer={myItemsToOffer}
      />
      <ErrorAlert errors={errors} className="mt-3" />
      <div className="text-center mt-4">
        <Button
          color="link"
          tag="a"
          className="me-1"
          outline
          onClick={() => {
            setModalWantOpen(false);
          }}
        >
          Cancelar
        </Button>
        <Button
          color="primary"
          disabled={loading}
          onClick={() => {
            // setWant({
            //   data: {
            //     want_id: item.id,
            //     item_ids: myItemsToOffer,
            //   },
            // });
          }}
        >
          ¡Lo quiero!
        </Button>
      </div>
      {loading ? <LoadingBox /> : null}
    </div>
  );
};

export default WantEditor;
