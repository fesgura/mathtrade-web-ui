import { ElementContextProvider } from "@/context/element";
import ElementWrapperInside from "@/components/element/elementCollection/elementWrapperInside";
import ElementInCombo from "./inCombo";
import ElementComplete from "./complete";

const ElementMD = ({ element, isCombo, onToggleExpanse }) => {
  return (
    <ElementContextProvider elementRaw={element}>
      <ElementWrapperInside padded={false}>
        {isCombo ? (
          <ElementInCombo onToggleExpanse={onToggleExpanse} />
        ) : (
          <ElementComplete onToggleExpanse={onToggleExpanse} />
        )}
      </ElementWrapperInside>
    </ElementContextProvider>
  );
};

export default ElementMD;
/* <div className="relative w-52 h-52 rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
          <Thumbnail elements={elements} className="rounded-lg w-52" />
          <div
            className="absolute top-0 left-0 w-full h-full bg-black/40 rounded-lg grid place-content-center backdrop-blur-sm cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
            onClick={onToggleExpanse}
          >
            <div className="text-center text-white">
              <Icon type="plus" className="text-5xl" />
              <div className="font-bold uppercase text-xs">
                <I18N id="Enlarge" />
              </div>
            </div>
          </div>
        </div> */

/* <div
            data-tooltip={getI18Ntext("Enlarge")}
            className="cursor-pointer"
            onClick={onToggleExpanse}
          >
            <h3 className="text-lg font-bold cropped hover:opacity-70">
              {title}
            </h3>
          </div> */

/* {!isCombo && (
            <>
              {titleLink ? (
                <LinkExternal
                  href={titleLink}
                  className="flex items-center gap-1 w-fit leading-none text-bgg text-xs mb-3"
                  tooltip="element.BGG.OpenGameInBGG"
                >
                  BGG
                  <Icon type="external-link" />
                </LinkExternal>
              ) : null}
              <div className="text-sm italic text-gray-500 mb-2">
                <LinkExternal
                  href={publisherLink}
                  tooltip="element.BGG.OpenEditionInBGG"
                >
                  {publisher}
                </LinkExternal>
              </div>

              <div className="text-sm text-purple-950 font-bold">
                {language}
              </div>
              <StatusBadge status={status} />
            </>
          )}
          */
