import { useState, useEffect, useCallback } from "react";
import classNames from "classnames";
import Valuation from "components/valuation";
import { Col, Row, Modal, ModalBody, Button } from "reactstrap";
import ObjectToWantComp from "./objectToWant";
import MyItems from "./myItems";

const EditorWants = ({ objectToWant, type, afterAnyChange }) => {
  // USER WANT GROUP
  const [name, set_name] = useState("");
  const [bgg_id, set_bgg_id] = useState("");
  const [want_ids, set_want_ids] = useState([]);
  const [item_ids, set_item_ids] = useState([]);
  // END USER WANT GROUP

  const [objectToWantContent, set_objectToWantContent] = useState(null);

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
          set_name(objectToWant?.name);
          set_bgg_id(objectToWant?.bgg_id);
          break;
        default:
        //
      }
    }
  }, [objectToWant, type, want_ids]);

  console.log({
    name,
    bgg_id,
    want_ids,
    item_ids,
  });

  return (
    <>
      <ObjectToWantComp
        objectToWant={objectToWant}
        type={type}
        want_ids={want_ids}
        setWantId={setWantId}
      />
      <MyItems item_ids={item_ids} setMyItemIds={setMyItemIds} />
    </>
  );
};

export default EditorWants;
