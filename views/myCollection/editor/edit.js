import { useId, useState, useEffect, useCallback } from "react";
import {
  Col,
  Row,
  Button,
  UncontrolledTooltip,
  Collapse,
  Alert,
} from "reactstrap";
import classNames from "classnames";
import {
  languageList,
  statusList,
  photoUploaderConfig,
  textSize,
} from "config";
import PhotoGallery from "components/photoGallery";
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
import PhotoUploader from "components/photoUploader";
import StatusHelp from "components/pages/myItems/statusHelp";
import ModalDeleteItem from "../modalDelete";

const twoPointsReg = new RegExp(":", "g");

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
  item,
  create,
  repeatedGame,
  setRepeatedGame,
  onClose,
  // BGG ELEMENT
  fetchBGGelement,
  BGGelement,
  loadingBGGelement,
  // EDIT
  onSaveElement,
  loading,
  errors,
  afterAnyChange,
}) => {
  const id = useId("elem-editor-").replace(twoPointsReg, "");

  const [modalUploadOpen, setModalUploadOpen] = useState(false);

  const [isNOGAME, setIsNOGAME] = useState(false);

  const [validationStatus, setValidationStatus] = useState({});

  const [thumbnail, set_thumbnail] = useState(element.thumbnail);
  const [bgg_id, set_bgg_id] = useState(element.bgg_id);
  const [bgg_version_id, set_bgg_version_id] = useState(element.bgg_version_id);
  const [rank, set_rank] = useState(0);

  const [images, set_images] = useState([]);
  const [imagesCollapseOpen, set_imagesCollapseOpen] = useState(false);

  ////
  const [objToDelete, setObjToDelete] = useState(null);
  ////

  useEffect(() => {
    if (element && element.images && element.images !== "") {
      const newImages = element.images.split(",");
      set_images(newImages);
      set_imagesCollapseOpen(newImages.length > 0);
    }
  }, [element]);

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
        set_rank(BGGdata.rank);
        const isBGGgame = BGGdata.bgg_id !== NOGAMEresult.bgg_id;

        if (create && isBGGgame) {
          set_thumbnail(BGGdata.thumbnail);
        }
        setIsNOGAME(!isBGGgame);
      }
    }
  }, [BGGelement, create]);

  return (
    <>
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
                <div className="element-thumbnail-container-wrap">
                  <Thumbnail src={thumbnail} />

                  {isNOGAME || bgg_version_id === "other" ? (
                    <>
                      <div
                        className="element-thumbnail-container-edit-thumbnail"
                        id={`tt-elem-editor-ph-${id}`}
                        onClick={() => {
                          setModalUploadOpen(true);
                        }}
                      >
                        <Icon type="camera" />
                      </div>
                      <UncontrolledTooltip target={`tt-elem-editor-ph-${id}`}>
                        <I18N id="photoUploader.edit.thumbnail.btn" />
                      </UncontrolledTooltip>
                    </>
                  ) : null}
                </div>
              </div>
            </Col>
            <Col>
              <div className="element-edit-data-container">
                <Alert color="info" isOpen={repeatedGame}>
                  <div className="text-center">
                    <I18N id="element.editor.repeated.alert" />
                  </div>
                  <div className="text-center pt-2">
                    <Button
                      color="link"
                      size="xs"
                      className="me-2 mb-sm-0 mb-2"
                      outline
                      onClick={onClose}
                    >
                      <I18N id="element.editor.repeated.btn.cancel" />
                    </Button>
                    <Button
                      color="primary"
                      size="xs"
                      onClick={() => {
                        setRepeatedGame(false);
                      }}
                    >
                      <I18N id="element.editor.repeated.btn.yes" />
                    </Button>
                  </div>
                </Alert>
                <div className="element-title mb-2">
                  {element.name}{" "}
                  {element.type === 3 ? null : (
                    <div
                      className={classNames(
                        "element-type-badge",
                        `b-${element.type}`
                      )}
                    >
                      <I18N id={`element-type-badge-${element.type}`} />
                    </div>
                  )}
                </div>
                {BGGelement && !isNOGAME ? (
                  <div className="element-edit-bgg">
                    <PillsBGG
                      element={{
                        ...element,
                        rank,
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
                        rank,
                        images: images.join(","),
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
                    <Hidden
                      name="weight_votes"
                      value={bgg_stats.weight_votes}
                    />

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
                                console.log(
                                  "versionData",
                                  v.versionData.bgg_version_id
                                );
                                set_bgg_version_id(
                                  v.versionData.bgg_version_id
                                );
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
                              textSize={textSize.edit.publisher}
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
                              question={<StatusHelp />}
                              questionDropdown
                              notTranslateQuestion
                              onChange={(v) => {
                                changeData({ status: v });
                              }}
                            />
                          </Col>
                        </Row>
                        <div className="element-edit-photoGallery">
                          <div
                            className="element-edit-photoGallery-title"
                            onClick={() => {
                              set_imagesCollapseOpen((v) => !v);
                            }}
                          >
                            <div
                              className={classNames(
                                "element-edit-photoGallery-title-acc",
                                { "is-open": imagesCollapseOpen }
                              )}
                            >
                              <Icon type="chevron-right" className="me-2" />
                              <I18N id="photoGallery.editElement.title" />
                            </div>
                            {!imagesCollapseOpen ? (
                              <div className="element-edit-photoGallery-help">
                                <I18N id="photoGallery.editElement.help" />
                              </div>
                            ) : null}
                          </div>
                          <Collapse isOpen={imagesCollapseOpen}>
                            <div className="element-edit-photoGallery-container">
                              <PhotoGallery
                                list={images}
                                editable
                                limit={4}
                                onDelete={(index) => {
                                  set_images((a) => {
                                    const b = [...a];
                                    b.splice(index, 1);
                                    return b;
                                  });
                                }}
                                onAdd={(srcOut) => {
                                  set_images((a) => {
                                    const b = [...a];
                                    b.push(srcOut);
                                    return b;
                                  });
                                }}
                              />
                            </div>
                          </Collapse>
                        </div>
                        <Input
                          data={data}
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="element.Comment"
                          textSize={textSize.edit.comment}
                          showTextSize
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
                    <div className="py-3">
                      <Row className="align-items-center">
                        {create ? null : (
                          <Col xs="auto">
                            <Button
                              color="danger"
                              outline
                              size="xs"
                              onClick={() => {
                                setObjToDelete({ item, element });
                              }}
                            >
                              <Icon type="trash" />
                            </Button>
                          </Col>
                        )}
                        <Col>
                          <div
                            className={classNames({
                              "text-center": create,
                              "text-end": !create,
                            })}
                          >
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
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
          {loading ? <LoadingBox /> : null}
        </div>
      </div>
      {modalUploadOpen ? (
        <PhotoUploader
          onClose={() => {
            setModalUploadOpen(false);
          }}
          widthImage={250}
          onLoaded={(srcOut) => {
            set_thumbnail(photoUploaderConfig.urlBase + srcOut);
            setModalUploadOpen(false);
          }}
        />
      ) : null}
      <ModalDeleteItem
        objToDelete={objToDelete}
        onClose={() => {
          setObjToDelete(null);
          onClose();
        }}
        afterAnyChange={afterAnyChange}
      />
    </>
  );
};
export default ElementEdit;
