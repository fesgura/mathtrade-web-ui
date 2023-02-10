import Participantes from "./participantes";
import Items from "./items";
import { Card, CardBody, Col, Row } from "reactstrap";
import I18N from "i18n";

const Crecimiento = () => {
  return (
    <section>
      <div className="text-center mb-5">
        <h3>
          <I18N id="home.growing.title" />
        </h3>
      </div>
      <div className="mb-4">
        <Card>
          <CardBody>
            <Participantes />
          </CardBody>
        </Card>
      </div>
      <div className="">
        <Card>
          <CardBody>
            <Items />
          </CardBody>
        </Card>
      </div>
    </section>
  );
};
export default Crecimiento;
