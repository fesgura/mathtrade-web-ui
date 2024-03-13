import { useContext } from "react";
import { PageContext } from "@/context/page";
import MyGroupsInItemUI from "./ui";

const MyGroupsInItem = ({ className }) => {
  /* PAGE CONTEXT **********************************************/
  const { pageType } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  return pageType === "myOffer" ? (
    <MyGroupsInItemUI className={className} />
  ) : null;
};

export default MyGroupsInItem;
