/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";

const Meme = ({ data }) => {
  const { title, description, image } = data;

  return (
    <div className="card-panel px-1">
      <div className="sm:w-96 w-[80vw] h-96 border border-gray-400 rounded-lg overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-700">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover pointer-events-none blur-md scale-110 opacity-80"
          />
        </div>
        <div className="w-full h-full relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain pointer-events-none shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Meme;
