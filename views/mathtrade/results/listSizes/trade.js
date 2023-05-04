import UserAvatar from "components/avatar";
import I18N from "i18n";
import { useMemo } from "react";
import { Col, Row } from "reactstrap";
import { dateToString } from "utils";

const Weights = ({ elements }) => {
  const listSizes = useMemo(() => {
    const totales = {
      box_width: 0,
      box_length: 0,
      box_depth: 0,
      box_weight: 0,
      cm3: 0,
    };
    const listData = [];

    elements.forEach((el) => {
      const elData = {};
      ["box_depth", "box_length", "box_width"].forEach((n) => {
        elData[n] = el[n] * 2.54;
        totales[n] += elData[n];
      });
      elData.box_weight = el.box_weight * 0.453592;

      totales.box_weight += elData.box_weight;

      elData.cm3 =
        (elData.box_width * elData.box_length * elData.box_depth) / 1000;
      //
      totales.cm3 += elData.cm3;

      elData.textSize = `${elData.box_width.toFixed(
        1
      )} x ${elData.box_length.toFixed(1)} x ${elData.box_depth.toFixed(
        1
      )} cm (${elData.cm3.toFixed(1)} litros).`;
      elData.textWeight = elData.box_weight
        ? `${elData.box_weight.toFixed(1)} kg.`
        : null;

      listData.push(elData);
    });

    totales.textSize = `${totales.box_width.toFixed(
      1
    )} x ${totales.box_length.toFixed(1)} x ${totales.box_depth.toFixed(
      1
    )} cm (${totales.cm3.toFixed(1)} litros).`;
    totales.textWeight = totales.box_weight
      ? `${totales.box_weight.toFixed(1)} kg.`
      : null;

    //
    return {
      listData,
      totales,
    };
  }, [elements]);

  return listSizes.listData.length > 1 ? (
    <>
      <div className="result-table_title bold">-</div>
      <ul className="text-start">
        {listSizes.listData.map((el, k) => {
          return (
            <li key={k}>
              {el.textSize}
              <br />
              {el.textWeight ? "Peso: " + el.textWeight : "-"}
            </li>
          );
        })}
      </ul>
      <div className="result-table_title bold">
        Total:
        <br />
        {listSizes.totales.textSize}
        <br />
        {"Peso: "}
        {listSizes.totales.textWeight || "-"}
      </div>
    </>
  ) : (
    <>
      <div className="result-table_title bold">
        {listSizes.totales.textSize}
        <br />

        {"Peso: "}
        {listSizes.totales.textWeight || "-"}
      </div>
    </>
  );
};

const Trade = ({ data }) => {
  const { user, trade_from } = data;

  return (
    <>
      <tr>
        <td>{trade_from ? trade_from.item.id : "-"}</td>
        <td>
          <div className="result-table_name ps-2">{`${user?.username}`}</div>
        </td>
        <td>
          <div className="result-table_name ps-2">{`${user?.first_name} ${user?.last_name} (${user?.location?.name})`}</div>
        </td>
        <td>
          <div className="result-table_name ps-2">
            {user?.event_attendance ? 'Sí':'No'}
          </div>
        </td>
        <td>
          {trade_from ? (
            <div className="result-table_tag">
              <div className="result-table_name">{` recibe de: ${trade_from.user?.first_name} ${trade_from.user?.last_name} (${trade_from.user?.location?.name})`}</div>
            </div>
          ) : (
            "-"
          )}
        </td>
        <td>
          {trade_from ? (
            <>
              {trade_from.item.elements.length > 1 ? (
                <>
                  <div className="result-table_title bold">Combo:</div>
                  <ul className="text-start">
                    {trade_from.item.elements.map((el) => {
                      return <li key={el.id}>{el?.name || "-"}</li>;
                    })}
                  </ul>
                </>
              ) : (
                <div className="result-table_title bold">
                  {trade_from?.item.title}
                </div>
              )}
            </>
          ) : (
            "-"
          )}
        </td>
        <td>
          {trade_from ? <Weights elements={trade_from.item.elements} /> : "-"}
        </td>
      </tr>
    </>
  );
};

export default Trade;
