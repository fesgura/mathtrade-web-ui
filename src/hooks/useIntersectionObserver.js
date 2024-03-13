import { useEffect, useState } from "react";

const useIntersectionObserver = (rootRef, targetRef, threshold = 1) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = rootRef?.current || null;
    const target = targetRef?.current || null;

    if (!root || !target) {
      return null;
    }

    let observer = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !visible) {
            setVisible(true);
          }
          if (!entry.isIntersecting && visible) {
            setVisible(false);
          }
        });
      },
      {
        root,
        rootMargin: "0px",
        threshold,
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [visible, rootRef, targetRef, threshold]);

  return visible;
};

export default useIntersectionObserver;
