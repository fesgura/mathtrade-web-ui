import I18N from "@/i18n";
import clsx from "clsx";

const Pill = ({ value, label, footer, className }) => {
  return (
    <div className={clsx("text-white h-full p-4 rounded-xl",className)}>
      <div className="text-6xl font-bold mb-3">{value}</div>
      <div className="text-xl">
        <I18N id={label} />
      </div>
      {footer ? <div className="text-sm">{footer}</div> : null}
    </div>
  );
};

export default Pill;
