import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import { useRouter } from "next/router";
import { useApi, MathTradeService, LocationService } from "api_serv";
import { getUniqueId, formatUserWantGroup } from "utils";
import ItemListView from "views/mathtrade/list/items";

const MT_ItemListContainer = () => {
  const router = useRouter();

  const [filters, setFilters] = useState({
    pathname: "",
    query: {},
  });
  const [isFetched, setIsFetched] = useState(false);

  const [fetchLocations, dataLocations, loadingLocations] = useApi({
    promise: LocationService.getList,
    initialState: [],
  });

  const [listItems, list, loading, errors] = useApi({
    promise: MathTradeService.listItems,
    startLoading: true,
  });

  const [getMyWants, myWantsList, loadingMyWants, errorsMyWants] = useApi({
    promise: MathTradeService.getWants,
    initialState: [],
    format: (mw) => {
      return mw.map(formatUserWantGroup);
    },
  });

  // TAGS
  const [getTags, tagList, loadingTags, errorsTags] = useApi({
    promise: MathTradeService.getTags,
    initialState: [],
    format: (tags) => {
      return tags.sort((a, b) => {
        return a.id < b.id ? -1 : 1;
      });
    },
  });

  const [putTag, , loadingPutTag, errorsPutTag] = useApi({
    promise: MathTradeService.putTag,
    afterLoad: () => {
      getMyWants();
      getTags();
      listItems({
        query: filters.query,
      });
    },
  });

  // TAGS

  useEffect(() => {
    //
    let timer = setTimeout(() => {
      if (!isFetched) {
        const { pathname, query } = router;
        setIsFetched(true);
        setFilters({ pathname, query, d: getUniqueId() });
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [router, isFetched]);

  useEffect(() => {
    if (filters.d) {
      listItems({
        query: filters.query,
      });
    }
  }, [filters]);

  useEffect(() => {
    fetchLocations();
    getMyWants();
    getTags();
  }, []);

  return (
    <PrivateEnv>
      <ItemListView
        list={list}
        wantList={myWantsList}
        tagList={tagList}
        filters={filters}
        locations={dataLocations}
        setFilters={(filterInput) => {
          const newFilters = {
            ...filters,
            query: {
              ...filters.query,
              ...filterInput,
            },
            d: getUniqueId(),
          };
          for (let a in newFilters.query) {
            if (typeof newFilters.query[a] === "undefined") {
              delete newFilters.query[a];
            }
          }
          setFilters(newFilters);
          router.push({
            path: newFilters.path,
            query: newFilters.query,
          });
        }}
        loading={
          loading ||
          loadingMyWants ||
          loadingLocations ||
          loadingTags ||
          loadingPutTag
        }
        errors={errors || errorsMyWants || errorsTags || errorsPutTag}
        dragToGroup={(tag, item) => {
          const newTag = { ...tag };
          delete newTag.id;
          newTag.items.push(item.id);

          putTag({
            id: tag.id,
            data: newTag,
          });
        }}
        afterAnyChange={() => {
          getMyWants();
          getTags();
          listItems({
            query: filters.query,
          });
        }}
      />
    </PrivateEnv>
  );
};
export default MT_ItemListContainer;
