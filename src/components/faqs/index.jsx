import { useContext } from "react";
import { PageContext } from "@/context/page";
import Modal from "@/components/modal";
import FaqContent from "./faqsContent";

const Faqs = () => {
  const { showFaqsModal, toogleShowFaqsModal } = useContext(PageContext);

  return (
    <Modal isOpen={showFaqsModal} onClose={toogleShowFaqsModal} size="md2">
      <FaqContent />
    </Modal>
  );
};

export default Faqs;
