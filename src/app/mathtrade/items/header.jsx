import { useContext } from "react";
import { PageContext } from "@/context/page";
import I18N, { getI18Ntext } from "@/i18n";
import Pagination from "@/components/pagination";
import Icon from "@/components/icon";
import InnerButton from "@/components/button/inner-button";
import { SidebarToggleButton } from "@/components/sections/with-sidebar";
import OrderBy from "@/components/orderBy";
import PageSize from "@/components/page-size";

const Header = () => {
  /* PAGE CONTEXT **********************************************/
  const { items } = useContext(PageContext);
  const { count } = items;
  /* end PAGE CONTEXT */

  return (
    <div className="flex lg:justify-between justify-around items-center gap-1 py-3">
      <div className="flex-[0_0_auto]">
        <SidebarToggleButton
          className="font-bold rounded-md text-sm lg:px-5 px-3 py-2 transition-colors"
          classNameNotHighlighted="text-primary bg-primary/10"
          classNameHighlighted="font-bold text-white bg-primary rounded-md text-sm lg:px-5 px-3 py-2"
        >
          <InnerButton>
            <Icon type="filters" />
            <span className="lg:block hidden">
              <I18N id="btn.mobile.filter" />
            </span>
          </InnerButton>
        </SidebarToggleButton>
      </div>

      <div className="flex-[0_0_0] lg:flex-[0_0_auto] border-l border-gray-300 pl-2 lg:border-l-0">
        <div className="flex flex-wrap lg:flex-nowrap gap-y-2 lg:gap-y-0">
          <div className=" lg:border-r lg:border-gray-300 lg:pr-2 lg:mr-2">
            <OrderBy
              type="item"
              options={[
                { text: getI18Ntext("element.Date"), value: "added_mt" },
                {
                  text: getI18Ntext("element.DateUpdate"),
                  value: "last_update",
                },
                { text: getI18Ntext("element.Name"), value: "name" },
                { text: getI18Ntext("element.Value"), value: "value" },
                { text: getI18Ntext("element.BGG.rank"), value: "rank" },
                {
                  text: getI18Ntext("element.Language"),
                  value: "language",
                },
                {
                  text: getI18Ntext("element.BGG.dependency"),
                  value: "dependency",
                },
                { text: getI18Ntext("element.Status"), value: "status" },
                {
                  text: getI18Ntext("element.BGG.weight"),
                  value: "weight",
                },
                { text: getI18Ntext("element.BGG.rating"), value: "rate" },
                { text: getI18Ntext("element.BGG.id"), value: "bgg_id" },
              ]}
            />
          </div>
          <div className=" border-r border-gray-300 pr-2 mr-2">
            <PageSize type="item" />
          </div>
          <div className=" ">
            <Pagination type="item" count={count} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
