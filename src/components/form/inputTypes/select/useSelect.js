import { useState, useEffect, useRef, useCallback } from "react";
import { normalizeString } from "@/utils";
import { getI18Ntext } from "@/i18n";

const useSelect = (
  options,
  defaultValue,
  multiple,
  translateOptions,
  onChange,
  startFocus
) => {
  const [visiblePad, setVisible] = useState(false);
  const [optionsComplete, setOptionsComplete] = useState([]);

  const [placeholder] = useState(getI18Ntext("form.SelectOptInstruction"));
  const [textInput, setTextInput] = useState("");
  const [valueOutput, setValueOutput] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (startFocus) {
      inputRef.current.focus();
    }
  }, [startFocus]);

  useEffect(() => {
    if (options.length) {
      const newOptionsComplete = options.map((option) => {
        return {
          ...option,
          type: option?.type || "item",
          value: option.value,
          text: translateOptions ? getI18Ntext(option.text) : option.text,
          chosen: multiple ? defaultValue?.indexOf(option.value) >= 0 : false,
          filtered: true,
        };
      });
      setOptionsComplete(newOptionsComplete);

      setValueOutput(defaultValue);
      if (!multiple) {
        const indexInOptionsComplete = newOptionsComplete.findIndex(
          (o) => o.value === defaultValue
        );
        if (indexInOptionsComplete >= 0) {
          setTextInput(newOptionsComplete[indexInOptionsComplete].text);
        } else {
          setTextInput("");
        }
      }
    } else {
      // setOptionsComplete([]);
    }
  }, [options, defaultValue, multiple, translateOptions]);

  const filterList = useCallback(
    (str) => {
      if (!str) {
        setOptionsComplete(
          optionsComplete.map((o) => ({ ...o, filtered: true }))
        );
      } else {
        const strNormalized = normalizeString(str);
        setOptionsComplete(
          optionsComplete.map((o) => ({
            ...o,
            filtered: normalizeString(o.text).indexOf(strNormalized) >= 0,
          }))
        );
      }
    },
    [optionsComplete]
  );

  const handleVisiblePad = useCallback(
    (e) => {
      if (e.type === "focus") {
        filterList("");
        setVisible(true);
      } else {
        setTimeout(() => {
          setVisible(false);
        }, 160);
      }
    },
    [filterList]
  );

  const handleOutput = useCallback(
    (optionValue, multiple, action, optionComplete) => {
      let newValueOutput = "";
      if (multiple) {
        if (optionValue !== undefined && optionValue !== null) {
          const indexInOptionsComplete = optionsComplete.findIndex(
            (o) => o.value === optionValue
          );
          const newOptionsComplete = [...optionsComplete];
          // if (newOptionsComplete[indexInOptionsComplete] !== undefined) {
          newOptionsComplete[indexInOptionsComplete].chosen = action === "add";
          //  }

          setOptionsComplete(newOptionsComplete);

          newValueOutput = newOptionsComplete
            .filter((o) => o.chosen)
            .map((o) => o.value)
            .join(",");

          setValueOutput(newValueOutput);
          if (onChange) {
            onChange(newValueOutput, optionComplete);
          }
        }
      } else {
        setValueOutput(optionValue);
        if (onChange) {
          onChange(optionValue, optionComplete);
        }
      }
    },
    [optionsComplete, onChange]
  );

  const handleTextInput = useCallback(
    (e) => {
      const str = e.target.value;
      setTextInput(str);
      filterList(str);
      handleOutput("", multiple);
    },
    [filterList, handleOutput, multiple]
  );

  const handleClickOption = useCallback(
    (option) => {
      if (multiple) {
        setTextInput("");
      } else {
        setTextInput(option.text);
      }
      handleOutput(option.value, multiple, "add", option);
    },
    [handleOutput, multiple]
  );
  const handleRemoveOption = useCallback(
    (option) => {
      handleOutput(option.value, true, "remove");
    },
    [handleOutput]
  );

  const setFocus = useCallback(() => {
    if (inputRef && inputRef.current) inputRef.current.focus();
  }, [inputRef]);

  return {
    placeholder: getI18Ntext("form.SelectOptInstruction"),
    visiblePad,
    handleVisiblePad,
    textInput,
    handleTextInput,
    optionsComplete,
    handleClickOption,
    handleRemoveOption,
    valueOutput,
    setFocus,
    inputRef,
    visibleInput:
      optionsComplete.length > optionsComplete.filter((i) => i.chosen).length,
    withGroup: optionsComplete.filter((i) => i.type === "group").length > 0,
  };
};

export default useSelect;
