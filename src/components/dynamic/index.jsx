import { Suspense } from "react";
import Icon from "../icon";

const FallbackLoading = ({ h }) => {
  return (
    <div
      className="text-gray-400 text-center text-5xl py-4"
      style={{ minHeight: h }}
    >
      <Icon type="loading" />
    </div>
  );
};

const Dynamic = ({ children, h = 450 }) => {
  return <Suspense fallback={<FallbackLoading h={h} />}>{children}</Suspense>;
};
export default Dynamic;
