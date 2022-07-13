import { useState, useEffect } from "react";
import { Col, Row, Button, Alert, Badge } from "reactstrap";
import classNames from "classnames";
import { dependencyList, statusList, typeOfElements } from "config";
import ElementDropVersions from "components/element/elementDropVersions";
import { Form, Input, Hidden } from "components/form";
import Icon from "components/icon";
import { LoadingBox } from "components/loading";
import { getVersionNameFromId, createVersionList } from "./utils";
import validations from "./validations";

const ElementEdit = ({
  element,
  create,
  item,
  onCancel,
  // BGG ELEMENT
  fetchBGGelement,
  BGGelement,
  loadingBGGelement,
  // EDIT
  onSaveElement,
  loading,
  errors,
}) => {
  const [validationStatus, setValidationStatus] = useState({});

  const [thumbnail, set_thumbnail] = useState(element.thumbnail);
  const [bgg_id, set_bgg_id] = useState(element.bgg_id);
  const [bgg_version_id, set_bgg_version_id] = useState(element.bgg_version_id);

  const [versionList, setVersionList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const [data, setData] = useState(element);
  const changeData = (newData) => {
    setData({
      ...data,
      ...newData,
    });
  };

  useEffect(() => {
    if (bgg_id !== "") {
      fetchBGGelement({ id: bgg_id, versions: 1 });
    }
  }, [bgg_id]);

  useEffect(() => {
    if (BGGelement) {
      if (BGGelement.versions && BGGelement.versions.item) {
        const versions =
          typeof BGGelement.versions.item.forEach === "undefined"
            ? [BGGelement.versions.item]
            : BGGelement.versions.item;
        setVersionList(createVersionList(versions));
      }
      if (create && BGGelement.thumbnail) {
        set_thumbnail(BGGelement.thumbnail);
      }
    }
  }, [BGGelement, create]);

  useEffect(() => {
    if (errors) {
      let errorMge = "Ocurrió un error. Por favor, intenta nuevamente.";
      setErrorMessage(errorMge);
    } else {
      setErrorMessage(null);
    }
  }, [errors]);

  return (
    <div
      className={classNames("element element-edit  fade-in", {
        "for-combo": item?.elements?.length > 1,
      })}
    >
      <Row className="g-0 align-items-stretch">
        <Col md={"auto"}>
          <div className="element-thumbnail-container">
            <div
              className={classNames("element-thumbnail", {
                loading: loadingBGGelement,
              })}
            >
              {!loadingBGGelement && thumbnail !== "" ? (
                <img src={thumbnail} alt="" />
              ) : (
                <div className="element-thumbnail_placeholder" />
              )}
            </div>
          </div>
        </Col>
        <Col>
          <div className="element-data-container">
            <div className="element-name">
              <div className="element-name-cont">
                {element.name}{" "}
                {element.type === typeOfElements["expansion"] ? (
                  <Badge color="expansion" className="element-name-badge">
                    Expansión
                  </Badge>
                ) : null}
                <a
                  href={`https://boardgamegeek.com/boardgame/${bgg_id}/`}
                  target="_blank"
                  className="element-name-bgg-link"
                >
                  BGG <Icon type="external-link" />
                </a>
              </div>
            </div>
            <div className="element-form-container">
              <Form
                onSubmit={(formData) => {
                  onSaveElement({
                    ...formData,
                    id: element.id,
                    create,
                  });
                }}
                validations={validations}
                validationStatus={validationStatus}
                setValidationStatus={setValidationStatus}
              >
                <Hidden name="name" value={element.name} />
                <Hidden name="bgg_id" value={bgg_id} />
                <Hidden name="type" value={element.type} />
                <Hidden name="bgg_version_id" value={bgg_version_id} />
                <Hidden name="thumbnail" value={thumbnail} />
                <Hidden name="complete" value={false} />

                <Input
                  data={getVersionNameFromId(bgg_version_id, versionList)}
                  validations={validations}
                  validationStatus={validationStatus}
                  setValidationStatus={setValidationStatus}
                  type="input-drop"
                  label="Edición"
                  name="version_name"
                  nowrite
                  icon={"book"}
                  loading={loadingBGGelement}
                  drop={
                    !loadingBGGelement ? (
                      <ElementDropVersions
                        versionList={versionList}
                        onChange={(v) => {
                          set_bgg_version_id(v.versionData.bgg_version_id);
                          if (v.versionData.thumbnail) {
                            set_thumbnail(v.versionData.thumbnail);
                          }
                          changeData(v.formData);
                        }}
                      />
                    ) : null
                  }
                />
                <Row>
                  <Col md={4}>
                    <Input
                      data={data}
                      validations={validations}
                      validationStatus={validationStatus}
                      setValidationStatus={setValidationStatus}
                      label="Idioma"
                      name="language"
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      data={data}
                      validations={validations}
                      validationStatus={validationStatus}
                      setValidationStatus={setValidationStatus}
                      label="Editorial"
                      name="publisher"
                    />
                  </Col>
                  <Col md={2}>
                    <Input
                      data={data}
                      validations={validations}
                      validationStatus={validationStatus}
                      setValidationStatus={setValidationStatus}
                      label="Año"
                      name="year"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Input
                      data={data}
                      validations={validations}
                      validationStatus={validationStatus}
                      setValidationStatus={setValidationStatus}
                      label="Dependencia"
                      name="dependency"
                      type="select"
                      options={dependencyList}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      data={data}
                      validations={validations}
                      validationStatus={validationStatus}
                      setValidationStatus={setValidationStatus}
                      label="Estado"
                      name="status"
                      type="select"
                      options={statusList}
                    />
                  </Col>
                </Row>
                <Input
                  data={data}
                  validations={validations}
                  validationStatus={validationStatus}
                  setValidationStatus={setValidationStatus}
                  label="Comentarios"
                  name="comment"
                  type="textarea"
                />
                {errorMessage ? (
                  <Alert color="danger" className="text-center">
                    {errorMessage}
                  </Alert>
                ) : null}
                <div className="text-center py-3">
                  <Button
                    color="link"
                    tag="a"
                    className="me-2"
                    outline
                    onClick={(e) => {
                      e.preventDefault();
                      onCancel();
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button color="primary" type="submit">
                    {create ? "Agregar" : "Guardar cambios"}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
      {loading ? <LoadingBox /> : null}
    </div>
  );
};
export default ElementEdit;
