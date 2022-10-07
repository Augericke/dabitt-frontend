import React, { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

const styles = require("./modal.module.scss");

type ModalProps = {
  isVisible: boolean;
  content: React.ReactElement;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isVisible, content, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isVisible && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isVisible, modalRef]);

  return (
    <>
      {isVisible && (
        <div
          className={styles.modalContainer}
          ref={modalRef}
          tabIndex={-1}
          onClick={onClose}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              onClose();
            }
          }}
        >
          <div className={styles.modalContent}>
            <div className={styles.closeContainer}>
              <IoMdClose className={styles.closeIcon} onClick={onClose} />
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;