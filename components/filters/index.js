import classNames from "classnames";
import { Form, Input } from "components/form";
import I18N from "i18n";
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
              notTranslateOptions,
              translateType,
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
                  notTranslateOptions={notTranslateOptions}
                  translateType={translateType}
                />
                {hr ? <hr /> : null}
              </div>
            );
          })}
          <hr />
          <Button type="submit" block size="lg">
            <I18N id="btn.filter.Filter" />
          </Button>
          <div className="clear-filter-box">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                clearFilters();
              }}
            >
              <I18N id="btn.filter.Clear" />
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default FiltersComp;
