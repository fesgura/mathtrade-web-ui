"use client";
import { useContext } from "react";
import { PageContext } from "@/context/page";
import Wrapper from "../wrapper";

const Footer = () => {
  /* PAGE CONTEXT **********************************************/
  const { pageType } = useContext(PageContext);
  /* end PAGE CONTEXT */

  return pageType?.indexOf("wants") >= 0 ? null : (
    <footer className="absolute w-full h-16 left-0 bottom-0">
      <Wrapper>
        <div className="h-11 bg-gray-300 rounded-main text-xs shadow  flex items-center justify-center p-2">
          {new Date().getFullYear()} - Math Trade Argentina
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
