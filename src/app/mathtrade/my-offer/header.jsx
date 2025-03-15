import { useEffect, useContext } from "react";
import I18N, { getI18Ntext } from "@/i18n";
import { PRIVATE_ROUTES } from "@/config/routes";
import OrderBy from "@/components/orderBy";
import { SidebarToggleButton } from "@/components/sections/with-sidebar";
import InnerButton from "@/components/button/inner-button";
import Icon from "@/components/icon";
import { useOptions } from "@/store";
import { PageContext } from "@/context/page";
import Link from "next/link";

const HeaderMyOffer = ({ count }) => {
  /* PAGE CONTEXT **********************************************/
  const { mathtrade_history } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  /* FILTER OPTIONS **********************************************/
  const filters_myoffer = useOptions((state) => state.filters_myoffer);
  const updateFilters = useOptions((state) => state.updateFilters);

  useEffect(() => {
    if (Object.keys(filters_myoffer).length <= 0) {
      updateFilters({ order: "-added_mt", page: 1 }, "myoffer");
    }
  }, [filters_myoffer, updateFilters]);
  /* end FILTER OPTIONS *********************************************/

  return (
    <div className="flex lg:justify-between justify-around items-center gap-1 py-3">
      <div className="flex-[0_0_auto]">
        <div className="md:flex items-center gap-4">
          <SidebarToggleButton
            className="font-bold rounded-md text-sm lg:px-5 px-3 py-2 transition-colors"
            classNameNotHighlighted="text-primary bg-primary/10"
            classNameHighlighted="font-bold text-white bg-primary rounded-md text-sm lg:px-5 px-3 py-2"
          >
            <InnerButton>
              <Icon type="collection" />
              <span className="lg:block hidden">
                <I18N id="myGroups.groupHeader" />
              </span>
            </InnerButton>
          </SidebarToggleButton>
          <div className="md:text-xl text-xs font-bold italic text-gray-700 md:pt-0 pt-2">
            <I18N
              id={`itemCount.${count === 1 ? "one" : "many"}`}
              values={[count]}
            />
          </div>
        </div>
      </div>

      <div className="md:flex items-center gap-2 md:border-l-0 border-l border-gray-400 md:pl-0 pl-3">
        <div>
          <div className="flex items-center gap-1 md:border-r md:border-gray-400 md:pr-2 md-pl-5 md:pb-0 pb-3">
            <label className="block text-sm font-bold text-gray-500 whitespace-nowrap">
              <I18N id="filter.Search" />
            </label>
            <input
              type="text"
              placeholder={getI18Ntext("filter.Search")}
              value={filters_myoffer?.keyword || ""}
              onChange={({ target }) => {
                updateFilters(
                  {
                    keyword: target.value || undefined,
                  },
                  "myoffer"
                );
              }}
              className="border border-stroke rounded-md p-1 text-xs focus:outline-none"
            />
          </div>
        </div>
        <div>
          <OrderBy
            type="myoffer"
            options={[
              { text: getI18Ntext("element.Date"), value: "none" },
              { text: getI18Ntext("element.Name"), value: "title" },
              { text: getI18Ntext("element.Value"), value: "value" },
            ]}
          />
        </div>
        <div>
          <Link
            href={PRIVATE_ROUTES.MY_OFFER_PREVIOUS_MATHTRADES.path}
            className="text-xs text-balance w-40 grid place-items-center text-center leading-tight border border-primary rounded-md p-1 text-sky-700  transition-colors hover:bg-primary hover:text-white relative"
          >
            <I18N id="myOfferPreviousMathtrades.page.link" />
            <span className="absolute -top-2 -right-2 block text-[9px] font-bold bg-red-600 text-white px-2 uppercase rounded-sm">
              <I18N id="new" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderMyOffer;
