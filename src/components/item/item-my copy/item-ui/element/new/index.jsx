import { useState } from "react";
import { noBGGgame } from "@/config/no-bgggame";
import NewElementStep0 from "./step-0";
import NewElementStep1 from "./step-1";
import NewElementStep2 from "./step-2";
import NewElementStep3 from "./step-3";

const NewElement = () => {
  const [step, setStep] = useState(0);

  const [newBGGinfo, setnewBGGinfo] = useState(noBGGgame);

  if (step === 0) {
    return <NewElementStep0 setStep={setStep} />;
  }
  if (step === 1) {
    return <NewElementStep1 setStep={setStep} setnewBGGinfo={setnewBGGinfo} />;
  }
  if (step === 2) {
    return (
      <NewElementStep2
        setStep={setStep}
        newBGGinfo={newBGGinfo}
        setnewBGGinfo={setnewBGGinfo}
      />
    );
  }
  if (step === 3) {
    return <NewElementStep3 setStep={setStep} newBGGinfo={newBGGinfo} />;
  }
};
export default NewElement;
