import { LoadingBox } from "@/components/loading";
import Wrapper from "@/components/wrapper";
import clsx from "clsx";

const SectionCommon = ({ loading, children, topNotRounded }) => {
  return (
    <Wrapper>
      <section
        className={clsx("relative bg-colorMain shadow-main", {
          "rounded-main": !topNotRounded,
          "rounded-b-main": topNotRounded,
        })}
      >
        {children}
        <LoadingBox loading={loading} transparent />
      </section>
    </Wrapper>
  );
};

export default SectionCommon;
