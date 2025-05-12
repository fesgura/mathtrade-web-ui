import Users from "./users";
import Items from "./items";
import I18N from "@/i18n";

const HistorialMT = () => {
  return (
    <div>
      <h2 className="text-center pb-5 font-bold md:text-3xl text-xl mb-5 text-gray-600">
        <I18N id="home.growing.title" />
      </h2>
      <Users />
      <Items />
    </div>
  );
};

export default HistorialMT;
