import React, { useState, useEffect, useRef } from "react";
import { TbDots } from "react-icons/tb";
import { RiSettings5Fill } from "react-icons/ri";

const styles = require("./popover.module.scss");

type PopoverProps = {
  menuItems: {
    content: JSX.Element;
    onClick: () => void;
  }[];
  iconType?: "dots" | "gear";
};

const Popover: React.FC<PopoverProps> = ({ menuItems, iconType = "dots" }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  let icon = <></>;
  switch (iconType) {
    case "dots":
      icon = <TbDots size={20} />;
      break;
    case "gear":
      icon = <RiSettings5Fill size={20} />;
      break;
    default:
      icon = <TbDots size={20} />;
  }

  useEffect(() => {
    if (showMenu && menuRef.current) {
      menuRef.current.focus();
    }
  }, [showMenu, menuRef]);

  return (
    <>
      <div
        className={styles.popoverContainer}
        onClick={() => setShowMenu(!showMenu)}
      >
        {icon}

        {/* Hidden div to close menu when clicked off */}
        {showMenu && (
          <>
            <div ref={menuRef} className={styles.hiddenContainer} />
            <ul
              className={showMenu ? styles.menuContainer : styles.hideElement}
            >
              {menuItems.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={styles.menuItem}
                    onClick={item.onClick}
                  >
                    {item.content}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Popover;
