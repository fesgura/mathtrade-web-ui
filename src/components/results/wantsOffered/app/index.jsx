import Item from "./item";
import UserSelector from "./userSelector";
import useWantsOffered from "./useWantsOffered";
import I18N from "@/i18n";

const WantsOfferedApp = () => {
  const { currentUserId, setCurrentUserId, wantsOffer } = useWantsOffered();

  return (
    <>
      <UserSelector
        currentUserId={currentUserId}
        setCurrentUserId={setCurrentUserId}
      />
      <p className="text-center text-balance">
        <I18N id="wantsOffered.text1" />
      </p>
      <p className="text-center text-balance mb-6 max-w-4xl mx-auto">
        <I18N id="wantsOffered.text2" />
      </p>
      <div className="border-t border-gray-400 pt-4">
        {wantsOffer.map((item, k) => {
          return <Item key={item.title + "_" + k} item={item} />;
        })}
      </div>
    </>
  );
};

export default WantsOfferedApp;
