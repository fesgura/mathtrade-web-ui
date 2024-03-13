import I18N from "@/i18n";
import clsx from "clsx";

const SuccessAlert = ({ text, className }) => {
  return (
    <div
      className={clsx(
        "animate-fadein bg-teal-500 text-white text-sm font-bold p-3 mb-3 rounded-md text-center max-w-md mx-auto",
        className
      )}
    >
      <I18N id={text || ""} />
    </div>
  );
};

export default SuccessAlert;
