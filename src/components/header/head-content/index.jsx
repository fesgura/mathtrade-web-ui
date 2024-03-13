import Icon from "@/components/icon";
import clsx from "clsx";

const HeadContent = ({ children, visibleMobile, toggleMobile }) => {
  return (
    <aside
      className={clsx(
        "lg:absolute lg:top-[100%] right-0 lg:w-auto lg:max-w-min lg:hidden lg:peer-hover:block lg:hover:block lg:animate-fadeup animate-faderight fixed top-0 w-full max-w-full h-full z-[25000]",
        {
          hidden: !visibleMobile,
          block: visibleMobile,
        }
      )}
    >
      <div className="absolute top-[-16px] right-2 z-[12]  w-0 h-0 ml-auto  border-8 border-t-transparent  border-l-transparent border-r-transparent border-b-white lg:block hidden" />
      <button
        className="absolute top-0 right-0 w-10 h-10 text-gray-600 lg:hidden"
        onClick={toggleMobile}
      >
        <Icon />
      </button>
      <div className="scrollbar bg-white min-w-[260px] lg:shadow-lg overflow-y-auto overflow-x-hidden lg:max-h-[calc(100vh-50px)] lg:h-min h-full lg:pt-0 pt-10">
        {children}
      </div>
    </aside>
  );
};
export default HeadContent;
