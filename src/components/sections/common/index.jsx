import Container from "@/components/container";
import { LoadingBox } from "@/components/loading";
import PageHeader from "@/components/pageHeader";
import Wrapper from "@/components/wrapper";

const SectionCommon = ({ loading, children }) => {
  return (
    <Wrapper>
      <section className="relative bg-colorMain shadow-main rounded-main">
        {children}
        <LoadingBox loading={loading} transparent />
      </section>
    </Wrapper>
  );
};

export default SectionCommon;
