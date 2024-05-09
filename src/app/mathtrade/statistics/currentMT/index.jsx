import PillsStats from "./pills";
import Map from "./map";
import Segments from "./segments";
import Downloads from "./downloads";
import useCurrentStats from "./useCurrentStats";
import Container from "@/components/container";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";

const StatsUI = () => {
  const { data, loading, error } = useCurrentStats();

  return (
    <Container className="relative">
      {data ? (
        <>
          <ErrorAlert error={error} />
          <PillsStats data={data} />
          <div className="lg:flex gap-6">
            <div className="lg:w-1/3">
              <Map data={data} />
            </div>
            <div className="lg:w-2/3">
              <Segments stats={data} />
              <Downloads stats={data} />
            </div>
          </div>
        </>
      ) : null}
      <LoadingBox loading={loading} transparent />
    </Container>
  );
};

export default StatsUI;
