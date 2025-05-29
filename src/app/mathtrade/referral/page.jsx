"use client";
import { lazy, useContext } from "react";
import PageHeader from "@/components/pageHeader";
import SectionCommon from "@/components/sections/common";
import Dynamic from "@/components/dynamic";
import { PageContext } from "@/context/page";
import I18N from "@/i18n";

const ReferredUI = lazy(() => import("./ui"));

export default function ReferralToRegister() {
  const { isNewUser, canI } = useContext(PageContext);

  return (
    <>
      <PageHeader title="title.referNewUserPage" name="referral" bgImg="5" />
      <SectionCommon>
        {canI.sign ? (
          <>
            {isNewUser ? (
              <section className=" py-12 text-center">
                <h2 className="text-xl text-center text-balance">
                  <I18N id="referral.newUsers" />
                </h2>
              </section>
            ) : (
              <Dynamic>
                <ReferredUI />
              </Dynamic>
            )}
          </>
        ) : (
          <section className=" py-12 text-center">
            <h2 className="text-xl text-center text-balance">
              <I18N id="referral.noSign" />
            </h2>
          </section>
        )}
      </SectionCommon>
    </>
  );
}
