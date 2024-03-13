import Button from "@/components/button";
import Modal from "@/components/modal";
import I18N from "@/i18n";
import { useState } from "react";

const ButtonAlert = ({
  className,
  ariaLabel,
  disabled,
  children,
  onClick,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setIsOpen((v) => !v);
  };

  return (
    <>
      <button
        className={className}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={toggleIsOpen}
      >
        {children}
      </button>
      <Modal size="sm" isOpen={isOpen} onClose={toggleIsOpen}>
        <div className="text-center">
          <h3 className="text-xl mb-2 font-bold">
            <I18N id={title} />
          </h3>
          <div className="flex items-center justify-center gap-3 pt-4">
            <Button color="cancel" outline onClick={toggleIsOpen}>
              <I18N id="btn.Cancel" />
            </Button>
            <Button
              color="danger"
              className="px-9"
              onClick={(e) => {
                toggleIsOpen(e);
                if (onClick) {
                  onClick();
                }
              }}
            >
              <I18N id="Yes" />
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ButtonAlert;
