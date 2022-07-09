import { useState, useEffect } from "react";

import classNames from "classnames";
import Icon from "components/icon";

const SVG_HAND = ({ fill }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 44 41"
      version="1.1"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinejoin: "round",
        strokeMiterlimit: 2,
      }}
    >
      <g transform="matrix(0.320172,0,0,0.360455,-85.6631,-61.6087)">
        <g transform="matrix(1.91248e-16,-2.77427,3.12332,1.69875e-16,-374.906,1125.6)">
          <path
            d="M319.191,225.252C319.372,225.304 319.567,225.268 319.718,225.155C319.869,225.042 319.957,224.864 319.957,224.675C319.957,221.243 319.957,207.929 319.957,207.929C319.957,207.025 320.691,206.292 321.595,206.292L324.87,206.292C325.773,206.292 326.507,207.025 326.507,207.929L326.507,226.828C326.507,227.107 326.7,227.35 326.973,227.413C327.007,227.42 327.041,227.428 327.076,227.436C327.255,227.477 327.442,227.435 327.585,227.321C327.728,227.207 327.811,227.034 327.811,226.852C327.811,223.393 327.811,209.215 327.811,209.215C327.811,208.311 328.545,207.577 329.448,207.577L332.723,207.577C333.627,207.577 334.361,208.311 334.361,209.215L334.361,227.332C334.361,227.666 334.594,227.953 334.921,228.022C334.953,228.029 334.987,228.036 335.02,228.043C335.213,228.083 335.414,228.041 335.575,227.927C335.735,227.812 335.84,227.635 335.865,227.44C336.177,224.91 337.163,216.941 337.163,216.941C337.297,216.047 338.132,215.431 339.025,215.565L342.264,216.052C343.157,216.187 343.774,217.021 343.639,217.915L342.287,228.912C342.278,228.992 342.266,229.077 342.25,229.167L342.24,229.221C342.24,229.221 341.854,231.393 341.719,231.59C339.317,240.812 332.904,248.167 323.25,248.167C312.764,248.167 304.25,239.653 304.25,229.167L304.25,212.072C304.25,211.168 304.984,210.435 305.887,210.435L309.162,210.435C310.066,210.435 310.799,211.168 310.799,212.072L310.799,222.897C310.799,223.204 311.031,223.462 311.336,223.494C311.371,223.498 311.405,223.502 311.44,223.505C311.609,223.523 311.778,223.468 311.905,223.355C312.031,223.241 312.104,223.079 312.104,222.908C312.104,220.115 312.104,209.5 312.104,209.5C312.104,208.597 312.837,207.863 313.741,207.863L317.016,207.863C317.92,207.863 318.653,208.597 318.653,209.5L318.653,224.645C318.653,224.913 318.83,225.148 319.087,225.222C319.122,225.232 319.156,225.242 319.191,225.252Z"
            style={{ fill }}
          />
        </g>
      </g>
    </svg>
  );
};

export const LoadingGraph = ({ fill = "#FFF" }) => {
  const list = [1, 2, 3, 4];
  return (
    <div className="loading-graph">
      <div className="domino">
        {list.map((a) => {
          return (
            <div className="domino-item" key={a}>
              <div className="domino-hand">
                <SVG_HAND fill={fill} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const LoadingBox = () => {
  return (
    <div className="loading-box">
      <LoadingGraph fill="rgb(27, 86, 135)" />
    </div>
  );
};

export const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <LoadingGraph />
    </div>
  );
};

export const LoadingPage = ({ loading }) => {
  const [status, set_status] = useState("");

  useEffect(() => {
    let timer = null;
    let timer2 = null;
    if (loading) {
      set_status("visible");
    } else {
      set_status("visible complete");
      timer = setTimeout(() => {
        set_status("visible complete hidden");
      }, 500);
      timer2 = setTimeout(() => {
        set_status("");
      }, 800);
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [loading]);

  return (
    <div className={classNames("loading-page", status)}>
      <div className="loading-page_inner" />
    </div>
  );
};

//export default Loading;
