"use client";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageContext } from "@/context/page";
import { useStore } from "@/store";
import useFetch from "@/hooks/useFetch";
import I18N from "@/i18n";
import { PRIVATE_ROUTES } from "@/config/routes";
import Icon from "@/components/icon";
import Wrapper from "@/components/wrapper";
import { contributionDeadline } from "@/utils/contributionDeadline";

const MIN_REFRESH_INTERVAL_MS = 60 * 1000;

/* Site-wide reminder while the member's sign-up contribution isn't approved
 * (or, during sign-up, while they haven't signed up yet). Only for editions
 * that require a contribution. Hidden on "Mis datos", which shows the full
 * contribution box. */
const AdvContribution = () => {
  const [showAdvice, setShowAdvice] = useState(true);
  const { membership, mathtrade, canI } = useContext(PageContext);
  // Pathname rather than pageType: not every page sets pageType, so it can
  // be left stale as "myData" after visiting Mis datos.
  const pathname = usePathname();

  // The stored membership only changes on login / sign-up, so reload it on
  // mount and on tab focus (throttled) to pick up an admin's review.
  const memberUserId = membership?.user_id;
  const afterLoad = useCallback((freshMembership: any) => {
    const { data, updateStore } = useStore.getState();
    if (data.membership && freshMembership) {
      updateStore("data", { ...data, membership: freshMembership });
    }
  }, []);
  const [refreshMembership] = useFetch({
    endpoint: "GET_MYDATA_MATHTRADE",
    afterLoad,
  });
  const lastRefreshRef = useRef(0);
  const contributionRequired = !!mathtrade?.contribution_amount;
  const rulesRequired = !!mathtrade?.rules_quiz_required;
  const required = contributionRequired || rulesRequired;

  useEffect(() => {
    if (!memberUserId || !required) return;
    const refresh = () => {
      if (document.visibilityState !== "visible") return;
      const now = Date.now();
      if (now - lastRefreshRef.current < MIN_REFRESH_INTERVAL_MS) return;
      lastRefreshRef.current = now;
      refreshMembership({ urlParams: [memberUserId] });
    };
    refresh();
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberUserId, required]);

  if (!showAdvice || !required || pathname === PRIVATE_ROUTES.MY_DATA.path) return null;

  // Most urgent pending requirement first: the rules quiz gates everything
  // else, the contribution only matters once signed up.
  let state: string | null = null;
  if (!membership) {
    if (canI?.sign) {
      state = !rulesRequired
        ? "notSigned"
        : contributionRequired
        ? "notSignedQuizContribution"
        : "notSignedQuiz";
    }
  } else if (membership.rules?.required && !membership.rules.accepted_at) {
    state = "rulesQuiz";
  } else if (membership.contribution && membership.contribution.status !== "approved") {
    state = membership.contribution.status; // missing | pending | rejected
    // Deadline passed, or a final rejection: nothing left to do but know it.
    if (state !== "pending" && membership.contribution.can_upload === false) {
      state = "closed";
    }
  }
  if (!state) return null;
  const deadline =
    state === "missing" || state === "rejected"
      ? contributionDeadline(membership?.contribution?.upload_until)
      : "";

  return (
    <Wrapper className="mt-main">
      <div
        className={clsx(
          "relative w-full text-white text-center p-2 pr-8 shadow-main rounded-main",
          state === "pending" ? "bg-sky-600" : "bg-red-600"
        )}
      >
        <I18N id={`AdvContribution.${state}`} />{" "}
        <Link
          href={PRIVATE_ROUTES.MY_DATA.path}
          className="underline font-bold hover:opacity-75"
        >
          <I18N id="AdvContribution.link" />
        </Link>
        .
        {deadline ? (
          <>
            {" "}
            <I18N id="AdvContribution.deadline" values={[deadline]} />
          </>
        ) : null}
        <button
          type="button"
          className="absolute top-1 right-1 w-6 h-6"
          onClick={() => setShowAdvice(false)}
        >
          <Icon />
        </button>
      </div>
    </Wrapper>
  );
};

export default AdvContribution;
