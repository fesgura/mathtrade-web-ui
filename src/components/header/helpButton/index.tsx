"use client";
import HeadContent from "../head-content";
import useHoverPanel from "../head-content/useHoverPanel";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import Link from "next/link";
import clsx from "clsx";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/config/routes";
import { rulebookPDFurl } from "@/config/rulebook";
import { fadeLabelClass } from "@/components/sidebar/fadeLabel";
import useExclusiveMobilePanel from "@/components/header/head-content/useExclusiveMobilePanel";

const baseURL = process.env.BASE_URL;

type HelpButtonProps = {
  // "row" renders an icon + label row, for the sidebar's utility row.
  variant?: "header" | "row";
  placement?: "below" | "right";
  // "dark" for the black sidebar, "light" for the white mobile sheet.
  tone?: "dark" | "light";
  collapsed?: boolean;
};

const HelpButton = ({
  variant = "header",
  placement = "below",
  tone = "dark",
  collapsed = false,
}: HelpButtonProps = {}) => {
  const { visibleMobile, toggleMobile } = useExclusiveMobilePanel("help");

  const {
    refs,
    getReferenceProps,
    getFloatingProps,
    floatingStyles,
    isPositioned,
    open,
  } = useHoverPanel(placement);

  return (
    <div className="relative" ref={refs.setReference} {...getReferenceProps()}>
      {variant === "row" ? (
        <button
          className={clsx(
            "flex items-center w-full cursor-pointer peer text-sm py-2 rounded-lg",
            collapsed ? "justify-center px-0" : "text-left px-2",
            tone === "light"
              ? "text-gray-900 hover:bg-gray-50"
              : "text-white/80 hover:text-white hover:bg-white/5"
          )}
          onClick={toggleMobile}
        >
          <Icon type="help2" className="text-lg shrink-0" />
          <span className={fadeLabelClass(!collapsed)}>
            <I18N id="help.menu" />
          </span>
        </button>
      ) : (
        <button
          className="relative cursor-pointer block peer  text-sm text-white hover:bg-primary/30 h-11 px-2"
          onClick={toggleMobile}
        >
          <span className="xl:inline-block hidden">
            <I18N id="help.menu" />
          </span>
          <span className="xl:hidden">❔</span>
        </button>
      )}

      <HeadContent
        visibleMobile={visibleMobile}
        toggleMobile={toggleMobile}
        placement={placement}
        open={open}
        setFloating={refs.setFloating}
        floatingStyles={floatingStyles}
        isPositioned={isPositioned}
        floatingProps={getFloatingProps()}
      >
        <div className="py-1">
          <Link
            href={PRIVATE_ROUTES.FAQS.path}
            className="block leading-10 hover:bg-sky-200 text-center"
            onClick={toggleMobile}
          >
            <I18N id="menu.Faqs" />
          </Link>
          <Link
            href={`${PRIVATE_ROUTES.FAQS.path}#glosario`}
            className="block leading-10 hover:bg-sky-200 text-center border-t"
            onClick={toggleMobile}
          >
            <I18N id="help.glossary" />
          </Link>
          <Link
            href={`${PRIVATE_ROUTES.FAQS.path}#estados`}
            className="block leading-10 hover:bg-sky-200 text-center border-t"
            onClick={toggleMobile}
          >
            <I18N id="help.statuses" />
          </Link>
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
        </div>
      </HeadContent>
    </div>
  );
};

export default HelpButton;
