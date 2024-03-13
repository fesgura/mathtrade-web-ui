import { useContext, useMemo } from "react";
import { WantGroupContext } from "@/context/wantGroup";
import DupProtectionUI from "./ui";

const DupProtection = () => {
  /* WANTGROUP CONTEXT **********************************************/
  const { contextType } = useContext(WantGroupContext);
  /* end WANTGROUP CONTEXT **********************************************/

  const show_dup_protection = useMemo(() => {
    return contextType === "tag";
  }, [contextType]);

  return show_dup_protection ? <DupProtectionUI /> : null;
};

export default DupProtection;
