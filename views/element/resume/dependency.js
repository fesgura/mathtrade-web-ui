import classNames from "classnames";
import { useState, useEffect } from "react";
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
} from "reactstrap";
import { dependencyToData } from "../utils";

const Dependency = ({ element }) => {
  const [dataDependency, setDataDependency] = useState({
    most: "Sin datos",
    list: [],
  });

  useEffect(() => {
    setDataDependency(
      dependencyToData({
        value: element.dependency,
        votes: element.dependency_votes,
      })
    );
  }, [element]);

  return (
    <div className="element-dependency">
      <UncontrolledButtonDropdown size="sm">
        <DropdownToggle
          caret={dataDependency.list.length > 0}
          className={classNames("element-dependency-btn", {
            enabled: dataDependency.list.length > 0,
          })}
          tag="div"
          title="Votos en la BGG"
        >
          {dataDependency.most}{" "}
        </DropdownToggle>
        {dataDependency.list.length ? (
          <DropdownMenu>
            {dataDependency.list.map((dep, k) => {
              return (
                <DropdownItem text key={k}>
                  <div className="element-dependency_list-item">
                    <Row className="align-items-center">
                      <Col>{dep.text}</Col>
                      <Col xs="auto">
                        <b>{`(${dep.value} voto${
                          dep.value === 1 ? "" : "s"
                        })`}</b>
                      </Col>
                    </Row>
                  </div>
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        ) : null}
      </UncontrolledButtonDropdown>
    </div>
  );
};
export default Dependency;
