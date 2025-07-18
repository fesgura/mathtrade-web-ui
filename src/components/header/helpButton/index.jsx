"use client";
import { useCallback, useState } from "react";
import HeadContent from "../head-content";
import I18N from "@/i18n";
import Link from "next/link";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/config/routes";
import { rulebookPDFurl, instructPDFurl } from "@/config/rulebook";

const baseURL = process.env.BASE_URL;

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
        <span className="xl:inline-block hidden">
          <I18N id="help.menu" />
        </span>
        <span className="xl:hidden">❔</span>
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
          <a
            href={baseURL + instructPDFurl}
            target="_blank"
            rel="noopener noreferrer"
            className="block leading-10 hover:bg-sky-200 text-center border-t"
          >
            <I18N id="title.Instruct" />
          </a>
          <a
            href={PUBLIC_ROUTES.TERMS_CONDITIONS.path}
            target="_blank"
            rel="noopener noreferrer"
            className="block leading-10 hover:bg-sky-200 text-center border-t"
          >
            <I18N id="title.TyC" />
          </a>
          <a
            href={baseURL + rulebookPDFurl}
            target="_blank"
            rel="noopener noreferrer"
            className="block leading-10 hover:bg-sky-200 text-center border-t"
          >
            <I18N id="title.Rulebook" />
          </a>
          <Link
            href={PRIVATE_ROUTES.MEMARDIUMS.path}
            className="leading-10 hover:bg-sky-200 text-center border-t flex item-center justify-center gap-1"
            onClick={toggleMobile}
          >
            <I18N id={`menu.${PRIVATE_ROUTES.MEMARDIUMS.title}.icon`} />
            <span>
              <I18N id={`menu.${PRIVATE_ROUTES.MEMARDIUMS.title}`} />
            </span>
          </Link>
          <Link
            href={PUBLIC_ROUTES.MEDIA.path}
            className="leading-10 hover:bg-sky-200 text-center border-t flex item-center justify-center font-bold"
            onClick={toggleMobile}
            target="_blank"
            rel="noreferrer"
          >
            <I18N id={`${PUBLIC_ROUTES.MEDIA.title}`} />
          </Link>
        </div>
      </HeadContent>
    </div>
  );
};

export default HelpButton;
