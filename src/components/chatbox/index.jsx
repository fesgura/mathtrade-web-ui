"use client";
import { useContext, useEffect } from "react";
import { PageContext } from "@/context/page";

const ChatBoxButton = () => {
  /* PAGE CONTEXT **********************************************/
  const { userId } = useContext(PageContext);

  useEffect(() => {
    let dfMessenger = null;

    const onLoaded = function (event) {
      document
        .querySelector("df-messenger")
        .shadowRoot.querySelector(".df-messenger-wrapper")
        .querySelector("#widgetIcon").style.bottom = "30px";
    };

    if (window) {
      const dfMessenger = document.querySelector("df-messenger");
      dfMessenger.addEventListener("df-messenger-loaded", onLoaded);
    }

    return () => {
      if (window && dfMessenger) {
        dfMessenger.removeEventListener("df-messenger-loaded", onLoaded);
      }
    };
  }, []);

  return (
    <div className="relative z-[99999999]">
      <df-messenger
        chat-icon="https:&#x2F;&#x2F;www.mathtrade.com.ar&#x2F;chatbox.png"
        intent="WELCOME"
        chat-title="Ayuda Math Trade"
        agent-id="a642ce57-93e6-4849-8060-8295894f2a98"
        language-code="es"
        user-id={userId}
        session-id="1"
        wait-open
      ></df-messenger>
    </div>
  );
};

export default ChatBoxButton;
