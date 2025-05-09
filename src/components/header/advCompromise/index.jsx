import { useContext, useCallback, useMemo, useState } from "react";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import { DateIntlFormat } from "@/utils/dateUtils";
import I18N from "@/i18n";
import { PRIVATE_ROUTES } from "@/config/routes";
import Link from "next/link";
import Icon from "@/components/icon";
import Wrapper from "@/components/wrapper";

const AdvCompromise = () => {
  const [showAdvice, setShowAdvice] = useState(true);

  /* PAGE CONTEXT **********************************************/
  const { mustConfirm, setMustConfirm, setMustConfirmDate, userId, canI } =
    useContext(PageContext);
  /* end PAGE CONTEXT **********************************************/

  // MY USER ************************************************
  const afterLoadMyUser = useCallback(
    (user) => {
      if (typeof user.commitment !== "undefined") {
        setMustConfirm(!user.commitment);
      }
      if (typeof user.commitment_datetime !== "undefined") {
        setMustConfirmDate(DateIntlFormat(user.commitment_datetime));
      }
    },
    [setMustConfirm, setMustConfirmDate]
  );

  const urlUserParams = useMemo(() => {
    return [userId];
  }, [userId]);

  useFetch({
    endpoint: "GET_MATHTRADE_USER",
    urlParams: urlUserParams,
    afterLoad: afterLoadMyUser,
    autoLoad: true,
  });
  // end MY USER ********************************************

  return showAdvice && mustConfirm && !canI.offer && canI.commit ? (
    <Wrapper className="mt-main">
      <div className="bg-red-600 relative top-11 left-0 w-full z-[998] text-white text-center p-2 shadow-main rounded-main">
        <I18N id="AdvCompromise" />
        <Link
          href={PRIVATE_ROUTES.WANTS.path}
          className="underline hover:opacity-75"
        >
          <I18N id={`menu.${PRIVATE_ROUTES.WANTS.title}`} />
        </Link>
        .
        <button
          className="absolute top-1 right-1 w-6 h-6"
          onClick={() => {
            setShowAdvice(false);
          }}
        >
          <Icon />
        </button>
      </div>
    </Wrapper>
  ) : null;
};

export default AdvCompromise;
