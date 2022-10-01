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
  iconType?: "dots" | "gear" | "clock";
  iconText?: string | ReactElement;
};

const Popover: React.FC<PopoverProps> = ({
  menuItems,
  iconType = "dots",
  iconText,
}) => {
  const [showMenu, setShowMenu] = useState(false);

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
    default:
      icon = <TbDots size={20} />;
  }

  return (
    <div ref={showMenu ? wrapperRef : null} className={styles.popoverContainer}>
      <button
        type="button"
        className={styles.popoverButtonContainer}
        onClick={() => setShowMenu(!showMenu)}
      >
        <span className={styles.iconContainer}>
          {icon} {iconText}
        </span>
      </button>
      {showMenu && (
        <>
          <ul className={showMenu ? styles.menuContainer : styles.hideElement}>
            {menuItems.map((item, index) => {
              return (
                <li key={index}>
                  <button
                    className={styles.menuItem}
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
