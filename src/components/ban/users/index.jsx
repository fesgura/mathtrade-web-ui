import InnerButton from "@/components/button/inner-button";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import { useContext } from "react";
import { PageContext } from "@/context/page";

const BanUsers = () => {
  /* PAGE CONTEXT **********************************************/
  const { setShowBanUsers } = useContext(PageContext);
  /* end PAGE CONTEXT */

  return (
    <div className="mb-5">
      <a
        href="#"
        className="text-primary underline hover:text-sky-700"
        onClick={(e) => {
          e.preventDefault();
          setShowBanUsers(true);
        }}
      >
        <InnerButton>
          <Icon type="user" />
          <span className="text-xs">
            <I18N id="Users.List.view" />
          </span>
        </InnerButton>
      </a>
    </div>
  );
};

export default BanUsers;
