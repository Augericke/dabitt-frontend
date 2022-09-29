import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { TbBackspace, TbCommand, TbEdit } from "react-icons/tb";

const styles = require("./taskMenuOptions.module.scss");

const menuItems = [
  {
    content: (
      <>
        <div className={styles.itemInfoContainer}>
          <TbEdit /> edit task
        </div>
        <div className={styles.itemShortcutContainer}>
          <kbd className={styles.itemShortcut}>
            <TbCommand />
          </kbd>
          <kbd className={styles.itemShortcut}>E</kbd>
        </div>
      </>
    ),
    onClick: () => console.log("edit"),
  },
  {
    content: (
      <>
        <div className={styles.itemInfoContainer}>
          <AiTwotoneDelete /> delete task
        </div>
        <div className={styles.itemShortcutContainer}>
          <kbd className={styles.itemShortcut}>
            <TbCommand />
          </kbd>
          <kbd className={styles.itemShortcut}>
            <TbBackspace />
          </kbd>
        </div>
      </>
    ),
    onClick: () => console.log("delete"),
  },
];

export default menuItems;
