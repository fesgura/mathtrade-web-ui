"use client";
import { useContext } from "react";
import { PageContext } from "@/context/page";
import Container from "../container";

const Footer = () => {
  /* PAGE CONTEXT **********************************************/
  const { pageType } = useContext(PageContext);
  /* end PAGE CONTEXT */

  return pageType?.indexOf("wants") >= 0 ? null : (
    <footer className="absolute w-full h-11 leading-[43px] text-xs text-center left-0 bottom-0">
      <Container>
        <div className="border-t border-gray-300">
          {new Date().getFullYear()} - Math Trade Argentina
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
