import Icon from "@/components/icon";
import I18N from "@/i18n";

const iconList = [
  {
    icon: "eye",
    text: "preview",
    color: "primary",
  },
  {
    icon: "calendar",
    text: "timeline",
  },
  {
    icon: "notifications",
    text: "notification",
  },
  {
    icon: "heart",
    text: "want",
  },
];

const Iconshelp = () => {
  return (
    <>
      <h3 className="font-bold text-lg mb-5 text-gray-500">
        <I18N id="quickhelp.icons" />
      </h3>
      <ul>
        {iconList.map(({ icon, text, color }) => {
          return (
            <li className="grid grid-cols-[30px_auto] gap-2 mb-4" key={icon}>
              <div
                className={`text-white bg-${
                  color || "black"
                } w-7 h-7 leading-7 text-center rounded-full`}
              >
                <Icon type={icon} />
              </div>
              <div className="text-balance pt-[2px]">
                <I18N id={`iconhelp.text.${text}`} />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Iconshelp;
