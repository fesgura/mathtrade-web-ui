import { useState, useEffect } from "react";
import { Col, Row, Button, Alert, Badge } from "reactstrap";
import classNames from "classnames";
import { languageList, statusList, typeOfElements } from "config";
import ElementDropVersions from "components/elementDropVersions";
import { Form, Input, Hidden } from "components/form";
import Icon from "components/icon";
import { LoadingBox } from "components/loading";
import { getVersionNameFromId, processBGGdata } from "utils";
import Thumbnail from "components/thumbnail";
import BggGameBox from "components/bggGameBox";

const validations = {
  version_name: ["required"],
  language: ["required"],
  publisher: ["required"],
  year: ["required"],
  status: ["required"],
  //comment NO REQUIRED
  //dependency  NO REQUIRED ,

  //item_title = name

  //item_id
  //type
  //bgg_id
  //thumbnail
  //bgg_version_id
};

const maxYear = (function () {
  const d = new Date();
  return `${d.getFullYear()}`;
})();

const ElementEdit = ({
  element,
  create,
  onClose,
  // BGG ELEMENT
  fetchBGGelement,
  BGGelement,
  loadingBGGelement,
  // EDIT
  onSaveElement,
  loading,
  errors,
  deleteElement,
}) => {
  const [showDelete, setShowDelete] = useState(false);

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
    if (BGGelement) {
      const BGGdata = processBGGdata(BGGelement);
      if (BGGdata) {
        setVersionList(BGGdata.versionList);
        set_dependency(BGGdata.dependency);
        set_bgg_stats(BGGdata.stats);
        if (create) {
          set_thumbnail(BGGdata.thumbnail);
        }
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
      className={classNames("element-edit  fade-in", {
        create,
        //  "for-combo": item?.elements?.length > 1,
      })}
    >
      <div className="element-edit-container">
        <Row className="g-0 align-items-stretch">
          <Col md={"auto"}>
            <div className="element-thumbnail-container">
              <Thumbnail src={thumbnail} />
              {create ? null : (
                <div className="text-center py-3">
                  <Button
                    color="danger"
                    outline
                    size="xs"
                    onClick={() => {
                      setShowDelete(true);
                    }}
                  >
                    <Icon type="trash" className="me-1" />
                    Eliminar
                  </Button>
                </div>
              )}
            </div>
          </Col>
          <Col>
            <div className="element-edit-data-container">
              <div className="element-title mb-2">
                {element.name}{" "}
                {element.type === typeOfElements["expansion"] ? (
                  <Badge color="expansion" className="element-title-badge">
                    Expansión
                  </Badge>
                ) : null}
              </div>
              {BGGelement ? (
                <BggGameBox
                  element={{
                    ...element,
                    ...bgg_stats,
                    dependency: dependency?.value || 0,
                    dependency_votes: dependency?.votes || "",
                  }}
                  className="mb-4"
                />
              ) : null}
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
                    autoComplete="off"
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
                  {bgg_version_id ? (
                    <>
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
                            readOnly={bgg_version_id !== "other"}
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
                            readOnly={bgg_version_id !== "other"}
                          />
                        </Col>
                        <Col lg={4} xs={5}>
                          <Input
                            data={data}
                            validations={validations}
                            validationStatus={validationStatus}
                            setValidationStatus={setValidationStatus}
                            label="Año"
                            type="number"
                            min="1"
                            max={maxYear}
                            name="year"
                            readOnly={bgg_version_id !== "other"}
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
                        label="Comentario"
                        textSize={500}
                        name="comment"
                        type="textarea"
                      />
                    </>
                  ) : (
                    <div className="bgg_version_id_null-spacer" />
                  )}
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
                        onClose();
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      disabled={!bgg_version_id}
                    >
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
      {showDelete ? (
        <div className="element-delete fade-in">
          <div className="element-delete-cont">
            <h5 className="mb-4">¿Eliminar "{element.name}"?</h5>

            <Button
              color="link"
              tag="a"
              className="me-2 mb-sm-0 mb-2"
              outline
              onClick={(e) => {
                e.preventDefault();
                setShowDelete(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              color="danger"
              onClick={() => {
                setShowDelete(false);
                deleteElement(element.id);
              }}
            >
              Eliminar
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ElementEdit;
