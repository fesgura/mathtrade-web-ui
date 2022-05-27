import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";

const Slider = ({ images = [], width = 528, height = 500, ...rest }) => {
  return images.length ? (
    <Splide {...rest}>
      {images.map((img, k) => {
        return (
          <SplideSlide key={k}>
            <Image
              src={img.src}
              alt={img.alt || "image"}
              width={`${width}px`}
              height={`${height}px`}
            />
          </SplideSlide>
        );
      })}
    </Splide>
  ) : null;
};

export default Slider;
