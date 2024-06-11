import { LoadingBox } from "@/components/loading";
import usePaymentInfo from "./usePaymentInfo";
import PhotoGallery from "@/components/photoGallery";
import I18N from "@/i18n";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import ErrorAlert from "@/components/errorAlert";
import SuccessAlert from "@/components/successAlert";

const PaymentInfo = () => {
  const {
    text,
    images,
    loading,
    error,
    changeImages,
    isImagesChanged,
    handleClickSendImages,
    successSend,
  } = usePaymentInfo();

  return text ? (
    <div className="bg-white rounded-xl shadow-xl max-w-3xl mx-auto">
      <div className="relative px-5 py-4">
        <div className="mb-9 rich-text">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
        <div className="text-center text-red-600 text-xl font-bold mb-5 text-balance">
          Recordá que tenés que subir la imagen del comprobante de pago para que
          sepamos que ya pagaste.
        </div>
        <div className="w-fit mx-auto">
          <PhotoGallery
            images={images}
            setImages={changeImages}
            className="mb-3 border-b border-gray-300 pb-3"
            title="photo.payment.title"
            subtitle="photo.payment.subtitle"
            max={2}
            extended
          />
        </div>
        <ErrorAlert error={error} />
        {successSend ? <SuccessAlert text="payment.btn.success" /> : null}
        <div className="pb-4 text-center">
          <button
            className={clsx("text-white py-2 px-5 rounded-full text-xl", {
              "bg-primary": isImagesChanged,
              "bg-gray-400 cursor-not-allowed": !isImagesChanged,
            })}
            disabled={!isImagesChanged}
            onClick={handleClickSendImages}
          >
            <I18N id="payment.btn" />
          </button>
        </div>
        <LoadingBox loading={loading} />
      </div>
    </div>
  ) : (
    <div className="text-center py-4 text-xl">
      <I18N id="results.tags.nopayments" />
    </div>
  );
};

export default PaymentInfo;
