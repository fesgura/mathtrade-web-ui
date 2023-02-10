import { useState, useEffect } from "react";
import { Form, Input } from "components/form";
import { Button, Col, Row, Modal, ModalBody } from "reactstrap";
import ErrorAlert from "components/errorAlert";
import Icon from "components/icon";
import { LoadingBox } from "components/loading";
import { getTextColorByBackgroundColor } from "utils";
import I18N, { getI18Ntext } from "i18n";

const validations = {
  name: ["required"],
};

const FormAddTag = ({
  item,
  tag,
  onSubmit,
  onDelete,
  onCancel,
  loading,
  errors,
}) => {
  const [validationStatus, setValidationStatus] = useState({});
  const [name, setName] = useState("");
  const [color, setColor] = useState("#22c1c3");
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (tag) {
      setName(tag.name);
      setColor(tag.color);
    }
  }, [tag]);

  return (
    <Modal
      isOpen={true}
      toggle={onCancel}
      centered
      //size="lg"
    >
      <ModalBody>
        <div className="relative">
          <h4 className="text-center mb-4">
            {tag ? (
              <I18N id="itemList.Tags.EditTag" />
            ) : (
              <I18N id="itemList.Tags.AddTag" />
            )}
          </h4>
          <Form
            onSubmit={(formData) => {
              const items = item ? [item.id] : tag ? tag.items : [];

              onSubmit({
                data: {
                  ...formData,
                  bgg_id: "",
                  protected_dup: true,
                  items,
                },
              });
            }}
            validations={validations}
            validationStatus={validationStatus}
            setValidationStatus={setValidationStatus}
          >
            <Row>
              <Col>
                <Input
                  data={{ name }}
                  startFocus={true}
                  validations={validations}
                  validationStatus={validationStatus}
                  setValidationStatus={setValidationStatus}
                  label="itemList.Tags.form.TagName"
                  name="name"
                  placeholder="itemList.Tags.form.TagNamePlaceholder"
                  onChange={setName}
                />
              </Col>
              <Col xs={2}>
                <Input
                  data={{ color }}
                  validations={validations}
                  validationStatus={validationStatus}
                  setValidationStatus={setValidationStatus}
                  label="itemList.Tags.form.Color"
                  name="color"
                  type="color"
                  onChange={(v) => {
                    setColor(v);
                  }}
                  //question="Elegí un color que identifique al grupo."
                />
              </Col>
            </Row>
            <Row className="g-0 align-items-center justify-content-center mb-4">
              <Col xs="auto">
                <p className="small m-0 pe-2">
                  <I18N id="itemList.Tags.form.Preview" />:
                </p>
              </Col>
              <Col xs="auto">
                <div
                  className="group-tag m-0"
                  style={{
                    backgroundColor: color,
                    color: getTextColorByBackgroundColor(color),
                  }}
                >
                  {name}
                  <div className="group-tag-x">
                    <Icon type="times" />
                  </div>
                </div>
              </Col>
            </Row>
            <ErrorAlert errors={errors} />
            <div className="text-center py-2">
              <Button
                color="link"
                tag="a"
                className="me-2 mb-sm-0 mb-2"
                outline
                onClick={onCancel}
              >
                <I18N id="btn.Cancel" />
              </Button>
              <Button
                color="primary"
                type="submit"
                // disabled={!modified}
                //size="lg"
              >
                {tag ? (
                  <I18N id="itemList.Tags.form.SaveTag" />
                ) : (
                  <I18N id="itemList.Tags.form.AddTag" />
                )}
              </Button>
            </div>
            {tag ? (
              <div className="text-center py-1 small">
                <hr />
                {showDelete ? (
                  <>
                    <div className="mb-1">
                      <I18N id="itemList.Tags.form.DeleteTag.warning" />
                    </div>
                    <Button
                      color="link"
                      tag="a"
                      className="me-2 mb-sm-0 mb-2"
                      outline
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowDelete(false);
                      }}
                    >
                      <I18N id="No" />
                    </Button>
                    <Button
                      color="danger"
                      type="submit"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        onDelete();
                        setShowDelete(false);
                      }}
                    >
                      <I18N id="Yes" />
                    </Button>
                  </>
                ) : (
                  <>
                    <a
                      href="/"
                      className="text-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowDelete(true);
                      }}
                    >
                      <Icon type="trash" className="me-1" />
                      <I18N id="itemList.Tags.form.DeleteTag" />
                    </a>
                  </>
                )}
              </div>
            ) : null}
          </Form>
          {loading ? <LoadingBox /> : null}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default FormAddTag;
