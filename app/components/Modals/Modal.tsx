"use client";

import { FC, ReactElement, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  onClose: () => void;
  onSubmit: () => void;
  actionLabel: string;
  isOpen?: boolean;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  disabled?: boolean;
  secondaryAtion?: () => void;
  secondaryActionLabel?: string;
}

const Modal: FC<ModalProps> = ({
  onClose,
  onSubmit,
  actionLabel,
  isOpen,
  title,
  body,
  footer,
  disabled,
  secondaryAtion,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState<boolean | undefined>(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAtion) {
      return;
    }

    secondaryAtion();
  }, [disabled, secondaryAtion]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        <div
          className={`translate duration-300 h-full ${
            showModal ? "translate-y-0" : "translate-y-full"
          } ${showModal ? "opacity-100" : "opacity-0"}`}
        >
          <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
              <button className="p-1 border-0 hover:opacity-70 transition absolute left-9" onClick={onClose}>
                <IoMdClose />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            <div className="relative p-6 flex-auto">
              {body}
            </div>
            <div className="flex flex-col gap-2 p-6">
              <div className="flex flex-row items-center gap-4 w-full">
                {secondaryActionLabel && handleSecondaryAction && (
                  <Button outline label={secondaryActionLabel} disabled={disabled} onClick={handleSecondaryAction}/>
                )}
                <Button label={actionLabel} disabled={disabled} onClick={handleSubmit}/>
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
