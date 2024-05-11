import clsx from "clsx";

const TradeArrows = ({ inverted }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox="0 0 73 70"
      className={clsx({ "rotate-180": inverted })}
    >
      <path
        fill="#00B86B"
        d="M605.499 438.592v-15.577h56.894V408.55l37.294 22.253-37.294 22.254v-14.465h-56.894z"
        transform="translate(-585.728 -357.359) matrix(.77427 0 0 .80568 116.91 28.2)"
      ></path>
      <path
        fill="#FF6E6F"
        d="M605.499 438.592v-15.577h55.817V408.55l38.371 22.253-38.371 22.254v-14.465h-55.817z"
        transform="translate(-585.728 -357.359) matrix(-.71057 0 0 -.76074 1085.9 738.018)"
      ></path>
    </svg>
  );
};

export default TradeArrows;
