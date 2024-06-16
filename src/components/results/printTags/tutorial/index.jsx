import I18N from "@/i18n";
import Icon from "@/components/icon";
import clsx from "clsx";
import { useState } from "react";
import Image from "next/image";
import img1 from "@/img/tut-tags/1.jpg";
import img2 from "@/img/tut-tags/2.jpg";
import img3 from "@/img/tut-tags/3.jpg";
import img4 from "@/img/tut-tags/4.jpg";

const items = [
  {
    img: img1,
    text: 1,
  },
  {
    img: img2,
    text: 2,
  },
  {
    img: img3,
    text: 3,
  },
  {
    img: img4,
    text: 4,
  },
];

const Item = ({ item }) => {
  return (
    <div className="lg:w-1/4 md:w-1/2 sm:w-full px-4 pb-5">
      <Image
        src={item.img}
        alt=""
        width={450}
        height={260}
        className="rounded-xl w-full shadow-lg border border-gray-400"
        priority
      />
      <p className="pt-2 text-balance text-sm px-1">
        <I18N id={`tutorial.tags.item.${item.text}`} />
      </p>
    </div>
  );
};

const Content = () => {
  return (
    <div className="flex flex-wrap pt-4">
      {items.map((item, k) => {
        return <Item key={k} item={item} />;
      })}
    </div>
  );
};

const Tutorial = ({ startOpen = false }) => {
  const [isOpen, setIsOpen] = useState(startOpen);
  return (
    <div className="pb-8 text-left">
      <div className="bg-white px-5 py-4 rounded-xl shadow-xl">
        <h3
          className="font-bold text-xl  text-balance cursor-pointer"
          onClick={() => {
            setIsOpen((v) => !v);
          }}
        >
          <Icon
            type="chevron-right"
            className={clsx("text-3xl transition-transform", {
              "rotate-90": isOpen,
            })}
          />
          <I18N id="tutorial.tags.title" />
        </h3>
        {!isOpen ? null : <Content />}
      </div>
    </div>
  );
};

export default Tutorial;
