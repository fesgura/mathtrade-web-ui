import Participantes from "./participantes";
import Items from "./items";
import { Card, CardBody, Col, Row } from "reactstrap";

const Crecimiento = () => {
  return (
    <section>
      <div className="text-center mb-5">
        <h3>Crecimiento del Math Trade Argentina (2017 - 2022)</h3>
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
