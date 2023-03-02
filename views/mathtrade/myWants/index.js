import { useState } from "react";
import PrivateLayout from "layouts/private";
import PageHeaderTabs from "components/pageHeaderTabs";
import { Button } from "reactstrap";
import LoadingPad from "components/loading/loadingPad";
import Grid from "./grid";
import QuadsView from "./quads";
import I18N from "i18n";

const MyWantsView = ({
  wantList,
  myItemList,
  putWant,
  putWantBatch,
  deleteWant,
  commitChanges,
  commitChangesLoading,
  mustCommitChanges,
  firstLoaded,
  loading,
  reloadMyItems,
  reloadWants,
  errors,
}) => {
  const [current, setCurrent] = useState(0);

  let content = null;
  switch (current) {
    case 0:
      content = (
        <QuadsView
          myItemList={myItemList}
          wantList={wantList}
          putWant={putWant}
          putWantBatch={putWantBatch}
          commitChanges={commitChanges}
          commitChangesLoading={commitChangesLoading}
          mustCommitChanges={mustCommitChanges}
          reloadMyItems={reloadMyItems}
          reloadWants={reloadWants}
          loading={loading}
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
          commitChanges={commitChanges}
          commitChangesLoading={commitChangesLoading}
          mustCommitChanges={mustCommitChanges}
          reloadMyItems={reloadMyItems}
          reloadWants={reloadWants}
          loading={loading}
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
    >
      <div className="main-container">
        <PageHeaderTabs
          className="mt-4"
          leftSide={
            <h1 className="pb-3 pe-5">
              <I18N id="title.MyWants" />
            </h1>
          }
          onChange={setCurrent}
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

      {content}
      {/* <div className="main-container">
        <ErrorAlert errors={errors} />
        <div className="text-center py-5">
          <Button color="link" className="me-2" outline>
            <I18N id="btn.Cancel" />
          </Button>
          <Button color="primary" type="submit" onClick={(e) => {}}>
            <I18N id="MyWants.btn.CommitChanges" />
          </Button>
        </div>
      </div> */}
      <LoadingPad loading={firstLoaded ? loading : false} />
    </PrivateLayout>
  );
};

export default MyWantsView;
