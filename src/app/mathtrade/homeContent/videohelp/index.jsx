import { linksToHelp } from "@/config/linksToHelp";
import { useState } from "react";
import posterSrc from "@/img/video-poster.jpg";
import Image from "next/image";
import Icon from "@/components/icon";
import I18N from "@/i18n";

const videoId = linksToHelp.video.split("v=")[1];

const Videohelp = () => {
  const [renderVideo, setRenderVideo] = useState(false);

  return (
    <div className="bg-white md:p-5 p-2 rounded-xl shadow-lg mb-4">
      {renderVideo ? (
        <div className="aspect-video bg-black">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            auto
          />
        </div>
      ) : (
        <div
          className="cursor-pointer bg-black"
          onClick={() => {
            setRenderVideo(true);
          }}
        >
          <Image
            src={posterSrc}
            width={1263}
            height={701}
            alt=""
            className="w-full hover:opacity-90 block transition-opacity"
          />
        </div>
      )}
      <div className="pt-4 sm:flex items-center gap-5 justify-center text-center">
        {/* <a
          href={linksToHelp.bgg}
          target="_blank"
          className="flex items-center justify-center gap-1 text-sky-700 hover:text-sky-500 underline"
        >
          <I18N id="link.mtBGG" />
          <div>
            <Icon type="bgg" />
            <Icon type="external-link" />
          </div>
        </a> 
        <div className="text-gray-500 sm:block hidden">/</div>
        */}

        <a
          href={linksToHelp.telegram}
          target="_blank"
          className="flex items-center justify-center gap-1 text-sky-700 hover:text-sky-500 underline"
        >
          <I18N id="link.mtTelegram" />
          <div>
            <Icon type="telegram" />
            <Icon type="external-link" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Videohelp;
