import { useContext, useEffect } from "react";
import { PageContext } from "@/context/page";
import Icon from "@/components/icon";

const ChatBoxButton = () => {
  /* PAGE CONTEXT **********************************************/
  const { showChatBox, setShowChatBox } = useContext(PageContext);

  return (
    <div className="fixed lg:bottom-4 bottom-12 lg:right-4 right-2 z-[999999] pt-3">
      <button
        className="hover:opacity-70"
        onClick={() => {
          setShowChatBox((v) => !v);
        }}
      >
        <div className="bg-primary text-white w-10 leading-10 mx-auto text-xl rounded-full mb-1">
          <Icon type="chatbox" />
        </div>
        <div className="uppercase text-primary text-[9px] font-bold lg:block hidden">
          Chat de ayuda
        </div>
      </button>
      {showChatBox ? (
        <div className="absolute w-80 min-h-[460px] bg-white shadow-xl bottom-full right-0">
          <iframe
            width="320"
            height="460"
            allow="microphone;"
            src="https://console.dialogflow.com/api-client/demo/embedded/a642ce57-93e6-4849-8060-8295894f2a98"
          ></iframe>
          <div className="bottom-0 right-0 -mb-5 lg:mr-6 mr-3 absolute w-0 h-0 border-[10px] border-l-transparent border-r-transparent border-b-transparent border-t-white" />
        </div>
      ) : null}
    </div>
  );
};

export default ChatBoxButton;
