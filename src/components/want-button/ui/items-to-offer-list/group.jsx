import Icon from "@/components/icon";
import { colorTagStyles } from "@/utils/color";
import clsx from "clsx";
import Item from "./item";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
  useCallback,
} from "react";
import { PageContext } from "@/context/page";
import { WantGroupContext } from "@/context/wantGroup";

const GroupItem = ({ group }) => {
  /* PAGE CONTEXT **********************************************/
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* WANTGROUP CONTEXT **********************************************/
  const { itemsOfferList, setItemsOfferList } = useContext(WantGroupContext);
  /* end WANTGROUP CONTEXT **********************************************/

  const inputRef = useRef(null);

  const { name, color, items } = group;

  const [isOpen, setIsOpen] = useState(false);

  const { isChecked, isIndeterminate } = useMemo(() => {
    let isChecked = items.length > 0;

    let no = 0;
    let yes = 0;

    items.forEach(({ id }) => {
      if (!itemsOfferList[id]) {
        isChecked = false;
        no++;
      } else {
        yes++;
      }
    });
    return { isChecked, isIndeterminate: no > 0 && yes > 0 };
  }, [items, itemsOfferList]);

  const ids = useMemo(() => {
    return items.map(({ id }) => {
      return id;
    });
  }, [items]);

  useEffect(() => {
    inputRef.current.indeterminate = isIndeterminate;
  }, [isIndeterminate]);

  const onChange = useCallback(
    ({ target }) => {
      setItemsOfferList((oldItemsOfferList) => {
        const oldItemsOfferListCopy = { ...oldItemsOfferList };
        items.forEach(({ id }) => {
          oldItemsOfferListCopy[id] = target.checked;
        });
        return oldItemsOfferListCopy;
      });
    },
    [items, setItemsOfferList]
  );

  return (
    <div>
      <div className="flex items-center shadow" style={colorTagStyles(color)}>
        <div className="leading-none h-3 px-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onChange}
            ref={inputRef}
            disabled={!canI.want}
            className={!canI.want ? "cursor-not-allowed" : "cursor-pointer"}
          />
        </div>
        <button
          className="flex items-center"
          onClick={() => {
            setIsOpen((v) => !v);
          }}
        >
          <div
            className={clsx(
              "text-xl leading-none rounded-full hover:bg-black/20 h-5 w-5 transition-transform",
              {
                "rotate-90": isOpen,
              }
            )}
          >
            <Icon type="arrow-right" className="relative -top-[1px]" />
          </div>
          <div className="font-bold text-sm p-2">{`${name} (${items?.length})`}</div>
        </button>
      </div>
      {isOpen ? (
        <div className="pl-8 pr-1 py-1 relative">
          <div
            className="absolute top-0 left-0 w-full h-full opacity-20"
            style={{
              backgroundColor: colorTagStyles(color).backgroundColor,
            }}
          />
          <div className="relative">
            {group.items.map((itemRaw) => {
              return (
                <Item
                  key={itemRaw.id}
                  itemRaw={itemRaw}
                  itemsOfferList={itemsOfferList}
                  setItemsOfferList={setItemsOfferList}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GroupItem;
