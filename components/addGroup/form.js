import { useState, useEffect } from "react";
import { Form, Input } from "components/form";
import { Button, Col, Row, Modal, ModalBody } from "reactstrap";
import ErrorAlert from "components/errorAlert";
import Icon from "components/icon";
import { LoadingBox } from "components/loading";
import { getTextColorByBackgroundColor } from "utils";
import I18N from "i18n";

const validations = {
  name: ["required"],
};

const FormAddGroup = ({
  item,
  group,
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
    if (group) {
      setName(group.name);
      setColor(group.color);
    }
  }, [group]);

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
            {group ? (
              <I18N id="myItems.sidebar.EditGroup" />
            ) : (
              <I18N id="myItems.sidebar.AddGroup" />
            )}
          </h4>
          <Form
            onSubmit={(formData) => {
              const item_ids = group ? group.item_ids : item ? [item.id] : [];

              onSubmit({
                data: { ...formData, item_ids },
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
                  label="myItems.sidebar.form.GroupName"
                  name="name"
                  placeholder="myItems.sidebar.form.GroupPlaceholder"
                  onChange={setName}
                />
              </Col>
              <Col xs={2}>
                <Input
                  data={{ color }}
                  validations={validations}
                  validationStatus={validationStatus}
                  setValidationStatus={setValidationStatus}
                  label="myItems.sidebar.form.Color"
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
                  <I18N id="myItems.sidebar.form.Preview" />:
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
                {group ? (
                  <I18N id="myItems.sidebar.SaveGroup" />
                ) : (
                  <I18N id="myItems.sidebar.AddGroup" />
                )}
              </Button>
            </div>
            {group ? (
              <div className="text-center py-1 small">
                <hr />
                {showDelete ? (
                  <>
                    <div className="mb-1">
                      <I18N id="myItems.sidebar.form.DeleteGroup.warning" />
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
                      <I18N id="myItems.sidebar.DeleteGroup" />
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

export default FormAddGroup;
