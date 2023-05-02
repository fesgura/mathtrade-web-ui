import { Card, CardBody } from "reactstrap";
import Trade from "./trade";

const ListSizes = ({ mathTradeResults }) => {
  return (
    <Card>
      <CardBody className="p-5">
        <div className="result-list">
          <table className="result-table">
            <tbody>
              {mathTradeResults.map((data, k) => {
                return <Trade key={k} data={data} />;
              })}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default ListSizes;
