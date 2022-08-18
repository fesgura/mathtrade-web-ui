import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Icon from "components/icon";

const MinMenu = ({ options, iconMenu, title = "Menú" }) => {
  return options ? (
    <div className="min-menu">
      <UncontrolledButtonDropdown size="sm">
        <DropdownToggle className="min-menu-btn" tag="div" title={title}>
          {iconMenu ? (
            <Icon type={iconMenu} />
          ) : (
            <span className="elip">···</span>
          )}
        </DropdownToggle>
        <DropdownMenu end>
          {options.map((op, k) => {
            if (!op) {
              return null;
            }
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
