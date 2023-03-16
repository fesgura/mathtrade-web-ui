import Script from "next/script";
import PrivateLayout from "layouts/private";
import InviteRegisterMT from "components/inviteRegisterMathTrade";
import LinkInternal from "components/link-internal";
import Crecimiento from "./crecimiento";
import I18N from "i18n";
import { Container } from "reactstrap";
import { linksToHelp } from "config";

const HomeView = ({ loading, mathtradeData }) => {
  return (
    <PrivateLayout loading={loading}>
      <Script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-bundle.min.js"></Script>
      {/* <PageHeader title="Math Trade Argentina" /> */}
      <InviteRegisterMT />
      <section className="text-center">
        <Container>
          <h1 className="mb-4">
            <I18N id="title.Home" />
          </h1>
          {mathtradeData ? (
            <>
              <p className="lead">
                <I18N id="home.lead" />
              </p>
              <p className="lead">
                <I18N
                  id="home.lead2"
                  values={[
                    linksToHelp.video,
                    linksToHelp.bgg,
                    linksToHelp.telegram,
                  ]}
                />
              </p>
              <p>
                <I18N id="home.help" />{" "}
                <LinkInternal path="myCollection">
                  <I18N id="title.MyCollection" />
                </LinkInternal>
                .
              </p>
            </>
          ) : (
            <div
              className="text-center"
              style={{ maxWidth: 950, margin: "0 auto" }}
            >
              <h3 className="mb-4">
                <I18N id="noMathtradeYet.Title" />
              </h3>
              <p className="lead mb-4">
                <I18N id="noMathtradeYet.text-1" />
              </p>
              <p>
                <I18N id="noMathtradeYet.text-2" />
              </p>
              <div>
                <LinkInternal
                  path="myCollection"
                  className="btn btn-primary"
                  withIcon
                >
                  <I18N id="title.MyCollection" />
                </LinkInternal>
              </div>
            </div>
          )}
        </Container>
      </section>
      <Crecimiento />
    </PrivateLayout>
  );
};

export default HomeView;
