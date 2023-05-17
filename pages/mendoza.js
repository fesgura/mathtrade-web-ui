import PrivateEnv from "environments/private";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import data from "components/dataAll";
import { useEffect, useState } from "react";

const envios = [
  {
    city: "Bahía Blanca",
    cost: 5090,
    count: 11,
  },
  {
    city: "Neuquén",
    cost: 4270,
    count: 10,
  },
  {
    city: "Córdoba",
    cost: 3850,
    count: 10,
  },
  {
    city: "Rafaela",
    cost: 3010,
    count: 8,
  },
  {
    city: "Mar del Plata",
    cost: 3120,
    count: 8,
  },
  {
    city: "Paraná",
    cost: 2699,
    count: 6,
  },
  {
    city: "AMBA",
    cost: 32060,
    count: 100,
  },
];

const desc = 4248.19;

let totItems = 0;
let totalCost = 0;

envios.forEach((env) => {
  totalCost += env.cost;
  totItems += env.count;
});

const perItem = desc / totItems;

let totalNewCost = 0;

const newEnvios = envios.map((env) => {
  const { cost, count } = env;
  const newCost = cost - count * perItem;

  totalNewCost += newCost;

  return {
    ...env,
    cost: newCost,
  };
});

const City = ({ city }) => {
  const { cost, items } = city;

  if (!cost) {
    return <td>(nada)</td>;
  }

  return (
    <td>
      <div>
        <b>{`${items.length} items - $${cost.toFixed(2)}`}</b>
      </div>
      <ul style={{ margin: 0 }}>
        {items.map((itm) => {
          const { id, title } = itm;
          return (
            <li style={{ fontSize: 10 }} key={id}>
              {title}
            </li>
          );
        })}
      </ul>
    </td>
  );
};

const User = ({ d }) => {
  const [cityList, set_cityList] = useState([]);
  const [total, set_total] = useState(0);

  useEffect(() => {
    const { cities } = d;

    const list = [];
    let newTotal = 0;

    newEnvios.forEach((envio, id) => {
      const items = cities[envio.city] || null;

      if (!items) {
        list.push({ id, cost: 0, items });
      } else {
        const cost = (envio.cost / envio.count) * items.length;

        newTotal += cost;

        list.push({ id, cost, items });
      }
    });
    set_cityList(list);
    set_total(newTotal);
  }, [d]);

  return (
    <tr>
      <td>{d.user}</td>
      {cityList.map((city) => {
        return <City key={city.id} city={city} />;
      })}
      <td>
        <b style={{ fontSize: 18 }}>{`$${total.toFixed(2)}`}</b>
      </td>
    </tr>
  );
};

const TempPage = () => {
  return (
    <PrivateEnv>
      <div className="p-5">
        <Card>
          <CardBody>
            <p>
              <b>Cantidad de items:</b> {totItems}
            </p>
            <p>
              <b>Total $:</b> {totalNewCost.toFixed(2)}
            </p>
            <table className="result-table for-users">
              <thead>
                <tr>
                  <th>Usuario</th>
                  {envios.map((a) => {
                    return <th key={a.city}>{a.city}</th>;
                  })}
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => {
                  return <User d={d} key={d.user} />;
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </PrivateEnv>
  );
};

export default TempPage;
