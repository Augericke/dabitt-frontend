import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  AiOutlineHome,
  AiOutlineBarChart,
  AiOutlineUser,
} from "react-icons/ai";
import { useOutsideClick } from "../../../utils/hooks/useOutsideClick";
import MenuToggle from "../menuToggle.tsx";

type NavBarProps = {};

const styles = require("./navBar.module.scss");

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const navOptions = [
    { icon: <AiOutlineHome />, href: "/tasks" },
    { icon: <AiOutlineBarChart />, href: "/dashboard" },
    { icon: <AiOutlineUser />, href: "/user" },
  ];

  // Hide Menu when click outside of popover container
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setMenuIsOpen(false));

  return (
    <>
      {/* On Larger Screens */}
      <nav
        ref={menuIsOpen ? wrapperRef : null}
        className={styles.navBarContainer}
      >
        <ul className={styles.navList}>
          <li
            className={styles.navMenuToggle}
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          >
            <MenuToggle isOpen={menuIsOpen} setIsOpen={setMenuIsOpen} />
          </li>
          {menuIsOpen && (
            <>
              {navOptions.map((option, index) => {
                return (
                  <Link key={index} href={option.href}>
                    <li className={styles.navIcon}>
                      <a>{option.icon} </a>
                    </li>
                  </Link>
                );
              })}
            </>
          )}
        </ul>
      </nav>

      {/* On Smaller Screens */}
      <nav className={styles.smallNavBarContainer}>
        <ul className={styles.navList}>
          {navOptions.map((option, index) => {
            return (
              <Link key={index} href={option.href}>
                <li className={styles.navIcon}>
                  <a className={styles.navLink}>{option.icon} </a>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
