import I18N, { getI18Ntext } from "@/i18n";
import useFaqs from "./useFaqs";
import Faq from "./faq";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";

const FaqContent = () => {
  const { keyword, setKeyword, list, loading, error } = useFaqs();

  return (
    <div className="">
      <h2 className="font-bold text-center py-3 mb-6 text-2xl text-white bg-primary rounded-tl-2xl rounded-tr-2xl">
        <I18N id="help.title" />
      </h2>

      <div className="px-7 pb-5">
        <div className="text-center mb-6">
          <input
            type="text"
            placeholder={getI18Ntext("filter.Search")}
            value={keyword}
            onChange={({ target }) => {
              setKeyword(target.value);
            }}
            className="border border-stroke rounded-sm p-1 text-sm focus:outline-none w-72"
          />
        </div>
        <ErrorAlert error={error} />
        <div className="">
          {list.map((data, k) => {
            return <Faq key={k} data={data} />;
          })}
        </div>
        <LoadingBox loading={loading} />
      </div>
    </div>
  );
};

export default FaqContent;
