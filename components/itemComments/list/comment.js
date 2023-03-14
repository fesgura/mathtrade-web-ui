import classNames from "classnames";
import { useApi, MathTradeService } from "api_serv";
import { useState, useEffect } from "react";
import { Col, Row, Modal, ModalBody, Button } from "reactstrap";
import storage from "utils/storage";
import User from "./user";
import moment from "moment";
import Icon from "components/icon";
import { getI18Ntext } from "i18n";
import EditComment from "../editComment";
import I18N from "i18n";

const Comment = ({ data, item_id, afterAnyChange }) => {
  const [isMyUser, setIsMyUser] = useState(false);
  const [isEditComment, setIsEditComment] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const storeData = storage.get();
    setIsMyUser(storeData?.user?.data?.id === data.user.id);
  }, [data]);

  const [voteComment] = useApi({
    promise: MathTradeService.voteComment,
    afterLoad: afterAnyChange,
  });

  const [deleteComment] = useApi({
    promise: MathTradeService.deleteComment,
    afterLoad: afterAnyChange,
  });

  return (
    <>
      <div className="item-comment">
        <Row className="g-0 flex-nowrap">
          <Col
            xs={{
              order: isMyUser ? 2 : 1,
              size: "auto",
            }}
          >
            <User user={data.user} isMyUser={isMyUser} />
          </Col>
          <Col
            xs={{
              order: isMyUser ? 1 : 2,
              size: "",
            }}
          >
            <div
              className={classNames("item-comment-blob-container", {
                isMyUser,
              })}
            >
              <div className="item-comment-blob">
                {isEditComment ? (
                  <div className="item-comment-blob_edit">
                    <EditComment
                      item_id={item_id}
                      commentToEdit={data}
                      afterAnyChange={() => {
                        setIsEditComment(false);
                        afterAnyChange();
                      }}
                      onCancel={() => {
                        setIsEditComment(false);
                      }}
                    />
                  </div>
                ) : (
                  <div className="item-comment-blob_comment">
                    {data.content}
                  </div>
                )}
                <div className="item-comment-blob_footer">
                  <Row className="align-items-center g-0">
                    <Col xs="auto">
                      <div className="item-comment-date">
                        {moment(data.date, "YYYY-MM-DD hh:mm:ss a").format(
                          "h:mm, DD MMM YYYY"
                        )}
                      </div>
                    </Col>
                    <Col xs="auto">
                      <div
                        className={classNames("item-comment-thumb", {
                          "col-up": data.user_voted === "upvote",
                        })}
                        onClick={() => {
                          voteComment({
                            item_id,
                            comment_id: data.id,
                            vote: "upvote",
                          });
                        }}
                      >
                        <Icon type="thumbs-up" /> {data.upvotes}
                      </div>
                      <div
                        className={classNames("item-comment-thumb", {
                          "col-down": data.user_voted === "downvote",
                        })}
                        onClick={() => {
                          voteComment({
                            item_id,
                            comment_id: data.id,
                            vote: "downvote",
                          });
                        }}
                      >
                        <Icon type="thumbs-down" /> {data.downvotes}
                      </div>
                    </Col>
                    {isMyUser ? (
                      <>
                        <Col xs="auto">
                          <div className="item-comment-btn-edit-container">
                            <div
                              className="item-comment-btn-edit"
                              onClick={() => {
                                setIsEditComment((v) => !v);
                              }}
                            >
                              <Icon type="pencil" /> Editar
                            </div>
                          </div>
                        </Col>
                        <Col>
                          <div className="item-comment-btn-delete-container">
                            <div
                              className="item-comment-btn-delete"
                              title={getI18Ntext("btn.Delete")}
                              onClick={() => {
                                setModalOpen(true);
                              }}
                            >
                              <Icon type="trash" />
                            </div>
                          </div>
                        </Col>
                      </>
                    ) : null}
                  </Row>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {modalOpen ? (
        <Modal
          isOpen={true}
          toggle={() => {
            setModalOpen(false);
          }}
          centered
          size="md"
        >
          <ModalBody className="text-center p-4">
            <h3 className="mb-4 bold">
              <I18N id="itemComments.title.deleteComment" />
            </h3>
            <div>
              <Button
                color="link"
                // tag="a"
                className="me-2 mb-sm-0 mb-2"
                outline
                onClick={(e) => {
                  setModalOpen(false);
                }}
              >
                <I18N id="btn.Cancel" />
              </Button>
              <Button
                color="danger"
                type="submit"
                onClick={() => {
                  setModalOpen(false);
                  deleteComment({
                    item_id,
                    comment_id: data.id,
                  });
                }}
              >
                <I18N id="btn.Delete" />
              </Button>
            </div>
          </ModalBody>
        </Modal>
      ) : null}
    </>
  );
};
export default Comment;
