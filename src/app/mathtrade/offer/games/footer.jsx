import { useContext } from "react";
import { PageContext } from "@/context/page";
import Pagination from "@/components/pagination";

const Footer = () => {
  /* PAGE CONTEXT **********************************************/
  const { games } = useContext(PageContext);
  const { count } = games;
  /* end PAGE CONTEXT */
  return (
    <div className="py-3 md:px-8 px-3 flex justify-end border-t border-gray-300">
      <Pagination type="game" count={count} />
    </div>
  );
};
export default Footer;
