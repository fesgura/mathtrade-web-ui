"use client";
import I18N from "@/i18n";
import Link from "next/link";
import { PRIVATE_ROUTES } from "@/config/routes";

const LinkButton = ({ name }) => {
  return (
    <Link
      href={PRIVATE_ROUTES[name]?.path}
      className="block leading-10 text-white hover:bg-primary/30 px-1 text-center transition-colors relative"
    >
      <div className="absolute top-0 right-0 font-bold text-[8px] text-white uppercase leading-none bg-red-600 p-[2px] rounded-sm">
        <I18N id="new" />
      </div>
      <I18N id={`menu.${PRIVATE_ROUTES[name]?.title}`} />
    </Link>
  );
};

export default LinkButton;
