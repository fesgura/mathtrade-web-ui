import { useState, useEffect } from "react";
import { useApi, BggElementService } from "api";
import { Input } from "components/form";
import { Badge } from "reactstrap";
import { typeOfElements } from "config";

const formatText = (text, str) => {
  const ind = text.toLowerCase().indexOf(str.toLowerCase());
  const length = str.toLowerCase().length;

  const a = text.substring(0, ind);
  const b = text.substring(ind, ind + length);
  const c = text.substring(ind + length);

  return (
    <>
      {a}
      <span>{b}</span>
      {c}
    </>
  );
};

const BGGsearch = ({ label, question, onResult = () => {} }) => {
  const [inputValue, setInputValue] = useState({
    searchElement: "",
    forSelect: false,
  });
  const [list, setList] = useState(null);

  const [searchBGGelements, , loading] = useApi({
    promise: BggElementService.search,
    forBGG: true,
    afterLoad: (data) => {
      let dataList = [];
      if (data && data.items && data.items.item) {
        dataList =
          typeof data.items.item.forEach !== "undefined"
            ? data.items.item
            : [data.items.item];
      }

      const strValue = inputValue.searchElement.toLowerCase();

      const pool = {};
      dataList.forEach((item) => {
        const setItemInfo = () => {
          const name = item?.name?.value || "";
          const year = item?.yearpublished?.value || "";
          const text = `${name} (${year})`;

          return {
            id: item.id,
            text,
            expansion: item?.type === "boardgameexpansion",
            length: text.length,
            item: item,
            indexPosition: text.toLowerCase().indexOf(strValue),
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

      const newList = [];
      for (let idItem in pool) {
        newList.push(pool[idItem]);
      }

      newList.sort((a, b) => {
        return a.indexPosition === b.indexPosition
          ? a.length < b.length
            ? -1
            : 1
          : a.indexPosition < b.indexPosition
          ? -1
          : 1;
      });
      setList(newList.slice(0, 15));
    },
  });

  // Search Effect
  useEffect(() => {
    if (inputValue.searchElement.length >= 3 && !inputValue.forSelect) {
      const delayDebounceFn = setTimeout(() => {
        searchBGGelements({
          type: "boardgame,boardgameexpansion",
          query: inputValue.searchElement,
        });
      }, 350)
      return () => clearTimeout(delayDebounceFn)
    } else {
      setList(null);
    }

  }, [inputValue]);

  return (
    <div className="drop-search">
      <Input
        data={inputValue}
        label={label}
        question={question}
        icon="search"
        type="input-drop"
        name="searchElement"
        loading={loading}
        onChange={(searchElement) => {
          setInputValue({ searchElement, forSelect: false });
        }}
        startFocus
        drop={
          list ? (
            list.length === 0 ? (
              <div className="drop-search_empty">
                No se encuentra ningún juego o expansión
              </div>
            ) : (
              <div className="drop-search_list">
                {list.map((item, k) => {
                  const { id, text, expansion } = item;
                  return (
                    <div
                      className="drop-search_list-item"
                      key={k}
                      onClick={() => {
                        setList(null);
                        setInputValue({ searchElement: text, forSelect: true });
                        onResult({
                          bgg_id: id,
                          name: text,
                          type: expansion
                            ? typeOfElements["expansion"]
                            : typeOfElements["juego"],
                        });
                      }}
                    >
                      {formatText(text, inputValue.searchElement)}{" "}
                      {expansion ? <Badge color="expansion">Exp</Badge> : null}
                    </div>
                  );
                })}
              </div>
            )
          ) : null
        }
      />
    </div>
  );
};
export default BGGsearch;
