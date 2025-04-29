import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useFetchBGG from "@/hooks/useFetchBGG";
import { useStore } from "@/store";

const useSearchCollectionBGG = ({ setSearchResultBGG }) => {
  const { user } = useStore((state) => state.data);

  const inputRef = useRef(null);

  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const [listComplete, setListComplete] = useState([]);

  const [waitingBGG, setWaitingBGG] = useState(false);

  const afterLoad = useCallback((data) => {
    let dataList = [];
    if (data && data.items && data.items.item) {
      dataList =
        typeof data.items.item.forEach !== "undefined"
          ? data.items.item
          : [data.items.item];
    } else {
      setWaitingBGG(true);
      return null;
    }

    const newList = dataList.map((item) => {
      const name = `${item?.name["#text"] || ""} (${
        item?.yearpublished || ""
      })`;
      return {
        bgg_id: item?.objectid || "",
        name,
        bgg_version_id:
          item.version && item.version.item
            ? item.version.item?.id || null
            : null,
      };
    });
    inputRef.current.focus();
    setIsFocus(true);
    setListComplete(newList);
  }, []);

  const [getBGGcollection, , loading] = useFetchBGG({
    endpoint: "COLLECTION",
    afterLoad,
  });

  //////////////////

  useEffect(() => {
    inputRef.current.focus();
    setSearchResultBGG(null);
    getBGGcollection({
      username: user?.bgg_user || "",
      own: 1,
      version: 1,
    });
  }, [setSearchResultBGG, getBGGcollection, user]);

  const forceGetBGGcollection = useCallback(() => {
    setWaitingBGG(false);
    inputRef.current.focus();
    setSearchResultBGG(null);
    getBGGcollection({
      username: user?.bgg_user || "",
      own: 1,
      version: 1,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSearchResultBGG, user]);

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
      const { bgg_id, name, bgg_version_id } = elem;
      setSearchResultBGG({ bgg_id, name, bgg_version_id });
      setValue(name);
    },
    [setSearchResultBGG]
  );

  const onClear = useCallback(() => {
    inputRef.current.focus();
    setSearchResultBGG(null);
    setIsFocus(true);
    setValue("");
  }, [setSearchResultBGG]);

  const list = useMemo(() => {
    const valueLower = value.toLowerCase();

    return listComplete.filter((elem) => {
      return elem.name.toLowerCase().indexOf(valueLower) >= 0;
    });
  }, [listComplete, value]);

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
    waitingBGG,
    forceGetBGGcollection,
  };
};

export default useSearchCollectionBGG;
