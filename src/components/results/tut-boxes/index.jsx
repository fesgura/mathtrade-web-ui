/* eslint-disable @next/next/no-img-element */
import img1 from "@/img/tut-boxes/1_300.jpg";
import img2 from "@/img/tut-boxes/2_300.jpg";
import img3 from "@/img/tut-boxes/3_300.jpg";
import img4 from "@/img/tut-boxes/4_300.jpg";
import img5 from "@/img/tut-boxes/5_300.jpg";

const items = [img1, img3];

const TutBoxesResults = () => {
  return (
    <div className="py-11 px-3 max-w-5xl mx-auto ">
      <h2 className="text-center text-balance text-2xl mb-5 text-gray-600 italic">
        Reglas para preparar los paquetes
      </h2>
      <div className="flex flex-col border border-gray-500 overflow-hidden rounded-xl shadow-lg bg-white">
        {items.map((img, k) => {
          return (
            <img
              src={img.src}
              alt=""
              width={img.width}
              height={img.height}
              className="w-full block"
              key={k}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TutBoxesResults;
