import { Input } from "components/form";
import Icon from "components/icon";
import CommitBtn from "../../common/commit-btn";
import I18N, { getI18Ntext } from "i18n";
import OrderBy from "components/orderBy";
import { Col, Row } from "reactstrap";
import AutoCompleteButton from "./autocomplete";
import Pagination from "components/pagination";
import ElementPerPage from "components/pagination/elementsPerPage";
import storage from "utils/storage";
import { eliminarDiacriticos } from "utils";

const GridSpacer = ({
  page,
  set_page,
  page_size,
  set_page_size,
  filterKeyword,
  set_filterKeyword,
  onUpdateFlag,
  wantsTotal,
  extendAll,
  setExtendAll,
  set_myItemList_orderBy,
  set_wantList_orderBy,
  lastCommitDate,
  commitChanges,
  commitChangesLoading,
  mustCommitChanges,
  set_mustCommitChanges,
  canEditWants,
  canEditList,
  reloadWants,
}) => {
  return (
    <div className="mywants-grid-spacer">
      <div className="mywants-grid-spacer_cont">
        <div className="mywants-grid-spacer_lab-my-items">
          <Row className="g-0 align-items-center justify-content-between">
            <Col xs="auto">
              <div className="mywants-grid-spacer_lab-text">
                <Icon type="arrow-down" className="me-1" />
                <I18N id="MyWants.Grid.MyItems" />
              </div>
            </Col>
            <Col xs="auto">
              <div className="mywants-grid-spacer_lab-orderby">
                <OrderBy
                  options={[
                    { text: getI18Ntext("element.Value"), value: "value" },
                    { text: getI18Ntext("element.Name"), value: "title" },
                    { text: "Más ofrecido", value: "count_want" },
                  ]}
                  onChange={set_myItemList_orderBy}
                  notAuto
                />
              </div>
            </Col>
          </Row>
        </div>

        <div className="mywants-grid-spacer_lab-my-wants">
          <div className="mywants-grid-spacer_lab-text pb-3">
            <Icon type="arrow-down" className="me-1" />
            <I18N id="MyWants.Grid.MyWants" />
          </div>
          <Row className="g-0 align-items-center justify-content-between">
            <Col xs="auto">
              <Input
                label="filter.Filter"
                placeholder="filter.Search.placeholder"
                icon="filter"
                size="sm"
                value={filterKeyword}
                onChange={(v) => {
                  set_filterKeyword(eliminarDiacriticos(v.toLowerCase()));
                }}
              />
            </Col>
            <Col xs="auto">
              <div className="mywants-grid-spacer_lab-orderby">
                <OrderBy
                  options={[
                    { text: getI18Ntext("element.Value"), value: "value" },
                    { text: getI18Ntext("element.Name"), value: "title" },
                    { text: "Más deseado", value: "count_want" },
                  ]}
                  onChange={set_wantList_orderBy}
                  notAuto
                />
              </div>
            </Col>
          </Row>
          <hr className="my-2" />
          <Row className="g-0 align-items-center justify-content-between">
            <Col xs="auto">
              <ElementPerPage
                min
                all
                one
                filters={{
                  query: {
                    page_size,
                    page: page + 1,
                  },
                }}
                setFilters={(d) => {
                  set_page(0);
                  set_page_size(parseInt(d.page_size, 10));
                  storage.setToOptions({
                    grid_page: 0,
                    grid_page_size: parseInt(d.page_size, 10),
                  });
                  onUpdateFlag();
                }}
              />
            </Col>
            <Col>
              <Pagination
                className="over-white"
                filters={{
                  query: {
                    page_size,
                    page: page + 1,
                  },
                }}
                setFilters={(d) => {
                  set_page(parseInt(d.page, 10) - 1);
                  storage.setToOptions({
                    grid_page: parseInt(d.page, 10) - 1,
                  });
                  onUpdateFlag();
                }}
                elementsTotal={wantsTotal}
              />
            </Col>
          </Row>
        </div>

        <div className="mywants-grid-spacer_lab-cont">
          <div className="mywants-grid-spacer_lab-cont_row-1">
            <CommitBtn
              lastCommitDate={lastCommitDate}
              commitChanges={commitChanges}
              commitChangesLoading={commitChangesLoading}
              mustCommitChanges={mustCommitChanges}
              canEditWants={canEditWants}
              canEditList={canEditList}
            />
          </div>
          <div className="mywants-grid-spacer_lab-cont_row-2">
            <Row className="g-0 align-items-center">
              <Col xs="auto">
                <div className="mywants-grid-spacer_lab-toolbox no-border">
                  <Input
                    data={{ extended: extendAll }}
                    type="checkbox"
                    labelCheckbox="MyWants.Grid.ExtendAll"
                    classNameContainer="m-0"
                    classNameLabelCheckbox="smallest"
                    name="extended"
                    onChange={() => {
                      setExtendAll((v) => !v);
                    }}
                  />
                </div>
              </Col>
              <Col xs="auto">
                <div className="mywants-grid-spacer_lab-toolbox">
                  <AutoCompleteButton
                    reloadWants={reloadWants}
                    canEditWants={canEditWants}
                    set_mustCommitChanges={set_mustCommitChanges}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridSpacer;
