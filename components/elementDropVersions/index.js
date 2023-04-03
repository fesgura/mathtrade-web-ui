import classNames from "classnames";
import { useState } from "react";

const ElementDropVersions = ({ versionList, onChange = () => {} }) => {
  const [selected, setSelected] = useState(0);

  return versionList && versionList.length ? (
    <div className="element-drop-version">
      <div className="element-drop-version_thumbnail">
        {versionList[selected].versionData.thumbnail &&
        versionList[selected].versionData.thumbnail !== "none" ? (
          <img src={versionList[selected].versionData.thumbnail} alt="" />
        ) : (
          <div className="img_placeholder" />
        )}
      </div>
      <div className="element-drop-version_list">
        {versionList.map((version, k) => {
          return (
            <div
              className={classNames("element-drop-version_item", {
                selected: selected === k,
                prev: selected === k + 1,
                next: selected === k - 1,
              })}
              key={k}
              onMouseOver={() => {
                setSelected(k);
              }}
              onClick={() => {
                onChange(version);
              }}
            >
              {version.formData.version_name}
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default ElementDropVersions;
