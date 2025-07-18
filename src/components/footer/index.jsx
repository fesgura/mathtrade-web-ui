"use client";
import { useContext } from "react";
import { PageContext } from "@/context/page";
import Wrapper from "../wrapper";
import { PUBLIC_ROUTES } from "@/config/routes";
import Link from "next/link";
import I18N from "@/i18n";

const navList = [PUBLIC_ROUTES.MEDIA, PUBLIC_ROUTES.TERMS_CONDITIONS];

const Footer = () => {
  /* PAGE CONTEXT **********************************************/
  const { pageType } = useContext(PageContext);
  /* end PAGE CONTEXT */

  return pageType?.indexOf("wants") >= 0 ? null : (
    <footer className="absolute w-full min-h-16 left-0 bottom-0">
      <Wrapper>
        <div className="min-h-11 bg-gray-300 rounded-main text-xs shadow flex flex-wrap gap-x-6 items-center sm:justify-between justify-center py-2 px-6">
          <div className="">
            {new Date().getFullYear()} - Math Trade Argentina
          </div>
          <nav className="flex flex-wrap justify-center gap-x-3">
            {navList.map(({ title, path }) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="text-primary hover:text-blue-900 font-bold underline block"
                  target="_blank"
                  rel="noreferrer"
                >
                  <I18N id={title} />
                </Link>
              );
            })}
          </nav>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
