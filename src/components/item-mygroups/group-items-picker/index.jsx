import clsx from "clsx";
import Modal from "@/components/modal";
import Button from "@/components/button";
import ErrorAlert from "@/components/errorAlert";
import HelpContext from "@/components/help-context";
import { LoadingBox } from "@/components/loading";
import I18N, { getI18Ntext } from "@/i18n";
import { colorTagStyles } from "@/utils/color";
import useGroupItemsPicker from "./useGroupItemsPicker";

const PickerItem = ({ item, checked, otherGroup, onToggle }) => {
  const thumbnail = item.elements?.[0]?.element?.thumbnail;
  const disabled = !item.ready;
  return (
    <label
      className={clsx(
        "flex items-center gap-3 py-2 px-2 border-b border-gray-200",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-50"
      )}
    >
      <input
        type="checkbox"
        className="w-5 h-5 shrink-0"
        checked={checked}
        disabled={disabled}
        onChange={() => onToggle(item.id)}
      />
      {thumbnail ? (
        // Plain <img>: next/image would route small BGG thumbnails through
        // Vercel's paid image optimization.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={thumbnail} alt="" className="w-10 h-10 object-cover rounded shrink-0" />
      ) : (
        <div className="w-10 h-10 rounded bg-gray-200 shrink-0" />
      )}
      <div className="min-w-0">
        <p className="text-sm font-bold truncate">{item.title}</p>
        {disabled ? (
          <p className="text-xs text-gray-600">
            <I18N id="myGroups.picker.notReady" />
          </p>
        ) : otherGroup ? (
          <p className="text-xs flex items-center gap-1 flex-wrap">
            <span
              className="uppercase font-bold text-[10px] px-2 rounded"
              style={colorTagStyles(otherGroup.color)}
            >
              {otherGroup.name}
            </span>
            {checked ? (
              <span className="text-orange-700">
                <I18N id="myGroups.picker.willMove" />
              </span>
            ) : null}
          </p>
        ) : null}
      </div>
    </label>
  );
};

const GroupItemsPicker = ({ group, isOpen, onClose }) => {
  const {
    items,
    keyword,
    setKeyword,
    selected,
    toggle,
    otherGroupByItem,
    save,
    saving,
    error,
    changed,
  } = useGroupItemsPicker({ group, onClose });

  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose}>
      <div className="relative">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="text-xl font-bold">
            <I18N id="myGroups.picker.title" values={[group.name]} />
          </h3>
          <HelpContext id="groupPicker" />
        </div>
        <input
          autoComplete="off"
          type="search"
          className="w-full border border-stroke rounded-md p-2 text-sm mb-2"
          placeholder={getI18Ntext("myGroups.picker.search")}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="max-h-[55vh] overflow-y-auto border-t border-gray-200 mb-3">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500 py-4 text-center">
              <I18N id="myGroups.picker.empty" />
            </p>
          ) : (
            items.map((item) => (
              <PickerItem
                key={item.id}
                item={item}
                checked={selected.has(item.id)}
                otherGroup={otherGroupByItem[item.id]}
                onToggle={toggle}
              />
            ))
          )}
        </div>
        <ErrorAlert error={error} />
        <div className="flex items-center justify-end gap-2">
          <Button type="button" color="cancel" outline onClick={onClose}>
            <I18N id="btn.Cancel" />
          </Button>
          <Button type="button" disabled={!changed || saving} onClick={save}>
            <I18N id="myGroups.picker.save" values={[selected.size]} />
          </Button>
        </div>
        <LoadingBox loading={saving} transparent />
      </div>
    </Modal>
  );
};

export default GroupItemsPicker;
