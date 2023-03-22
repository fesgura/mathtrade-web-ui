import { useState } from "react";
import PrivateLayout from "layouts/private";
import PageHeaderTabs from "components/pageHeaderTabs";
import { Alert, Button } from "reactstrap";
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
  set_mustCommitChanges,
  mustCommitChanges,
  firstLoaded,
  loading,
  reloadMyItems,
  reloadWants,
  errors,
  canEditWants,
}) => {
  const [current, setCurrent] = useState(1);

  let content = null;
  switch (current) {
    case 0:
      content = (
        <div className="main-container text-center py-5">
          Estamos trabajando en la optimización de esta vista. pronto podrás
          volver a ella. Mientras tanto, podés usar la vista de grilla.
          <br />
          <br />
          ¡Gracias por la paciencia y la buena onda! :-)
        </div>
        // <QuadsView
        //   myItemList={myItemList}
        //   wantList={wantList}
        //   putWant={putWant}
        //   putWantBatch={putWantBatch}
        //   commitChanges={commitChanges}
        //   commitChangesLoading={commitChangesLoading}
        //   mustCommitChanges={mustCommitChanges}
        //   set_mustCommitChanges={set_mustCommitChanges}
        //   reloadWants={reloadWants}
        //   loading={loading}
        //   canEditWants={canEditWants}
        // />
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
          canEditWants={canEditWants}
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
