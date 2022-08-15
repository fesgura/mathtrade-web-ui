import Script from "next/script";
import PrivateLayout from "layouts/private";
import InviteRegisterMT from "components/inviteRegisterMathTrade";
import LinkInternal from "components/link-internal";
import Crecimiento from "./crecimiento";

const HomeView = ({ loading }) => {
  return (
    <PrivateLayout loading={loading}>
      <Script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-bundle.min.js"></Script>
      {/* <PageHeader title="Math Trade Argentina" /> */}
      <InviteRegisterMT />
      <section className="text-center">
        <h1 className="mb-4">Math Trade Argentina</h1>
        <p className="lead">
          Aquí podrás participar del mayor intercambio de juegos de mesa de todo
          el país.
        </p>
        <p>
          Podés empezar <i>cargando tus ítems</i> para intercambiar en{" "}
          <LinkInternal path="myItems">Mis ítems</LinkInternal>.
        </p>
      </section>
      <Crecimiento />
    </PrivateLayout>
  );
};

export default HomeView;
