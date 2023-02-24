import { useState, useEffect, useCallback } from "react";
import { Col, Row, Button, Alert, Badge } from "reactstrap";
import classNames from "classnames";
import { languageList, statusList, typeOfElements } from "config";
import ElementDropVersions from "components/elementDropVersions";
import { Form, Input, Hidden } from "components/form";
import Icon from "components/icon";
import { LoadingBox } from "components/loading";
import { getVersionNameFromId, processBGGdata } from "utils";
import Thumbnail from "components/thumbnail";
import I18N from "i18n";
import ErrorAlert from "components/errorAlert";
import { NOGAMEresult } from "config";
import PillsBGG from "components/item/full/element/pillsBGG";

const validations = {
  version_name: ["required"],
  language: ["required"],
  publisher: ["required"],
  year: ["required"],
  status: ["required"],
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

  const [isNOGAME, setIsNOGAME] = useState(false);

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

  const [data, setData] = useState(element);
  const changeData = useCallback(
    (newData) => {
      setData({
        ...data,
        ...newData,
      });
    },
    [data]
  );

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

        const isBGGgame = BGGdata.bgg_id !== NOGAMEresult.bgg_id;

        if (create && isBGGgame) {
          set_thumbnail(BGGdata.thumbnail);
        }
        setIsNOGAME(!isBGGgame);
      }
    }
  }, [BGGelement, create]);

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
                    <I18N id="btn.Delete" />
                  </Button>
                </div>
              )}
            </div>
          </Col>
          <Col>
            <div className="element-edit-data-container">
              <div className="element-title mb-2">
                {element.name}{" "}
                <div
                  className={classNames(
                    "element-type-badge",
                    `b-${element.type}`
                  )}
                >
                  <I18N id={`element-type-badge-${element.type}`} />
                </div>
              </div>
              {BGGelement && !isNOGAME ? (
                <div className="element-edit-bgg">
                  <PillsBGG
                    element={{
                      ...element,
                      ...bgg_stats,
                      dependency: dependency?.value || 0,
                      dependency_votes: dependency?.votes || "",
                    }}
                  />
                </div>
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

                  {isNOGAME ? (
                    <Input
                      data={data}
                      validations={validations}
                      validationStatus={validationStatus}
                      setValidationStatus={setValidationStatus}
                      label="element.Name"
                      name="name"
                      icon="puzzle-piece"
                      onChange={(v) => {
                        changeData({ name: v });
                      }}
                    />
                  ) : (
                    <Hidden name="name" value={element.name} />
                  )}

                  {isNOGAME ? null : (
                    <Input
                      data={getVersionNameFromId(bgg_version_id, versionList)}
                      validations={validations}
                      validationStatus={validationStatus}
                      setValidationStatus={setValidationStatus}
                      type="input-drop"
                      label="element.Edition"
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
                  )}
                  {bgg_version_id || isNOGAME ? (
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
                            translateType="language"
                            //notTranslateOptions
                            label="element.Language"
                            name="language"
                            readOnly={bgg_version_id !== "other"}
                            onChange={(v) => {
                              changeData({ language: v });
                            }}
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
                            label="element.Publisher"
                            name="publisher"
                            readOnly={bgg_version_id !== "other"}
                            onChange={(v) => {
                              changeData({ publisher: v });
                            }}
                          />
                        </Col>
                        <Col lg={4} xs={5}>
                          <Input
                            data={data}
                            validations={validations}
                            validationStatus={validationStatus}
                            setValidationStatus={setValidationStatus}
                            label="element.Year"
                            type="number"
                            min="1"
                            max={maxYear}
                            name="year"
                            readOnly={bgg_version_id !== "other"}
                            onChange={(v) => {
                              changeData({ year: v });
                            }}
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
                            label="element.Status"
                            name="status"
                            type="select"
                            options={statusList}
                            onChange={(v) => {
                              changeData({ status: v });
                            }}
                          />
                        </Col>
                      </Row>
                      <Input
                        data={data}
                        validations={validations}
                        validationStatus={validationStatus}
                        setValidationStatus={setValidationStatus}
                        label="element.Comment"
                        textSize={500}
                        name="comment"
                        type="textarea"
                        onChange={(v) => {
                          changeData({ comment: v });
                        }}
                      />
                    </>
                  ) : (
                    <div className="bgg_version_id_null-spacer" />
                  )}
                  <ErrorAlert errors={errors} />
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
                      <I18N id="btn.Cancel" />
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      disabled={!bgg_version_id}
                    >
                      {create ? (
                        <I18N id="btn.Add" />
                      ) : (
                        <I18N id="btn.SaveChanges" />
                      )}
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
            <h5 className="mb-4">
              <I18N id="Delete" /> "{element.name}"?
            </h5>

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
              <I18N id="btn.Cancel" />
            </Button>
            <Button
              color="danger"
              onClick={() => {
                setShowDelete(false);
                deleteElement(element.id);
              }}
            >
              <I18N id="btn.Delete" />
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ElementEdit;
