import { useState } from "react";
import classNames from "classnames";
import Icon from "components/icon";
import I18N from "i18n";
import { Collapse } from "reactstrap";

import CommentList from "./list";

const ItemComment = ({ item }) => {
  const [num, setNum] = useState(item.comments);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="item-comments-container">
      <div className="item-comments-container_header">
        <div
          className={classNames("item-comments-container_header-btn", {
            isOpen,
          })}
          onClick={() => {
            setIsOpen((v) => !v);
          }}
        >
          <Icon type="chevron-right" />
          <b>
            <I18N
              id={`itemComments.title.${
                num === 1 ? "one" : num === 0 ? "none" : "many"
              }`}
              values={[num]}
            />
          </b>{" "}
          {num === 0 ? (
            <span>
              (<I18N id="itemComments.title.add" />)
            </span>
          ) : null}
        </div>
      </div>
      <Collapse isOpen={isOpen}>
        {isOpen ? (
          <div className="item-comments-container_body">
            <CommentList item_id={item.id} setNum={setNum} />
          </div>
        ) : null}
      </Collapse>
    </div>
  );
};
export default ItemComment;
