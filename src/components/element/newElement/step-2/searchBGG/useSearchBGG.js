import { useCallback, useEffect, useRef, useState } from "react";
import useFetchBGG from "@/hooks/useFetchBGG";

const formatTextComp = (text, textLower, valueLower) => {
  const ind = textLower.indexOf(valueLower);
  const length = valueLower.length;

  const a = text.substring(0, ind);
  const b = text.substring(ind, ind + length);
  const c = text.substring(ind + length);

  return { a, b, c };
};

const useSearchBGG = ({ setSearchResultBGG }) => {
  const inputRef = useRef(null);

  const [value, setValue] = useState({ val: "", enableSearch: false });
  const [isFocus, setIsFocus] = useState(false);

  const [list, setList] = useState([]);

  const afterLoad = useCallback((data, { query }) => {
    let dataList = [];
    if (data && data.items && data.items.item) {
      dataList =
        typeof data.items.item.forEach !== "undefined"
          ? data.items.item
          : [data.items.item];
    }

    const valueLower = query.toLowerCase();

    const pool = {};
    dataList.forEach((item) => {
      const setItemInfo = () => {
        const name = `${item?.name?.value || ""} (${
          item?.yearpublished?.value || ""
        })`;
        const nameLower = name.toLowerCase();

        return {
          bgg_id: item.id,
          name,
          nameComp: formatTextComp(name, nameLower, valueLower),
          expansion: item?.type === "boardgameexpansion",
          indexPosition: nameLower.indexOf(valueLower),
        };
      };
      if (pool[item.id]) {
        if (!pool[item.id].expansion) {
          pool[item.id] = setItemInfo();
        }
      } else {
        pool[item.id] = setItemInfo();
      }
    });

    const newListA = [];
    for (let idItem in pool) {
      newListA.push(pool[idItem]);
    }

    const newList = newListA.filter(({ indexPosition }) => {
      return indexPosition >= 0;
    });

    newList.sort((a, b) => {
      return a.indexPosition === b.indexPosition
        ? a.name.length < b.name.length
          ? -1
          : 1
        : a.indexPosition < b.indexPosition
        ? -1
        : 1;
    });
    // setList(newList);
    setList(newList.slice(0, 15));
  }, []);

  const [searchBGGelements, , loading] = useFetchBGG({
    endpoint: "SEARCH",
    afterLoad,
  });

  useEffect(() => {
    let delayDebounceFn = null;
    if (value.val.length >= 2 && value.enableSearch) {
      delayDebounceFn = setTimeout(() => {
        searchBGGelements({
          type: "boardgame,boardgameexpansion",
          query: value.val,
        });
      }, 1000);
    } else {
      setList([]);
    }
    return () => clearTimeout(delayDebounceFn);
  }, [searchBGGelements, value]);

  //////////////////
  useEffect(() => {
    setSearchResultBGG(null);
    inputRef.current.focus();
  }, [setSearchResultBGG]);

  const onFocus = useCallback(() => {
    setIsFocus(true);
  }, []);
  const onBlur = useCallback(() => {
    setTimeout(() => {
      setIsFocus(false);
    }, 150);
  }, []);

  const onSelect = useCallback(
    (elem) => {
      const { bgg_id, name } = elem;
      setSearchResultBGG({ bgg_id, name });
      setValue({
        val: name,
        enableSearch: false,
      });
    },
    [setSearchResultBGG]
  );

  const onClear = useCallback(() => {
    inputRef.current.focus();
    setSearchResultBGG(null);
    setIsFocus(true);
    setValue({
      val: "",
      enableSearch: true,
    });
  }, [setSearchResultBGG]);

  return {
    loading,
    inputRef,
    value,
    setValue,
    onFocus,
    onBlur,
    visiblePad: isFocus && list.length,
    list,
    onSelect,
    onClear,
  };
};

export default useSearchBGG;
