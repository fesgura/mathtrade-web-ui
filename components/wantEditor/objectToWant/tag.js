import { useEffect } from "react";
import { useApi, MathTradeService, LocationService } from "api_serv";
import { LoadingBox } from "components/loading";
import ItemListToWant from "./comps/itemListToWant";
import { Col, Row } from "reactstrap";
import { Form, Input } from "components/form";

const Tag = ({ tag, dup_protection, set_dup_protection }) => {
  const [listItems, list, loading, errors] = useApi({
    promise: MathTradeService.listItems,
    startLoading: true,
  });

  useEffect(() => {
    listItems({
      query: {
        page_size: 9999,
        tag: tag.id,
      },
    });
  }, []);

  return (
    <div className="relative mb-4">
      <div className="pt-3 pb-2">
        <Row>
          <Col>
            Quiero{" "}
            {dup_protection ? (
              <>
                <b>uno (1)</b> de
              </>
            ) : (
              <b>todos</b>
            )}{" "}
            estos items:
          </Col>
          <Col xs="auto">
            <div className="want-editor_dup_protection-container">
              <Input
                data={{
                  dup_protection,
                }}
                classNameContainer="m-0"
                type="switch"
                name="dup_protection"
                //label="Protección de duplicados"
                labelCheckbox="Protección de duplicados"
                question='¡CUIDADO! Si DESACTIVÁS la "Protección de duplicados" corrés el riesgo de recibir dos ó más copias de un mismo juego!!Desactivalo SOLO SI SABÉS LO QUE ESTÁS HACIENDO!!'
                onChange={set_dup_protection}
              />
            </div>
          </Col>
        </Row>
      </div>
      <hr className="m-0" />
      <ItemListToWant itemListToWant={list?.results || []} />

      {loading ? <LoadingBox /> : null}
    </div>
  );
};

export default Tag;
