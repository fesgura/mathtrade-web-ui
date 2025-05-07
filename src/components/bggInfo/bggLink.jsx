import Icon from "@/components/icon";
import { getI18Ntext } from "@/i18n";

const BGGlink = ({ href }) => {
  return (
    <div className="" data-tooltip={getI18Ntext("element.BGG.OpenGameInBGG")}>
      <a
        href={href}
        target="_blank"
        rel="nofollow noopener"
        className="flex items-center bg-bggback rounded-md gap-1 pl-1 hover:shadow-lg hover:opacity-90 transition-all duration-200 ease-in-out"
      >
        <Icon type="bgg-full" className="text-bgg " />
        <div className="text-white font-bold pr-1 text-xs">BGG</div>
        <div className="bg-bgg text-white rounded-r-md text-center w-6 text-sm p-[2px]">
          <Icon type="external-link" />
        </div>
      </a>
    </div>
  );
};
export default BGGlink;
// #ff5100
