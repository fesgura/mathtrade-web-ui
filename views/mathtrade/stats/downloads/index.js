import { Button, Card, CardBody } from "reactstrap";
import I18N from "i18n";
import Icon from "components/icon";
import { urlBaseMedia, TradeMaximizerLinks } from "config";

const Downloads = ({ stats }) => {
  return stats.results || stats.wants ? (
    <Card>
      <CardBody>
        <h3 className="text-center pt-3">
          <I18N id="stats.downloads.title" />
        </h3>
        <hr />
        <p>
          <I18N
            id="stats.downloads.text1"
            values={[
              TradeMaximizerLinks.source,
              TradeMaximizerLinks.instructions,
            ]}
          />
        </p>
        <Button
          href={`${urlBaseMedia}${stats?.wants}`}
          color="primary"
          block
          className="mb-4"
          download
          target="_blank"
        >
          <Icon type="download" className="me-2" />
          <I18N id="stats.downloads.btn.wants" />
        </Button>
        <p>
          <I18N id="stats.downloads.text2" />
        </p>
        <Button
          href={`${urlBaseMedia}${stats?.results}`}
          color="primary"
          block
          download
          className="mb-3"
          target="_blank"
        >
          <Icon type="download" className="me-2" />
          <I18N id="stats.downloads.btn.results" />
        </Button>
      </CardBody>
    </Card>
  ) : null;
};
export default Downloads;
