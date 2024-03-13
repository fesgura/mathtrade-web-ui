"use client";
import Button from "@/components/button";
import Modal from "@/components/modal";
import { useState } from "react";
import I18N from "@/i18n";
import Icon from "@/components/icon";

const WhatIsMathTrade = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen((v) => !v);
  };

  return (
    <>
      <button
        onClick={toggleIsOpen}
        className="bg-white rounded-full px-4 py-1 shadow-md hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center gap-1">
          <div className="text-gray-400 font-bold text-sm">
            <I18N id="whatIsMathTrade" />
          </div>
          <div className="text-primary/70 text-2xl relative top-[-1px]">
            <Icon type="help" />
          </div>
        </div>
      </button>
      <Modal isOpen={isOpen} onClose={toggleIsOpen}>
        <div>
          <p>
            Nunc nec ligula a tortor sollicitudin dictum in vel enim. Quisque
            facilisis turpis vel eros dictum aliquam et nec turpis. Sed eleifend
            a dui nec ullamcorper. Praesent vehicula lacus ac justo accumsan
            ullamcorper.Nunc nec ligula a tortor sollicitudin dictum in vel
            enim. Quisque facilisis turpis vel eros dictum aliquam et nec
            turpis. Sed eleifend a dui nec ullamcorper. Praesent vehicula lacus
            ac justo accumsan ullamcorper.
          </p>
          <p>
            Nunc nec ligula a tortor sollicitudin dictum in vel enim. Quisque
            facilisis turpis vel eros dictum aliquam et nec turpis. Sed eleifend
            a dui nec ullamcorper. Praesent vehicula lacus ac justo accumsan
            ullamcorper.Nunc nec ligula a tortor sollicitudin dictum in vel
            enim. Quisque facilisis turpis vel eros dictum aliquam et nec
            turpis. Sed eleifend a dui nec ullamcorper. Praesent vehicula lacus
            ac justo accumsan ullamcorper.
          </p>
          <p>
            Nunc nec ligula a tortor sollicitudin dictum in vel enim. Quisque
            facilisis turpis vel eros dictum aliquam et nec turpis. Sed eleifend
            a dui nec ullamcorper. Praesent vehicula lacus ac justo accumsan
            ullamcorper.Nunc nec ligula a tortor sollicitudin dictum in vel
            enim. Quisque facilisis turpis vel eros dictum aliquam et nec
            turpis. Sed eleifend a dui nec ullamcorper. Praesent vehicula lacus
            ac justo accumsan ullamcorper.
          </p>
          <p>
            Nunc nec ligula a tortor sollicitudin dictum in vel enim. Quisque
            facilisis turpis vel eros dictum aliquam et nec turpis. Sed eleifend
            a dui nec ullamcorper. Praesent vehicula lacus ac justo accumsan
            ullamcorper. Nunc nec ligula a tortor sollicitudin dictum in vel
            enim. Quisque facilisis turpis vel eros dictum aliquam et nec
            turpis. Sed eleifend a dui nec ullamcorper. Praesent vehicula lacus
            ac justo accumsan ullamcorper.
          </p>
          <p>
            Nunc nec ligula a tortor sollicitudin dictum in vel enim. Quisque
            facilisis turpis vel eros dictum aliquam et nec turpis. Sed eleifend
            a dui nec ullamcorper. Praesent vehicula lacus ac justo accumsan
            ullamcorper.Nunc nec ligula a tortor sollicitudin dictum in vel
            enim. Quisque facilisis turpis vel eros dictum aliquam et nec
            turpis. Sed eleifend a dui nec ullamcorper. Praesent vehicula lacus
            ac justo accumsan ullamcorper.
          </p>
          <p>
            Nunc nec ligula a tortor sollicitudin dictum in vel enim. Quisque
            facilisis turpis vel eros dictum aliquam et nec turpis. Sed eleifend
            a dui nec ullamcorper. Praesent vehicula lacus ac justo accumsan
            ullamcorper.Nunc nec ligula a tortor sollicitudin dictum in vel
            enim. Quisque facilisis turpis vel eros dictum aliquam et nec
            turpis. Sed eleifend a dui nec ullamcorper. Praesent vehicula lacus
            ac justo accumsan ullamcorper.
          </p>
          <p className="text-center pt-4">
            <Button color="secondary" onClick={toggleIsOpen}>
              Ok
            </Button>
          </p>
        </div>
      </Modal>
    </>
  );
};

export default WhatIsMathTrade;
