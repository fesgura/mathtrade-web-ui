import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Icon from "components/icon";

const MinMenu = ({ options }) => {
  return options ? (
    <div className="min-menu">
      <UncontrolledButtonDropdown size="sm">
        <DropdownToggle className="min-menu-btn" tag="div" title="Menú">
          ···
        </DropdownToggle>
        <DropdownMenu end>
          {options.map((op, k) => {
            const { icon, text, className, onClick } = op;
            return (
              <DropdownItem className={className} onClick={onClick} key={k}>
                {icon ? <Icon type={icon} className="me-2" /> : null}
                {text}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  ) : null;
};
export default MinMenu;
