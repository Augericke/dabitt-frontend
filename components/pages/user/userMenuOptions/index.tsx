import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";

const styles = require("./userMenuOptions.module.scss");

export const getUserMenuOptions = (handleDelete: () => void) => {
  const menuItems = [
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
