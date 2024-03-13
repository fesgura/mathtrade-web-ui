import I18N, { getI18Ntext } from "@/i18n";
import useGroupEditor from "./useGroupEditor";
import { Form } from "@/components/form";
import Icon from "@/components/icon";
import clsx from "clsx";
import ErrorAlert from "@/components/errorAlert";

const GroupEditor = ({ group, onClose, selected }) => {
  const {
    color,
    setColor,
    inputRef,
    data,
    onSubmit,
    onCancel,
    onDelete,
    validations,
    loading,
    error,
  } = useGroupEditor(group, onClose);

  return (
    <div
      className={clsx(
        "relative rounded-md shadow-md mb-2 border border-gray-300 transition-opacity",
        {
          "opacity-40": loading,
        }
      )}
    >
      <div
        className="absolute top-0 left-0 h-full w-5 rounded-l-md"
        style={{ backgroundColor: color }}
      />

      <div className="relative py-2 pl-8 pr-3">
        <Form onSubmit={onSubmit} validations={validations}>
          <div className="flex gap-2 mb-3">
            <div>
              <label htmlFor="name" className="text-xs block">
                <I18N id="myItems.sidebar.form.GroupName" />{" "}
                <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder={getI18Ntext(
                  "myItems.sidebar.form.GroupPlaceholder"
                )}
                defaultValue={data.name}
                className="border border-gray-300 rounded-sm px-1 uppercase text-sm font-bold w-full focus:outline-none focus:border-primary"
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
            >
              <I18N id="btn.Save" />
            </button>
            {group && !selected ? (
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
        </Form>
      </div>
    </div>
  );
};

export default GroupEditor;
