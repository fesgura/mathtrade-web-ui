import { useState } from "react";
import PrivateEnv from "environments/private";

import PhotoGallery from "components/photoGallery";
import { Card, CardBody } from "reactstrap";

const TempPage = () => {
  const [list, setList] = useState([]);

  return (
    <PrivateEnv>
      <div className="container">
        <h1>Temp</h1>
        <Card>
          <CardBody>
            <PhotoGallery
              list={list}
              editable
              limit={4}
              onDelete={(index) => {
                setList((a) => {
                  const b = [...a];
                  b.splice(index, 1);
                  return b;
                });
              }}
              onAdd={(srcOut) => {
                setList((a) => {
                  const b = [...a];
                  b.push(srcOut);
                  return b;
                });
              }}
            />
          </CardBody>
        </Card>
      </div>
    </PrivateEnv>
  );
};

export default TempPage;
