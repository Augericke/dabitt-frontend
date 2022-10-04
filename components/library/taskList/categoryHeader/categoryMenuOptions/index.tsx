import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { TbBackspace, TbCommand, TbEdit } from "react-icons/tb";

const styles = require("./categoryMenuOptions.module.scss");

export const getMenuItems = (
  inputRef: React.MutableRefObject<any>,
  handleDelete: () => Promise<void>,
) => {
  // Focus on text input field and place cursor at end of string
  const handleEditClick = () => {
    const taskLength = inputRef.current.value.length;
    inputRef.current.focus();
    inputRef.current.setSelectionRange(taskLength, taskLength);
  };

  const menuItems = [
    {
      content: (
        <div className={styles.itemContainer}>
          <div className={styles.itemInfoContainer}>
            <TbEdit /> edit
          </div>
          <div className={styles.itemShortcutContainer}>
            <kbd className={styles.itemShortcut}>
              <TbCommand />
            </kbd>
            <kbd className={styles.itemShortcut}>E</kbd>
          </div>
        </div>
      ),
      onClick: handleEditClick,
    },
    {
      content: (
        <div className={styles.itemContainer}>
          <div className={styles.itemInfoContainer}>
            <AiTwotoneDelete /> delete
          </div>
          <div className={styles.itemShortcutContainer}>
            <kbd className={styles.itemShortcut}>
              <TbCommand />
            </kbd>
            <kbd className={styles.itemShortcut}>
              <TbBackspace />
            </kbd>
          </div>
        </div>
      ),
      //TODO: add modal on delete
      onClick: handleDelete,
    },
  ];

  return menuItems;
};
