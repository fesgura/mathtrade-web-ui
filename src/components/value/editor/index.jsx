import { Label, Range } from "@/components/form";
import I18N from "@/i18n";
import useValueEditor from "./useValueEditor";
import clsx from "clsx";
import ErrorAlert from "@/components/errorAlert";
import HelpContext from "@/components/help-context";

const ValueEditor = ({
  value,
  setValue,
  onClose,
  itemListId,
  onChangeValue,
  type,
}) => {
  const { onChange, onClick, loading, error } = useValueEditor(
    // type,
    value,
    setValue,
    onClose,
    itemListId,
    onChangeValue,
    type
  );
  return (
    <div className="w-64 text-black">
      <div
        className={clsx({
          "opacity-30": loading,
        })}
      >
        <div className="p-2">
          <div className="flex items-center gap-2 mb-1">
            <Label text="filter.Value" name="value" size="sm" />
            <HelpContext id="whatIsThis.value.item" />
          </div>
          <Range
            name="value"
            initialValue={value}
            step={0.1}
            onChange={onChange}
          />
        </div>
        <div className="p-2 border-t">
          <div className="flex items-center justify-center gap-2 text-sm">
            <button
              className="border border-gray-300 hover:opacity-70 rounded-full px-3 py-1"
              onClick={onClose}
              disabled={loading}
            >
              <I18N id="btn.Cancel" />
            </button>
            <button
              className="bg-primary hover:opacity-70 text-white rounded-full px-3 py-1"
              disabled={loading}
              onClick={onClick}
            >
              <I18N id="btn.Valuation.Value" />
            </button>
          </div>

          <ErrorAlert error={error} className="mt-2 mb-0" />
        </div>
      </div>
    </div>
  );
};

export default ValueEditor;
