import { useContext } from "react";
import { PageContext } from "@/context/page";
import Pagination from "@/components/pagination";
import Container from "@/components/container";

const Footer = () => {
  /* PAGE CONTEXT **********************************************/
  const { games } = useContext(PageContext);
  const { count } = games;
  /* end PAGE CONTEXT */
  return (
    <Container>
      <div className="pt-6 flex justify-end">
        <Pagination type="game" count={count} />
      </div>
    </Container>
  );
};
export default Footer;
