import React from "react";
import { IoMdClose } from "react-icons/io";
import ShowOnViewport from "../animation/showOnViewport";

const styles = require("./modal.module.scss");

type ModalProps = {
  isVisible: boolean;
  content: React.ReactElement;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isVisible, content, onClose }) => {
  return (
    <>
      {isVisible && (
        <div
          className={styles.modalContainer}
          tabIndex={-1}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              onClose();
            }
          }}
        >
          <ShowOnViewport customClass={styles.modalContent}>
            <>
              <div className={styles.closeContainer}>
                <IoMdClose className={styles.closeIcon} onClick={onClose} />
              </div>
              {content}
            </>
          </ShowOnViewport>
        </div>
      )}
    </>
  );
};

export default Modal;
