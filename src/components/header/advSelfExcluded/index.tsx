"use client";
import { useContext, useState } from "react";
import { PageContext } from "@/context/page";
import I18N from "@/i18n";
import { PUBLIC_ROUTES } from "@/config/routes";
import Link from "next/link";
import Icon from "@/components/icon";
import Wrapper from "@/components/wrapper";

const AdvSelfExcluded = () => {
  const [showAdvice, setShowAdvice] = useState(true);
  const { membership } = useContext(PageContext);

  return showAdvice && membership?.self_excluded ? (
    <Wrapper className="mt-main">
      <div className="bg-red-600 w-full max-w-full min-w-0 text-white text-center text-sm sm:text-base leading-snug break-words p-2 pr-8 shadow-main rounded-main relative">
        <I18N id="AdvSelfExcluded" />
        <Link
          href={PUBLIC_ROUTES.TERMS_CONDITIONS.path}
          className="underline hover:opacity-75"
        >
          <I18N id="provisional.exclude.reglamento" />
        </Link>
        .
        <button
          type="button"
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

export default AdvSelfExcluded;
