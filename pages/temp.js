import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import { useApi, BggService } from "api_serv";
import { Button, Card, CardBody, Container } from "reactstrap";
import { Input } from "components/form";
import BGGsearch from "components/bgg-search";
import { getVersionNameFromId, processBGGdata } from "utils";
import ElementDropVersions from "components/elementDropVersions";

const TempPage = () => {
  const [bgg_id, set_bgg_id] = useState("");
  const [name, set_name] = useState("");
  const [versionList, set_versionList] = useState([]);
  const [bgg_version_id, set_bgg_version_id] = useState("");
  const [sizeData, set_sizeData] = useState(null);

  // BGG ELEMENT
  const [fetchBGGelement, BGGelement, loadingBGGelement, errorMessage] = useApi(
    {
      promise: BggService.getElement,
      forBGG: true,
      format: (data) => {
        if (data && data.items && data.items.item) {
          return data.items.item;
        } else {
          return null;
        }
      },
      afterLoad: (d) => {
        
        set_versionList(processBGGdata(d).versionList);
      },
    }
  );

  useEffect(() => {
    if (bgg_id !== "") {
      fetchBGGelement({ id: bgg_id, versions: 1, stats: 1 });
    }
  }, [bgg_id]);

  return (
    <PrivateEnv>
      <Container className="py-5">
        <Card>
          <CardBody className="p-5">
            <BGGsearch
              onResult={(a) => {
                set_bgg_id(a.bgg_id);
                set_name(a.name);
              }}
            />
            <h3>{name}</h3>
            <Input
              data={getVersionNameFromId(bgg_version_id, versionList)}
              type="input-drop"
              label="element.Edition"
              name="version_name"
              nowrite
              icon={"book"}
              autoComplete="off"
              loading={loadingBGGelement}
              drop={
                !loadingBGGelement ? (
                  <ElementDropVersions
                    versionList={versionList}
                    onChange={(v) => {
                      set_bgg_version_id(v.versionData.bgg_version_id);

                      set_sizeData(v.sizeData);
                    }}
                  />
                ) : null
              }
            />
            {/* <Input value={bgg_id} onChange={set_bgg_id} />
            <Button
              onClick={() => {
                if (bgg_id)
                  fetchBGGelement({ id: bgg_id, versions: 1, stats: 1 });
              }}
            >
              Buscar
            </Button> */}
            <h5>Tamaño:</h5>
            {sizeData ? (
              <>
                <p>
                  <b>{`${(sizeData.width * 2.54).toFixed(1)} x ${(
                    sizeData.length * 2.54
                  ).toFixed(1)} x ${(sizeData.depth * 2.54).toFixed(1)} cm`}</b>
                </p>
                {sizeData.weight ? (
                  <>
                    <h5>Peso</h5>
                    <p>
                      <b>{`${(sizeData.weight * 0.453592).toFixed(1)} kg`}</b>
                    </p>
                  </>
                ) : null}
              </>
            ) : null}
          </CardBody>
        </Card>
      </Container>
    </PrivateEnv>
  );
};

export default TempPage;
