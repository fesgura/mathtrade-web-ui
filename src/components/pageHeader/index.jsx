/* eslint-disable @next/next/no-img-element */
import I18N from "@/i18n";
import clsx from "clsx";
import PageHeaderDescription from "./description";
import Wrapper from "../wrapper";
import img1 from "@/img/page-header/1.webp";
import img2 from "@/img/page-header/2.webp";
import img3 from "@/img/page-header/3.webp";
import img4 from "@/img/page-header/4.webp";
import img5 from "@/img/page-header/5.webp";
import img6 from "@/img/page-header/6.webp";
import img7 from "@/img/page-header/7.webp";
import img8 from "@/img/page-header/8.webp";
import img9 from "@/img/page-header/9.webp";
import img10 from "@/img/page-header/10.webp";
import img11 from "@/img/page-header/11.webp";

const imgs = {
  1: {
    src: img1.src,
    opacity: 0.3,
    blur: 1,
  },
  2: {
    src: img2.src,
    opacity: 0.4,
    blur: 4,
  },
  3: {
    src: img3.src,
    opacity: 0.3,
    blur: 2,
  },
  4: {
    src: img4.src,
    opacity: 0.6,
    blur: 3,
  },
  5: {
    src: img5.src,
    opacity: 0.4,
    blur: 2,
  },
  6: {
    src: img6.src,
    opacity: 0.4,
    blur: 3,
  },
  7: {
    src: img7.src,
    opacity: 0.5,
    blur: 3,
  },
  8: {
    src: img8.src,
    opacity: 0.3,
    blur: 2,
  },
  9: {
    src: img9.src,
    opacity: 0.5,
    blur: 3,
  },
  10: {
    src: img10.src,
    opacity: 0.4,
    blur: 3,
  },
  11: {
    src: img11.src,
    opacity: 0.6,
    blur: 3,
  },
};

const PageHeader = ({
  title,
  description,
  name = "home",
  noHideDescription,
  bgImg = 1,
}) => {
  return title || description ? (
    <Wrapper>
      <header
        className={clsx(
          "bg-gradient-to-bl overflow-hidden relative mb-main shadow-main rounded-main md:pt-0 pt-5 md:pb-0 pb-7",
          {
            "from-sky-700 to-purple-700": name === "home",
            "from-orange-600 to-purple-900": name === "games",
            "from-sky-600 to-purple-900": name === "myOffer",
            "from-red-700 to-purple-900": name === "items",
            "from-orange-600 to-purple-800": name === "myCollection",
            "from-want to-sky-800": name === "myWants",
            "from-teal-600 to-teal-800": name === "results",
            "from-purple-900 to-gray-900": name === "stats",
            "from-sky-600 to-indigo-800": name === "myData",
            "from-red-500 to-purple-800": name === "myAccount",
            "from-want to-sky-700": name === "faqs",
            "from-red-600 to-purple-800": name === "referral",
            "from-sky-600 to-purple-900": name === "chains",
          }
        )}
      >
        <img
          src={imgs[bgImg]?.src}
          alt="bg"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{
            opacity: imgs[bgImg]?.opacity,
            filter: `blur(${imgs[bgImg]?.blur}px)`,
          }}
        />
        <div className=" lg:py-10 py-4 px-[10%] relative">
          <h1 className="text-white lg:text-6xl font-bold text-4xl text-balance">
            <I18N id={title} />
          </h1>
          {description ? (
            <div className="pl-3">
              <PageHeaderDescription
                description={description}
                name={name}
                noHideDescription={noHideDescription}
              />
            </div>
          ) : null}
        </div>
      </header>
    </Wrapper>
  ) : null;
};
export default PageHeader;
