import { useState, useEffect, useRef } from "react";
import { getI18Ntext } from "@/i18n";

const useAsyncSelect = (options, value, onChange) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState("Cargando...");
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (options && options.length > 0) {
      const selectedOption = options.find((opt) => opt.value == value);

      if (selectedOption) {
        setDisplayedText(selectedOption.text);
      } else {
        setDisplayedText(getI18Ntext("form.SelectOptInstruction"));
      }
    } else {
      setDisplayedText("Cargando opciones...");
    }
  }, [options, value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleOptionClick = (optionValue) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return {
    isOpen,
    displayedText,
    wrapperRef,
    toggleDropdown,
    handleOptionClick,
  };
};

export default useAsyncSelect;
