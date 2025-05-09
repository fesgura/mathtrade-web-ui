import clsx from "clsx";
import LogoSVG from "./svg";

export const LogoBig = ({ className }) => {
  return (
    <div className={clsx("flex items-center justify-center", className)}>
      <div className="md:w-[160px] w-[80px]">
        <div className="rounded-full mb-1 shadow-lg  shadow-white/80">
          <LogoSVG />
        </div>
        <div className="md:w-[110px] w-[50px] mx-auto opacity-50 blur-[3px]">
          <div className="bg-black aspect-square rounded-full scale-y-[0.1] origin-top"></div>
        </div>
      </div>
    </div>
  );
};

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
