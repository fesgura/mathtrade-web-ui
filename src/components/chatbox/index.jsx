"use client";
import { useContext, useEffect } from "react";
import { PageContext } from "@/context/page";
import { Z } from "@/config/zIndex";

const ICON_SIZE = "48px";

// Opens the help chat from anywhere (Ayuda → "Chatear con el asistente").
export const OPEN_CHAT_EVENT = "mt:open-chat";
export const openHelpChat = () => window.dispatchEvent(new Event(OPEN_CHAT_EVENT));

/**
 * The help assistant (Dialogflow Messenger). No floating button anymore (it
 * covered content and overlapped other badges): it's opened from Ayuda, and
 * its own round button shows only while the chat is open, to close it.
 */
const ChatBoxButton = () => {
  const { userId } = useContext(PageContext);

  useEffect(() => {
    const dfMessenger = document.querySelector("df-messenger");
    if (!dfMessenger) {
      return undefined;
    }
    const getIcon = () => dfMessenger.shadowRoot?.querySelector("#widgetIcon");
    // The widget marks itself open with an `expand` attribute.
    const isOpen = () => dfMessenger.hasAttribute("expand");
    let open = isOpen();

    const applyIconStyle = () => {
      const icon = getIcon();
      if (!icon) return;
      icon.style.bottom = "20px";
      icon.style.right = "20px";
      icon.style.width = ICON_SIZE;
      icon.style.height = ICON_SIZE;
      // Above the content, below page action bars (Mis deseos footer).
      icon.style.zIndex = `${Z.sticky}`;
      // The image centered in the circle.
      icon.style.display = open ? "flex" : "none";
      icon.style.alignItems = "center";
      icon.style.justifyContent = "center";
      icon.querySelectorAll("img, svg").forEach((el) => {
        el.style.width = "60%";
        el.style.height = "60%";
        el.style.margin = "0";
        el.style.objectFit = "contain";
      });
    };

    const observer = new MutationObserver(() => {
      open = isOpen();
      applyIconStyle();
    });
    observer.observe(dfMessenger, { attributes: true, attributeFilter: ["expand"] });
    const onOpenRequest = () => {
      if (isOpen()) return;
      open = true;
      applyIconStyle();
      getIcon()?.click();
    };

    dfMessenger.addEventListener("df-messenger-loaded", applyIconStyle);
    window.addEventListener(OPEN_CHAT_EVENT, onOpenRequest);
    applyIconStyle();

    return () => {
      dfMessenger.removeEventListener("df-messenger-loaded", applyIconStyle);
      observer.disconnect();
      window.removeEventListener(OPEN_CHAT_EVENT, onOpenRequest);
    };
  }, []);

  return (
    <div className="relative z-sticky">
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
