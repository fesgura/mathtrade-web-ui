import Container from "@/components/container";
import Users from "./users";
import Items from "./items";
import I18N from "@/i18n";

const HistorialMT = () => {
  return (
    <Container>
      <h2 className="text-center pb-5 font-bold md:text-3xl text-xl mb-5 text-gray-600">
        <I18N id="home.growing.title" />
      </h2>
      <Users />
      <Items />
    </Container>
  );
};

export default HistorialMT;
