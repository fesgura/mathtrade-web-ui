import { useState, useEffect, useCallback, useRef } from "react";
import { useApi, MathTradeService } from "api_serv";
import storage from "utils/storage";
import PrivateEnv from "environments/private";
import MyWantsView from "views/mathtrade/myWants";
import useCanEdit from "hooks/useCanEdit";
import { getUniqueId } from "utils";
import { useLeavePageConfirmation } from "hooks/useLeavePageConfirmation";
import { getI18Ntext } from "i18n";
import { filterEmptyWants } from "./utils";

const customizedDialog = async (msg) => {
  const confirmationValue = window.confirm(msg);
  return confirmationValue;
};

const MyWants = () => {
  const changes = useRef([]);

  const canEditWants = useCanEdit("wants");
  const canEditList = useCanEdit("list");

  const [mustCommitChanges, set_mustCommitChanges] = useState(false);
  const [firstLoadedWants, set_firstLoadedWants] = useState(false);
  const [firstLoadedMyItems, set_firstLoadedMyItems] = useState(false);

  const [wantList, set_wantList] = useState({ list: [], version: 0 });
  const [myItemList, set_myItemList] = useState({ list: [], version: 0 });

  const changeMustCommitChanges = useCallback(
    (status) => {
      if (canEditList) {
        set_mustCommitChanges(false);
      } else {
        set_mustCommitChanges(status);
      }
    },
    [canEditList]
  );

  const [getWants, , loadingWantList, errorsWantList] = useApi({
    promise: MathTradeService.getWants,
    // initialState: [],
    afterLoad: (newWantList) => {
      set_wantList({
        list: filterEmptyWants(newWantList),
        version: getUniqueId(),
      });
      set_firstLoadedWants(true);
      const storeData = storage.get();
      getUser({ userId: storeData?.user?.data?.id });
    },
  });
  const [getMyItems, , loadingMyItems, errorsMyItems] = useApi({
    promise: MathTradeService.listMyItems,
    // initialState: [],
    afterLoad: (list) => {
      set_myItemList({ list, version: getUniqueId() });
      set_firstLoadedMyItems(true);
    },
  });

  const addChange = useCallback(
    (newChange) => {
      const currentChanges = [...changes.current];

      const newChanges = [];

      let isInCurrentChanges = false;

      currentChanges.forEach((change) => {
        if (change.id === newChange.id) {
          newChanges.push({
            ...change,
            ...newChange,
          });
          isInCurrentChanges = true;
        } else {
          newChanges.push(change);
        }
      });
      if (!isInCurrentChanges) {
        newChanges.push(newChange);
      }

      changes.current = newChanges;

      changeMustCommitChanges(true);
    },
    [changes]
  );

  const putWant = useCallback(
    (newChange) => {
      addChange(newChange);
    },
    [changes]
  );
  const deleteWant = useCallback(
    (newChange) => {
      newChange.obj.delete = true;

      addChange(newChange);
    },
    [changes]
  );

  const [commitChangesToApi, , commitChangesLoading, commitChangesErrors] =
    useApi({
      promise: MathTradeService.commitChanges,
      afterLoad: () => {
        changeMustCommitChanges(false);
        getWants();
      },
    });

  const [putWantBatch, , putBatchLoading, putBatchErrors] = useApi({
    promise: MathTradeService.postWantBatch,
    afterLoad: () => {
      commitChangesToApi();
    },
  });

  const [getUser, , loadingGetUser, errorsGetUser] = useApi({
    promise: MathTradeService.getMathTradeUser,
    // initialState: [],
    afterLoad: (data) => {
      if (typeof data.commitment !== "undefined") {
        changeMustCommitChanges(!data.commitment);
      }
    },
  });

  useEffect(() => {
    getMyItems();
    getWants();
  }, []);

  useLeavePageConfirmation(
    mustCommitChanges,
    getI18Ntext("MyWants.NotCommitChangesBeforeLeavePage"),
    customizedDialog
  );

  const commitChanges = () => {
    if (changes.current.length) {
      const want_groups = changes.current.map((ch) => {
        return ch.obj;
      });
      putWantBatch({
        data: { want_groups },
      });
    } else {
      commitChangesToApi();
    }
  };

  return (
    <PrivateEnv>
      <MyWantsView
        canEditWants={canEditWants}
        wantList={wantList}
        myItemList={myItemList}
        putWant={putWant}
        deleteWant={deleteWant}
        commitChanges={commitChanges}
        commitChangesLoading={putBatchLoading || commitChangesLoading}
        mustCommitChanges={
          mustCommitChanges && !putBatchLoading && !commitChangesLoading
        }
        set_mustCommitChanges={changeMustCommitChanges}
        firstLoaded={firstLoadedWants && firstLoadedMyItems}
        loading={
          loadingWantList ||
          loadingMyItems ||
          loadingGetUser ||
          putBatchLoading ||
          commitChangesLoading
        }
        reloadMyItems={() => {
          getMyItems();
        }}
        reloadWants={() => {
          getWants();
        }}
        errors={
          errorsWantList ||
          errorsMyItems ||
          errorsGetUser ||
          putBatchErrors ||
          commitChangesErrors
        }
      />
    </PrivateEnv>
  );
};

export default MyWants;
