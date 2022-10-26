import Slider from "components/slider";
import pic1 from "assets/img/login/1.jpg";
import pic2 from "assets/img/login/2.jpg";
import pic3 from "assets/img/login/3.jpg";
import pic4 from "assets/img/login/4.jpg";
import Logo from "components/logo";

const LoginSlider = () => {
  return (
    <div className="login-slider-container">
      <div className="login-slider-container_float">
        <Slider
          images={[
            { src: pic1, alt: "Math Trade Argentina" },
            { src: pic2, alt: "Math Trade Argentina" },
            { src: pic3, alt: "Math Trade Argentina" },
            { src: pic4, alt: "Math Trade Argentina" },
          ]}
        />
      </div>

      <div className="login-logo-container">
        <Logo type="vertical" />
      </div>
    </div>
  );
};

export default LoginSlider;
