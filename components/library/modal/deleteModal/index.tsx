import React from "react";
import Modal from "..";

const styles = require("./deleteModal.module.scss");

type DeleteModalProps = {
  isVisible: boolean;
  content: string | React.ReactElement;
  onClose: () => void;
  onDelete: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  isVisible,
  content,
  onClose,
  onDelete,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      content={
        <div className={styles.dangerContainer}>
          <h2 className={styles.dangerTitle}>Danger Zone</h2>
          <div className={styles.dangerContent}>{content}</div>
          <div className={styles.buttonContainer}>
            <button className={styles.buttonSafe} onClick={onClose}>
              never mind
            </button>
            <button className={styles.buttonDanger} onClick={onDelete}>
              delete
            </button>
          </div>
        </div>
      }
    />
  );
};

export default DeleteModal;
