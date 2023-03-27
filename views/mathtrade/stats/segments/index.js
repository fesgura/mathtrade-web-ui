import I18N from "i18n";
import { Card, CardBody } from "reactstrap";

const Segments = ({ stats }) => {
  console.log(stats);
  return (
    <div>
      <Card>
        <CardBody>
          <h3 className="text-center py-3">
            <I18N id="stats.segment.title" />
          </h3>
          content
        </CardBody>
      </Card>
    </div>
  );
};

export default Segments;
