import I18N, { getI18Ntext } from "@/i18n";
import useTagEditor from "./useTagEditor";
import Icon from "@/components/icon";
import clsx from "clsx";
import ErrorAlert from "@/components/errorAlert";

const ItemTagEditor = ({ tag, className, onClose }) => {
  const {
    inputRef,
    name,
    setName,
    color,
    setColor,
    loading,
    error,
    onCancel,
    onSubmit,
    onDelete,
  } = useTagEditor(tag, onClose);

  return (
    <div
      className={clsx(
        "relative shadow-[0_0_0_1px_rgba(0,0,0,0.15)] transition-opacity p-2 bg-white text-gray-900",
        {
          "opacity-40": loading,
        },
        className
      )}
    >
      <h3 className="text-xs font-bold text-gray-500 border-b border-gray-300 border-dotted mb-3">
        <I18N id={`itemList.Tags.${tag ? "EditTag" : "NewTag"}`} />
      </h3>
      <div className="flex gap-2">
        <div>
          <label htmlFor="name" className="text-xs block">
            <I18N id="myItems.sidebar.form.GroupName" />{" "}
            <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            value={name}
            placeholder={getI18Ntext("myItems.sidebar.form.GroupPlaceholder")}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="border border-gray-300 rounded-sm px-1 text-sm font-bold w-full focus:outline-none focus:border-primary"
            ref={inputRef}
          />
        </div>
        <div>
          <label htmlFor="color" className="text-xs block">
            <I18N id="myItems.sidebar.form.Color" />{" "}
            <span className="text-primary">*</span>
          </label>
          <input
            type="color"
            name="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
            className="border border-gray-300 rounded-sm focus:outline-none"
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 text-sm">
        <button
          className="border border-gray-300 hover:opacity-70 rounded-full px-3 py-1"
          onClick={onCancel}
          disabled={loading}
        >
          <I18N id="btn.Cancel" />
        </button>
        <button
          className="bg-primary hover:opacity-70 text-white rounded-full px-3 py-1"
          disabled={loading}
          onClick={onSubmit}
        >
          <I18N id="btn.Save" />
        </button>
        {tag ? (
          <button
            className="ml-9 text-xl leading-none text-red-600"
            data-tooltip={getI18Ntext("btn.Delete")}
            data-placement="left"
            disabled={loading}
            onClick={onDelete}
          >
            <Icon type="trash" />
          </button>
        ) : null}
      </div>
      <ErrorAlert error={error} className="mt-3" />
    </div>
  );
};

export default ItemTagEditor;
