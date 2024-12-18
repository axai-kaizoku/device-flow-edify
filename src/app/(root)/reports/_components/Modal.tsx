// components/ui/Modal.tsx
import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="w-[618px] rounded-2xl bg-white shadow-lg p-6 relative"
            style={{
              maxWidth: '618.015px',
            }}
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-4 text-gray-500 hover:text-black"
              onClick={onClose}
            >
              x
            </button>

            <div className="p-4">{children}</div>
          </div>
        </div>
      )
};

export default Modal;
