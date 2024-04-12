import clsx from "clsx";

const excluded = ["none", "N/A", ""];

const Avatar = ({ avatar = null, first_name = "", width = 32, onClick,className }) => {
  return avatar && excluded.indexOf(avatar || "") < 0 ? (
    <div
      className={clsx("block rounded-full aspect-square shadow-[0_0_0_1px_rgba(150,150,150,0.5)] overflow-hidden",className)}
      onClick={onClick}
      style={{ width }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatar}
        alt={first_name}
        width={width}
        height={width}
        className="object-cover w-full aspect-square block"
      />
    </div>
  ) : (
    <div
      className="bg-secondary h-full aspect-square text-white font-bold rounded-full flex flex-col items-center justify-center shadow-[0_0_0_1px_rgba(150,150,150,0.5)]"
      onClick={onClick}
      style={{ width }}
    >
      {first_name.charAt(0)}
    </div>
  );
};
export default Avatar;
