"use client";
import { useContext, useState } from "react";
import { PageContext } from "@/context/page";
import I18N from "@/i18n";
import { PRIVATE_ROUTES } from "@/config/routes";
import Link from "next/link";
import Icon from "@/components/icon";
import Wrapper from "@/components/wrapper";

const AdvCompromise = () => {
  const [showAdvice, setShowAdvice] = useState(true);

  // mustConfirm comes from the membership (PageContext)
  const { mustConfirm, canI } = useContext(PageContext);

  return showAdvice && mustConfirm && !canI.offer && canI.commit ? (
    <Wrapper className="mt-main">
      <div className="relative bg-red-600 w-full max-w-full min-w-0 text-white text-center text-sm sm:text-base leading-snug break-words p-2 pr-8 shadow-main rounded-main">
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
