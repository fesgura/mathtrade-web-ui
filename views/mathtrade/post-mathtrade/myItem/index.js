import { Card, CardBody, Col, Row } from "reactstrap";

import Quad from "./quad";

const MyItem = ({ item }) => {
  return (
    <div className="post-mt-myItem">
      <Card>
        <div className="post-mt-myItem_container">
          <Row className="g-0 flex-nowrap">
            <Col xs="auto">
              <div className="post-mt-myItem_quad-myItem">
                <Quad item={item} hideUser />
              </div>
            </Col>
            <Col>
              <div className="post-mt-myItem_quad-row_container">
                <div className="post-mt-myItem_quad-row">
                  {item.wanted && item.wanted.length
                    ? item.wanted.map((itm) => {
                        return (
                          <div className="post-mt-myItem_quad-col" key={itm.id}>
                            <Quad item={itm} />
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};
export default MyItem;
