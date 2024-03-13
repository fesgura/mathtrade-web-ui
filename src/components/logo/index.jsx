import clsx from "clsx";
import LogoSVG from "./svg";

const Logo = () => {
  return (
    <div className="flex items-center justify-center mb-4">
      <div className="w-[70px]">
        <LogoSVG />
      </div>
      <div className="pl-4">
        <div className="text-4xl text-logo leading-8">
          <span className="font-bold">Math</span>Trade
        </div>
        <div className="text-gray-400  text-lg leading-5">Argentina</div>
      </div>
    </div>
  );
};

export default Logo;
