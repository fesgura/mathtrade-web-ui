import { PageContext } from "@/context/page";
import { useState, useCallback, useContext, useRef, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import QRCode from "qrcode";
import { LoadingBox } from "../loading";
import ErrorAlert from "../errorAlert";

const UserQR = () => {
  const canvasRef = useRef(null);

  const [userData, setUserData] = useState(null);

  const { membership } = useContext(PageContext);

  const afterLoad = useCallback(
    (user) => {
      const { user_id: membership_id } = membership;

      const {
        id: user_id,
        first_name,
        last_name,
        phone,
        email,
        telegram,
      } = user;
      setUserData({
        user_id,
        membership_id,
        first_name,
        last_name,
        phone,
        email,
        telegram,
      });
    },
    [membership]
  );

  /* GET USER ***********************************/
  const [, , loading, error] = useFetch({
    endpoint: "GET_USER",
    autoLoad: true,
    afterLoad,
  });
  /* end GET USER ***********************************/

  useEffect(() => {
    if (userData) {
      const secret = "secret-key";
      QRCode.toCanvas(
        canvasRef.current,
        JSON.stringify({ ...userData, secret }),
        function (error) {
          if (error) console.error(error);
          console.log("success!");
        }
      );
    }
  }, [userData]);

  return (
    <div className="max-w-[290px] border border-gray-300 bg-white shadow-md rounded-xl p-4 mb-5 relavive">
      <div className="max-w-[260px] mx-auto mb-3">
        <canvas
          className="bg-white block mx-auto w-full h-full border border-gray-300 shadow-md"
          ref={canvasRef}
          width="260"
          height="260"
        />
      </div>
      <ErrorAlert error={error} />
      <p className="text-center text-balance text-sm font-bold text-gray-600">
        Presentate con este QR en el evento central en CABA, para que podamos
        identificarte.
      </p>
      <LoadingBox loading={loading} error={error} />
    </div>
  );
};

export default UserQR;
