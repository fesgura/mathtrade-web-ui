import I18N from "@/i18n";

const NotFound = ({ title, show }) => {
  return show ? (
    <div className="text-center text-lg font-bold py-4">
      <I18N id={title || "notFoundItems"} />
    </div>
  ) : null;
};

export default NotFound;
