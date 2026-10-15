/* eslint-disable @next/next/no-img-element */
import { getI18Ntext } from "@/i18n";
import clsx from "clsx";

const widthImage = 260;

const excluded = ["none", ""];

type ThumbnailElement = {
  thumbnail?: string;
  name?: string;
};

type ThumbnailProps = {
  className?: string;
  src?: string;
  // Take the parent's height instead of staying square, for the fixed-height
  // banner at the top of a card. Without it the cover keeps its own square
  // ratio and ignores the height the card reserved for it.
  fill?: boolean;
  // Show the whole cover instead of cropping it to fill the box. Box art
  // ratios vary a lot (square, tall, wide), so cropping to a card-shaped box
  // eats the sides or the title of many covers. The leftover space is filled
  // with a blurred, scaled-up copy of the same cover so the banner still
  // reads as full rather than as an image floating in a gray gap.
  contain?: boolean;
  elements?: ThumbnailElement[];
};

const Thumbnail = ({
  className = "",
  src = "",
  fill = false,
  contain = false,
  elements = [{ thumbnail: "" }],
}: ThumbnailProps) => {
  const image = src || elements[0]?.thumbnail || "";
  const hasImage = !!src || excluded.indexOf(elements[0]?.thumbnail || "") < 0;

  return (
    <div
      className={clsx(
        "relative overflow-hidden",
        contain ? "bg-gray-200" : null,
        className
      )}
    >
      {contain && hasImage ? (
        <span
          aria-hidden="true"
          // scale-110 keeps the blur's soft edges outside the box, otherwise
          // the fade to transparent is visible as a lighter frame.
          className="absolute inset-0 bg-center bg-cover blur-lg scale-110 opacity-80"
          style={{ backgroundImage: `url("${image}")` }}
        />
      ) : null}
      <picture
        className={clsx(
          "relative block w-full",
          contain ? null : "bg-gray-400",
          fill ? "h-full" : "aspect-square"
        )}
      >
        {hasImage ? (
          <img
            src={image}
            alt={`${getI18Ntext("thumbnail.alt.prefix")} ${elements[0]?.name}`}
            width={widthImage}
            height={widthImage}
            className={clsx(
              "w-full h-full block",
              contain ? "object-contain" : "object-cover"
            )}
          />
        ) : null}
      </picture>
    </div>
  );
};

export default Thumbnail;
