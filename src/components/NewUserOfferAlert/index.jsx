import { useContext } from "react";
import { PageContext } from "@/context/page";
import I18N from "@/i18n";
import {
  NEW_USER_OFFER_LIMIT,
  NEW_USER_OFFER_LIMIT_STRING,
} from "@/config/newUserOfferLimit";

const NewUserOfferAlert = () => {
  /* PAGE CONTEXT **********************************************/
  const { isNewUser } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  if (!isNewUser) {
    return null;
  }

  return (
    <div className="pt-2 pb-6">
      <div className="text-center bg-orange-100 p-3 border-4 border-orange-400 rounded-lg shadow-md ">
        <p className="mb-2 text-balance">
          <I18N
            id="NewUserOfferAlert.text1"
            values={[NEW_USER_OFFER_LIMIT, NEW_USER_OFFER_LIMIT_STRING]}
          />
        </p>

        <p className=" italic text-sm opacity-80 text-balance">
          <I18N id="NewUserOfferAlert.text2" />
        </p>
      </div>
    </div>
  );
};

export default NewUserOfferAlert;
