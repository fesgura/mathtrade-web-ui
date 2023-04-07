import { useState, useEffect } from "react";
import PrivateLayout from "layouts/private";
import PageHeaderTabs from "components/pageHeaderTabs";
import { Alert, Button } from "reactstrap";
import Grid from "./grid";
import QuadsView from "./quads";
import I18N from "i18n";
import storage from "utils/storage";

const MyWantsView = ({
  wantList,
  myItemList,
  putWant,
  putWantBatch,
  deleteWant,
  lastCommitDate,
  commitChanges,
  commitChangesLoading,
  set_mustCommitChanges,
  mustCommitChanges,
  firstLoaded,
  loading,
  reloadMyItems,
  reloadWants,
  errors,
  canEditWants,
  canEditList,
}) => {
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    const MyWantsViewType = storage.getOption("MyWantsViewType");

    const newCurrent = MyWantsViewType || 0;

    setCurrent(newCurrent);
  }, []);

  let content = null;
  switch (current) {
    case 0:
      content = (
        <QuadsView
          myItemList={myItemList}
          wantList={wantList}
          putWant={putWant}
          putWantBatch={putWantBatch}
          lastCommitDate={lastCommitDate}
          commitChanges={commitChanges}
          commitChangesLoading={commitChangesLoading}
          mustCommitChanges={mustCommitChanges}
          set_mustCommitChanges={set_mustCommitChanges}
          reloadWants={reloadWants}
          loading={loading}
          canEditWants={canEditWants}
          canEditList={canEditList}
        />
      );
      break;
    case 1:
      content = (
        <Grid
          myItemList={myItemList}
          wantList={wantList}
          putWant={putWant}
          putWantBatch={putWantBatch}
          deleteWant={deleteWant}
          lastCommitDate={lastCommitDate}
          commitChanges={commitChanges}
          commitChangesLoading={commitChangesLoading}
          mustCommitChanges={mustCommitChanges}
          reloadMyItems={reloadMyItems}
          reloadWants={reloadWants}
          loading={loading}
          canEditWants={canEditWants}
          canEditList={canEditList}
          set_mustCommitChanges={set_mustCommitChanges}
        />
      );
      break;
    default:
    //
  }

  return (
    <PrivateLayout
      loading={!firstLoaded ? loading : false}
      doctitle="title.MyWants"
      noMainContainer
      withLoadingPad
      loadingPad={firstLoaded ? loading : false}
    >
      <div className="main-container">
        <PageHeaderTabs
          className="mt-4"
          leftSide={
            <h1 className="pb-3 pe-5">
              <I18N id="title.MyWants" />
            </h1>
          }
          onChange={(c) => {
            storage.setToOptions({
              MyWantsViewType: c,
            });
            setCurrent(c);
            reloadWants();
          }}
          tabs={[
            {
              text: "MyWants.tabTitle1",
              current: current === 0,
            },
            {
              text: "MyWants.tabTitle2",
              current: current === 1,
            },
          ]}
        />
      </div>
      {canEditWants ? null : (
        <div className="main-container">
          <Alert color="info" className="text-center">
            <I18N id="cantEditWants" />
          </Alert>
        </div>
      )}

      {content}
    </PrivateLayout>
  );
};

export default MyWantsView;
