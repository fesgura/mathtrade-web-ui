import { useState } from "react";
import Icon from "../icon";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
} from "@floating-ui/react";
import I18N from "@/i18n";

const HelpContext = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    // placement: "top",
    strategy: "fixed",
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(-20), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, {
    event: "mousedown",
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <div
        className="flex items-center cursor-pointer"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <div className="text-[10px] bg-white border border-orange-500 h-5 leading-4 text-orange-900 rounded-tl-full rounded-bl-full px-2 ">
          <I18N id={`helpcontext.title.${id}`} />
        </div>
        <div className="bg-orange-500 rounded-tr-full rounded-br-full border border-orange-500 text-white text-[15px] h-5 w-5 leading-none pr-1">
          <Icon type="help3" />
        </div>
      </div>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={{ ...floatingStyles, zIndex: 9999999 }}
            {...getFloatingProps()}
            className=" shadow-[0_1px_10px_rgba(0,0,0,0.2)] z-[999999] animate-fadein min-w-[200px] max-w-[300px] rounded-md flex"
          >
            <div className="text-3xl bg-orange-600 text-white rounded-tl-md rounded-bl-md p-2">
              <div className="leading-none">
                <Icon type="help3" />
              </div>
            </div>

            <div className="bg-white border border-orange-600 px-3 pb-2 rounded-tr-md rounded-br-md text-sm leading-6 text-gray-900">
              <div className="font-bold border-b border-gray-300 py-1 mb-2 text-gray-600 italic">
                <I18N id={`helpcontext.title.${id}`} />
              </div>
              <I18N id={`helpcontext.answer.${id}`} />
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};

export default HelpContext;
