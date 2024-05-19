import { useContext } from "react";
import { PageContext } from "@/context/page";
import Pagination from "@/components/pagination";
import Container from "@/components/container";

const Footer = () => {
  /* PAGE CONTEXT **********************************************/
  const { items } = useContext(PageContext);
  const { count } = items;
  /* end PAGE CONTEXT */
  return (
    <Container>
      <div className="pt-8 flex justify-end">
        <Pagination type="item" count={count} />
      </div>
    </Container>
  );
};
export default Footer;
