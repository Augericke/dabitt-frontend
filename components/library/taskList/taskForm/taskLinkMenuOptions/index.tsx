import React, { Dispatch, SetStateAction, useState } from "react";
import { TbLink, TbUnlink } from "react-icons/tb";
import { PopoverMenuItem } from "../../../popover";

const styles = require("./taskLinkMenuOptions.module.scss");

export const getLinkMenuItems = (
  link: string,
  setLink: React.Dispatch<React.SetStateAction<string>>,
  taskLinkChanged: boolean,
  handleLinkChange: (newLink: string) => void,
  currentLink?: string,
) => {
  const handleLinkValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLink(event.target.value);
  };

  const handleLinkRemove = () => {
    setLink("");
    handleLinkChange("");
  };

  const menuItems: PopoverMenuItem[] = [
    {
      content: (
        <div className={styles.inputContainer}>
          <input
            className={styles.itemInput}
            placeholder="add a link..."
            value={link}
            onChange={handleLinkValueChange}
          />
          <div
            className={
              taskLinkChanged ? styles.inputTextFilled : styles.inputText
            }
            onClick={() => (link ? handleLinkChange(link) : {})}
          >
            apply
          </div>
        </div>
      ),
      onClick: () => console.log(),
      type: "input",
    },
    {
      content: (
        <div className={styles.itemContainer}>
          <a
            className={styles.itemInfoContainer}
            href={currentLink ?? link}
            target="_blank"
            rel="noreferrer"
          >
            <TbLink /> go to link
          </a>
        </div>
      ),
      onClick: () => {},
    },
    {
      content: (
        <div className={styles.itemContainer}>
          <div className={styles.itemInfoContainer}>
            <TbUnlink /> remove link
          </div>
        </div>
      ),
      onClick: handleLinkRemove,
    },
  ];

  const activeMenuItems = !currentLink
    ? menuItems.filter(
        (item) =>
          item.content !== menuItems[1].content &&
          item.content !== menuItems[2].content,
      )
    : menuItems;

  return activeMenuItems;
};
