import Script from "next/script";
import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";
import Pills from "./pills";
import Map from "./map";
import Segments from "./segments";
import { Col, Row } from "reactstrap";
import Downloads from "./downloads";

const StatsView = ({ stats, loading, errors }) => {
  return (
    <>
      <Script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-bundle.min.js"></Script>
      <PrivateLayout loading={loading} doctitle="title.Stats">
        <PageHeader title="title.Stats" subtitle="subtitle.Stats" center />
        {stats ? (
          <div className="pb-4">
            <Pills stats={stats} />
            <Row>
              <Col xs="auto">
                <Map stats={stats} />
              </Col>
              <Col>
                <Segments stats={stats} />
                <Downloads stats={stats} />
              </Col>
            </Row>
          </div>
        ) : (
          <div>
            <p className="text-center lead pt-4">
              Muy pronto podrás consultar las estadísticas para este MathTrade.
            </p>
          </div>
        )}
      </PrivateLayout>
    </>
  );
};
export default StatsView;
