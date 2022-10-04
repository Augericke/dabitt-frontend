import React, { useState, useRef, ReactElement } from "react";
import { useOutsideClick } from "../../../utils/hooks/useOutsideClick";
import { TbDots, TbClock } from "react-icons/tb";
import { RiSettings5Fill } from "react-icons/ri";

const styles = require("./popover.module.scss");

type PopoverProps = {
  menuItems: {
    content: JSX.Element;
    onClick: () => void;
  }[];
  direction?: "top" | "bottom" | "left" | "right";
  iconType?: "dots" | "gear" | "clock" | "none";
  iconText?: string | ReactElement;
  customButtonClass?: string;
  customMenuClass?: string;
};

const Popover: React.FC<PopoverProps> = ({
  menuItems,
  direction = "bottom",
  iconType = "dots",
  iconText,
  customButtonClass,
  customMenuClass,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const buttonContainer = customButtonClass
    ? `${styles.popoverButtonContainer} ${customButtonClass}`
    : styles.popoverButtonContainer;

  let menuContainerDirection: string;
  switch (direction) {
    case "top":
      menuContainerDirection = styles.menuContainerTop;
      break;
    case "bottom":
      menuContainerDirection = styles.menuContainerBottom;
      break;
    case "left":
      menuContainerDirection = styles.menuContainerLeft;
      break;
    case "right":
      menuContainerDirection = styles.menuContainerRight;
      break;
    default:
      menuContainerDirection = styles.menuContainerTop;
  }

  const menuContainer = customMenuClass
    ? `${menuContainerDirection} ${customMenuClass}`
    : menuContainerDirection;

  // Hide Menu when click outside of popover container
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setShowMenu(false));

  const handleSelection = (callback: () => void) => {
    callback();
    setShowMenu(false);
  };

  let icon = <></>;
  switch (iconType) {
    case "dots":
      icon = <TbDots size={20} />;
      break;
    case "gear":
      icon = <RiSettings5Fill size={15} />;
      break;
    case "clock":
      icon = <TbClock size={15} />;
      break;
    case "none":
      icon = <></>;
      break;
    default:
      icon = <TbDots size={20} />;
  }

  return (
    <div ref={showMenu ? wrapperRef : null} className={styles.popoverContainer}>
      <button
        type="button"
        className={buttonContainer}
        onClick={() => setShowMenu(!showMenu)}
      >
        <span className={styles.iconContainer}>
          {icon} {iconText}
        </span>
      </button>
      {showMenu && (
        <>
          <ul className={showMenu ? menuContainer : styles.hideElement}>
            {menuItems.map((item, index) => {
              return (
                <li key={index}>
                  <button
                    className={styles.menuItemButton}
                    onClick={() => handleSelection(item.onClick)}
                  >
                    {item.content}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default Popover;
