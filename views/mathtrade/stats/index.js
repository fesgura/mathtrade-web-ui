import Script from "next/script";
import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";
import Pills from "./pills";
import Map from "./map";
import Segments from "./segments";
import { Col, Row } from "reactstrap";

const StatsView = ({ stats, loading, errors }) => {
  return (
    <>
      <Script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-bundle.min.js"></Script>
      <PrivateLayout loading={loading} doctitle="title.Stats">
        <PageHeader title="title.Stats" center />
        {stats ? (
          <>
            <Pills stats={stats} />
            <Row>
              <Col xs="auto">
                <Map stats={stats} />
              </Col>
              <Col>
                <Segments stats={stats} />
              </Col>
            </Row>
          </>
        ) : null}
      </PrivateLayout>
    </>
  );
};
export default StatsView;
