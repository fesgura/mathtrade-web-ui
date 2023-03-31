import { useId, useEffect, useState } from "react";
import { UncontrolledTooltip, Button, Modal, ModalBody } from "reactstrap";
import Thumbnail from "components/thumbnail";
import Previewer from "components/previewer";
import ItemFull from "components/item/full";
import classNames from "classnames";
import Icon from "components/icon";
import I18N from "i18n";

const Quad = ({ item }) => {
  return (
    <div className="post-mt-myItem_quad">
      <div className="post-mt-myItem_quad_inner">
        <Thumbnail src={item.elements[0].thumbnail} height={150} />
        <div className="post-mt-myItem_quad_title">{item.title}</div>
      </div>
    </div>
  );
};
export default Quad;
