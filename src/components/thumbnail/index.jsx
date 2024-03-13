/* eslint-disable @next/next/no-img-element */
import { getI18Ntext } from "@/i18n";
import clsx from "clsx";

const widthImage = 260;

const excluded = ["none", ""];

const Thumbnail = ({ className, src, elements = [{ thumbnail: "" }] }) => {
  return (
    <div className={clsx("relative overflow-hidden", className)}>
      <picture className="block bg-gray-400 w-full aspect-square">
        {src || excluded.indexOf(elements[0]?.thumbnail || "") < 0 ? (
          <img
            src={src || elements[0]?.thumbnail || ""}
            alt={`${getI18Ntext("thumbnail.alt.prefix")} ${elements[0]?.name}`}
            width={widthImage}
            height={widthImage}
            className="object-cover w-full h-full block"
          />
        ) : null}
      </picture>
    </div>
  );
};

export default Thumbnail;
