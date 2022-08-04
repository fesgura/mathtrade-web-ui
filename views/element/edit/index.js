import { useState, useEffect } from "react";
import { Col, Row, Button, Alert, Badge } from "reactstrap";
import classNames from "classnames";
import { languageList, statusList, typeOfElements } from "config";
import ElementDropVersions from "components/element/elementDropVersions";
import { Form, Input, Hidden } from "components/form";
import Icon from "components/icon";
import { LoadingBox } from "components/loading";
import {
  getVersionNameFromId,
  processBGGdata,
  dependencyToData,
} from "../utils";
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

  const [dependency, set_dependency] = useState({
    value: "",
    votes: "",
  });
  const [bgg_stats, set_bgg_stats] = useState({
    rate: "",
    rate_votes: "",
    weight: "",
    weight_votes: "",
  });

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
      fetchBGGelement({ id: bgg_id, versions: 1, stats: 1 });
    }
  }, [bgg_id]);

  useEffect(() => {
    const BGGdata = processBGGdata(BGGelement);
    if (BGGdata) {
      setVersionList(BGGdata.versionList);
      set_dependency(BGGdata.dependency);
      set_bgg_stats(BGGdata.stats);
      if (create) {
        set_thumbnail(BGGdata.thumbnail);
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
          <div className="element-thumbnail-container mx-auto mb-4">
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
            <Row className="align-items-center mb-4">
              <Col xs="auto">
                <div className="element-name">
                  <div className="element-name-cont">
                    {element.name}{" "}
                    {element.type === typeOfElements["expansion"] ? (
                      <Badge color="expansion" className="element-name-badge">
                        Expansión
                      </Badge>
                    ) : null}
                  </div>
                </div>
              </Col>
              <Col>
                <a
                  href={`https://boardgamegeek.com/boardgame/${bgg_id}/`}
                  target="_blank"
                  className="bgg-link"
                >
                  BGG <Icon type="external-link" />
                </a>
              </Col>
            </Row>

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

                <Hidden name="dependency" value={dependency.value} />
                <Hidden name="dependency_votes" value={dependency.votes} />
                <Hidden name="rate" value={bgg_stats.rate} />
                <Hidden name="rate_votes" value={bgg_stats.rate_votes} />
                <Hidden name="weight" value={bgg_stats.weight} />
                <Hidden name="weight_votes" value={bgg_stats.weight_votes} />

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
                  <Col>
                    <Input
                      data={data}
                      validations={validations}
                      validationStatus={validationStatus}
                      setValidationStatus={setValidationStatus}
                      type="select-multiple"
                      options={languageList}
                      label="Idioma"
                      name="language"
                    />
                  </Col>
                  <Col xs="auto">
                    <Input
                      type="textinfo"
                      data={{
                        dependencyTextInfo: dependencyToData(dependency).most,
                      }}
                      label="Dependencia de idioma"
                      name="dependencyTextInfo"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={8} xs={7}>
                    <Input
                      data={data}
                      validations={validations}
                      validationStatus={validationStatus}
                      setValidationStatus={setValidationStatus}
                      label="Editorial"
                      name="publisher"
                    />
                  </Col>
                  <Col lg={4} xs={5}>
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
                    className="me-2 mb-sm-0 mb-2"
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
