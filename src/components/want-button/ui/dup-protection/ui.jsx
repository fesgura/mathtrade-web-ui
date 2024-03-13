import { useCallback, useContext, useEffect } from "react";
import { PageContext } from "@/context/page";
import { WantGroupContext } from "@/context/wantGroup";
import I18N from "@/i18n";
import Question from "@/components/question";
import clsx from "clsx";

const DupProtectionUI = () => {
  /* PAGE CONTEXT **********************************************/
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* WANTGROUP CONTEXT **********************************************/
  const { wantGroup, dup_protection, setDup_protection } =
    useContext(WantGroupContext);
  /* end WANTGROUP CONTEXT **********************************************/

  const onChange = useCallback(
    ({ target }) => {
      setDup_protection(target.checked);
    },
    [setDup_protection]
  );

  useEffect(() => {
    if (wantGroup) {
      setDup_protection(wantGroup.dup_protection);
    }
  }, [wantGroup, setDup_protection]);

  return (
    <label
      className={clsx("flex items-center gap-2", {
        "cursor-pointer": canI.want,
        "cursor-not-allowed": !canI.want,
      })}
    >
      <div className="pt-1">
        <input
          type="checkbox"
          checked={dup_protection}
          onChange={onChange}
          disabled={!canI.want}
          className={canI.want ? "cursor-pointer" : "cursor-not-allowed"}
        />
      </div>
      <div>
        <span className="text-xs">
          <I18N
            id={`MyWants.dup_protection.${dup_protection ? "yes" : "no"}`}
          />
        </span>
        {canI.want ? <Question text="MyWants.dup_protection.help" /> : null}
      </div>
    </label>
  );
};

export default DupProtectionUI;
