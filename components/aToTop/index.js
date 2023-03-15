import Icon from "components/icon";
import { useEffect, useState } from "react";

const scrollLimit = 1500;

const AtoTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const setVisibleByScroll = () => {
      if (window.scrollY >= scrollLimit && !visible) {
        setVisible(true);
      }
      if (window.scrollY < scrollLimit && visible) {
        setVisible(false);
      }
    };

    setVisibleByScroll();
    window.addEventListener("scroll", setVisibleByScroll);

    return () => {
      window.removeEventListener("scroll", setVisibleByScroll);
    };
  }, [visible]);

  return visible ? (
    <a href="#a-top-pos" className="a-to-top">
      <Icon type="chevron-up" />
    </a>
  ) : null;
};

export default AtoTop;
