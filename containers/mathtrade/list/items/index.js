import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import storage from "utils/storage";
import { useRouter } from "next/router";
import { useApi, MathTradeService, LocationService } from "api_serv";
import useCanEdit from "hooks/useCanEdit";
import { getUniqueId, formatUserWantGroup } from "utils";
import { page_size } from "config";
import ItemListView from "views/mathtrade/list/items";

const MT_ItemListContainer = () => {
  const canEditList = useCanEdit("list");
  const canEditWants = useCanEdit("wants");

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

        const storeOptions = storage.getOptions();

        let queryUser = { ...query, page_size: page_size.items };

        if (storeOptions?.hideOwnUser) {
          const storeData = storage.get();
          queryUser = {
            ...query,
            user: `-${storeData?.user?.data?.id}`,
            page_size: page_size.items,
          };
        }

        setFilters({ pathname, query: queryUser, d: getUniqueId() });
      }
    }, 800);

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
        canEditList={canEditList}
        canEditWants={canEditWants}
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
