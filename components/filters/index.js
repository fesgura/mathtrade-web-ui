import classNames from "classnames";
import { Form, Input } from "components/form";
import { Button } from "reactstrap";

const FiltersComp = ({
  filters,
  setFilters,
  clearFilters = () => {},
  model = [],
  className,
}) => {
  return (
    <div className={classNames("filters", className)}>
      <div className="filters-container">
        <Form onSubmit={setFilters}>
          {model.map((inputData, k) => {
            const {
              hr,
              data,
              type,
              name,
              size,
              label,
              icon,
              question,
              placeholder,
              min,
              max,
              options,
            } = inputData;
            return (
              <div key={k}>
                <Input
                  data={data || filters?.query[name]}
                  label={label}
                  name={name}
                  type={type || "text"}
                  icon={icon}
                  placeholder={placeholder}
                  min={min}
                  max={max}
                  size={size || "sm"}
                  options={options}
                  question={question}
                />
                {hr ? <hr /> : null}
              </div>
            );
          })}
          <hr />
          <Button type="submit" block size="lg">
            Filtrar
          </Button>
          <div className="clear-filter-box">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                clearFilters();
              }}
            >
              Limpiar filtros
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default FiltersComp;
