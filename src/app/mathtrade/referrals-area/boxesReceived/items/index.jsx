import useItems from "./useItems";
import Table from "@/components/table";
import columns from "./columns";
import { Select, Switch } from "@/components/form";
import I18N from "@/i18n";

const Items = () => {
  const {
    locations,
    setIsViaMeeting,
    setLocationFilter,
    items,
    loading,
    error,
  } = useItems();

  return (
    <Table
      header={
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1">
            <label htmlFor="location" className="text-sm font-bold">
              <I18N id="boxesReceived.items.viaMeeting" />:
            </label>

            <Switch onChange={setIsViaMeeting} />
          </div>
          <div className="flex items-center gap-1">
            <label htmlFor="location" className="text-sm font-bold">
              <I18N id="boxesReceived.items.originName" />:
            </label>

            <Select
              name="location"
              options={locations}
              size="sm"
              //loading={loadingLocations}
              onChange={setLocationFilter}
              //  icon="location"
            />
          </div>
        </div>
      }
      data={items}
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
