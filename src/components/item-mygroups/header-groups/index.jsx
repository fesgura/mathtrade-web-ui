import { useContext } from "react";
import { PageContext } from "@/context/page";
import MyGroupsInItemUI from "./ui";

const MyGroupsInItem = ({ className }) => {
  /* PAGE CONTEXT **********************************************/
  const { pageType, myGroups } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  return pageType === "myOffer" && myGroups.length ? (
    <MyGroupsInItemUI className={className} />
  ) : null;
};

export default MyGroupsInItem;
