import { useState, useEffect, useCallback } from "react";
import { useApi, MathTradeService } from "api_serv";
import { LoadingBox } from "components/loading";
import { cropWord } from "utils";
import DeleteButton from "components/deleteButton";
import { Button, Alert, Row, Col } from "reactstrap";
import ObjectToWantComp from "./objectToWant";
import MyItems from "./myItems";

const EditorWants = ({
  objectToWant,
  type,
  toggleModal,
  wantGroup,
  afterAnyChange,
}) => {
  // USER WANT GROUP
  const [id, set_id] = useState(null);
  const [name, set_name] = useState("");
  const [bgg_id, set_bgg_id] = useState("");
  const [want_ids, set_want_ids] = useState([]);
  const [item_ids, set_item_ids] = useState([]);

  useEffect(() => {
    if (wantGroup) {
      set_id(wantGroup?.id);
      set_name(wantGroup?.name || "");
      set_bgg_id(wantGroup?.bgg_id || "");
      set_want_ids(wantGroup?.want_ids || []);
      set_item_ids(wantGroup?.item_ids || []);
    }
  }, [wantGroup]);

  // END USER WANT GROUP

  const setWantId = useCallback(
    (itemId) => {
      const itemId_index = want_ids.indexOf(itemId);

      const new_want_ids = [...want_ids];

      if (itemId_index < 0) {
        new_want_ids.push(itemId);
      } else {
        new_want_ids.splice(itemId_index, 1);
      }
      set_want_ids(new_want_ids);
    },
    [want_ids]
  );

  const setMyItemIds = useCallback(
    (itemIdList, isAdding) => {
      const new_item_ids = [...item_ids];

      itemIdList.forEach((itemId) => {
        const itemId_index = new_item_ids.indexOf(itemId);

        if (isAdding) {
          if (isAdding === "add") {
            new_item_ids.push(itemId);
          } else {
            new_item_ids.splice(itemId_index, 1);
          }
        } else {
          if (itemId_index < 0) {
            new_item_ids.push(itemId);
          } else {
            new_item_ids.splice(itemId_index, 1);
          }
        }
      });

      set_item_ids(new_item_ids);
    },
    [item_ids]
  );

  useEffect(() => {
    if (objectToWant) {
      switch (type) {
        case "game":
          set_name(cropWord(objectToWant?.name || "", 128));
          set_bgg_id(objectToWant?.bgg_id);
          break;
        case "item":
          console.log(objectToWant);
          set_name(cropWord(objectToWant?.title || "", 128));
          set_want_ids([objectToWant?.id]);
          //set_bgg_id(null);
          break;
        default:
        //
      }
    }
  }, [objectToWant, type]);

  /* API *****************************/

  const [postWant, , postLoading, postErrors] = useApi({
    promise: MathTradeService.postWant,
    afterLoad: () => {
      toggleModal();
      afterAnyChange(true);
    },
  });

  const [putWant, , putLoading, putErrors] = useApi({
    promise: MathTradeService.postWant,
    afterLoad: () => {
      toggleModal();
      afterAnyChange(true);
    },
  });

  const [deleteWant, , deleteLoading, deleteErrors] = useApi({
    promise: MathTradeService.deleteWant,
    afterLoad: () => {
      toggleModal();
      afterAnyChange(true);
    },
  });
  /******************************/

  /* ERROR MGE *******/
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    if (postErrors || putErrors || deleteErrors) {
      let errorMge = "Ocurrió un error. Por favor, intenta nuevamente.";
      setErrorMessage(errorMge);
    } else {
      setErrorMessage(null);
    }
  }, [postErrors, putErrors, deleteErrors]);
  /******************************/

  return (
    <>
      <ObjectToWantComp
        objectToWant={objectToWant}
        type={type}
        want_ids={want_ids}
        setWantId={setWantId}
      />
      <MyItems item_ids={item_ids} setMyItemIds={setMyItemIds} />
      {errorMessage ? (
        <Alert color="danger" className="mt-3 text-center">
          {errorMessage}
        </Alert>
      ) : null}
      <Row className="pt-4 pb-3 align-items-center justify-content-between">
        {id ? (
          <Col xs="auto">
            <DeleteButton
              size="xs"
              itemName="want"
              onDelete={() => {
                deleteWant({ id });
              }}
            />
          </Col>
        ) : null}
        <Col xs={id ? "auto" : 12} className="text-center">
          <Button
            color="link"
            className="me-2 mb-sm-0 mb-2"
            outline
            onClick={(e) => {
              toggleModal();
            }}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            type="submit"
            onClick={(e) => {
              if (id) {
                putWant({
                  id,
                  data: {
                    name,
                    bgg_id,
                    want_ids,
                    item_ids,
                  },
                });
              } else {
                postWant({
                  data: {
                    name,
                    bgg_id,
                    want_ids,
                    item_ids,
                  },
                });
              }
            }}
          >
            {id ? "Actualizar want" : "Agregar a Mis Wants"}
          </Button>
        </Col>
      </Row>
      {postLoading || putLoading || deleteLoading ? <LoadingBox /> : null}
    </>
  );
};

export default EditorWants;
