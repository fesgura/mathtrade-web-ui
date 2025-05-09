import { useStore, useOptions } from "@/store";
import { useEffect, useState, useContext } from "react";
import { PageContext } from "@/context/page";
import Modal from "../modal";
import TextBox from "./textbox";

const EarlyPayPopupUI = () => {
  /* STORE */
  const store = useStore((state) => state.data);
  const { membership } = store;
  /* end STORE */

  /* OPTIONS */
  const options = useOptions((state) => state.options);
  const updateOptions = useOptions((state) => state.updateOptions);
  /* end OPTIONS */

  /* PAGE CONTEXT */
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT */

  const [showModal, setShowModal] = useState({
    show: false,
    status: "",
  });

  useEffect(() => {
    if (!membership) {
      return;
    }
    const earlyPayPopupList = options?.earlyPayPopupList || [];

    if (canI.offer && earlyPayPopupList.indexOf("offer") < 0) {
      setShowModal({
        show: true,
        status: "offer",
      });
      return;
    }
    if (canI.want && earlyPayPopupList.indexOf("want") < 0) {
      setShowModal({
        show: true,
        status: "want",
      });
      return;
    }
  }, [options, membership, canI]);

  return (
    <Modal isOpen={showModal.show} size="sm" canNotClose>
      <TextBox />
      <div className="flex justify-center">
        <button
          className="bg-primary text-white font-bold px-8 py-2 text-xl rounded-full"
          onClick={() => {
            const { status } = showModal;
            const earlyPayPopupList = options?.earlyPayPopupList || [];
            earlyPayPopupList.push(status);
            updateOptions({
              earlyPayPopupList,
            });
            setShowModal({
              show: false,
              status: "",
            });
          }}
        >
          Ok
        </button>
      </div>
    </Modal>
  );
};

export default EarlyPayPopupUI;
