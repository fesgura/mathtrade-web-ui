import useBoxReceived from "./useBoxReceived";
import Table from "@/components/table";
import columns from "./columns";

const BoxesReceived = () => {
  const { trackings, loading, error } = useBoxReceived();

  return (
    <div className="relative min-h-[260px] pb-8">
      <Table
        loading={loading}
        error={error}
        columns={columns}
        data={trackings}
        downloadExcel="cajas-que-recibo"
        searchValuesFunc={(tr) => {
          const { origin_name, boxes } = tr;

          const itemTexts = boxes
            .map((box) => {
              return box.items
                .map((item) => `${item.name} - ${item.user}`)
                .join("|");
            })
            .join("|");

          return `${origin_name || ""} ${itemTexts || ""}`;
        }}
      />
    </div>
  );
};

export default BoxesReceived;
