import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineBarChart,
  AiOutlineUser,
} from "react-icons/ai";
import MenuToggle from "../menuToggle.tsx";

type NavBarProps = {};

const styles = require("./navBar.module.scss");

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const navOptions = [
    <AiOutlineHome key={"tasks"} />,
    <AiOutlineBarChart key={"dashboard"} />,
    <AiOutlineUser key={"user"} />,
  ];
  return (
    <nav className={styles.navBarContainer}>
      <ul className={styles.navList}>
        <li className={styles.navMenuToggle}>
          <MenuToggle isOpen={menuIsOpen} setIsOpen={setMenuIsOpen} />
        </li>
        {menuIsOpen && (
          <>
            {navOptions.map((option, index) => {
              return (
                <li key={index} className={styles.navIcon}>
                  {option}
                </li>
              );
            })}
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
