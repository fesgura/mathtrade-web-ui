import { useState, useEffect } from "react";
import PrivateLayout from "layouts/private";
import PageHeaderTabs from "components/pageHeaderTabs";
import { Button, Alert, Row, Col } from "reactstrap";
import { wantsFromAPItoWantList, myItemListFromAPItoMyItemList } from "utils";
import Grid from "./grid";

const MyWantsView = ({
  wantListFromAPI,
  myItemListFromAPI,
  loading,
  afterAnyChange,
  errors,
}) => {
  const [current, setCurrent] = useState(2);

  const [myItemList, setMyItemList] = useState([]);
  const [wantList, setWantList] = useState([]);

  useEffect(() => {
    if (myItemListFromAPI && myItemListFromAPI.length) {
      const newMyItemList = myItemListFromAPItoMyItemList(myItemListFromAPI);
      setMyItemList(newMyItemList);
    }
  }, [myItemListFromAPI]);

  useEffect(() => {
    if (wantListFromAPI && wantListFromAPI.length) {
      const newWantList = wantsFromAPItoWantList(wantListFromAPI);
      setWantList(newWantList);
    }
  }, [wantListFromAPI]);

  let content = null;
  switch (current) {
    case 0:
      content = <>Opt 1</>;
      break;
    case 1:
      content = <>Opt 2</>;
      break;
    case 2:
      content = <Grid myItemList={myItemList} wantList={wantList} />;
      break;
    default:
    //
  }

  return (
    <PrivateLayout loading={loading}>
      <PageHeaderTabs
        className="mt-4"
        leftSide={<h1 className="pb-3 pe-5">Mis wants</h1>}
        onChange={setCurrent}
        tabs={[
          {
            text: "Opt 1",
            current: current === 0,
          },
          {
            text: "Opt 2",
            current: current === 1,
          },
          {
            text: "Grilla",
            current: current === 2,
          },
        ]}
      />
      {content}
      <div className="text-center py-5">
        <Button color="link" className="me-2" outline onClick={afterAnyChange}>
          Cancelar
        </Button>
        <Button color="primary" type="submit" onClick={(e) => {}}>
          Guardar cambios
        </Button>
      </div>
    </PrivateLayout>
  );
};

export default MyWantsView;
