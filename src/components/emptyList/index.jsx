import I18N from "@/i18n";

const EmptyList = ({ visible, message }) => {
  return visible ? (
    <div className="text-center italic font-bold text-xl text-gray-600 py-4">
      <I18N id={message || "EmptyList"} />
    </div>
  ) : null;
};

export default EmptyList;
