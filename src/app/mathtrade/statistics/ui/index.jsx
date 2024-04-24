import Script from "next/script";
import PillsStats from "./pills";
import Map from "./map";
import Segments from "./segments";
import Downloads from "./downloads";

const StatsUI = ({ data }) => {
  return (
    <>
      <Script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-bundle.min.js" />
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
  );
};

export default StatsUI;
