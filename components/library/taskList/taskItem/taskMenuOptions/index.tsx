import React from "react";
import { AiTwotoneDelete, AiOutlineRedo } from "react-icons/ai";
import { TbEdit, TbCheck } from "react-icons/tb";
import { GiConverseShoe } from "react-icons/gi";
import { getIsCurrent } from "../../../../../utils/dateComputer";

const styles = require("./taskMenuOptions.module.scss");

export const getMenuItems = (
  isTicked: boolean,
  inputRef: React.MutableRefObject<any>,
  selectedDate: Date,
  handleCanKick: () => void,
  handleComplete: () => void,
  handleDelete: () => void,
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
            {isTicked ? (
              <>
                <AiOutlineRedo /> unfinished
              </>
            ) : (
              <>
                <TbCheck /> complete
              </>
            )}
          </div>
        </div>
      ),
      onClick: handleComplete,
    },
    {
      content: (
        <div className={styles.itemContainer}>
          <div className={styles.itemInfoContainer}>
            <span className={styles.canContainer}>
              <GiConverseShoe />
            </span>
            kick to tomorrow
          </div>
        </div>
      ),
      onClick: handleCanKick,
    },
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

  const activeMenuItems =
    isTicked || !getIsCurrent(selectedDate)
      ? menuItems.filter((item) => item.content !== menuItems[2].content)
      : menuItems;

  return activeMenuItems;
};
