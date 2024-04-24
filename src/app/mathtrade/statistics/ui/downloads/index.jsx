import I18N, { getI18Ntext } from "@/i18n";
import { urlBaseMedia, TradeMaximizerLinks } from "@/config/stats";
import Icon from "@/components/icon";

const Downloads = ({ stats }) => {
  return (
    <div className="bg-white px-5 py-4 rounded-xl shadow-xl">
      <h3 className="font-bold text-lg mb-5 text-gray-500 text-balance">
        <I18N id="stats.downloads.title" />
      </h3>
      <div className="rich-text">
        <p className="text-balance">
          <I18N
            id="stats.downloads.text1"
            values={[
              TradeMaximizerLinks.source,
              TradeMaximizerLinks.instructions,
            ]}
          />
        </p>
      </div>
      <p className="mb-4">
        <a
          href={urlBaseMedia + stats?.wants}
          className="bg-primary block text-white py-2 px-6 text-lg text-center w-fit mx-auto rounded-full hover:opacity-80"
          download
          target="_blank"
        >
          <Icon type="download" className="me-2" download target="_blank" />
          <I18N id="stats.downloads.btn.wants" />
        </a>
      </p>
      <p className="mb-4 text-balance">
        <I18N id="stats.downloads.text2" />
      </p>
      <p className="mb-4">
        <a
          href={urlBaseMedia + stats?.results}
          className="bg-primary block text-white py-2 px-6 text-lg text-center w-fit mx-auto rounded-full hover:opacity-80"
          download
          target="_blank"
        >
          <Icon type="download" className="me-2" download target="_blank" />
          <I18N id="stats.downloads.btn.results" />
        </a>
      </p>
    </div>
  );
};

export default Downloads;
