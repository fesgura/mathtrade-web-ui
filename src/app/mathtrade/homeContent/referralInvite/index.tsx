import Icon from "@/components/icon";
import Link from "next/link";
import { PRIVATE_ROUTES } from "@/config/routes";
import I18N from "@/i18n";
import { REFERRAL_LIMIT } from "@/config/referral";
import { useContext } from "react";
import { PageContext } from "@/context/page";

const ReferralInvite = () => {
  const { canI, membership } = useContext(PageContext);

  return canI.invite ? (
    <section
      className="bg-white p-5 rounded-xl shadow-lg mb-6 text-center"
      data-tour="home.referral"
    >
      {/* Only members of the current edition can invite. */}
      {membership ? (
        <>
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
        </>
      ) : (
        <p className="text-xl">
          <I18N id="referral.notSignedUp" />
        </p>
      )}
    </section>
  ) : null;
};

export default ReferralInvite;
