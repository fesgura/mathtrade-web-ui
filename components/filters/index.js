import classNames from "classnames";
import { Form, Input } from "components/form";

const FiltersComp = ({ filters, setFilters, model = [], className }) => {
  return (
    <div className={classNames("filters", className)}>
      <div className="filters-container">
        Filters
        {/* <Form
          onSubmit={(formData) => {
            console.log(formData);
          }}
        >
          <Input
            data={filters}
            label="Nombre de usuario"
            name="username"
            placeholder="Nombre"
            //icon="user"
            question="Tu nombre de usuario lo necesitarás para poder ingresar al sistema."
          />
        </Form> */}
      </div>
    </div>
  );
};
export default FiltersComp;
