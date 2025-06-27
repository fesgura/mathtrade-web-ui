import useUserTable from "./useUserTable";
import Table from "@/components/table";
import columns from "./columns";

const UserTable = () => {
  const { list, loading, error } = useUserTable();

  return (
    <Table
      data={list}
      columns={columns}
      loading={loading}
      error={error}
      downloadExcel="usuarios-participantes"
      searchValuesFunc={(user) => {
        const { first_name, last_name, location } = user;

        return `${first_name || ""} ${last_name || ""} ${location?.name || ""}`;
      }}
      rowsProps={(item) => {
        return {
          style: {
            backgroundColor: item?.commitment ? "#c3ffc3" : "#ffc2c2",
          },
        };
      }}
    />
  );
};
export default UserTable;
