import React, { useState, useEffect, useRef } from "react";
import { TbDots, TbCommand, TbBackspace, TbEdit } from "react-icons/tb";
import { AiTwotoneDelete } from "react-icons/ai";
import { motion } from "framer-motion";

const styles = require("./popover.module.scss");

type PopoverProps = {
  menuItems: {
    content: JSX.Element;
    onClick: () => void;
  }[];
};

const Popover: React.FC<PopoverProps> = ({ menuItems }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
        <TbDots />

        {/* Hidden div to close menu when clicked off */}
        {showMenu && (
          <>
            <div
              ref={menuRef}
              className={styles.hiddenContainer}
              tabIndex={-1}
            />
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
