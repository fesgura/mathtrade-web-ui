import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { useState } from "react";
import UserAvatar from "components/avatar";

const UserHeader = () => {
  const [isOpen, setIsOpen] = useState();
  return (
    <div className="">
      <Dropdown
        toggle={() => {
          setIsOpen(!isOpen);
        }}
        isOpen={isOpen}
      >
        <DropdownToggle data-toggle="dropdown" tag="div">
          <UserAvatar
            src={
              "https://www.pngkit.com/png/full/115-1150342_user-avatar-icon-iconos-de-mujeres-a-color.png"
            }
            className="pointer"
          />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>My Account</DropdownItem>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Sign Out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
export default UserHeader;
