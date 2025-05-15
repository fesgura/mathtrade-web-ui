import Icon from "@/components/icon";
import Link from "next/link";
import { PRIVATE_ROUTES } from "@/config/routes";
import I18N from "@/i18n";
import { REFERRAL_LIMIT } from "@/config/referral";
import { useContext } from "react";
import { PageContext } from "@/context/page";

const ReferralInvite = () => {
  const { canI } = useContext(PageContext);

  return canI.invite ? (
    <div className="px-7 text-center py-5 border-t border-gray-400 max-w-4xl mx-auto">
      <p className="text-xl mb-5">
        <I18N id="referral.invite.text1" values={[REFERRAL_LIMIT]} />
      </p>
      <p>
        <Link
          href={PRIVATE_ROUTES.REFERRAL.path}
          className="underline text-sky-600 hover:text-sky-800 px-6 py-2 font-bold flex items-center justify-center gap-1 border border-sky-600 rounded-lg  shadow-md  w-fit mx-auto"
        >
          <Icon type="newUser" />
          <I18N id="title.referNewUserPage" />
        </Link>
      </p>
    </div>
  ) : null;
};

export default ReferralInvite;
