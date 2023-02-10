import { useEffect } from "react";
import { useApi, MathTradeService } from "api_serv";
import { LoadingBox } from "components/loading";
import ItemListToWant from "./comps/itemListToWant";
import { Col, Row } from "reactstrap";
import { Input } from "components/form";
import I18N from "i18n";
import ErrorAlert from "components/errorAlert";

const Tag = ({ tag, dup_protection, set_dup_protection }) => {
  const [listItems, list, loading, errors] = useApi({
    promise: MathTradeService.listItems,
    startLoading: true,
  });

  useEffect(() => {
    listItems({
      query: {
        page_size: 9999,
        tag: tag.id,
      },
    });
  }, []);

  return (
    <div className="relative mb-4">
      <div className="pt-3 pb-2">
        <Row>
          <Col>
            {dup_protection ? (
              <I18N id="wantEditor.Group.wants.dup_protection_enabled.lead" />
            ) : (
              <I18N id="wantEditor.Group.wants.dup_protection_disabled.lead" />
            )}
          </Col>
          <Col xs="auto">
            <div className="want-editor_dup_protection-container">
              <Input
                data={{
                  dup_protection,
                }}
                classNameContainer="m-0"
                type="switch"
                name="dup_protection"
                labelCheckbox="wantEditor.dup_protection"
                question="wantEditor.dup_protection.help"
                onChange={set_dup_protection}
              />
            </div>
          </Col>
        </Row>
      </div>
      <hr className="m-0" />
      <ItemListToWant itemListToWant={list?.results || []} />
      <ErrorAlert errors={errors} />
      {loading ? <LoadingBox /> : null}
    </div>
  );
};

export default Tag;
