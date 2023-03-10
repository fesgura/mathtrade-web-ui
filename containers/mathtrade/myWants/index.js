import { useState, useEffect } from "react";
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
  const canEditWants = useCanEdit("wants");

  const [mustCommitChanges, set_mustCommitChanges] = useState(false);
  const [firstLoadedWants, set_firstLoadedWants] = useState(false);
  const [firstLoadedMyItems, set_firstLoadedMyItems] = useState(false);

  const [wantList, set_wantList] = useState({ list: [], version: 0 });
  const [myItemList, set_myItemList] = useState({ list: [], version: 0 });

  const [getWants, , loadingWantList, errorsWantList] = useApi({
    promise: MathTradeService.getWants,
    // initialState: [],
    afterLoad: (newWantList) => {
      set_wantList({
        list: filterEmptyWants(newWantList),
        version: getUniqueId(),
      });
      set_firstLoadedWants(true);
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
  const [putWant, , putLoading, putErrors] = useApi({
    promise: MathTradeService.putWant,
    afterLoad: () => {
      set_mustCommitChanges(true);
      getWants();
    },
  });

  const [putWantBatch, , putBatchLoading, putBatchErrors] = useApi({
    promise: MathTradeService.postWantBatch,
    afterLoad: () => {
      set_mustCommitChanges(true);
      getWants();
    },
  });

  const [commitChanges, , commitChangesLoading, commitChangesErrors] = useApi({
    promise: MathTradeService.commitChanges,
    afterLoad: (data) => {
      set_mustCommitChanges(false);
    },
  });

  const [deleteWant, , deleteLoading, deleteErrors] = useApi({
    promise: MathTradeService.deleteWant,
    afterLoad: () => {
      set_mustCommitChanges(true);
      getWants();
    },
  });
  const [getUser, , loadingGetUser, errorsGetUser] = useApi({
    promise: MathTradeService.getMathTradeUser,
    // initialState: [],
    afterLoad: (data) => {
      if (typeof data.commitment !== "undefined") {
        set_mustCommitChanges(!data.commitment);
      }
    },
  });

  useEffect(() => {
    getMyItems();
    getWants();

    const storeData = storage.get();
    getUser({ userId: storeData?.user?.data?.id });
  }, []);

  useLeavePageConfirmation(
    mustCommitChanges,
    getI18Ntext("MyWants.NotCommitChangesBeforeLeavePage"),
    customizedDialog
  );

  return (
    <PrivateEnv>
      <MyWantsView
        canEditWants={canEditWants}
        wantList={wantList}
        myItemList={myItemList}
        putWant={putWant}
        putWantBatch={putWantBatch}
        deleteWant={deleteWant}
        commitChanges={commitChanges}
        commitChangesLoading={commitChangesLoading}
        mustCommitChanges={mustCommitChanges}
        set_mustCommitChanges={set_mustCommitChanges}
        firstLoaded={firstLoadedWants && firstLoadedMyItems}
        loading={
          loadingWantList ||
          loadingMyItems ||
          loadingGetUser ||
          putLoading ||
          putBatchLoading ||
          deleteLoading
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
          putErrors ||
          putBatchErrors ||
          commitChangesErrors ||
          deleteErrors
        }
      />
    </PrivateEnv>
  );
};

export default MyWants;
