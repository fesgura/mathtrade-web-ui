import { useState } from "react";
import classNames from "classnames";
import ElementCreateStep0 from "./step_0";
import ElementCreateStep1 from "./step_1";
import ElementCreateStep2 from "./step_2";

const ElementCreate = ({
  item,
  onSaveElement,
  loading,
  errors,
  // BGG ELEMENT
  fetchBGGelement,
  BGGelement,
  loadingBGGelement,
}) => {
  const [step, setStep] = useState(item?.elements?.length > 0 ? 0 : 1);

  return (
    <div
      className={classNames("element-create", {
        //"for-second-element": !(item?.elements?.length !== 1),
        "for-combo": item?.elements?.length > 0,
      })}
    >
      {step === 0 ? (
        <ElementCreateStep0 item={item} setStep={setStep} />
      ) : step === 1 ? (
        <ElementCreateStep1 item={item} setStep={setStep} />
      ) : (
        <ElementCreateStep2
          item={item}
          setStep={setStep}
          onSaveElement={onSaveElement}
          loading={loading}
          errors={errors}
          // BGG ELEMENT
          fetchBGGelement={fetchBGGelement}
          BGGelement={BGGelement}
          loadingBGGelement={loadingBGGelement}
        />
      )}
    </div>
  );
};
export default ElementCreate;
