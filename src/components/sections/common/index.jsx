import Container from "@/components/container";
import { LoadingBox } from "@/components/loading";
import PageHeader from "@/components/pageHeader";

const SectionCommon = ({ loading, children }) => {
  return (
    <section className="relative">
      {children}
      <LoadingBox loading={loading} transparent />
    </section>
  );
};

export default SectionCommon;
