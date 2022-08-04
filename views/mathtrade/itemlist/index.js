import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";

const MT_ItemListView = ({ loading }) => {
  return (
    <PrivateLayout loading={loading}>
      <PageHeader
        title="Lista de Items"
        // rightSide={
        //   <OrderBy
        //     options={[
        //       {
        //         value: "name",
        //         text: "Nombre",
        //       },
        //       {
        //         value: "date",
        //         text: "Fecha",
        //       },
        //     ]}
        //   />
        // }
      />

      <div>MT_ItemListView</div>
    </PrivateLayout>
  );
};
export default MT_ItemListView;
