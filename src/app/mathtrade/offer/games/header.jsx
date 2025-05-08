import { useContext } from "react";
import { PageContext } from "@/context/page";
import I18N, { getI18Ntext } from "@/i18n";
import Pagination from "@/components/pagination";
import OrderBy from "@/components/orderBy";
import PageSize from "@/components/page-size";
import FilterToggleButton from "@/components/filters/filterToggleButton";

const Header = () => {
  /* PAGE CONTEXT **********************************************/
  const { games } = useContext(PageContext);
  const { count } = games;
  /* end PAGE CONTEXT */

  return (
    <div className="flex lg:justify-between justify-around items-center gap-1 py-2 md:px-8 px-3 bg-colorMain">
      <div className="flex-[0_0_auto]">
        <div className="md:flex items-center gap-4">
          <FilterToggleButton type="game" />
          <div className="md:text-xl text-xs font-bold italic text-gray-700 md:pt-0 pt-2">
            <I18N
              id={`gameCount.${count === 1 ? "one" : "many"}`}
              values={[count]}
            />
          </div>
        </div>
      </div>

      <div className="flex-[0_0_0] lg:flex-[0_0_auto] border-l border-gray-300 pl-2 lg:border-l-0">
        <div className="flex flex-wrap lg:flex-nowrap gap-y-2 lg:gap-y-0">
          <div className=" lg:border-r lg:border-gray-300 lg:pr-2 lg:mr-2">
            <OrderBy
              type="game"
              options={[
                { text: getI18Ntext("element.Name"), value: "name" },
                { text: getI18Ntext("element.Date"), value: "last_update" },
                { text: getI18Ntext("element.Value"), value: "value" },
                { text: getI18Ntext("element.Year"), value: "year_published" },
                { text: getI18Ntext("element.BGG.rank"), value: "rank" },
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
            <PageSize type="game" />
          </div>
          <div>
            <Pagination type="game" count={count} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
