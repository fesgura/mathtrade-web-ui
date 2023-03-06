import { Input } from "components/form";
import Icon from "components/icon";
import CommitBtn from "../../common/commit-btn";
import I18N, { getI18Ntext } from "i18n";
import OrderBy from "components/orderBy";
import { Button, Col, Row } from "reactstrap";

const GridSpacer = ({
  extendAll,
  setExtendAll,
  set_myItemList_orderBy,
  set_wantList_orderBy,
  commitChanges,
  commitChangesLoading,
  mustCommitChanges,
  canEditWants,
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
          <Row className="g-0 align-items-center justify-content-between">
            <Col xs="auto">
              <div className="mywants-grid-spacer_lab-text">
                <Icon type="arrow-down" className="me-1" />
                <I18N id="MyWants.Grid.MyWants" />
              </div>
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
        </div>

        <div className="mywants-grid-spacer_lab-cont">
          <div className="mywants-grid-spacer_lab-cont_row-1">
            <CommitBtn
              commitChanges={commitChanges}
              commitChangesLoading={commitChangesLoading}
              mustCommitChanges={mustCommitChanges}
              canEditWants={canEditWants}
            />
          </div>
          <div className="mywants-grid-spacer_lab-cont_row-2">
            <Input
              data={{ extended: extendAll }}
              type="checkbox"
              labelCheckbox="MyWants.Grid.ExtendAll"
              classNameLabelCheckbox="small"
              name="extended"
              onChange={() => {
                setExtendAll((v) => !v);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridSpacer;
