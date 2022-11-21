import React from "react";
import { TbLink, TbUnlink, TbPlaylistAdd } from "react-icons/tb";
import { PopoverMenuItem } from "../../../popover";

const styles = require("./taskLinkMenuOptions.module.scss");

export const getLinkMenuItems = (
  link: string,
  setLink: React.Dispatch<React.SetStateAction<string>>,
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
        </div>
      ),
      onClick: () => {},
      type: "input",
    },
    {
      content: (
        <div className={styles.itemContainer}>
          <div className={styles.itemInfoContainer}>
            <TbPlaylistAdd /> apply change
          </div>
        </div>
      ),
      onClick: () => (link ? handleLinkChange(link) : {}),
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

  let activeMenuItems = !currentLink
    ? menuItems.filter(
        (item) =>
          item.content !== menuItems[2].content &&
          item.content !== menuItems[3].content,
      )
    : menuItems;

  activeMenuItems =
    currentLink !== link && link
      ? activeMenuItems
      : activeMenuItems.filter((item) => item.content !== menuItems[1].content);

  return activeMenuItems;
};
