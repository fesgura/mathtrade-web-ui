import { Input } from "components/form";
import Icon from "components/icon";
import { getUniqueId } from "utils";
import I18N, { getI18Ntext } from "i18n";
import OrderBy from "components/orderBy";
import { Button, Col, Row } from "reactstrap";
import Question from "components/question";

const GridSpacer = ({
  extendAll,
  setExtendAll,
  set_myItemList_orderBy,
  set_wantList_orderBy,
  commitChanges,
  commitChangesLoading,
  mustCommitChanges,
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
                  twoRows
                  valueInitial={"-value"}
                  // defaultValue="id"
                  options={[
                    { text: getI18Ntext("element.Value"), value: "value" },
                    { text: getI18Ntext("element.Name"), value: "title" },
                    { text: "Más ofrecido", value: "count_want" },
                  ]}
                  onChange={set_myItemList_orderBy}
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
                  twoRows
                  valueInitial={"-value"}
                  // defaultValue="id"
                  options={[
                    { text: getI18Ntext("element.Value"), value: "value" },
                    { text: getI18Ntext("element.Name"), value: "title" },
                    { text: "Más deseado", value: "count_want" },
                  ]}
                  onChange={set_wantList_orderBy}
                />
              </div>
            </Col>
          </Row>
        </div>

        <div className="mywants-grid-spacer_lab-cont">
          <div className="mywants-grid-spacer_lab-cont_row-1">
            <Button
              color="danger"
              disabled={!mustCommitChanges || commitChangesLoading}
              onClick={commitChanges}
            >
              <Icon
                type={commitChangesLoading ? "refresh fa-spin" : "check"}
                className="me-2"
              />
              <I18N id="MyWants.btn.Commit" />
            </Button>
            <p className="muted small italic m-0 pt-2 px-4">
              <I18N id="MyWants.btn.Commit.help" />
            </p>
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
