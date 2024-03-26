"use client";
import { useCallback, useState } from "react";
import HeadContent from "../head-content";
import I18N from "@/i18n";
import Link from "next/link";
import { PRIVATE_ROUTES } from "@/config/routes";

const HelpButton = () => {
  const [visibleMobile, setVisibleMobile] = useState(false);

  const toggleMobile = useCallback(() => {
    setVisibleMobile((v) => !v);
  }, []);

  return (
    <div className="relative">
      <button
        className="relative cursor-pointer block peer  text-sm text-white hover:bg-primary/30 h-11 px-2"
        onClick={toggleMobile}
      >
        <I18N id="help.menu" />
      </button>

      <HeadContent visibleMobile={visibleMobile} toggleMobile={toggleMobile}>
        <div className="py-1">
          <Link
            href={PRIVATE_ROUTES.FAQS.path}
            className="block leading-10 hover:bg-sky-200 text-center"
            onClick={toggleMobile}
          >
            <I18N id="menu.Faqs" />
          </Link>
        </div>
      </HeadContent>
    </div>
  );
};

export default HelpButton;
