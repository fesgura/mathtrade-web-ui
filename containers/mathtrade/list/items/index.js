import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import storage from "utils/storage";
import { useRouter } from "next/router";
import { useApi, MathTradeService, LocationService } from "api_serv";
import useCanEdit from "hooks/useCanEdit";
import { getUniqueId } from "utils";
import { page_size } from "config";
import ItemListView from "views/mathtrade/list/items";

const MT_ItemListContainer = () => {
  const canEditList = useCanEdit("list");
  const canEditWants = useCanEdit("wants");

  const router = useRouter();

  const [list, setList] = useState(null);

  const [filters, setFilters] = useState({
    pathname: "",
    query: {},
  });
  const [isFetched, setIsFetched] = useState(false);

  const [fetchLocations, dataLocations, loadingLocations] = useApi({
    promise: LocationService.getList,
    initialState: [],
  });

  const [getUsers, users, loadingUsers] = useApi({
    promise: MathTradeService.getMathTradeUsers,
    initialState: [],
  });

  const [listItems, , loading, errors] = useApi({
    promise: MathTradeService.listItems,
    startLoading: true,
    afterLoad: setList,
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

        let queryUser = {
          ...query,
          page_size: page_size.items,
        };

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
    if (errors) {
      const { pathname, query } = router;
      if (query?.page !== 1) {
        // let newQuery = { ...query, page: 1 };
        delete query.page;
        setFilters({ pathname, query, d: getUniqueId() });
        router.push({
          query,
        });
      }
    }
  }, [errors, router]);

  useEffect(() => {
    if (filters.d) {
      listItems({
        query: filters.query,
      });
    }
  }, [filters]);

  useEffect(() => {
    //
    storage.setToOptions({
      listPageType: "itemList",
    });
    //
    getUsers();
    fetchLocations();
    getTags();
  }, []);

  return (
    <PrivateEnv>
      <ItemListView
        canEditList={canEditList}
        canEditWants={canEditWants}
        list={list}
        tagList={tagList}
        filters={filters}
        locations={dataLocations}
        users={users}
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

          storage.setToOptions({
            itemListFilters: newFilters.query,
          });

          router.push({
            pathname: newFilters.pathname,
            query: newFilters.query,
          });
        }}
        loading={
          loading ||
          loadingLocations ||
          loadingTags ||
          loadingPutTag ||
          loadingUsers
        }
        errors={errors || errorsTags || errorsPutTag}
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
