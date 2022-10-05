import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { GiConverseShoe } from "react-icons/gi";

const styles = require("./taskMenuOptions.module.scss");

export const getMenuItems = (
  inputRef: React.MutableRefObject<any>,
  handleCanKick: () => void,
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
        </div>
      ),
      onClick: handleEditClick,
    },
    {
      content: (
        <div className={styles.itemContainer}>
          <div className={styles.itemInfoContainer}>
            <span className={styles.canContainer}>
              <GiConverseShoe />
            </span>
            kick the can
          </div>
        </div>
      ),
      onClick: handleCanKick,
    },
    //TODO: add modal on delete
    {
      content: (
        <div className={styles.itemContainer}>
          <div className={styles.itemInfoContainer}>
            <AiTwotoneDelete /> delete
          </div>
        </div>
      ),
      onClick: handleDelete,
    },
  ];

  return menuItems;
};
