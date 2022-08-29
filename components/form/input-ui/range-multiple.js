import { useState, useEffect, useCallback } from "react";
import { Col, Row } from "reactstrap";

const RangeMultiple = ({
  name,
  value,
  onChange,
  min = 0,
  max = 10,
  step = 1,
}) => {
  const [valueData, setValueData] = useState({
    positions: [0, 100],
    value: [min, max],
  });
  const [linesArray, setLinesArray] = useState([]);

  const onChangeInput = useCallback(
    (valInput, inputNum) => {
      const valueArray = value !== "" ? value.split(",") : [min, max];
      let valInputToReturn = 0;
      switch (inputNum) {
        case 0:
          valInputToReturn = Math.min(
            valInput,
            parseInt(valueArray[1], 10) - 1
          );
          break;
        case 1:
          valInputToReturn = Math.max(
            valInput,
            parseInt(valueArray[0], 10) + 1
          );
          break;
      }
      valueArray[inputNum] = valInputToReturn;
      onChange(valueArray.join(","));
    },
    [value, min, max]
  );

  useEffect(() => {
    if (value !== "") {
      const valueArray = value.split(",").map((num) => {
        return parseInt(num, 10);
      });
      const minValue = valueArray[0];
      const maxValue = valueArray[1];

      const minPos = (100 * (minValue - min)) / (max - min);
      const maxPos = (100 * (maxValue - min)) / (max - min);

      setValueData({
        positions: [minPos, maxPos],
        value: [minValue, maxValue],
      });
    } else {
      setValueData({
        positions: [0, 100],
        value: [min, max],
      });
    }
  }, [value, min, max]);

  useEffect(() => {
    const newlinesArray = [];
    const count = max - min;
    let d = 0;
    while (d < count) {
      newlinesArray.push(d);
      d++;
    }
    setLinesArray(newlinesArray);
  }, [min, max]);

  return (
    <div className="range-multiple-container">
      <Row className="g-0 align-items-center">
        <Col xs="auto" className="pe-2">
          <div className="range-multiple-label">{`${valueData.value[0]} - ${valueData.value[1]}`}</div>
        </Col>
        <Col>
          <div className="range-multiple-content">
            <div className="range-multiple-line">
              <div className="range-multiple-line_stroke">
                {linesArray.map((n) => {
                  if (n === 0) {
                    return null;
                  }
                  return (
                    <div
                      className="range-multiple-line_stroke-str"
                      key={n}
                      style={{
                        left: `${n * (100 / linesArray.length)}%`,
                      }}
                    />
                  );
                })}
              </div>
              <div
                className="range-multiple-btn"
                style={{
                  left: `${valueData.positions[0]}%`,
                }}
              />
              <div
                className="range-multiple-btn"
                style={{
                  left: `${valueData.positions[1]}%`,
                }}
              />
            </div>

            <input
              type="range"
              min={min}
              max={max}
              step={step}
              className="range-multiple-input i-0"
              value={valueData.value[0]}
              onChange={(e) => {
                onChangeInput(parseInt(e.target.value, 10), 0);
              }}
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              className="range-multiple-input i-1"
              value={valueData.value[1]}
              onChange={(e) => {
                onChangeInput(parseInt(e.target.value, 10), 1);
              }}
            />
          </div>
        </Col>
      </Row>

      <input
        name={name}
        type="hidden"
        value={value === "" ? `${min},${max}` : value}
      />
    </div>
  );
};
export default RangeMultiple;
