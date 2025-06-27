import useTable from "./useTable";
import Table from "@/components/table";
import columns from "./columns";

const Items = () => {
  const { itemTable, loading, error } = useTable();
  return (
    <Table
      data={itemTable}
      columns={columns}
      loading={loading}
      error={error}
      downloadExcel="ejemplares"
      searchValuesFunc={(item) => {
        const { user, title, destinyName } = item;
        return `${user || ""} ${title || ""} ${destinyName || ""}`;
      }}
    />
  );
};

export default Items;
