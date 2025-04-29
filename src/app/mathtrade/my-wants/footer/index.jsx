import useFooter from "./useFooter";
import OrderBy from "@/components/orderBy";
import I18N, { getI18Ntext } from "@/i18n";
import clsx from "clsx";
import SearchForm from "./search";
import AutocompleteButton from "./autocomplete";
import { LoadingBox } from "@/components/loading";

const Footer = () => {
  const { emptyWants, enabledBtn, onClick, loading } = useFooter();

  if (emptyWants) {
    return null;
  }
  return (
    <>
      {loading ? null : (
        <div className="want-footer fixed z-[3999] bottom-0 left-0 w-full shadow-[0_-1px_4px_rgba(0,0,0,0.3)]  lg:px-6 px-3 h-[60px] flex items-stretch gap-4">
          <div className="border-r border-dotted border-gray-400 pr-4 lg:block hidden">
            <div className="flex items-center gap-4 h-[60px] py-2">
              <div>
                <SearchForm />
              </div>
              <div>
                <OrderBy
                  type="wants"
                  options={[
                    { text: getI18Ntext("element.Type"), value: "type" },
                    { text: getI18Ntext("element.Name"), value: "name" },
                    { text: getI18Ntext("element.Value"), value: "value" },
                    {
                      text: getI18Ntext("element.MostWanted"),
                      value: "most_wanted",
                    },
                  ]}
                />
              </div>
              <div>
                <AutocompleteButton />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              className={clsx(
                "rounded-full outline-none transition-colors inline-block w-auto lg:px-7 px-2 py-2 lg:text-lg text-sm  shadow-md ",
                {
                  "bg-want text-white hover:opacity-75": enabledBtn,
                  "bg-gray-300 text-gray-400": !enabledBtn,
                }
              )}
              onClick={onClick}
              disabled={!enabledBtn}
            >
              <I18N id="MyWants.btn.Save" />
            </button>
          </div>
        </div>
      )}
      <LoadingBox loading={loading} />
    </>
  );
};
export default Footer;
