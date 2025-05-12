import { useContext } from "react";
import { PageContext } from "@/context/page";
import Pagination from "@/components/pagination";

const Footer = () => {
  /* PAGE CONTEXT **********************************************/
  const { items } = useContext(PageContext);
  const { count } = items;
  /* end PAGE CONTEXT */
  return (
    <div className="py-3 md:px-8 px-3 flex justify-end border-t border-gray-300">
      <Pagination type="item" count={count} />
    </div>
  );
};
export default Footer;
